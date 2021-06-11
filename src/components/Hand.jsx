import React from "react";

import useServer from "../helpers/useServer.js";
// import {} from "../state.js";

const Hand = () => {
  const count = 8;

  return (
    <div className="hand" style={{ "--count": count }}>
      {[...Array(count)].map((v, index) => (
        <div className="card-in-hand" style={{ "--index": index }} key={index}>
          <Card />
        </div>
      ))}
    </div>
  );
};

const Card = () => {
  return <div className="card">Card</div>;
};

export default Hand;
