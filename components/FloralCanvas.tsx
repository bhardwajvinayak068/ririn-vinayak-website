"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { Blossom } from "./floral/Blossom";

function FloralField({ reducedMotion }: { reducedMotion: boolean }) {
  const group = useRef<THREE.Group>(null);
  const prevScrollY = useRef(0);
  const scrollVelocity = useRef(0);

  const blossoms = useMemo(
    () =>
      Array.from({ length: 14 }, () => ({
        position: [
          (Math.random() - 0.5) * 10,
          (Math.random() - 0.5) * 26,
          (Math.random() - 0.5) * 4 - 2,
        ] as [number, number, number],
        scale: 0.45 + Math.random() * 0.85,
        speed: 0.5 + Math.random() * 0.7,
      })),
    []
  );

  useFrame((state) => {
    if (!group.current || reducedMotion) return;
    const scrollY = typeof window !== "undefined" ? window.scrollY : 0;
    const deltaY = scrollY - prevScrollY.current;
    prevScrollY.current = scrollY;
    scrollVelocity.current = THREE.MathUtils.lerp(scrollVelocity.current, deltaY, 0.1);

    const targetY = scrollY * 0.0035;
    group.current.position.y = THREE.MathUtils.lerp(group.current.position.y, targetY, 0.05);

    // Interactive wind gust on fast scrolling + pointer reaction
    const windTilt = scrollVelocity.current * 0.002;
    const targetRotY = state.pointer.x * 0.14 + windTilt * 0.5;
    const targetRotX = -state.pointer.y * 0.08 + Math.abs(windTilt) * 0.2;
    group.current.rotation.y = THREE.MathUtils.lerp(group.current.rotation.y, targetRotY, 0.04);
    group.current.rotation.x = THREE.MathUtils.lerp(group.current.rotation.x, targetRotX, 0.04);
  });

  return (
    <group ref={group}>
      {blossoms.map((b, i) => (
        <Blossom key={i} position={b.position} scale={b.scale} speed={reducedMotion ? 0 : b.speed} />
      ))}
    </group>
  );
}

export default function FloralCanvas() {
  const [reducedMotion, setReducedMotion] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReducedMotion(mq.matches);
    const handler = (e: MediaQueryListEvent) => setReducedMotion(e.matches);
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, []);

  return (
    <div className="pointer-events-none fixed inset-0 z-0" aria-hidden="true">
      <Canvas
        dpr={[1, 1.5]}
        camera={{ position: [0, 0, 6], fov: 45 }}
        gl={{ alpha: true, antialias: true, powerPreference: "high-performance" }}
      >
        <ambientLight intensity={0.9} color="#FFFDF9" />
        <directionalLight position={[3, 4, 5]} intensity={0.6} color="#F8E8EE" />
        <directionalLight position={[-4, -2, -3]} intensity={0.3} color="#E8C5CE" />
        <FloralField reducedMotion={reducedMotion} />
      </Canvas>
    </div>
  );
}
