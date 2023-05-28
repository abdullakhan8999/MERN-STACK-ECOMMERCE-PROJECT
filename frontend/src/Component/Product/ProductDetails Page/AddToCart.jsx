import React, { useState } from "react";
import { FaCheck } from "react-icons/fa";
import "./AddToCart.css";
import CartAmountToggle from "./CartAmountToggle.jsx";

function AddToCart({ product }) {
  // const { stock, _id } = product;
  const { stock } = product;
  const colors = product.colors;
  const [color, setColor] = useState(colors[0]);

  const [amount, setAmount] = useState(1);
  const setDecrease = () => {
    amount > 1 ? setAmount(amount - 1) : setAmount(1);
  };

  const setIncrease = () => {
    amount < stock ? setAmount(amount + 1) : setAmount(stock);
  };
  return (
    <section>
      <div className="colors">
        <p>
          Colors:{" "}
          {colors.map((curCol, i) => {
            return (
              <button
                key={i}
                style={{ backgroundColor: curCol }}
                className={color === curCol ? "btnStyle active" : "btnStyle"}
                onClick={() => setColor(curCol)}
              >
                {curCol === color ? <FaCheck className="checkStyle" /> : null}
              </button>
            );
          })}
        </p>
      </div>
      <CartAmountToggle
        amount={amount}
        setDecrease={setDecrease}
        setIncrease={setIncrease}
      />
    </section>
  );
}

export default AddToCart;
