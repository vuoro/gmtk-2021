import React, { useEffect } from "react";

import { useGame } from "../state.js";
import { Card } from "./Pieces.js";
import PointerFollower from "./PointerFollower.js";

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

export default Hand;
