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

  // 2D Random
  float random (in vec2 st) {
      return fract(sin(dot(st.xy, vec2(12.9898,78.233))) * 43758.5453123);
  }

  // 2D Noise
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

  // Fractal Brownian Motion for the "Cloudy" look
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
    // Distance from the exact center (the intersection point)
    float dist = distance(vUv, vec2(0.5));

    // Smooth radial fade out so it doesn't have hard edges
    float radial = smoothstep(0.5, 0.0, dist);

    // Generate moving clouds
    vec2 pos = vec2(vUv * 3.0); // 3.0 controls the "scale" or chunkiness of the clouds
    pos.x += uTime * 0.1;       // Moves clouds to the left
    pos.y -= uTime * 0.05;      // Moves clouds slightly down
    
    float cloud = fbm(pos);
    
    // Increase cloud contrast for a punchy, ethereal glow
    cloud = smoothstep(0.1, 0.9, cloud);

    // Mix the radial shape with the cloud noise. 
    // The 0.85 at the end is the Max Opacity of the clouds.
    float alpha = radial * cloud * 0.85; 

    gl_FragColor = vec4(uColor, alpha);
  }
`;

function PerfectSpheres() {
  const groupRef = useRef<THREE.Group>(null);
  
  // Material refs
  const materialRef = useRef<THREE.LineBasicMaterial>(null);
  const glowMatRef = useRef<THREE.ShaderMaterial>(null);
  
  // Buffer refs
  const posRef = useRef<THREE.BufferAttribute>(null);
  const colRef = useRef<THREE.BufferAttribute>(null);

  // Cloud Uniforms
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
    
    // 1. Color animation (Shared by both lines and clouds)
    const hue = (time * 0.05) % 1;
    const sharedColor = new THREE.Color().setHSL(hue, 1, 0.5);

    if (materialRef.current) {
      materialRef.current.color = sharedColor;
    }
    
    // Update Cloud Glow Uniforms
    if (glowMatRef.current) {
      glowMatRef.current.uniforms.uColor.value = sharedColor;
      glowMatRef.current.uniforms.uTime.value = time;
    }

    // 2. Line Rotation animation
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
      
      // UPPER GLOBE (Left Sphere) -> Rotates Right (+ speed)
      const rawThetaLeft = (baseTheta + speed) % Math.PI;
      const thetaLeft = rawThetaLeft - Math.PI / 2;
      const edgeFadeLeft = Math.pow(Math.max(0, Math.cos(thetaLeft)), 0.6);

      // LOWER GLOBE (Right Sphere) -> Rotates Left (- speed)
      const rawThetaRight = (baseTheta - (speed % Math.PI) + Math.PI) % Math.PI;
      const thetaRight = rawThetaRight - Math.PI / 2;
      const edgeFadeRight = Math.pow(Math.max(0, Math.cos(thetaRight)), 0.6);

      for (let j = 0; j < resolution; j++) {
        const alphaStart = 0.01;
        const alphaEnd = Math.PI * 0.95;

        const alpha1 = alphaStart + (j / resolution) * (alphaEnd - alphaStart);
        const alpha2 = alphaStart + ((j + 1) / resolution) * (alphaEnd - alphaStart);

        /* ── Right Sphere (Lower Globe - Uses thetaRight) ── */
        const rx1 = R * (1 - Math.cos(alpha1));
        const ry1 = R * Math.sin(alpha1) * Math.sin(thetaRight);
        const rz1 = 0;

        const rx2 = R * (1 - Math.cos(alpha2));
        const ry2 = R * Math.sin(alpha2) * Math.sin(thetaRight);
        const rz2 = 0;

        positions[ptIdx++] = rx1; positions[ptIdx++] = ry1; positions[ptIdx++] = rz1;
        positions[ptIdx++] = rx2; positions[ptIdx++] = ry2; positions[ptIdx++] = rz2;

        /* ── Left Sphere (Upper Globe - Uses thetaLeft) ── */
        const lx1 = -R * (1 - Math.cos(alpha1));
        const ly1 = R * Math.sin(alpha1) * Math.sin(thetaLeft);
        const lz1 = 0;

        const lx2 = -R * (1 - Math.cos(alpha2));
        const ly2 = R * Math.sin(alpha2) * Math.sin(thetaLeft);
        const lz2 = 0;

        positions[ptIdx++] = lx1; positions[ptIdx++] = ly1; positions[ptIdx++] = lz1;
        positions[ptIdx++] = lx2; positions[ptIdx++] = ly2; positions[ptIdx++] = lz2;

        /* ── Fading to Black ── */
        const poleFade1 = Math.max(0, 1.0 - Math.pow(alpha1 / alphaEnd, 1.5));
        const poleFade2 = Math.max(0, 1.0 - Math.pow(alpha2 / alphaEnd, 1.5));

        // Separate color intensities based on the unique fade of each globe
        const intensity1Right = poleFade1 * edgeFadeRight;
        const intensity2Right = poleFade2 * edgeFadeRight;
        
        const intensity1Left = poleFade1 * edgeFadeLeft;
        const intensity2Left = poleFade2 * edgeFadeLeft;

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
    <group ref={groupRef} position={[8.0, -1.9, 0]} rotation={[0, 0, -0.65]}>
      
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