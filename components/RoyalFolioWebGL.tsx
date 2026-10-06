"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import * as THREE from "three";

interface RoyalFolioWebGLProps {
  isOpened: boolean;
  isAnimating: boolean;
  onUnseal: () => void;
  onExplosion?: (x: number, y: number) => void;
}

export default function RoyalFolioWebGL({
  isOpened,
  isAnimating,
  onUnseal,
}: RoyalFolioWebGLProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  // References to keep Three.js state across renders
  const sceneRef = useRef<THREE.Scene | null>(null);
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const leftFlapMeshRef = useRef<THREE.Mesh | null>(null);
  const rightFlapMeshRef = useRef<THREE.Mesh | null>(null);
  const sealMeshRef = useRef<THREE.Mesh | null>(null);
  const pointLightRef = useRef<THREE.PointLight | null>(null);
  const cardGroupRef = useRef<THREE.Group | null>(null);
  const shardsGroupRef = useRef<THREE.Group | null>(null);
  const leftFlapMatRef = useRef<THREE.ShaderMaterial | null>(null);
  const rightFlapMatRef = useRef<THREE.ShaderMaterial | null>(null);

  // Interaction coordinates
  const mouseRef = useRef({ x: 0, y: 0, targetX: 0, targetY: 0 });
  const openProgressRef = useRef(0);
  const animFrameRef = useRef<number>(0);
  const isUnsealingRef = useRef(false);

  // 3D Shards definition
  interface WaxShard3D {
    mesh: THREE.Mesh;
    vx: number;
    vy: number;
    vz: number;
    vrotX: number;
    vrotY: number;
    vrotZ: number;
    life: number;
    maxLife: number;
  }
  const shardsRef = useRef<WaxShard3D[]>([]);

  useEffect(() => {
    if (!containerRef.current || !canvasRef.current) return;

    const container = containerRef.current;
    const canvas = canvasRef.current;
    const width = container.clientWidth;
    const height = container.clientHeight;

    // 1. SCENE & CAMERA
    const scene = new THREE.Scene();
    sceneRef.current = scene;

    const camera = new THREE.PerspectiveCamera(40, width / height, 0.1, 100);
    camera.position.set(0, 0, 7.8);
    cameraRef.current = camera;

    // 2. RENDERER with WebGL2, antialias and alpha
    const renderer = new THREE.WebGLRenderer({
      canvas,
      antialias: true,
      alpha: true,
      powerPreference: "high-performance",
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.15;
    rendererRef.current = renderer;

    // 3. LIGHTING (Cinematic Warm Gold & Specular Tracking)
    const ambientLight = new THREE.AmbientLight(0xfff7ea, 1.2);
    scene.add(ambientLight);

    const dirLight = new THREE.DirectionalLight(0xfff1dc, 2.0);
    dirLight.position.set(3, 5, 6);
    dirLight.castShadow = true;
    dirLight.shadow.mapSize.width = 1024;
    dirLight.shadow.mapSize.height = 1024;
    scene.add(dirLight);

    const rimLight = new THREE.DirectionalLight(0xd4af37, 1.4);
    rimLight.position.set(-4, -3, 3);
    scene.add(rimLight);

    // Interactive point light tracking cursor
    const pointLight = new THREE.PointLight(0xffe8a3, 3.5, 9, 1.8);
    pointLight.position.set(0, 0, 2.5);
    scene.add(pointLight);
    pointLightRef.current = pointLight;

    // 4. MASTER CARD 3D GROUP
    const cardGroup = new THREE.Group();
    scene.add(cardGroup);
    cardGroupRef.current = cardGroup;

    // Card dimensions in 3D world units (aspect ~ 9 / 14.5)
    const cardW = 3.6;
    const cardH = 5.6;

    // Texture Loader
    const textureLoader = new THREE.TextureLoader();

    // Load textures with fallback handling
    const paperTexture = textureLoader.load(
      "/images/embossed-paper.webp",
      () => setIsLoaded(true),
      undefined,
      () => setIsLoaded(true)
    );
    paperTexture.wrapS = THREE.RepeatWrapping;
    paperTexture.wrapT = THREE.RepeatWrapping;

    const innerHeroTexture = textureLoader.load("/images/couple-hero.webp");
    innerHeroTexture.colorSpace = THREE.SRGBColorSpace;

    const sealTexture = textureLoader.load("/images/royal-wax-seal.webp");
    sealTexture.colorSpace = THREE.SRGBColorSpace;

    renderer.setClearColor(0x000000, 0);

    // 6. TRUE PAPER-BENDING VERTEX & FRAGMENT SHADERS
    // Organic paper curl along diagonal axis
    const paperVertexShader = `
      uniform float uProgress;
      uniform float uSide; // -1.0 for Left, +1.0 for Right
      uniform float uCurlAmount;
      varying vec2 vUv;
      varying vec3 vNormalVec;
      varying vec3 vViewPosition;

      void main() {
        vUv = uv;
        vec3 pos = position;

        // Progressive organic paper peel & bend
        // Tip lifts first, bending with parabolic curvature
        float distFromHinge = uSide < 0.0 ? uv.x : (1.0 - uv.x);
        float verticalCurve = 1.0 - abs(uv.y - 0.5) * 1.6;
        verticalCurve = max(0.0, verticalCurve);

        // Curl lifting outward along Z
        float curlLift = sin(distFromHinge * 3.14159 * 0.5) * uProgress * uCurlAmount * verticalCurve;
        pos.z += curlLift;

        // Flap rotation around outer vertical edge
        float hingeX = uSide < 0.0 ? -1.8 : 1.8;
        float angle = uProgress * 2.1 * -uSide; // ~120 deg rotation

        // Offset to hinge, rotate, offset back
        float rx = pos.x - hingeX;
        float newX = rx * cos(angle) - pos.z * sin(angle);
        float newZ = rx * sin(angle) + pos.z * cos(angle);
        pos.x = hingeX + newX;
        pos.z = newZ;

        vec4 mvPosition = modelViewMatrix * vec4(pos, 1.0);
        vViewPosition = -mvPosition.xyz;
        vNormalVec = normalize(normalMatrix * normal);
        gl_Position = projectionMatrix * mvPosition;
      }
    `;

    const paperFragmentShader = `
      uniform sampler2D tDiffuse;
      uniform vec3 uGoldTint;
      uniform vec3 uLightPos;
      uniform float uProgress;
      uniform float uSide;
      varying vec2 vUv;
      varying vec3 vNormalVec;
      varying vec3 vViewPosition;

      void main() {
        // Authentic Pinterest diagonal envelope gatefold cut
        // Leaves top V and bottom V open to reveal couple portrait underneath
        float relX = uSide < 0.0 ? vUv.x : (1.0 - vUv.x);
        float minY = relX * 0.46;
        float maxY = 1.0 - relX * 0.46;
        if (vUv.y < minY || vUv.y > maxY) {
          discard;
        }

        vec4 texColor = texture2D(tDiffuse, vUv * 1.8);
        
        // Luxury warm cotton rag paper base
        vec3 paperColor = mix(vec3(0.98, 0.96, 0.93), texColor.rgb, 0.55);

        // Gold specular glaze highlight from cursor light
        vec3 normal = normalize(vNormalVec);
        vec3 viewDir = normalize(vViewPosition);
        vec3 lightDir = normalize(uLightPos - vViewPosition);
        
        float diff = max(dot(normal, lightDir), 0.0);
        vec3 halfDir = normalize(lightDir + viewDir);
        float spec = pow(max(dot(normal, halfDir), 0.0), 32.0);

        vec3 goldSpecular = vec3(0.95, 0.82, 0.45) * spec * 0.9;
        vec3 finalColor = paperColor * (0.85 + diff * 0.35) + goldSpecular;

        // Smooth fade out when fully opened
        float alpha = 1.0 - smoothstep(0.85, 1.0, uProgress);
        gl_FragColor = vec4(finalColor, alpha);
      }
    `;

    // LEFT FLAP (Diagonal polygon coverage)
    const flapGeoLeft = new THREE.PlaneGeometry(cardW / 2, cardH, 42, 42);
    const flapMatLeft = new THREE.ShaderMaterial({
      vertexShader: paperVertexShader,
      fragmentShader: paperFragmentShader,
      uniforms: {
        uProgress: { value: 0 },
        uSide: { value: -1.0 },
        uCurlAmount: { value: 1.1 },
        tDiffuse: { value: paperTexture },
        uGoldTint: { value: new THREE.Color(0xd4af37) },
        uLightPos: { value: new THREE.Vector3(0, 0, 3) },
      },
      transparent: true,
      side: THREE.DoubleSide,
    });
    leftFlapMatRef.current = flapMatLeft;

    const leftFlapMesh = new THREE.Mesh(flapGeoLeft, flapMatLeft);
    leftFlapMesh.position.set(-cardW / 4, 0, 0.05);
    cardGroup.add(leftFlapMesh);
    leftFlapMeshRef.current = leftFlapMesh;

    // RIGHT FLAP
    const flapGeoRight = new THREE.PlaneGeometry(cardW / 2, cardH, 42, 42);
    const flapMatRight = new THREE.ShaderMaterial({
      vertexShader: paperVertexShader,
      fragmentShader: paperFragmentShader,
      uniforms: {
        uProgress: { value: 0 },
        uSide: { value: 1.0 },
        uCurlAmount: { value: 1.1 },
        tDiffuse: { value: paperTexture },
        uGoldTint: { value: new THREE.Color(0xd4af37) },
        uLightPos: { value: new THREE.Vector3(0, 0, 3) },
      },
      transparent: true,
      side: THREE.DoubleSide,
    });
    rightFlapMatRef.current = flapMatRight;

    const rightFlapMesh = new THREE.Mesh(flapGeoRight, flapMatRight);
    rightFlapMesh.position.set(cardW / 4, 0, 0.05);
    cardGroup.add(rightFlapMesh);
    rightFlapMeshRef.current = rightFlapMesh;

    // CREAM PEONY BLOSSOMS (Left & Right)
    const peonyTexture = textureLoader.load("/images/cream-peony.webp");
    peonyTexture.colorSpace = THREE.SRGBColorSpace;
    const peonyGeo = new THREE.PlaneGeometry(1.05, 1.05);
    const peonyMat = new THREE.MeshStandardMaterial({
      map: peonyTexture,
      transparent: true,
      roughness: 0.4,
    });
    const leftPeony = new THREE.Mesh(peonyGeo, peonyMat);
    leftPeony.position.set(-0.88, 0, 0.09);
    cardGroup.add(leftPeony);

    const rightPeonyMat = peonyMat.clone();
    const rightPeony = new THREE.Mesh(peonyGeo, rightPeonyMat);
    rightPeony.scale.x = -1;
    rightPeony.position.set(0.88, 0, 0.09);
    cardGroup.add(rightPeony);

    // 7. PHOTOREALISTIC 24K GOLD WAX SEAL MEDALLION
    const sealGeo = new THREE.PlaneGeometry(1.35, 1.35);
    const sealMat = new THREE.MeshStandardMaterial({
      map: sealTexture,
      transparent: true,
      alphaTest: 0.05,
      metalness: 0.96,
      roughness: 0.2,
    });
    const sealMesh = new THREE.Mesh(sealGeo, sealMat);
    sealMesh.position.set(0, 0, 0.14);
    cardGroup.add(sealMesh);
    sealMeshRef.current = sealMesh;

    // Gold braided cord across center
    const cordGeo = new THREE.CylinderGeometry(0.02, 0.02, cardW, 16);
    const cordMat = new THREE.MeshStandardMaterial({
      color: 0xd4af37,
      metalness: 0.95,
      roughness: 0.25,
    });
    const cordMesh = new THREE.Mesh(cordGeo, cordMat);
    cordMesh.rotation.z = Math.PI / 2;
    cordMesh.position.set(0, 0, 0.08);
    cardGroup.add(cordMesh);

    // 8. SHARDS GROUP (For 3D Shatter Physics)
    const shardsGroup = new THREE.Group();
    scene.add(shardsGroup);
    shardsGroupRef.current = shardsGroup;

    // 9. ANIMATION LOOP
    const animate = () => {
      animFrameRef.current = requestAnimationFrame(animate);

      // Smooth mouse interpolation (lerp)
      mouseRef.current.x += (mouseRef.current.targetX - mouseRef.current.x) * 0.08;
      mouseRef.current.y += (mouseRef.current.targetY - mouseRef.current.y) * 0.08;

      // 3D Card Orbit / Tilt
      if (!isUnsealingRef.current && cardGroupRef.current) {
        cardGroupRef.current.rotation.y = mouseRef.current.x * 0.22;
        cardGroupRef.current.rotation.x = -mouseRef.current.y * 0.18;
      }

      // Cursor Light Tracking
      if (pointLightRef.current) {
        pointLightRef.current.position.x = mouseRef.current.x * 3.5;
        pointLightRef.current.position.y = mouseRef.current.y * 3.5;
      }

      // Update Unseal Progress (Smooth cubic easing)
      if (isUnsealingRef.current && openProgressRef.current < 1.0) {
        openProgressRef.current = Math.min(1.0, openProgressRef.current + 0.018);

        if (leftFlapMatRef.current) {
          leftFlapMatRef.current.uniforms.uProgress.value = openProgressRef.current;
        }
        if (rightFlapMatRef.current) {
          rightFlapMatRef.current.uniforms.uProgress.value = openProgressRef.current;
        }

        // Dissolve seal mesh scale and fade
        if (sealMeshRef.current) {
          const s = Math.max(0, 1.0 - openProgressRef.current * 2.2);
          sealMeshRef.current.scale.set(s, s, s);
          sealMeshRef.current.position.z = 0.12 + openProgressRef.current * 0.5;
        }
      }

      // Update 3D Wax Shards Physics
      const activeShards = shardsRef.current;
      for (let i = activeShards.length - 1; i >= 0; i--) {
        const sh = activeShards[i];
        sh.mesh.position.x += sh.vx;
        sh.mesh.position.y += sh.vy;
        sh.mesh.position.z += sh.vz;
        sh.mesh.rotation.x += sh.vrotX;
        sh.mesh.rotation.y += sh.vrotY;
        sh.mesh.rotation.z += sh.vrotZ;
        sh.vy -= 0.015; // Gravity
        sh.vx *= 0.98; // Air drag
        sh.vz *= 0.98;
        sh.life++;

        const alpha = Math.max(0, 1 - sh.life / sh.maxLife);
        (sh.mesh.material as THREE.MeshStandardMaterial).opacity = alpha;

        if (sh.life >= sh.maxLife) {
          shardsGroup.remove(sh.mesh);
          sh.mesh.geometry.dispose();
          (sh.mesh.material as THREE.Material).dispose();
          activeShards.splice(i, 1);
        }
      }

      renderer.render(scene, camera);
    };

    animate();

    // 10. RESIZE HANDLER
    const handleResize = () => {
      if (!containerRef.current || !rendererRef.current || !cameraRef.current) return;
      const w = containerRef.current.clientWidth;
      const h = containerRef.current.clientHeight;
      cameraRef.current.aspect = w / h;
      cameraRef.current.updateProjectionMatrix();
      rendererRef.current.setSize(w, h);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      cancelAnimationFrame(animFrameRef.current);
      window.removeEventListener("resize", handleResize);
      renderer.dispose();
    };
  }, []);

  // Update on parent unseal trigger
  useEffect(() => {
    if (isOpened || isAnimating) {
      isUnsealingRef.current = true;
    }
  }, [isOpened, isAnimating]);

  // Trigger 3D Wax Shards Shatter Burst in Three.js
  const trigger3DShardBurst = useCallback(() => {
    if (!shardsGroupRef.current) return;
    const shardsGroup = shardsGroupRef.current;
    const colors = [0xfce38a, 0xd4af37, 0xb38018, 0xffe28a, 0x96671c];

    for (let i = 0; i < 48; i++) {
      const geo = new THREE.TetrahedronGeometry(Math.random() * 0.08 + 0.03, 0);
      const mat = new THREE.MeshStandardMaterial({
        color: colors[Math.floor(Math.random() * colors.length)],
        metalness: 0.94,
        roughness: 0.25,
        transparent: true,
        opacity: 1,
      });
      const shardMesh = new THREE.Mesh(geo, mat);
      shardMesh.position.set(
        (Math.random() - 0.5) * 0.4,
        (Math.random() - 0.5) * 0.4,
        0.18
      );

      const angle = (Math.PI * 2 * i) / 48 + (Math.random() - 0.5) * 0.5;
      const speed = 0.08 + Math.random() * 0.12;

      const shard: WaxShard3D = {
        mesh: shardMesh,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed + 0.04,
        vz: (Math.random() - 0.2) * 0.12,
        vrotX: (Math.random() - 0.5) * 0.3,
        vrotY: (Math.random() - 0.5) * 0.3,
        vrotZ: (Math.random() - 0.5) * 0.3,
        life: 0,
        maxLife: Math.floor(Math.random() * 35 + 45),
      };

      shardsGroup.add(shardMesh);
      shardsRef.current.push(shard);
    }
  }, []);

  // Mouse Move Handler
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (isOpened || isAnimating) return;
    const rect = containerRef.current?.getBoundingClientRect();
    if (!rect) return;
    const normX = (e.clientX - rect.left) / rect.width - 0.5;
    const normY = (e.clientY - rect.top) / rect.height - 0.5;
    mouseRef.current.targetX = normX;
    mouseRef.current.targetY = normY;
  };

  const handleMouseLeave = () => {
    mouseRef.current.targetX = 0;
    mouseRef.current.targetY = 0;
    setIsHovered(false);
  };

  const handleSealClick = () => {
    if (isOpened || isAnimating) return;
    trigger3DShardBurst();
    onUnseal();
  };

  return (
    <div
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={handleMouseLeave}
      onClick={handleSealClick}
      className="relative w-full h-full cursor-pointer select-none"
      style={{ touchAction: "none" }}
    >
      <canvas ref={canvasRef} className="w-full h-full block" />

      {/* Interactive Helper Badge */}
      {!isOpened && !isAnimating && (
        <div
          className={`absolute bottom-6 left-1/2 -translate-x-1/2 pointer-events-none transition-all duration-300 ${
            isHovered ? "opacity-100 scale-105" : "opacity-80 scale-100"
          }`}
        >
          <span className="inline-flex items-center gap-2 rounded-full border border-amber-400/50 bg-[#FFFDF9]/95 px-5 py-2 font-body text-xs font-semibold uppercase tracking-widest2 text-amber-950 shadow-lg backdrop-blur-md">
            <span className="text-amber-600">✦</span>
            <span>Click 3D Gold Seal to Unseal</span>
            <span className="text-amber-600">✦</span>
          </span>
        </div>
      )}
    </div>
  );
}
