"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { useMemo, useRef } from "react";
import * as THREE from "three";

function PerfectSpheres() {
  const groupRef = useRef<THREE.Group>(null);
  const materialRef = useRef<THREE.LineBasicMaterial>(null);
  const posRef = useRef<THREE.BufferAttribute>(null);
  const colRef = useRef<THREE.BufferAttribute>(null);

  // We only initialize the empty arrays once to save memory.
  const { initialPositions, initialColors } = useMemo(() => {
    const numLines = 100;
    const resolution = 100;
    // 4 points per resolution step, 3 floats per point = 12 floats per loop
    const size = numLines * resolution * 12;
    return {
      initialPositions: new Float32Array(size),
      initialColors: new Float32Array(size),
    };
  }, []);

  useFrame((state) => {
    const time = state.clock.elapsedTime;
    
    // 1. Color animation
    const hue = (time * 0.05) % 1;
    if (materialRef.current) {
      materialRef.current.color.setHSL(hue, 1, 0.5);
    }

    // 2. Line Rotation animation
    if (!posRef.current || !colRef.current) return;

    const positions = posRef.current.array as Float32Array;
    const colors = colRef.current.array as Float32Array;

    let ptIdx = 0;
    let colIdx = 0;

    // These remain EXACTLY as they were in your previous perfect setup
    const R = 5.6;
    const numLines = 100;
    const resolution = 100;
    
    // Controls the speed of the rotation. Tweak this number to make it spin faster or slower.
    const speed = time * 0.03; 

    for (let i = 0; i < numLines; i++) {
      // Seamless modulo math: lines fading into the right edge wrap instantly to the left edge
      const baseTheta = (i / numLines) * Math.PI;
      const rawTheta = (baseTheta + speed) % Math.PI;
      const theta = rawTheta - Math.PI / 2;

      const edgeFade = Math.pow(Math.max(0, Math.cos(theta)), 0.6);

      for (let j = 0; j < resolution; j++) {
        const alphaStart = 0.01;
        const alphaEnd = Math.PI * 0.95;

        const alpha1 = alphaStart + (j / resolution) * (alphaEnd - alphaStart);
        const alpha2 = alphaStart + ((j + 1) / resolution) * (alphaEnd - alphaStart);

        /* ── Right Sphere ── */
        const rx1 = R * (1 - Math.cos(alpha1));
        const ry1 = R * Math.sin(alpha1) * Math.sin(theta);
        const rz1 = 0;

        const rx2 = R * (1 - Math.cos(alpha2));
        const ry2 = R * Math.sin(alpha2) * Math.sin(theta);
        const rz2 = 0;

        positions[ptIdx++] = rx1; positions[ptIdx++] = ry1; positions[ptIdx++] = rz1;
        positions[ptIdx++] = rx2; positions[ptIdx++] = ry2; positions[ptIdx++] = rz2;

        /* ── Left Sphere ── */
        const lx1 = -R * (1 - Math.cos(alpha1));
        const ly1 = R * Math.sin(alpha1) * Math.sin(theta);
        const lz1 = 0;

        const lx2 = -R * (1 - Math.cos(alpha2));
        const ly2 = R * Math.sin(alpha2) * Math.sin(theta);
        const lz2 = 0;

        positions[ptIdx++] = lx1; positions[ptIdx++] = ly1; positions[ptIdx++] = lz1;
        positions[ptIdx++] = lx2; positions[ptIdx++] = ly2; positions[ptIdx++] = lz2;

        /* ── Fading to Black ── */
        const poleFade1 = Math.max(0, 1.0 - Math.pow(alpha1 / alphaEnd, 1.5));
        const poleFade2 = Math.max(0, 1.0 - Math.pow(alpha2 / alphaEnd, 1.5));

        const intensity1 = poleFade1 * edgeFade;
        const intensity2 = poleFade2 * edgeFade;

        // Right colors
        colors[colIdx++] = intensity1; colors[colIdx++] = intensity1; colors[colIdx++] = intensity1;
        colors[colIdx++] = intensity2; colors[colIdx++] = intensity2; colors[colIdx++] = intensity2;
        // Left colors
        colors[colIdx++] = intensity1; colors[colIdx++] = intensity1; colors[colIdx++] = intensity1;
        colors[colIdx++] = intensity2; colors[colIdx++] = intensity2; colors[colIdx++] = intensity2;
      }
    }

    // Tell React Three Fiber to send the updated arrays to the GPU
    posRef.current.needsUpdate = true;
    colRef.current.needsUpdate = true;
  });

  return (
    // Placement is entirely untouched
    <group ref={groupRef} position={[8.0, -1.9, 0]} rotation={[0, 0, -0.65]}>
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