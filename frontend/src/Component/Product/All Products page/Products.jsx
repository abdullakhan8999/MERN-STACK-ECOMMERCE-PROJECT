import React, { Fragment, useEffect } from "react";
import "./Product.css";
import { clearErrors, getProducts } from "../../../actions/productAction";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../../Loader/Loader";
import ProductCard from "../All Products page/Products-card";
import { useAlert } from "react-alert";
import { useParams } from "react-router-dom";

function Products() {
  const alert = useAlert();
  const dispatch = useDispatch();
  const { loading, error, products } = useSelector((state) => state.products);
  let { keyword } = useParams();
  useEffect(() => {
    dispatch(getProducts(keyword));
    if (error) {
      alert.error("Failed to fetch products. Please try again later.");
      console.error("Failed to fetch products:", error);
      dispatch(clearErrors);
    }
  }, [dispatch, alert, clearErrors, keyword]);

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
