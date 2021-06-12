import React from "react";

import PointerFollower from "./PointerFollower.js";
import { Card } from "./Pieces.js";
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
  const { id, x, y, px, py, name, contains } = tile;
  const offset = x / 2;
  const setActiveTile = useGame((state) => state.setActiveTile);

  const handlePointerEnter = () => {
    setActiveTile(tile);
  };

  const handlePointerOut = () => {
    setActiveTile(null);
  };

  return (
    <>
      <button
        type="button"
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
          {name}
          {contains.map((thing) => {
            const Component = thing.Component;
            return <Component {...thing} />;
          })}
        </div>
      </button>

      {active && (
        <PointerFollower>
          <Card card={{ name }} />
        </PointerFollower>
      )}
    </>
  );
};

export default Board;
