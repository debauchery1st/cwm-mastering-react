import React from "react";

/* 
 <Like 
    isLiked={() => boolean] 
    onClick={() => foo} />
 */

const Like = props => {
  const { isLiked, onClick } = props;
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
