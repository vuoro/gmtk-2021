import { useEffect, useState } from "react";

export default () => {
  const [Server, setServer] = useState(true);
  useEffect(() => {
    setServer(false);
  });
  return Server;
};
