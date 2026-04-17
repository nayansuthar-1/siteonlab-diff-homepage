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

  const { initialPositions, initialColors } = useMemo(() => {
    const numLines = 100;
    const resolution = 100;
    const size = numLines * resolution * 12;
    return {
      initialPositions: new Float32Array(size),
      initialColors: new Float32Array(size),
    };
  }, []);

  useFrame((state) => {
    const time = state.clock.elapsedTime;
    
    const hue = (time * 0.05) % 1;
    const sharedColor = new THREE.Color().setHSL(hue, 1, 0.5);

    if (materialRef.current) {
      materialRef.current.color = sharedColor;
    }
    
    if (glowMatRef.current) {
      glowMatRef.current.uniforms.uColor.value = sharedColor;
      glowMatRef.current.uniforms.uTime.value = time;
    }

    if (!posRef.current || !colRef.current) return;

    const positions = posRef.current.array as Float32Array;
    const colors = colRef.current.array as Float32Array;

    let ptIdx = 0;
    let colIdx = 0;

    const R = 5.6;
    const numLines = 100;
    const resolution = 100;
    
    const speed = time * 0.02; 

    for (let i = 0; i < numLines; i++) {
      const baseTheta = (i / numLines) * Math.PI;
      
      // UPPER GLOBE (Left Sphere) -> Rotates Right
      const rawThetaLeft = (baseTheta + speed) % Math.PI;
      const thetaLeft = rawThetaLeft - Math.PI / 2;
      const edgeFadeLeft = Math.pow(Math.max(0, Math.cos(thetaLeft)), 0.6);

      // LOWER GLOBE (Right Sphere) -> Rotates Left
      const rawThetaRight = (baseTheta - (speed % Math.PI) + Math.PI) % Math.PI;
      const thetaRight = rawThetaRight - Math.PI / 2;
      const edgeFadeRight = Math.pow(Math.max(0, Math.cos(thetaRight)), 0.6);

      for (let j = 0; j < resolution; j++) {
        const alphaStart = 0.01;
        // We keep the main loop tracking up to 95% to draw the full right globe
        const alphaEndMax = Math.PI * 0.95;

        const alpha1 = alphaStart + (j / resolution) * (alphaEndMax - alphaStart);
        const alpha2 = alphaStart + ((j + 1) / resolution) * (alphaEndMax - alphaStart);

        /* ── Right Sphere (Lower Globe) ── */
        const rx1 = R * (1 - Math.cos(alpha1));
        const ry1 = R * Math.sin(alpha1) * Math.sin(thetaRight);
        const rz1 = 0;

        const rx2 = R * (1 - Math.cos(alpha2));
        const ry2 = R * Math.sin(alpha2) * Math.sin(thetaRight);
        const rz2 = 0;

        positions[ptIdx++] = rx1; positions[ptIdx++] = ry1; positions[ptIdx++] = rz1;
        positions[ptIdx++] = rx2; positions[ptIdx++] = ry2; positions[ptIdx++] = rz2;

        /* ── Left Sphere (Upper Globe) ── */
        const lx1 = -R * (1 - Math.cos(alpha1));
        const ly1 = R * Math.sin(alpha1) * Math.sin(thetaLeft);
        const lz1 = 0;

        const lx2 = -R * (1 - Math.cos(alpha2));
        const ly2 = R * Math.sin(alpha2) * Math.sin(thetaLeft);
        const lz2 = 0;

        positions[ptIdx++] = lx1; positions[ptIdx++] = ly1; positions[ptIdx++] = lz1;
        positions[ptIdx++] = lx2; positions[ptIdx++] = ly2; positions[ptIdx++] = lz2;

        /* ── FADING LOGIC ── */
        
        // Right Sphere: Fades gracefully near the very end (95%)
        const poleFade1Right = Math.max(0, 1.0 - Math.pow(alpha1 / alphaEndMax, 1.5));
        const poleFade2Right = Math.max(0, 1.0 - Math.pow(alpha2 / alphaEndMax, 1.5));

        // Left Sphere: Fades smoothly to completely black exactly at halfway (50%)
        const leftFadeCutoff = Math.PI * 0.5; 
        const poleFade1Left = Math.max(0, 1.0 - Math.pow(alpha1 / leftFadeCutoff, 2.0));
        const poleFade2Left = Math.max(0, 1.0 - Math.pow(alpha2 / leftFadeCutoff, 2.0));

        const intensity1Right = poleFade1Right * edgeFadeRight;
        const intensity2Right = poleFade2Right * edgeFadeRight;
        
        const intensity1Left = poleFade1Left * edgeFadeLeft;
        const intensity2Left = poleFade2Left * edgeFadeLeft;

        // Right colors
        colors[colIdx++] = intensity1Right; colors[colIdx++] = intensity1Right; colors[colIdx++] = intensity1Right;
        colors[colIdx++] = intensity2Right; colors[colIdx++] = intensity2Right; colors[colIdx++] = intensity2Right;
        
        // Left colors
        colors[colIdx++] = intensity1Left; colors[colIdx++] = intensity1Left; colors[colIdx++] = intensity1Left;
        colors[colIdx++] = intensity2Left; colors[colIdx++] = intensity2Left; colors[colIdx++] = intensity2Left;
      }
    }

    posRef.current.needsUpdate = true;
    colRef.current.needsUpdate = true;
  });

  return (
    // ADJUSTED PLACEMENT: 
    // Y pushed upward again (from -1.4 to -0.9).
    <group ref={groupRef} position={[7.2, -0.3, 0]} rotation={[0, 0, -0.50]}>
      
      {/* ── CLOUD GLOW BACKGROUND ── */}
      <mesh position={[0, 0, -0.1]}>
        <planeGeometry args={[16, 16]} />
        <shaderMaterial
          ref={glowMatRef}
          vertexShader={glowVertexShader}
          fragmentShader={glowFragmentShader}
          uniforms={uniforms}
          transparent
          depthWrite={false}
          blending={THREE.AdditiveBlending}
        />
      </mesh>

      {/* ── DUAL ROTATING LINES ── */}
      <lineSegments>
        <bufferGeometry>
          <bufferAttribute
            ref={posRef}
            attach="attributes-position"
            args={[initialPositions, 3]}
          />
          <bufferAttribute
            ref={colRef}
            attach="attributes-color"
            args={[initialColors, 3]}
          />
        </bufferGeometry>
        <lineBasicMaterial
          ref={materialRef}
          color="#ffffff"
          vertexColors
          transparent
          opacity={0.65}
          blending={THREE.AdditiveBlending}
          depthWrite={false}
        />
      </lineSegments>
      
    </group>
  );
}

export default function WaveScene() {
  return (
    <Canvas
      camera={{ position: [0, 0, 35], fov: 25 }}
      style={{
        position: "absolute",
        inset: 0,
      }}
    >
      <PerfectSpheres />
    </Canvas>
  );
}