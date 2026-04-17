"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { useMemo, useRef } from "react";
import * as THREE from "three";

// --- CLOUD GLOW SHADERS ---
const glowVertexShader = `
  varying vec2 vUv;
  void main() {
    vUv = uv;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`;

const glowFragmentShader = `
  varying vec2 vUv;
  uniform vec3 uColor;
  uniform float uTime;

  float random (in vec2 st) {
      return fract(sin(dot(st.xy, vec2(12.9898,78.233))) * 43758.5453123);
  }

  float noise (in vec2 st) {
      vec2 i = floor(st);
      vec2 f = fract(st);
      float a = random(i);
      float b = random(i + vec2(1.0, 0.0));
      float c = random(i + vec2(0.0, 1.0));
      float d = random(i + vec2(1.0, 1.0));
      vec2 u = f*f*(3.0-2.0*f);
      return mix(a, b, u.x) + (c - a)* u.y * (1.0 - u.x) + (d - b) * u.x * u.y;
  }

  float fbm (in vec2 st) {
      float value = 0.0;
      float amplitude = 0.5;
      for (int i = 0; i < 4; i++) {
          value += amplitude * noise(st);
          st *= 2.0;
          amplitude *= 0.5;
      }
      return value;
  }

  void main() {
    float dist = distance(vUv, vec2(0.5));
    float radial = smoothstep(0.5, 0.0, dist);
    vec2 pos = vec2(vUv * 3.0); 
    pos.x += uTime * 0.1;       
    pos.y -= uTime * 0.05;      
    float cloud = fbm(pos);
    cloud = smoothstep(0.1, 0.9, cloud);
    float alpha = radial * cloud * 0.85; 
    gl_FragColor = vec4(uColor, alpha);
  }
`;

function PerfectSpheres() {
  const groupRef = useRef<THREE.Group>(null);
  const materialRef = useRef<THREE.LineBasicMaterial>(null);
  const glowMatRef = useRef<THREE.ShaderMaterial>(null);
  const posRef = useRef<THREE.BufferAttribute>(null);
  const colRef = useRef<THREE.BufferAttribute>(null);

  const uniforms = useMemo(() => ({
    uColor: { value: new THREE.Color() },
    uTime: { value: 0 }
  }), []);

  const { initialPositions, initialColors, randomOffsets } = useMemo(() => {
    const numLines = 100;
    const resolution = 100;
    const size = numLines * resolution * 12;
    
    const offsets = new Float32Array(numLines);
    for(let i = 0; i < numLines; i++) {
        offsets[i] = Math.random() * 0.15;
    }

    return {
      initialPositions: new Float32Array(size),
      initialColors: new Float32Array(size),
      randomOffsets: offsets
    };
  }, []);

  useFrame((state) => {
    const time = state.clock.elapsedTime;
    const hue = (time * 0.05) % 1;
    const sharedColor = new THREE.Color().setHSL(hue, 1, 0.5);

    if (materialRef.current) materialRef.current.color = sharedColor;
    if (glowMatRef.current) {
      glowMatRef.current.uniforms.uColor.value = sharedColor;
      glowMatRef.current.uniforms.uTime.value = time;
    }

    if (!posRef.current || !colRef.current) return;
    const positions = posRef.current.array as Float32Array;
    const colors = colRef.current.array as Float32Array;

    let ptIdx = 0, colIdx = 0;
    
    // R remains zoomed at 7.5
    const R = 9; 
    const numLines = 100, resolution = 100;
    const speed = time * 0.02; 

    for (let i = 0; i < numLines; i++) {
      const baseTheta = (i / numLines) * Math.PI;
      const rawThetaLeft = (baseTheta + speed) % Math.PI;
      const thetaLeft = rawThetaLeft - Math.PI / 2;
      const edgeFadeLeft = Math.pow(Math.max(0, Math.cos(thetaLeft)), 0.6);

      const rawThetaRight = (baseTheta - (speed % Math.PI) + Math.PI) % Math.PI;
      const thetaRight = rawThetaRight - Math.PI / 2;
      const edgeFadeRight = Math.pow(Math.max(0, Math.cos(thetaRight)), 0.6);

      const lineOffset = randomOffsets[i];

      for (let j = 0; j < resolution; j++) {
        const alphaStart = 0.01;
        const alphaEndMax = Math.PI * 0.95;

        const alpha1 = alphaStart + (j / resolution) * (alphaEndMax - alphaStart);
        const alpha2 = alphaStart + ((j + 1) / resolution) * (alphaEndMax - alphaStart);

        /* ── Right Sphere ── */
        positions[ptIdx++] = R * (1 - Math.cos(alpha1));
        positions[ptIdx++] = R * Math.sin(alpha1) * Math.sin(thetaRight);
        positions[ptIdx++] = 0;
        positions[ptIdx++] = R * (1 - Math.cos(alpha2));
        positions[ptIdx++] = R * Math.sin(alpha2) * Math.sin(thetaRight);
        positions[ptIdx++] = 0;

        /* ── Left Sphere (Upper) ── */
        positions[ptIdx++] = -R * (1 - Math.cos(alpha1));
        positions[ptIdx++] = R * Math.sin(alpha1) * Math.sin(thetaLeft);
        positions[ptIdx++] = 0;
        positions[ptIdx++] = -R * (1 - Math.cos(alpha2));
        positions[ptIdx++] = R * Math.sin(alpha2) * Math.sin(thetaLeft);
        positions[ptIdx++] = 0;

        /* ── FADING LOGIC ── */
        const poleFade1Right = Math.max(0, 1.0 - Math.pow(alpha1 / alphaEndMax, 1.5));
        const poleFade2Right = Math.max(0, 1.0 - Math.pow(alpha2 / alphaEndMax, 1.5));

        const leftFadeCutoff = (Math.PI * 0.5) - lineOffset; 
        const poleFade1Left = Math.max(0, 1.0 - Math.pow(alpha1 / leftFadeCutoff, 1.3));
        const poleFade2Left = Math.max(0, 1.0 - Math.pow(alpha2 / leftFadeCutoff, 1.3));

        const i1R = poleFade1Right * edgeFadeRight, i2R = poleFade2Right * edgeFadeRight;
        const i1L = poleFade1Left * edgeFadeLeft, i2L = poleFade2Left * edgeFadeLeft;

        colors[colIdx++] = i1R; colors[colIdx++] = i1R; colors[colIdx++] = i1R;
        colors[colIdx++] = i2R; colors[colIdx++] = i2R; colors[colIdx++] = i2R;
        colors[colIdx++] = i1L; colors[colIdx++] = i1L; colors[colIdx++] = i1L;
        colors[colIdx++] = i2L; colors[colIdx++] = i2L; colors[colIdx++] = i2L;
      }
    }
    posRef.current.needsUpdate = true;
    colRef.current.needsUpdate = true;
  });

  return (
    // X POSITION PUSHED: Increased from 8.2 to 9.2
    // Y and Rotation are preserved from your perfect setup
    <group ref={groupRef} position={[12, -0.5, 0]} rotation={[0, 0, -0.50]}>
      <mesh position={[0, 0, -0.1]}>
        <planeGeometry args={[20, 20]} />
        <shaderMaterial ref={glowMatRef} vertexShader={glowVertexShader} fragmentShader={glowFragmentShader} uniforms={uniforms} transparent depthWrite={false} blending={THREE.AdditiveBlending} />
      </mesh>
      <lineSegments>
        <bufferGeometry>
          <bufferAttribute ref={posRef} attach="attributes-position" args={[initialPositions, 3]} />
          <bufferAttribute ref={colRef} attach="attributes-color" args={[initialColors, 3]} />
        </bufferGeometry>
        <lineBasicMaterial ref={materialRef} vertexColors transparent opacity={0.65} blending={THREE.AdditiveBlending} depthWrite={false} />
      </lineSegments>
    </group>
  );
}

export default function WaveScene() {
  return (
    <Canvas camera={{ position: [0, 0, 35], fov: 25 }} style={{ position: "absolute", inset: 0 }}>
      <PerfectSpheres />
    </Canvas>
  );
}