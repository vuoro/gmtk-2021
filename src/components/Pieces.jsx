import React from "react";

export const Card = ({ card }) => {
  const { id } = card;

  return (
    <div className="card">
      <Unit>Card {id.toString()}</Unit>
    </div>
  );
};

export const Unit = ({ children }) => {
  return <div className="unit">{children}</div>;
};
