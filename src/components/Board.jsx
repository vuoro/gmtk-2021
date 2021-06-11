import React from "react";

import useServer from "../helpers/useServer.js";
import { useTest } from "../state.js";

const Board = () => {
  const isServer = useServer();
  const { count, increment } = useTest();
  return <p style={{ opacity: isServer ? 0.5 : 1 }}>Board: {count}</p>;
};

export default Board;
