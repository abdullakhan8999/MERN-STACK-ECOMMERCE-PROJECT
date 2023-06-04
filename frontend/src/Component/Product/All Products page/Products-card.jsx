import React from "react";
import ReactStar from "react-rating-stars-component";
import { Link } from "react-router-dom";

function ProductCard({ product }) {
  // const alert = useAlert();
  // const productDetailsPage = () => {
  //   try {
  //     window.location.href = `/product/${product._id}`;
  //   } catch (error) {
  //     alert.error("Failed to fetch products. Please try again later.");
  //   }
  // };
  const options = {
    value: product.ratings,
    readOnly: true,
    precision: 0.5,
  };
  return (
    <Link className="productsCard" to={`/product/${product._id}`}>
      <img src={product.images[0].url} alt={product.name} />
      <p>{product.name}</p>
      <div>
        <ReactStar {...options} />{" "}
        {product.numOfReviews && (
          <span className="productsCardSpan">
            {" "}
            ({product.numOfReviews} Reviews)
          </span>
        )}
      </div>
      <span>{`₹${product.price}`}</span>
      <button className="add-to-cart-btn">
        <i className="fa fa-shopping-cart" /> ADD TO CART
      </button>
    </Link>
  );
}

export default ProductCard;
