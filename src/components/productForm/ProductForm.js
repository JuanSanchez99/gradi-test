import React, { useEffect, useState } from "react";
import { formatNumber } from "../../utils";
import Button, { Buttons } from "../button/Button";

import "./ProductForm.scss";

const ProductForm = ({ options, changeVariant, variant, addCart }) => {
  const [formData, updateFormData] = useState({
    option1: variant.option1,
    option2: variant.option2,
  });
  // Get data from inputs
  const handleChange = (e) => {
    updateFormData({
      ...formData,
      [e.target.name]: e.target.value.trim(),
    });
  };
  // Get Quantity input
  const handleQuantity = (quantity) => {
    updateFormData({
      ...formData,
      quantity: quantity,
    });
  };
  // Send Form
  const handleSubmit = (e) => {
    e.preventDefault();
    addCart(formData.quantity)
  };

  // Change Price
  useEffect(() => {
    changeVariant(formData);
  }, [formData]);
  return (
    <form className="form" onSubmit={handleSubmit}>
      {options.map((item) => {
        if (item.name === "Color")
          return (
            <ColorType
              key={item.id}
              values={item.values}
              name={`option${item.position}`}
              onChangeInput={handleChange}
              data={formData.option1}
            />
          );
        else if (item.name === "Size")
          return (
            <SizeType
              key={item.id}
              values={item.values}
              name={`option${item.position}`}
              onChangeInput={handleChange}
              data={formData.option2}
            />
          );
        return null
      })}
      <div className="form-foot">
        <QuantityType onChangeInput={handleQuantity} />
        <span className="total">
          Total Price: {formatNumber(variant.price, formData.quantity)}
        </span>
      </div>
      <Buttons>
        <Button>Add to favourite</Button>
        <Button type="black" submit>
          Add to cart
        </Button>
      </Buttons>
    </form>
  );
};

const ColorType = ({ values, onChangeInput, name, data }) => {
  return (
    <div className="type">
      <p>Color:</p>
      <div className="type-list">
        {values.map((item, index) => {
          return (
            <label
              key={index}
              style={{ background: item }}
              className={`color ${data === item && "selected"}`}
            >
              <input
                type="radio"
                name={name}
                value={item}
                onChange={onChangeInput}
                checked={data === item}
              />
            </label>
          );
        })}
      </div>
    </div>
  );
};

const SizeType = ({ values, onChangeInput, name, data }) => {
  return (
    <div className="type">
      <p>Size: </p>
      <div className="type-list">
        {values.map((item, index) => {
          return (
            <label
              key={index}
              className={`size ${data === item && "selected"}`}
            >
              <input
                type="radio"
                name={name}
                value={item}
                onChange={onChangeInput}
                checked={data === item}
              />
              {item}
            </label>
          );
        })}
      </div>
    </div>
  );
};

const QuantityType = ({ onChangeInput }) => {
  const [qty, setQty] = useState(1);
  useEffect(() => {
    onChangeInput(qty);
  }, [qty]);
  return (
    <div className="quantity">
      <span onClick={() => qty > 0 && setQty(qty - 1)}>-</span>
      <span>{qty}</span>
      <span onClick={() => setQty(qty + 1)}>+</span>
    </div>
  );
};

export default ProductForm;
