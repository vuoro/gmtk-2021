import React from "react";

import useServer from "../helpers/useServer.js";
import {
  flatHexesInRectangle,
  flatToPixel,
  flatDistance,
  pointyDistance,
} from "../helpers/hexes.js";
// import {  } from "../state.js";

const Board = () => {
  const isServer = useServer();

  const width = 7;
  const height = 35;

  const tiles = flatHexesInRectangle(
    [Math.floor(width / 2), Math.floor(height / 2) - 2],
    width,
    height
  ).map((hex) => {
    const [x, y] = hex;
    const [px, py] = flatToPixel(hex);
    return { x, y, px, py };
  });

  return (
    <div
      className="board"
      style={{ "--width": width * pointyDistance, "--height": (height + 0) * flatDistance }}
    >
      {tiles.map(({ x, y, px, py }) => (
        <div key={`${x},${y}`} className="tile" style={{ "--px": px, "--py": py }}>
          {x},{y}
        </div>
      ))}
    </div>
  );
};

export default Board;
