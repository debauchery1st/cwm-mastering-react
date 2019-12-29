import React from "react";

const Like = ({ isLiked, onClick }) => {
  const classes = isLiked() ? "fa fa-heart" : "fa fa-heart-o";
  return (
    <i
      onClick={onClick}
      className={classes}
      aria-hidden="true"
      style={{ cursor: "pointer" }}
    />
  );
};

export default Like;
