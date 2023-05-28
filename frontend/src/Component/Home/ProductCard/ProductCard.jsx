import React from "react";
import "./ProductCard.css";
import ReactStar from "react-rating-stars-component";
import { useAlert } from "react-alert";

function ProductCard({ product }) {
  const alert = useAlert();
  const handleAddToCart = () => {
    alert.info("Product added to cart.");
  };
  const productDetailsPage = () => {
    try {
      window.location.href = `/product/${product._id}`;
    } catch (error) {
      alert.error("Failed to fetch products. Please try again later.");
    }
  };
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
    <div className="productCard-Container">
      {imageUrl && <img src={imageUrl} alt={product.name} />}
      <div className="overlay">
        <div className="items"></div>
        <div className="items head" onClick={() => productDetailsPage()}>
          <p>{product.name}</p>
          <hr />
        </div>
        <div className="items price">
          <div className="item-rating">
            <ReactStar classNames="StarRating" {...options} />
            <span className="review-num">{product.numberOfReview} reviews</span>
          </div>
          <p className="new">{`₹${product.price}`}</p>
        </div>
        <div className="items cart">
          <i className="fa fa-shopping-cart"></i>
          <button className="active" onClick={() => handleAddToCart()}>
            ADD TO CART
          </button>
        </div>
      </div>
    </div>
  );
}

export default ProductCard;
