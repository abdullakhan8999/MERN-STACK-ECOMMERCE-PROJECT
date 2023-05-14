import React, { Fragment, useEffect } from "react";
import { FiChevronDown } from "react-icons/fi";
import "./Home.css";
import Product from "./ProductCard/ProductCard.jsx";
import MetaData from "../layout/MetaData";
import { clearErrors, getProduct } from "../../actions/productAction";
import { useSelector, useDispatch } from "react-redux";
import Loader from "../Loader/Loader";
import { useAlert } from "react-alert";

export default function Home() {
  const alert = useAlert();
  const dispatch = useDispatch();
  const { loading, error, products } = useSelector((state) => state.products);

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
          <MetaData title={"MaNa-Ecomm-Store"} />
          <div className="banner">
            <p>Welcome to MaNa-Ecomm</p>
            <h1>FIND AMAZING PRODUCTS BELOW</h1>
            <a href="#container">
              <button type="click">
                Scroll <FiChevronDown />
              </button>
            </a>
          </div>

          <h2 className="homeHeading">Featured Product</h2>

          <div className="container" id="container">
            {products &&
              products.map((product) => (
                <Product key={product._id} product={product} />
              ))}
          </div>
        </Fragment>
      )}
    </Fragment>
  );
}
