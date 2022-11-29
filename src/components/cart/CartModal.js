import React from "react";
import Button from "../button/Button";
import "./CartModal.scss";

function CartModal({ isOpen }) {
  if (!isOpen) {
    return null;
  }
  return (
    <div className="modal">
      <div className="modal-content">
        <div className="modal-header">
          <h2>Shopping Cart</h2>
          <span>X</span>
        </div>
        <div className="modal-body">
          <div className="product-list">
            <div className="product">
              <figure>
                <img src="https://picsum.photos/100" />
              </figure>
              <div className="product-info">
                <h4>Name</h4>
                <p>variant</p>
                <p>quantity</p>
                <p>price</p>
              </div>
            </div>
          </div>
        </div>
        <div className="modal-footer">
          <Button type="black full-width">Checkout</Button>
        </div>
      </div>
    </div>
  );
}

export default CartModal;
