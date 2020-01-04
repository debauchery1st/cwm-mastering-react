import React from "react";

const SearchBar = props => {
  return (
    <input id="search" name="search" className="form-control my-3" {...props} />
  );
};

export default SearchBar;
