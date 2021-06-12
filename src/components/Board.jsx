import React from "react";

import useServer from "../helpers/useServer.js";
import {
  flatHexesInRectangle,
  flatToPixel,
  flatDistance,
  pointyDistance,
} from "../helpers/hexes.js";
import { useGame } from "../state.js";

const { floor, abs } = Math;

const Board = () => {
  const width = useGame((state) => state.width);
  const height = useGame((state) => state.height);
  const tiles = useGame((state) => state.tiles);
  const activeTile = useGame((state) => state.activeTile);

  return (
    <div className="board" style={{ "--width": width, "--height": height }}>
      {tiles.map((tile) => (
        <Tile key={tile.id} tile={tile} active={activeTile === tile} />
      ))}
    </div>
  );
};

const Tile = ({ tile, active }) => {
  const { id, x, y, px, py, type } = tile;
  const offset = x / 2;
  const setActiveTile = useGame((state) => state.setActiveTile);

  const handlePointerEnter = () => {
    setActiveTile(tile);
  };

  const handlePointerOut = () => {
    setActiveTile(null);
  };

  return (
    <div
      key={id}
      className={`tile ${active ? "active" : ""}`}
      style={{
        "--x": x + 1,
        "--y": y + 3 + floor(offset),
        "--offset": offset - floor(offset),
      }}
      onPointerEnter={handlePointerEnter}
      onPointerOut={handlePointerOut}
    >
      <div className="tile-content" title={id}>
        {type.name}
        <br />
        {id}
      </div>
    </div>
  );
};

export default Board;
