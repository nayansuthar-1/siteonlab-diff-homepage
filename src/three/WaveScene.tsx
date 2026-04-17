"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { useMemo, useRef } from "react";
import * as THREE from "three";

function TangentSpheres() {
  const groupRef = useRef<THREE.Group>(null);
  const leftMatRef = useRef<THREE.LineBasicMaterial>(null);
  const rightMatRef = useRef<THREE.LineBasicMaterial>(null);

  // We now only calculate ONE perfect sphere. 
  // We will duplicate and rotate this exact geometry for the second one.
  const { positions, colors } = useMemo(() => {
    const R = 4.0;
    const numLines = 60; 
    const resolution = 80;

    const pts: number[] = [];
    const cols: number[] = [];

    for (let i = 0; i < numLines; i++) {
      // Front half only
      const theta = (i / (numLines - 1)) * Math.PI - Math.PI / 2;
      const edgeFade = Math.pow(Math.max(0, Math.cos(theta)), 0.4);

      for (let j = 0; j < resolution; j++) {
        const alpha1 = (j / resolution) * Math.PI;
        const alpha2 = ((j + 1) / resolution) * Math.PI;

        /* ── Base Sphere Math ── */
        const x1 = R * (1 - Math.cos(alpha1));
        const y1 = R * Math.sin(alpha1) * Math.sin(theta); 
        const z1 = R * Math.sin(alpha1) * Math.cos(theta); 

        const x2 = R * (1 - Math.cos(alpha2));
        const y2 = R * Math.sin(alpha2) * Math.sin(theta);
        const z2 = R * Math.sin(alpha2) * Math.cos(theta);

        pts.push(x1, y1, z1, x2, y2, z2);

        /* ── Fading Logic (Fades to 0 at the opposite pole) ── */
        const poleFade1 = Math.max(0, 1.0 - Math.pow(alpha1 / (Math.PI * 0.85), 2));
        const poleFade2 = Math.max(0, 1.0 - Math.pow(alpha2 / (Math.PI * 0.85), 2));

        const fade1 = poleFade1 * edgeFade;
        const fade2 = poleFade2 * edgeFade;

        cols.push(
          fade1, fade1, fade1,
          fade2, fade2, fade2
        );
      }
    }

    return {
      positions: new Float32Array(pts),
      colors: new Float32Array(cols),
    };
  }, []);

  // Smooth rainbow color loop
  useFrame((state) => {
    const hue = (state.clock.elapsedTime * 0.05) % 1;
    if (leftMatRef.current) leftMatRef.current.color.setHSL(hue, 1, 0.5);
    if (rightMatRef.current) rightMatRef.current.color.setHSL(hue, 1, 0.5);
  });

  return (
    <group ref={groupRef} position={[3.5, -0.5, 0]} rotation={[0.4, -0.3, -0.7]}>
      
      {/* 1. The Right/Lower Sphere (Base Geometry) */}
      <lineSegments>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" args={[positions, 3]} />
          <bufferAttribute attach="attributes-color" args={[colors, 3]} />
        </bufferGeometry>
        <lineBasicMaterial
          ref={rightMatRef}
          color="#ffffff" 
          vertexColors
          transparent
          opacity={0.8}
          blending={THREE.AdditiveBlending}
        />
      </lineSegments>

      {/* 2. The Left/Upper Sphere (Exact Copy, spun 180 degrees) */}
      {/* This guarantees it is visually identical and fixes the hollow back issue */}
      <group rotation={[0, 0, Math.PI]}>
        <lineSegments>
          <bufferGeometry>
            <bufferAttribute attach="attributes-position" args={[positions, 3]} />
            <bufferAttribute attach="attributes-color" args={[colors, 3]} />
          </bufferGeometry>
          <lineBasicMaterial
            ref={leftMatRef}
            color="#ffffff"
            vertexColors
            transparent
            opacity={0.8}
            blending={THREE.AdditiveBlending}
          />
        </lineSegments>
      </group>
      
    </group>
  );
}

export default function WaveScene() {
  return (
    <Canvas
      camera={{ position: [0, 0, 40], fov: 14 }}
      style={{
        position: "absolute",
        inset: 0,
      }}
    >
      <TangentSpheres />
    </Canvas>
  );
}