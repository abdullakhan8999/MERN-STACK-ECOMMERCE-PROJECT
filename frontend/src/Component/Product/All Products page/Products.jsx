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

function Products() {
  const alert = useAlert();
  const dispatch = useDispatch();
  const [currentPage, setCurrentPage] = useState(1);
  const [price, setPrice] = useState([0, 250000]);

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
    dispatch(getProducts(keyword, currentPage, price));
    if (error) {
      alert.error("Failed to fetch products. Please try again later.");
      console.error("Failed to fetch products:", error);
      dispatch(clearErrors);
    }
  }, [dispatch, alert, clearErrors, keyword, currentPage, price]);
  // console.log(productsCount, resultPerPage);

  const priceHandler = (event, newPrice) => {
    setPrice(newPrice);
  };

  let count = filteredProductsCount;
  return (
    <Fragment>
      {loading ? (
        <Loader />
      ) : (
        <Fragment>
          <div className="products-page-heading">
            <p>Ecommerce Fashion item & Accessories</p>
          </div>

          <div className="product-container">
            {products &&
              products.map((product) => (
                <ProductCard uctCard key={product._id} product={product} />
              ))}
          </div>

          <div className="filterBox">
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
        </Fragment>
      )}
    </Fragment>
  );
}

export default Products;
