import React from "react";
import "./ProductCard.css";
import { Link } from "react-router-dom";
import ReactStar from "react-rating-stars-component";

function ProductCard2({ product }) {
  const options = {
    edit: false,
    color: "rgba(20,20,20,0.1)",
    size: 20,
    activeColor: "tomato",
    value: product.ratings,
    isHalf: true,
  };
  const imageUrl =
    product.images && product.images.length > 0 ? product.images[0].url : null;
  return (
    <div class="productCard-Container">
      {imageUrl && <img src={imageUrl} alt={product.name} />}
      <div class="overlay">
        <div class="items"></div>
        <div class="items head">
          <p>{product.name}</p>
          <hr />
        </div>
        <div class="items price">
          <div class="item-rating">
            <ReactStar classNames="StarRating" {...options} />
            <span className="review-num">{product.numberOfReview} reviews</span>
          </div>
          <p class="new">{`₹${product.price}`}</p>
        </div>
        <div class="items cart">
          <i class="fa fa-shopping-cart"></i>
          <button className="active">ADD TO CART</button>
        </div>
      </div>
    </div>
  );
}

export default ProductCard2;
