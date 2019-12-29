import React from "react";
import { objQuery } from "../utils/mapQuery";

const Posts = ({ match, location }) => {
  const result = objQuery(location.search);
  console.log(result);
  return (
    <div>
      <h1>Posts</h1>
      Year: {match.params.year} , Month: {match.params.month}
    </div>
  );
};

export default Posts;
