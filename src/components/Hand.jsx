import React, { useState, useEffect } from "react";
import { createPortal } from "react-dom";

import useServer from "../helpers/useServer.js";
import { useGame } from "../state.js";
import { Card } from "./Pieces.js";

const { pow } = Math;
const passive = { passive: true };

const Hand = () => {
  const cards = useGame((state) => state.cards);
  const activeCard = useGame((state) => state.activeCard);
  const count = cards.length;

  return (
    <div className="hand" style={{ "--count": count }}>
      {cards.map((card, index) => (
        <div
          className="card-in-hand"
          style={{ "--offset": -((index / (count - 1)) * 2 - 1) * 50 - 50 + "%" }}
          key={card.id}
        >
          <HandCard card={card} active={activeCard === card} />
        </div>
      ))}
    </div>
  );
};

const HandCard = ({ card, active = false }) => {
  const grabCard = useGame((state) => state.grabCard);
  const dropCard = useGame((state) => state.dropCard);

  const handlePointerUp = () => {
    dropCard(card);
  };

  const handlePointerDown = () => {
    grabCard(card);
  };

  useEffect(() => {
    if (active) {
      document.addEventListener("pointerup", handlePointerUp, passive);
      document.addEventListener("pointercancel", handlePointerUp, passive);

      return () => {
        document.removeEventListener("pointerup", handlePointerUp);
        document.removeEventListener("pointercancel", handlePointerUp);
      };
    }
  });

  return (
    <button
      type="button"
      className={`card-in-hand ${active ? "active" : ""}`}
      onPointerDown={handlePointerDown}
    >
      <Card card={card} />

      {active && (
        <PointerFollower>
          <Card card={card} active />
        </PointerFollower>
      )}
    </button>
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
