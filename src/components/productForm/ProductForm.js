import React, { useState } from "react";

import "./ProductForm.scss";

const ProductForm = ({ options }) => {
  return (
    <div className="form">
      {options.map((item) => {
        if (item.name === "Color")
          return <ColorType key={item.id} values={item.values} />;
        else if (item.name === "Size")
          return <SizeType key={item.id} values={item.values} />;
      })}
      <div className="form-foot">
        <QuantityType />
        <span>Total Price: </span>
      </div>
    </div>
  );
};

const ColorType = ({ values }) => {
  return (
    <div className="type">
      <p>Color:</p>
      <div className="type-list">
        {values.map((item, index) => {
          return (
            <span
              key={index}
              className="color"
              style={{ background: item }}
            ></span>
          );
        })}
      </div>
    </div>
  );
};

const SizeType = ({ values }) => {
  return (
    <div className="type">
      <p>Size: </p>
      <div className="type-list">
        {values.map((item, index) => {
          return (
            <span key={index} className="size">
              {item}
            </span>
          );
        })}
      </div>
    </div>
  );
};

const QuantityType = () => {
    const [qty, setQty] = useState(1)
    return(
        <div>
            <span onClick={()=> setQty(qty-1)}>-</span>
            <span>{qty}</span>
            <span onClick={()=> setQty(qty+1)}>+</span>
        </div>
    )
};

export default ProductForm;
