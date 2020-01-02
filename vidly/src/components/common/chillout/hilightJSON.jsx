import React from "react";

const HiLighter = jsonOBJ => {
  const formatted = JSON.stringify(jsonOBJ, undefined, 2);
  return <pre>{formatted}</pre>;
};

export default HiLighter;
