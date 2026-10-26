import { useState } from "react";
import { Canvas } from "@react-three/fiber";
import DeveloperScene from "./DeveloperScene";

const openWork = () => {
  const target = document.getElementById("work");
  if (target) target.scrollIntoView({ behavior: "smooth" });
};

const HeroCanvas = ({ active }) => {
  const [tip, setTip] = useState(false);

  return (
    <>
      <Canvas
        frameloop={active ? "always" : "never"}
        dpr={[1, 1.5]}
        camera={{ position: [0.35, 1.45, 7.2], fov: 34 }}
        gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
      >
        <DeveloperScene onHover={setTip} onOpen={openWork} />
      </Canvas>
      {tip && (
        <button type="button" className="hero-tip" onClick={openWork}>
          View my projects →
        </button>
      )}
    </>
  );
};

export default HeroCanvas;
