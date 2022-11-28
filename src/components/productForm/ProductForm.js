import React, { useState } from "react";
import Button, { Buttons } from "../button/Button";

import "./ProductForm.scss";

const ProductForm = ({ options }) => {
  const [formData, updateFormData] = React.useState({});
  const handleChange = (e) => {
    updateFormData({
      ...formData,

      // Trimming any whitespace
      [e.target.name]: e.target.value.trim(),
    });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData);
  };

  return (
    <form className="form" onSubmit={handleSubmit}>
      {options.map((item) => {
        if (item.name === "Color")
          return <ColorType key={item.id} values={item.values} onChange={handleChange} />;
        else if (item.name === "Size")
          return <SizeType key={item.id} values={item.values} onChange={handleChange} />;
      })}
      <div className="form-foot">
        <QuantityType onChange={handleChange} />
        <span className="total">Total Price: </span>
      </div>
      <Buttons>
        <Button>Add to favourite</Button>
        <Button type="black" submit>Add to cart</Button>
      </Buttons>
    </form>
  );
};

const ColorType = ({ values }) => {
  return (
    <div className="type">
      <p>Color:</p>
      <div className="type-list">
        {values.map((item, index) => {
          return (
            <input
              key={index}
              className="color"
              type="radio"
              name="color"
              style={{ background: item }}
              value={item}
            />
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
            <label key={index} className="size">
              <input type="radio" name="size" value={item} />
              {item}
            </label>
          );
        })}
      </div>
    </div>
  );
};

const QuantityType = () => {
  const [qty, setQty] = useState(1);
  return (
    <div className="quantity">
      <span onClick={() => setQty(qty - 1)}>-</span>
      <input type="text" value={qty} />
      <span onClick={() => setQty(qty + 1)}>+</span>
    </div>
  );
};

export default ProductForm;
