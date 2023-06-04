import React, { Fragment, useEffect, useState } from "react";
import { clearErrors, getProducts } from "../../../actions/productAction";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../../Loader/Loader";
import ProductCard from "../All Products page/Products-card";
import { useAlert } from "react-alert";
import { useParams } from "react-router-dom";
import Pagination from "react-js-pagination";
import Slider from "@material-ui/core/Slider";
import Typography from "@material-ui/core/Typography";
import "./Product.css";
import MetaData from "../../layout/MetaData";

const categories = [
  "Electronics",
  "Clothing",
  "Home & Kitchen",
  "Beauty & Personal Care",
  "Books",
  "Sports & Outdoors",
  "Toys & Games",
  "Health & Wellness",
  "Jewelry",
  "Fashion",
];

function Products() {
  const alert = useAlert();
  const dispatch = useDispatch();
  const [currentPage, setCurrentPage] = useState(1);
  const [price, setPrice] = useState([0, 250000]);
  const [category, setCategory] = useState("");
  const [ratings, setRatings] = useState(0);

  const {
    loading,
    error,
    products,
    productsCount,
    resultPerPage,
    filteredProductsCount,
  } = useSelector((state) => state.products);

  const setCurrentPageNo = (e) => {
    setCurrentPage(e);
  };

  let { keyword } = useParams();

  useEffect(() => {
    dispatch(getProducts(keyword, currentPage, price, category, ratings));
    if (error) {
      alert.error("Failed to fetch products. Please try again later.");
      console.error("Failed to fetch products:", error);
      dispatch(clearErrors);
    }
  }, [
    dispatch,
    alert,
    clearErrors,
    keyword,
    currentPage,
    price,
    category,
    ratings,
  ]);
  // console.log(productsCount, resultPerPage);

  const priceHandler = (event, newPrice) => {
    setPrice(newPrice);
  };

  let count = filteredProductsCount;

  const handleCategoryChange = (e) => {
    setCategory(e.target.value);
  };

  return (
    <Fragment>
      {loading ? (
        <Loader />
      ) : (
        <Fragment>
          <MetaData title="PRODUCTS -- MaNa-Ecomm-Store" />
          <div className="products-page-wrapper">
            <div className="filterBox">
              <div className="products-page-price-filter">
                <Typography>Price</Typography>
                <Slider
                  value={price}
                  onChange={priceHandler}
                  valueLabelDisplay="auto"
                  aria-labelledby="range-slider"
                  min={0}
                  max={250000}
                />
              </div>
              <div className="products-page-category-filter">
                <label htmlFor="category">Select Category:</label>
                <select
                  id="category"
                  value={category}
                  onChange={handleCategoryChange}
                  className="categoryBox"
                >
                  <option value="">-- Select --</option>
                  {categories.map((category) => (
                    <option
                      className="category-link"
                      value={category}
                      key={category}
                    >
                      {category}
                    </option>
                  ))}
                </select>
              </div>
              <fieldset className="products-page-star-filter">
                <Typography className="star-filter" component="legend">
                  Ratings Above
                </Typography>
                <Slider
                  value={ratings}
                  onChange={(e, newRating) => {
                    setRatings(newRating);
                  }}
                  aria-labelledby="continuous-slider"
                  valueLabelDisplay="auto"
                  min={0}
                  max={5}
                />
              </fieldset>
            </div>

            <div className="products-view-sort">
              <div className="products-page-heading">
                <p>Ecommerce Fashion item & Accessories</p>
              </div>

              <div className="product-container">
                {products && products.length >= 1 ? (
                  products.map((product) => (
                    <ProductCard uctCard key={product._id} product={product} />
                  ))
                ) : (
                  <h1 style={{ alignItems: "center" }}>No products</h1>
                )}
                {resultPerPage < count && (
                  <div className="paginationBox">
                    <Pagination
                      activePage={currentPage}
                      itemsCountPerPage={resultPerPage}
                      totalItemsCount={productsCount}
                      onChange={setCurrentPageNo && setCurrentPageNo}
                      nextPageText="Next"
                      prevPageText="Prev"
                      firstPageText="1st"
                      lastPageText="Last"
                      itemClass="page-item"
                      linkClass="page-link"
                      activeClass="pageItemActive"
                      activeLinkClass="pageLinkActive"
                    />
                  </div>
                )}
              </div>
            </div>
          </div>
        </Fragment>
      )}
    </Fragment>
  );
}

export default Products;
