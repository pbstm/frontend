import { useEffect, useState } from "react";

const WindowDimensions = () => {
  const [width, defineWidth] = useState(window.innerWidth);

  function updateDimensions() {
    defineWidth(window.innerWidth);
  }

  useEffect(() => {
    window.addEventListener("resize", updateDimensions);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [window.innerWidth]);

  return {
    width
  };
};

export default WindowDimensions;
