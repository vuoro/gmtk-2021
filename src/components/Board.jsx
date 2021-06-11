import React from "react";

import useServer from "../helpers/useServer.js";
// import {  } from "../state.js";

const Board = () => {
  const isServer = useServer();

  const width = 5;
  const height = 21;
  const tiles = [];

  for (let x = 0; x < width; x++) {
    for (let y = 0; y < height; y++) {
      tiles.push({ x, y });
    }
  }

  return (
    <div className="board" style={{ "--width": width, "--height": height }}>
      {tiles.map(({ x, y }) => (
        <div key={`${x},${y}`} className="tile">
          {x},{y}
        </div>
      ))}
    </div>
  );
};

export default Board;
