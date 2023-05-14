import React, { Fragment, useEffect } from "react";
import "./Product.css";
import { clearErrors, getProduct } from "../../actions/productAction";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../Loader/Loader";
import ProductCard from "../Home/ProductCard/ProductCard.jsx";
import { useAlert } from "react-alert";

function Products() {
  const alert = useAlert();
  const dispatch = useDispatch();
  const { loading, error, products, productsCount } = useSelector(
    (state) => state.products
  );

  useEffect(() => {
    dispatch(getProduct());
    if (error) {
      alert.error("Failed to fetch products. Please try again later.");
      console.error("Failed to fetch products:", error);
      dispatch(clearErrors);
    }
  }, [dispatch, alert, clearErrors]);

  return (
    <Fragment>
      {loading ? (
        <Loader />
      ) : (
        <Fragment>
          {
            <div className="product-container">
              {products &&
                products.map((product) => (
                  <ProductCard key={product._id} product={product} />
                ))}
            </div>
          }
        </Fragment>
      )}
    </Fragment>
  );
}

export default Products;
