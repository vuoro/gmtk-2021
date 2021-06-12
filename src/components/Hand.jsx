import React from "react";

import useServer from "../helpers/useServer.js";
// import {} from "../state.js";

const Hand = () => {
  const count = 8;

  return (
    <div className="hand" style={{ "--count": count }}>
      {[...Array(count)].map((v, index) => (
        <div
          className="card-in-hand"
          style={{ "--offset": -((index / (count - 1)) * 2 - 1) * 50 - 50 + "%" }}
          key={index}
        >
          <Card />
        </div>
      ))}
    </div>
  );
};

const Card = () => {
  return (
    <button type="button" className="card">
      Card
    </button>
  );
};

export default Hand;
