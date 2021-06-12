import { useEffect } from "react";
import { createPortal } from "react-dom";

const passive = { passive: true };
const lastPointerEvent = {};

if (!import.meta.env.SSR) {
  const handleLastPointer = (event) => {
    lastPointerEvent.clientX = event.clientX;
    lastPointerEvent.clientY = event.clientY;
  };
  document.addEventListener("pointerdown", handleLastPointer, passive);
  document.addEventListener("pointermove", handleLastPointer, passive);
  document.addEventListener("pointerup", handleLastPointer, passive);
}

const PointerFollower = ({ children, startCentered = false }) => {
  const container = document.getElementById("pointer-follower");
  const content = document.getElementById("pointer-follower-content");

  useEffect(() => {
    let isFirstEvent = true;
    // let lastOffsetX = 0;
    // let lastOffsetY = -100;

    const handlePointer = ({ clientX: x, clientY: y }) => {
      const xRatio = x / window.innerWidth;
      const yRatio = y / window.innerHeight;
      const offsetX = isFirstEvent && startCentered ? -50 : xRatio < 0.5 ? 0 : -100;
      const offsetY =
        isFirstEvent && startCentered ? -50 : yRatio < 0.25 ? 0 : yRatio > 0.75 ? -100 : -50;

      // if (!isFirstEvent) {
      // lastOffsetX = offsetX;
      // lastOffsetY = offsetY;
      // }

      container.style.setProperty("transform", `translate(${x}px, ${y}px)`);
      content.style.setProperty("transform", `translate(${offsetX}%, ${offsetY}%)`);

      isFirstEvent = false;
    };

    handlePointer(lastPointerEvent);

    document.addEventListener("pointermove", handlePointer, passive);

    return () => {
      document.removeEventListener("pointermove", handlePointer);
      container.style.removeProperty("transform");
      content.style.removeProperty("transform");
    };
  });

  return createPortal(children, content);
};

export default PointerFollower;
