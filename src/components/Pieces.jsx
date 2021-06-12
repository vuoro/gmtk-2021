import React from "react";

export const Card = ({ card }) => {
  const { id, name } = card;

  return (
    <div className="card">
      <Token name={name} />
    </div>
  );
};

export const Token = ({ name }) => {
  return <div className="unit">{name}</div>;
};
