import React from "react";
import { FaMinus, FaPlus } from "react-icons/fa";
import { NavLink } from "react-router-dom";
function CartAmountToggle({ amount, setDecrease, setIncrease }) {
  return (
    <div className="cart-btn">
      <div className="amount-toggle">
        <button
          onClick={() => {
            setDecrease();
          }}
        >
          <FaMinus />
        </button>
        <div className="amount-style">{amount}</div>
        <button
          onClick={() => {
            setIncrease();
          }}
        >
          <FaPlus />
        </button>
      </div>
      <NavLink to="#">
        <button>Add To Cart</button>
      </NavLink>
    </div>
  );
}

export default CartAmountToggle;
