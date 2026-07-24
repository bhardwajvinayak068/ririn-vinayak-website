"use client";

import { useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

const PETAL_COLORS = ["#EFC3CF", "#F6D7DF", "#E3A9B8", "#F8E3E9"];

export function Blossom({
  position,
  scale = 1,
  color,
  speed = 1,
}: {
  position: [number, number, number];
  scale?: number;
  color?: string;
  speed?: number;
}) {
  const group = useRef<THREE.Group>(null);
  const petalColor = useMemo(
    () => color ?? PETAL_COLORS[Math.floor(Math.random() * PETAL_COLORS.length)],
    [color]
  );
  const petalCount = 5;
  const angles = useMemo(
    () => Array.from({ length: petalCount }, (_, i) => (i / petalCount) * Math.PI * 2),
    []
  );
  const floatOffset = useMemo(() => Math.random() * Math.PI * 2, []);
  const rotSpeed = useMemo(() => (0.05 + Math.random() * 0.08) * speed, [speed]);

  useFrame((state) => {
    if (!group.current) return;
    const t = state.clock.getElapsedTime();
    group.current.rotation.z = t * rotSpeed;
    group.current.rotation.x = 0.35 + Math.sin(t * 0.2 + floatOffset) * 0.08;
    group.current.position.y = position[1] + Math.sin(t * 0.4 + floatOffset) * 0.18;
    group.current.position.x = position[0] + Math.cos(t * 0.3 + floatOffset) * 0.12;
  });

  return (
    <group ref={group} position={position} scale={scale} rotation={[0.35, 0, 0]}>
      {angles.map((angle, i) => (
        <group key={i} rotation={[0, 0, angle]}>
          <group position={[0, 0.19, 0]} rotation={[0.5, 0, 0]}>
            <mesh scale={[0.62, 1.35, 0.3]}>
              <sphereGeometry args={[0.17, 14, 10]} />
              <meshStandardMaterial
                color={petalColor}
                roughness={0.45}
                metalness={0.08}
                emissive={petalColor}
                emissiveIntensity={0.12}
                side={THREE.DoubleSide}
              />
            </mesh>
          </group>
        </group>
      ))}
      <mesh>
        <sphereGeometry args={[0.13, 16, 16]} />
        <meshStandardMaterial
          color="#C98A94"
          roughness={0.35}
          metalness={0.2}
          emissive="#B76E79"
          emissiveIntensity={0.15}
        />
      </mesh>
    </group>
  );
}
