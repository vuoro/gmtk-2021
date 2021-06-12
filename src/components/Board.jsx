import React from "react";

import useServer from "../helpers/useServer.js";
import {
  flatHexesInRectangle,
  flatToPixel,
  flatDistance,
  pointyDistance,
} from "../helpers/hexes.js";
import { useBoard } from "../state.js";

const { floor, abs } = Math;

const Board = () => {
  const isServer = useServer();
  const { width, height, tiles } = useBoard();

  return (
    <div className="board" style={{ "--width": width, "--height": height }}>
      {tiles.map(({ id, x, y, px, py, type }) => {
        const offset = x / 2;
        return (
          <div
            key={id}
            className="tile"
            style={{
              "--x": x + 1,
              "--y": y + 3 + floor(offset),
              "--offset": offset - floor(offset),
            }}
          >
            <div className="tile-content" title={id}>
              {type.name}
              <br />
              {id}
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default Board;
