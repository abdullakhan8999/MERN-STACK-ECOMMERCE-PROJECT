import React, { Fragment, useEffect } from "react";
import Carousel from "react-material-ui-carousel";
import "./ProductDetails.css";
import { useDispatch, useSelector } from "react-redux";
import { getProductDetails } from "../../actions/productAction";
import { useParams } from "react-router-dom";
import Loader from "../layout/Loader/Loader";
import ReactStar from "react-rating-stars-component";
import ReviewCard from "./ReviewCard";

export default function ProductDetails() {
  //getting  product details from backend to store
  const dispatch = useDispatch();

  // get id parameter from URL
  const { id } = useParams();

  // fetch data from store
  const { product, loading, error } = useSelector(
    (state) => state.productDetails
  );
  console.log(product && product.reviews);

  useEffect(() => {
    if (error) {
      return alert.error(error);
    }
    dispatch(getProductDetails(id));
  }, [dispatch, id, alert, error]);

  const options = {
    edit: false,
    color: "rgba(20,20,20,0.1)",
    size: window.innerWidth < 600 ? 25 : 30,
    activeColor: "tomato",
    value: product && product.ratings ? product.ratings : 0,
    isHalf: true,
  };
  return (
    <Fragment>
      {loading || !product ? (
        <Loader />
      ) : (
        <Fragment>
          <div className="productDetails">
            <div className="productDetails-1">
              <Carousel>
                {product &&
                  product.images.map((image, i) => (
                    <img
                      src={image.url}
                      alt={`${i} Slide`}
                      key={image.url}
                      className="CarouselImages"
                    />
                  ))}
              </Carousel>
            </div>

            <div className="productDetails-2">
              <div className="detailsBlock-1">
                <h2>{product.name}</h2>
                <p>Product # {product._id}</p>
              </div>

              <div className="detailsBlock-2">
                <ReactStar {...options} />
                <span className="review">{product.numberOfReview} reviews</span>
              </div>

              <div className="detailsBlock-3">
                <h1>{`₹${product.price}`}</h1>
                <div className="detailsBlock-3-1">
                  <div className="detailsBlock-3-1-1 number-of-product-adding-div">
                    <button>-</button>
                    {/* <input type="number" value={1} /> */}
                    <button>+</button>
                  </div>
                  <button className="add-to-cart-button">Add to Cart</button>
                </div>
                <p>
                  Status :{" "}
                  <b className={product.Stock < 1 ? "redColor" : "greenColor"}>
                    {product.Stork < 1 ? "OutOfStock" : "InStock"}
                  </b>
                </p>
              </div>

              <div className="detailsBlock-4">
                Description : <p>{product.description}</p>
              </div>
              <button className="submitReview">Submit Review</button>
            </div>
          </div>

          <h3 className="reviewsHeading">REVIEWS</h3>
          {product.reviews && product.reviews[0] ? (
            <div className="reviews">
              {product.reviews &&
                product.reviews.map((review) => <ReviewCard review={review} />)}
            </div>
          ) : (
            <p className="no-reviews">No reviews Yet!</p>
          )}
        </Fragment>
      )}
    </Fragment>
  );
}
