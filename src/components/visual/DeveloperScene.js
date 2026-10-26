import { useEffect, useMemo, useRef } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";

const ACCENT = "#2ddcb8";
const INK = "#0b0b0c";
const PANEL = "#131316";
const STEEL = "#d4d4d8";
const HOOD = "#1a1d22";
const SKIN = "#d7c4b0";

const LINES = [
  "const page = () => {",
  "  return (",
  "    <main>",
  "      <Nav />",
  "      <Hero />",
  "      <Work />",
  "    </main>",
  "  );",
  "};",
];

const paintScreen = (ctx, time) => {
  const t = time % 14;
  ctx.clearRect(0, 0, 512, 320);
  ctx.fillStyle = INK;
  ctx.fillRect(0, 0, 512, 320);

  if (t < 6.5) {
    ctx.font = "18px monospace";
    ctx.fillStyle = ACCENT;
    let left = Math.floor((t / 6.5) * 96);
    LINES.forEach((line, index) => {
      const shown = line.slice(0, Math.max(0, left));
      left -= line.length + 1;
      ctx.fillText(shown, 28, 40 + index * 30);
    });
    return "code";
  }

  if (t < 7.05) {
    ctx.fillStyle = "rgba(242,242,244,0.9)";
    ctx.fillRect(0, 0, 512, 320);
    return "flash";
  }

  const progress = Math.min(1, (t - 7.05) / 4);
  ctx.fillStyle = PANEL;
  ctx.fillRect(18, 16, 476, 34);
  ctx.fillStyle = ACCENT;
  ctx.fillRect(30, 27, 54, 12);
  if (progress > 0.22) {
    ctx.fillStyle = "#f2f2f4";
    ctx.font = "700 32px sans-serif";
    ctx.fillText("OSAMA KHAN", 30, 104);
  }
  if (progress > 0.48) {
    ctx.fillStyle = "#1c1f24";
    ctx.fillRect(30, 140, 136, 86);
    ctx.fillRect(188, 140, 136, 86);
    ctx.fillRect(346, 140, 136, 86);
  }
  if (progress > 0.72) {
    ctx.fillStyle = ACCENT;
    ctx.fillRect(30, 252, 118, 34);
  }
  return t > 11.2 ? "deployed" : "site";
};

function Arm({ side, armRef }) {
  const sign = side === "left" ? -1 : 1;
  return (
    <group ref={armRef} position={[sign * 0.34, 0.42, 0.08]}>
      <mesh position={[sign * 0.12, -0.16, 0.08]} rotation={[0.9, 0, sign * 0.3]}>
        <capsuleGeometry args={[0.07, 0.28, 4, 8]} />
        <meshStandardMaterial color={HOOD} roughness={0.72} />
      </mesh>
      <mesh position={[sign * 0.22, -0.42, 0.28]}>
        <boxGeometry args={[0.16, 0.08, 0.18]} />
        <meshStandardMaterial color={SKIN} roughness={0.55} />
      </mesh>
    </group>
  );
}

function Character({ refs }) {
  const blink = useRef(1);
  useFrame(({ clock }) => {
    const t = clock.elapsedTime;
    const cycle = t % 14;
    const typing = cycle < 6.5 ? 1 : 0.2;
    const lean = cycle > 11.2 ? 0.35 : 0;
    if (refs.left.current) refs.left.current.rotation.x = Math.sin(t * 16) * 0.22 * typing;
    if (refs.right.current) refs.right.current.rotation.x = Math.sin(t * 16 + 1.1) * 0.22 * typing;
    if (refs.head.current) refs.head.current.rotation.x = Math.sin(t * 1.3) * 0.05 - lean * 0.15;
    if (refs.body.current) {
      refs.body.current.rotation.y = Math.sin(t * 0.45) * 0.06;
      refs.body.current.rotation.x = -lean * 0.18;
    }
    blink.current = Math.sin(t * 1.7) > 0.97 ? 0.02 : 1;
    if (refs.eyes.current) refs.eyes.current.scale.y = blink.current;
  });

  return (
    <group ref={refs.body} position={[-0.72, 0.58, 0.18]}>
      <mesh position={[0, 0.28, 0]}>
        <boxGeometry args={[0.62, 0.58, 0.34]} />
        <meshStandardMaterial color={HOOD} roughness={0.78} />
      </mesh>
      <mesh position={[0, 0.72, 0.02]} ref={refs.head}>
        <sphereGeometry args={[0.24, 18, 14]} />
        <meshStandardMaterial color={SKIN} roughness={0.5} />
        <mesh position={[0, 0.08, 0]} scale={[1.05, 0.72, 1.05]}>
          <sphereGeometry args={[0.25, 16, 12]} />
          <meshStandardMaterial color={HOOD} roughness={0.8} />
        </mesh>
        <mesh ref={refs.eyes} position={[0.1, -0.02, 0.2]}>
          <boxGeometry args={[0.14, 0.035, 0.02]} />
          <meshStandardMaterial color={INK} />
        </mesh>
        <mesh rotation={[Math.PI / 2, 0, 0]} position={[0, 0.02, 0]}>
          <torusGeometry args={[0.27, 0.035, 8, 18]} />
          <meshStandardMaterial color="#2a2e33" metalness={0.6} roughness={0.35} />
        </mesh>
      </mesh>
      <Arm side="left" armRef={refs.left} />
      <Arm side="right" armRef={refs.right} />
    </group>
  );
}

const DeveloperScene = ({ onHover, onOpen }) => {
  const floatRef = useRef(null);
  const badgeRef = useRef(null);
  const lampRef = useRef(null);
  const plantRef = useRef(null);
  const steam = useRef([]);
  const dust = useRef(null);
  const body = useRef(null);
  const head = useRef(null);
  const left = useRef(null);
  const right = useRef(null);
  const eyes = useRef(null);
  const pointer = useRef({ x: 0, y: 0 });
  const { camera } = useThree();

  const labels = useMemo(() => ["{ }", "</>", "React", "Node"].map((text) => {
    const canvas = document.createElement("canvas");
    canvas.width = 256;
    canvas.height = 128;
    const ctx = canvas.getContext("2d");
    ctx.fillStyle = INK;
    ctx.fillRect(0, 0, 256, 128);
    ctx.strokeStyle = ACCENT;
    ctx.lineWidth = 8;
    ctx.strokeRect(10, 10, 236, 108);
    ctx.fillStyle = "#f2f2f4";
    ctx.font = "700 48px sans-serif";
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.fillText(text, 128, 68);
    const map = new THREE.CanvasTexture(canvas);
    map.colorSpace = THREE.SRGBColorSpace;
    return { text, map };
  }), []);

  const texture = useMemo(() => {
    const canvas = document.createElement("canvas");
    canvas.width = 512;
    canvas.height = 320;
    const map = new THREE.CanvasTexture(canvas);
    map.colorSpace = THREE.SRGBColorSpace;
    map.anisotropy = 4;
    return map;
  }, []);

  const dustGeo = useMemo(() => {
    const positions = new Float32Array(48 * 3);
    for (let i = 0; i < 48; i += 1) {
      positions[i * 3] = (Math.random() - 0.5) * 3.2;
      positions[i * 3 + 1] = Math.random() * 2.2;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 1.6;
    }
    const geo = new THREE.BufferGeometry();
    geo.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    return geo;
  }, []);

  useEffect(() => {
    const onMove = (event) => {
      pointer.current.x = event.clientX / window.innerWidth - 0.5;
      pointer.current.y = event.clientY / window.innerHeight - 0.5;
    };
    window.addEventListener("pointermove", onMove);
    return () => {
      window.removeEventListener("pointermove", onMove);
      texture.dispose();
      dustGeo.dispose();
      labels.forEach((label) => label.map.dispose());
    };
  }, [texture, dustGeo, labels]);

  useFrame(({ clock }) => {
    const t = clock.elapsedTime;
    const phase = paintScreen(texture.image.getContext("2d"), t);
    texture.needsUpdate = true;
    const scroll = Math.min(1, window.scrollY / Math.max(window.innerHeight, 1));
    const aim = pointer.current;
    camera.position.x = 0.35 + aim.x * 0.28 + scroll * 0.55;
    camera.position.y = 1.45 + aim.y * -0.1;
    camera.position.z = 7.2 - scroll * 0.5;
    camera.lookAt(0.35, 1.35, 0);

    if (floatRef.current) {
      floatRef.current.rotation.y = t * 0.25;
      floatRef.current.position.y = 1.55 + Math.sin(t * 1.2) * 0.06;
    }
    if (badgeRef.current) {
      const show = phase === "deployed";
      const next = show ? 1 : 0;
      badgeRef.current.scale.setScalar(THREE.MathUtils.lerp(badgeRef.current.scale.x, next, 0.12));
      badgeRef.current.position.y = 1.72 + Math.sin(t * 3) * 0.03;
    }
    if (lampRef.current) lampRef.current.intensity = 1.6 + Math.sin(t * 9) * 0.08;
    if (plantRef.current) plantRef.current.rotation.z = Math.sin(t * 1.4) * 0.06;
    if (head.current) head.current.rotation.y = aim.x * 0.4;
    steam.current.forEach((bit, index) => {
      if (!bit) return;
      const rise = (t * 0.35 + index * 0.18) % 0.7;
      bit.position.y = 0.22 + rise;
      bit.scale.setScalar(0.04 + rise * 0.08);
      bit.material.opacity = 0.35 * (1 - rise / 0.7);
    });
    if (dust.current) {
      const positions = dust.current.geometry.attributes.position;
      for (let i = 0; i < positions.count; i += 1) {
        let y = positions.getY(i) + 0.002;
        if (y > 2.2) y = 0.2;
        positions.setY(i, y);
      }
      positions.needsUpdate = true;
    }
  });

  const refs = { body, head, left, right, eyes };

  return (
    <group position={[0.45, 0.95, 0]} scale={0.8}>
      <ambientLight intensity={0.35} />
      <directionalLight position={[3, 4, 3]} intensity={1.5} color="#f2f2f4" />
      <pointLight ref={lampRef} position={[-1.3, 1.6, 0.4]} intensity={1.6} color={ACCENT} distance={5} />
      <pointLight position={[1.4, 1.2, 1]} intensity={2.2} color={ACCENT} distance={4} />

      <mesh position={[0, 0.02, 0]} receiveShadow>
        <boxGeometry args={[3.1, 0.08, 1.5]} />
        <meshStandardMaterial color="#1a1c20" roughness={0.55} metalness={0.35} />
      </mesh>
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.065, 0]}>
        <circleGeometry args={[1.5, 24]} />
        <meshBasicMaterial color="#000" transparent opacity={0.28} />
      </mesh>

      <group position={[0.55, 0.52, -0.18]} rotation={[0, -0.45, 0]}>
        <mesh position={[0, -0.28, 0]}>
          <boxGeometry args={[0.08, 0.42, 0.08]} />
          <meshStandardMaterial color="#2a2e33" metalness={0.7} roughness={0.3} />
        </mesh>
        <mesh position={[0, 0.08, 0]}>
          <boxGeometry args={[1.28, 0.78, 0.06]} />
          <meshStandardMaterial color="#101114" metalness={0.45} roughness={0.4} />
        </mesh>
        <mesh
          position={[0, 0.08, 0.04]}
          onClick={(event) => {
            event.stopPropagation();
            onOpen();
          }}
          onPointerOver={(event) => {
            event.stopPropagation();
            onHover(true);
          }}
          onPointerOut={() => onHover(false)}
        >
          <planeGeometry args={[1.12, 0.64]} />
          <meshBasicMaterial map={texture} toneMapped={false} />
        </mesh>
      </group>

      <mesh position={[-0.15, 0.1, 0.28]}>
        <boxGeometry args={[0.55, 0.03, 0.2]} />
        <meshStandardMaterial color="#22262c" />
      </mesh>
      <mesh position={[0.15, 0.12, 0.42]}>
        <boxGeometry args={[0.46, 0.28, 0.32]} />
        <meshStandardMaterial color="#16181d" metalness={0.3} roughness={0.5} />
      </mesh>

      <group position={[1.15, 0.1, 0.2]}>
        <mesh>
          <cylinderGeometry args={[0.09, 0.07, 0.16, 12]} />
          <meshStandardMaterial color={STEEL} metalness={0.7} roughness={0.25} />
        </mesh>
        {Array.from({ length: 4 }, (_, index) => (
          <mesh
            key={index}
            ref={(node) => {
              steam.current[index] = node;
            }}
            position={[0, 0.2, 0]}
          >
            <sphereGeometry args={[0.04, 8, 8]} />
            <meshBasicMaterial color="#f2f2f4" transparent opacity={0.3} depthWrite={false} />
          </mesh>
        ))}
      </group>

      <group ref={plantRef} position={[-1.25, 0.16, -0.2]}>
        <mesh>
          <cylinderGeometry args={[0.08, 0.1, 0.16, 8]} />
          <meshStandardMaterial color="#2a2e33" />
        </mesh>
        <mesh position={[0, 0.22, 0]}>
          <coneGeometry args={[0.14, 0.28, 7]} />
          <meshStandardMaterial color="#147a62" />
        </mesh>
      </group>

      <mesh position={[-1.35, 0.7, -0.15]}>
        <cylinderGeometry args={[0.02, 0.04, 0.7, 8]} />
        <meshStandardMaterial color="#2a2e33" metalness={0.8} roughness={0.3} />
      </mesh>

      <Character refs={refs} />

      <group ref={floatRef} position={[0.2, 1.55, 0.2]}>
        {labels.map((label, index) => {
          const angle = (index / labels.length) * Math.PI * 2;
          return (
            <mesh key={label.text} position={[Math.cos(angle) * 0.9, Math.sin(index) * 0.1, Math.sin(angle) * 0.4]}>
              <planeGeometry args={[0.42, 0.21]} />
              <meshBasicMaterial map={label.map} transparent />
            </mesh>
          );
        })}
      </group>

      <mesh ref={badgeRef} position={[0.55, 1.72, -0.05]} scale={0}>
        <boxGeometry args={[0.7, 0.22, 0.04]} />
        <meshStandardMaterial color={ACCENT} emissive={ACCENT} emissiveIntensity={0.4} />
      </mesh>

      <points ref={dust} geometry={dustGeo}>
        <pointsMaterial color={ACCENT} size={0.025} transparent opacity={0.65} depthWrite={false} />
      </points>
    </group>
  );
};

export default DeveloperScene;
