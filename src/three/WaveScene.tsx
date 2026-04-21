"use client";

import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { useMemo, useRef } from "react";
import * as THREE from "three";

// --- CLOUD GLOW SHADERS (Unchanged) ---
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
  const { size, viewport } = useThree();
  const isMobile = size.width < 768;
  const isTablet = size.width >= 768 && size.width < 1024;
  
  const scale = isMobile ? 0.6 : isTablet ? 0.8 : 1;
  const posX = isMobile ? viewport.width * 0.2 : isTablet ? 6 : 12;
  const posY = isMobile ? -1.5 : -0.5;

  const groupRef = useRef<THREE.Group>(null);
  const materialRef = useRef<THREE.LineBasicMaterial>(null);
  const glowMatRef = useRef<THREE.ShaderMaterial>(null);
  const posRef = useRef<THREE.BufferAttribute>(null);
  const colRef = useRef<THREE.BufferAttribute>(null);

  // --- HOVER TRACKING ---
  const mousePos = useRef(new THREE.Vector3(999, 999, 0));

  const uniforms = useMemo(() => ({
    uColor: { value: new THREE.Color() },
    uTime: { value: 0 }
  }), []);

  const { initialPositions, initialColors, randomOffsets } = useMemo(() => {
    const numLines = 100;
    const resolution = 100;
    const size = numLines * resolution * 12;
    const offsets = new Float32Array(numLines);
    for(let i = 0; i < numLines; i++) offsets[i] = Math.random() * 0.15;

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

    // Sync current wave color to CSS variable for icon glows
    if (typeof document !== "undefined") {
      document.documentElement.style.setProperty("--wave-color", sharedColor.getStyle());
    }

    if (materialRef.current) materialRef.current.color = sharedColor;
    if (glowMatRef.current) {
      glowMatRef.current.uniforms.uColor.value = sharedColor;
      glowMatRef.current.uniforms.uTime.value = time;
    }

    if (!posRef.current || !colRef.current) return;
    const positions = posRef.current.array as Float32Array;
    const colors = colRef.current.array as Float32Array;

    let ptIdx = 0, colIdx = 0;
    const R = 9; 
    const numLines = 100, resolution = 100;
    const speed = time * 0.02; 

    // --- MOUSE COORDINATES ---
    const mx = mousePos.current.x;
    const my = mousePos.current.y;

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

        const rx1 = R * (1 - Math.cos(alpha1));
        const ry1 = R * Math.sin(alpha1) * Math.sin(thetaRight);
        const lx1 = -R * (1 - Math.cos(alpha1));
        const ly1 = R * Math.sin(alpha1) * Math.sin(thetaLeft);

        /* ── Right Sphere ── */
        positions[ptIdx++] = rx1;
        positions[ptIdx++] = ry1;
        positions[ptIdx++] = 0;
        positions[ptIdx++] = R * (1 - Math.cos(alpha2));
        positions[ptIdx++] = R * Math.sin(alpha2) * Math.sin(thetaRight);
        positions[ptIdx++] = 0;

        /* ── Left Sphere ── */
        positions[ptIdx++] = lx1;
        positions[ptIdx++] = ly1;
        positions[ptIdx++] = 0;
        positions[ptIdx++] = -R * (1 - Math.cos(alpha2));
        positions[ptIdx++] = R * Math.sin(alpha2) * Math.sin(thetaLeft);
        positions[ptIdx++] = 0;

        /* ── FADING + HOVER BOOST ── */
        const poleFade1Right = Math.max(0, 1.0 - Math.pow(alpha1 / alphaEndMax, 1.5));
        const leftFadeCutoff = (Math.PI * 0.5) - lineOffset; 
        const poleFade1Left = Math.max(0, 1.0 - Math.pow(alpha1 / leftFadeCutoff, 1.3));

        const i1R = poleFade1Right * edgeFadeRight;
        const i1L = poleFade1Left * edgeFadeLeft;

        // --- CALCULATE HOVER BRIGHTNESS ---
        const distR = Math.sqrt(Math.pow(rx1 - mx, 2) + Math.pow(ry1 - my, 2));
        const distL = Math.sqrt(Math.pow(lx1 - mx, 2) + Math.pow(ly1 - my, 2));
        
        // Boost intensity when mouse is close (e.g., within 2 units)
        const boostR = Math.exp(-distR * 1.5) * 0.8;
        const boostL = Math.exp(-distL * 1.5) * 0.8;

        colors[colIdx++] = i1R + boostR; colors[colIdx++] = i1R + boostR; colors[colIdx++] = i1R + boostR;
        colors[colIdx++] = i1R + boostR; colors[colIdx++] = i1R + boostR; colors[colIdx++] = i1R + boostR;
        colors[colIdx++] = i1L + boostL; colors[colIdx++] = i1L + boostL; colors[colIdx++] = i1L + boostL;
        colors[colIdx++] = i1L + boostL; colors[colIdx++] = i1L + boostL; colors[colIdx++] = i1L + boostL;
      }
    }
    posRef.current.needsUpdate = true;
    colRef.current.needsUpdate = true;
  });

  return (
    <group ref={groupRef} position={[posX, posY, 0]} rotation={[0, 0, -0.50]} scale={[scale, scale, scale]}>
      {/* ── SENSING PLANE (The Fix) ── */}
      <mesh 
        onPointerMove={(e) => mousePos.current.copy(e.point)}
        onPointerLeave={() => mousePos.current.set(999, 999, 0)}
        visible={false}
      >
        <planeGeometry args={[30, 30]} />
      </mesh>

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