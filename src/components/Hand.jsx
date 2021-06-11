import React from "react";

import useServer from "../helpers/useServer.js";
import { useTest } from "../state.js";

const Hand = () => {
  const isServer = useServer();
  const { count, increment } = useTest();
  return (
    <>
      <p style={{ opacity: isServer ? 0.5 : 1 }}>Hand: {count}</p>
      <button type="button" onClick={increment} disabled={isServer}>
        {isServer ? "Initializing…" : "Increment"}
      </button>
    </>
  );
};

export default Hand;
