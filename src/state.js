import create from "zustand";
import SimplexNoise from "simplex-noise";

import { flatHexesInRectangle, flatToPixel, distanceBetween } from "./helpers/hexes.js";
import { Token, Card } from "./components/Pieces.js";

const { abs, floor, ceil, round } = Math;
const simplex = new SimplexNoise("vuoro-gmtk-2021");

const defaultTile = {
  passable: true,
  hiding: false,
};

const tileTypes = {
  woods: {
    name: "Woods",
    hiding: true,
  },
  plains: {
    name: "Plains",
  },
  rocks: {
    name: "Rocks",
    passable: false,
  },
};

for (const key in tileTypes) {
  tileTypes[key] = { ...defaultTile, ...tileTypes[key] };
}

const tileBag = Object.values(tileTypes);

export const useGame = create((set, get) => {
  const width = 7;
  const height = 21;
  const origo = [floor(width / 2), floor(height / 2) - 1];
  const tiles = flatHexesInRectangle(origo, width, height)
    .map((hex) => {
      const [x, y] = hex;
      const [px, py] = flatToPixel(hex);
      const id = `${x},${y}`;

      const distanceToCenter = distanceBetween(origo, hex);
      const isOnEdge = x === 0 || x === width - 1 || distanceToCenter > height / 2.15;

      const type =
        tileBag[round((tileBag.length - 1) * (simplex.noise2D(px * 2, py * 2) * 0.5 + 0.5))];
      return { id, x, y, px, py, ...type, isOnEdge, contains: [] };
    })
    .filter(({ isOnEdge, px, py }) =>
      isOnEdge && simplex.noise2D(px * 20, py * 20) > 0.236 ? false : true
    );

  tiles.find(({ passable }) => passable).contains.push({ Component: Token, name: "You" });
  const cards = [...Array(8)].map((v, index) => ({
    id: index,
    Component: Token,
    name: `Card ${index}`,
  }));

  return {
    width,
    height,
    tiles,
    cards,
    activeCard: null,
    activeTile: null,
    grabCard: (card) => set({ activeCard: card }),
    dropCard: (card) => {
      const { activeTile, tiles, cards } = get();

      if (activeTile) {
        activeTile.contains.push(card);
        set({ tiles: [...tiles], cards: cards.filter((match) => match !== card) });
      }

      set({ activeCard: null });
    },
    setActiveTile: (tile) => set({ activeTile: tile }),
  };
});
