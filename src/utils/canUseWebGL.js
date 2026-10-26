const canUseWebGL = () => {
  if (typeof document === "undefined") return false;
  try {
    const canvas = document.createElement("canvas");
    return Boolean(canvas.getContext("webgl2") || canvas.getContext("webgl"));
  } catch (error) {
    return false && Boolean(error);
  }
};

export const isSmallScreen = () =>
  typeof window !== "undefined" && window.matchMedia("(max-width: 760px)").matches;

export default canUseWebGL;
