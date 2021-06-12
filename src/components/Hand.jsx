import React, { useState, useEffect } from "react";
import { createPortal } from "react-dom";

import useServer from "../helpers/useServer.js";
// import {} from "../state.js";

const { pow } = Math;
const passive = { passive: true };

const Hand = () => {
  const count = 8;
  const cards = [...Array(count)].map((v, index) => ({ id: index }));

  return (
    <div className="hand" style={{ "--count": count }}>
      {cards.map((card, index) => (
        <div
          className="card-in-hand"
          style={{ "--offset": -((index / (count - 1)) * 2 - 1) * 50 - 50 + "%" }}
          key={card.id}
        >
          <Card card={card} />
        </div>
      ))}
    </div>
  );
};

const Card = ({ card }) => {
  const { id } = card;
  const [activated, setActivated] = useState(false);

  const handlePointerUp = () => {
    setActivated(false);
  };

  const handlePointerDown = () => {
    setActivated(true);
    document.addEventListener("pointerup", handlePointerUp, passive);
    document.addEventListener("pointercancel", handlePointerUp, passive);

    return () => {
      document.removeEventListener("pointerup", handlePointerUp);
      document.removeEventListener("pointercancel", handlePointerUp);
    };
  };

  return (
    <>
      <button
        type="button"
        className={`card ${activated ? "activated" : "not-activated"}`}
        onPointerDown={handlePointerDown}
      >
        Card {id}
      </button>

      {activated && (
        <PointerFollower>
          <Card card={card} />
        </PointerFollower>
      )}
    </>
  );
};

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

const PointerFollower = ({ children }) => {
  const container = document.getElementById("pointer-follower");
  const content = document.getElementById("pointer-follower-content");

  useEffect(() => {
    let isFirstEvent = true;
    let lastOffsetX = 0;
    let lastOffsetY = -100;

    const handlePointer = ({ clientX: x, clientY: y }) => {
      const xRatio = x / window.innerWidth;
      const yRatio = y / window.innerHeight;
      const offsetX = isFirstEvent ? -50 : xRatio < 0.333 ? 0 : xRatio > 0.666 ? -100 : lastOffsetX;
      const offsetY = isFirstEvent ? -50 : yRatio < 0.333 ? 0 : yRatio > 0.666 ? -100 : lastOffsetY;

      if (!isFirstEvent) {
        lastOffsetX = offsetX;
        lastOffsetY = offsetY;
      }

      container.style.setProperty("transform", `translate(${x}px, ${y}px)`);
      content.style.setProperty("transform", `translate(${offsetX}%, ${offsetY}%) scale(${0.618})`);

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

export default Hand;
