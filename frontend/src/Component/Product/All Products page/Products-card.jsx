import React from "react";
import ReactStar from "react-rating-stars-component";
import { useAlert } from "react-alert";
import { Link } from "react-router-dom";

function ProductCard({ product }) {
  const alert = useAlert();
  // const productDetailsPage = () => {
  //   try {
  //     window.location.href = `/product/${product._id}`;
  //   } catch (error) {
  //     alert.error("Failed to fetch products. Please try again later.");
  //   }
  // };
  const options = {
    edit: false,
    color: "rgba(20,20,20,0.1)",
    size: 20,
    activeColor: "tomato",
    value: product.ratings,
    isHalf: true,
  };
  return (
    <div className=" product-page-container product-page-warper">
      <img
        src={product.images[0].url}
        alt={product.name}
        className="product-page-image"
      />
      <div className="product-name-price-rating">
        <Link to={`/product/${product._id}`} className="product-name-rating">
          <h3 className="">{product.name}</h3>
          <ReactStar {...options} />
        </Link>
        <h3 className="product-price">${product.price}</h3>
      </div>
      <div className="price-and-cart">
        <button className="active">
          <i className="fa fa-shopping-cart" /> ADD TO CART
        </button>
      </div>
    </div>
  );
}

export default ProductCard;
