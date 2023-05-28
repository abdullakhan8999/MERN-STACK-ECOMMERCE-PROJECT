import React, { Fragment, useEffect } from "react";
import { Link } from "react-router-dom";
import "./Home.css";
import ProductCard from "./ProductCard/ProductCard.jsx";
import MetaData from "../layout/MetaData";
import { clearErrors, getProducts } from "../../actions/productAction";
import { useSelector, useDispatch } from "react-redux";
import { useAlert } from "react-alert";
import Loader from "../Loader/Loader";
import Carousel from "../Carousel/Carousel";
import PopularProductsCarousel from "./popularProducts/popularProducts";

export default function Home() {
  const alert = useAlert();
  const dispatch = useDispatch();
  const { loading, error, products } = useSelector((state) => state.products);

  useEffect(() => {
    dispatch(getProducts());
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
          <div className="carousel-section">
            <Carousel />
          </div>
          <div className="banner">
            <h1>NEW ARRIVAL</h1>
            <p>FIND AMAZING PRODUCTS BELOW</p>
          </div>
          <div className="container" id="container">
            {products &&
              products.map((product) => (
                <ProductCard key={product._id} product={product} />
              ))}
          </div>
          <div className="homeHeading">
            <h1>POPULAR PRODUCTS</h1>
            <p>
              Shop the best-selling products that everyone's talking about and
              upgrade your style effortlessly.
            </p>
          </div>
          <div className="popularProducts-container">
            <PopularProductsCarousel products={products} />
          </div>

          <div className="banner-bottom">
            <span>See personalized recommendations</span>
            <button type="submit">Sign In</button>
            <p>
              New Customer? <Link to="/signup">Sign Up</Link>{" "}
            </p>
          </div>
        </Fragment>
      )}
    </Fragment>
  );
}
