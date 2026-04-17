"use client";

import { Canvas } from "@react-three/fiber";

export default function TestScene() {
  return (
    <Canvas>
      <mesh>
        <boxGeometry />
        <meshBasicMaterial color="hotpink" />
      </mesh>
    </Canvas>
  );
}
