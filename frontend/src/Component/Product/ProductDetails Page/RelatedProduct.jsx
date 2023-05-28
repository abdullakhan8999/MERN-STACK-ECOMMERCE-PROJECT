import ReactStar from "react-rating-stars-component";
import React from "react";
import { useNavigate } from "react-router-dom";
import "./RelatedProduct.css";

function RelatedProduct({ product }) {
  const navigate = useNavigate();
  const options = {
    edit: false,
    color: "rgba(20,20,20,0.1)",
    size: 25,
    activeColor: "tomato",
    value: product && product.ratings,
    isHalf: true,
  };

  const handleRouterToProduct = (product) => {
    window.scrollTo({ top: 0, behavior: "smooth" });
    navigate(`/product/${product._id}`);
  };
  return (
    <div className="related-product" key={product._id}>
      <div onClick={() => handleRouterToProduct(product)}>
        <img
          src={product.images[0].url}
          alt=""
          className="RelatedProductImage"
        />
        <div className="related-product-name-rating">
          <h3>{product.name}</h3>
          <ReactStar {...options} />
        </div>
        <h3 className="related-product-price">${product.price}</h3>
      </div>
    </div>
  );
}

export default RelatedProduct;
