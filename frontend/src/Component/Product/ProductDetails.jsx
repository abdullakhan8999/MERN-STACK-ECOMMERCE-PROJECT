import React, { useEffect } from "react";
import Carousel from "react-material-ui-carousel";
import "./ProductDetails.css";
import { useDispatch, useSelector } from "react-redux";
import { getProductDetails } from "../../actions/productAction";
import { useParams } from "react-router-dom";

export default function ProductDetails() {
  //getting  product detials from backend to store
  const dispatch = useDispatch();

  // get id parameter from URL
  const { id } = useParams();

  // fetch data from store
  const { product, loading, error } = useSelector(
    (state) => state.productDetails
  );

  useEffect(() => {
    dispatch(getProductDetails(id));
  }, [dispatch, id]);
  return (
    <>
      <div className="ProductDetails">
        <div className="">
          <Carousel>
            {product &&
              product.images &&
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

        <div className="">
          <div className="detailsBlock-1">


            sdfsd
          </div>
        </div>
      </div>
    </>
  );
}
