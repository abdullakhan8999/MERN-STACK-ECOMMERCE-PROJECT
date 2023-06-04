import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./CarousalCard.css";

function CarousalCard({ product }) {
  const colors = product.colors;
  const [color, setColor] = useState(colors[0]);
  return (
    product && (
      <div className="carouselCard">
        <img
          className="carouselProduct--image"
          src={product.images[0].url}
          alt={product.name}
        />
        <Link to={`product/${product._id}`}>
          <h3>{product.name}</h3>
        </Link>
        <div className="colors-btn">
          {product.colors.map((curCol, i) => {
            return (
              <button
                key={i}
                style={{ backgroundColor: curCol }}
                className={
                  color === curCol
                    ? "colors-btnStyle colors-btn-active"
                    : "colors-btnStyle"
                }
                onClick={() => setColor(curCol)}
              ></button>
            );
          })}
        </div>
        <p className="carouselCard-brand">{product.brand}</p>
        <p className="carouselProduct-price">₹{product.price}</p>
        <p>
          <button type="submit">Add to Cart</button>
        </p>
      </div>
    )
  );
}

export default CarousalCard;
