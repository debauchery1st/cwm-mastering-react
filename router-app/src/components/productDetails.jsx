import React from "react";

const ProductDetails = props => {
  const handleSave = () => {
    console.log("handle save event - push");
    props.history.push("/products");

    // console.log("handle save event - replace");
    // props.history.replace("/products");
  };

  return (
    <div>
      <h1>Product Details - {props.match.params.id}</h1>
      <button onClick={handleSave}>Save</button>
    </div>
  );
};

export default ProductDetails;
