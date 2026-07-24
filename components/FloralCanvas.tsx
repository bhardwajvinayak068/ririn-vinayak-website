"use client";

import { useMemo, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { Blossom } from "./floral/Blossom";

function FloralField() {
  const group = useRef<THREE.Group>(null);

  const blossoms = useMemo(
    () =>
      Array.from({ length: 16 }, () => ({
        position: [
          (Math.random() - 0.5) * 10,
          (Math.random() - 0.5) * 30,
          (Math.random() - 0.5) * 4 - 2,
        ] as [number, number, number],
        scale: 0.4 + Math.random() * 0.9,
        speed: 0.6 + Math.random() * 0.8,
      })),
    []
  );

  useFrame((state) => {
    if (!group.current) return;
    const scrollY = window.scrollY || 0;
    const targetY = scrollY * 0.0035;
    group.current.position.y = THREE.MathUtils.lerp(group.current.position.y, targetY, 0.06);

    const targetRotY = state.pointer.x * 0.15;
    const targetRotX = -state.pointer.y * 0.08;
    group.current.rotation.y = THREE.MathUtils.lerp(group.current.rotation.y, targetRotY, 0.04);
    group.current.rotation.x = THREE.MathUtils.lerp(group.current.rotation.x, targetRotX, 0.04);
  });

  return (
    <group ref={group}>
      {blossoms.map((b, i) => (
        <Blossom key={i} position={b.position} scale={b.scale} speed={b.speed} />
      ))}
    </group>
  );
}

export default function FloralCanvas() {
  return (
    <div className="pointer-events-none fixed inset-0 z-0" aria-hidden="true">
      <Canvas
        dpr={[1, 1.5]}
        camera={{ position: [0, 0, 6], fov: 45 }}
        gl={{ alpha: true, antialias: true }}
      >
        <ambientLight intensity={0.9} color="#FFFDF9" />
        <directionalLight position={[3, 4, 5]} intensity={0.6} color="#F8E8EE" />
        <directionalLight position={[-4, -2, -3]} intensity={0.3} color="#E8C5CE" />
        <FloralField />
      </Canvas>
    </div>
  );
}
