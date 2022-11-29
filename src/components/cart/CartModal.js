import React, { useContext } from "react";
import { CartContext } from "../../context/cartContext/CartContext";
import Button from "../button/Button";
import "./CartModal.scss";
import { formatNumber } from "../../utils";

function CartModal({ isOpen, setIsOpen }) {
  const cart = useContext(CartContext);
  if (!isOpen) {
    return null;
  }
  return (
    <div role="modal" className="modal" onClick={() => setIsOpen(false)}>
      <div className="modal-content">
        <div className="modal-header">
          <h2>Shopping Cart</h2>
        </div>
        <div className="modal-body">
          <div className="product-list">
            {cart.map((item, index) => {
              console.log(item);
              return (
                <div key={index} className="product">
                  <figure>
                    <img src={item.img} alt={`product_image_${item.product_id}`} />
                  </figure>
                  <div className="product-info">
                    <h4>{item.name}</h4>
                    <p>Type: {item.variant}</p>
                    <p>Quantity: {item.quantity}</p>
                    <p>Total: {formatNumber(item.price, item.quantity)}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
        <div className="modal-footer">
          {cart.length ? (
            <Button type="full-width" onClick={() => setIsOpen(false)}>Close</Button>
          ) : (
            <h3>Cart is Empty</h3>
          )}
        </div>
      </div>
    </div>
  );
}

export default CartModal;
