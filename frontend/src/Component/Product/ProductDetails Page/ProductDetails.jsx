import React, { Fragment, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  clearErrors,
  getProducts,
  getProductDetails,
} from "../../../actions/productAction";
import { useParams } from "react-router-dom";
import Loader from "../../Loader/Loader";
import ReactStar from "react-rating-stars-component";
import { useAlert } from "react-alert";
import ProductInformation from "./ProductInformation";
import ProductImage from "./ProductImage";
import { MdSecurity } from "react-icons/md";
import { TbTruckDelivery, TbReplace } from "react-icons/tb";
import { CgTrack } from "react-icons/cg";
import AddToCart from "./AddToCart";
import RelatedProduct from "./RelatedProduct";
import "./ProductDetails.css";

export default function ProductDetails() {
  //getting  product details from backend to store
  const dispatch = useDispatch();

  //alert for error
  const alert = useAlert();

  // get id parameter from URL
  const { id } = useParams();

  // fetch data from store
  const { product, loading, error } = useSelector(
    (state) => state.productDetails
  );

  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearErrors);
    }
    dispatch(getProductDetails(id));
  }, [dispatch, id, alert, error]);

  const options = {
    edit: false,
    color: "rgba(20,20,20,0.1)",
    size: 25,
    activeColor: "tomato",
    value: product && product.ratings,
    isHalf: true,
  };
  const { products } = useSelector((state) => state.products);

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
      {loading || !product ? (
        <Loader />
      ) : (
        <Fragment>
          <div className="productDetails">
            <div className="productDetails-1">
              <ProductImage images={product.images} />
            </div>

            <div className="productDetails-2">
              <div className="detailsBlock-1">
                <h4>{product.name}</h4>
                <div className="review">
                  <ReactStar {...options} />
                  <p>( {product.numberOfReview} customer reviews )</p>
                </div>
                <div className="productDetails-price">
                  <span className="">MRP: ₹{product.price}</span>
                  <div className="on-sale">
                    <span>10% OFF</span>
                  </div>
                </div>
              </div>

              <div className="detailsBlock-2">
                <div className="description">
                  <p>
                    {product.description} Lorem ipsum dolor sit amet consectetur
                    adipisicing elit. Nulla provident ipsa quis blanditiis
                    dolorum, ipsam expedita quibusdam sit impedit, ratione
                    necessitatibus? Nesciunt nisi id ratione repellat iusto?
                    Culpa, praesentium doloribus.
                  </p>
                </div>

                <div className="product-data-warranty">
                  <div className="product-warranty-data">
                    <TbTruckDelivery className="warranty" />
                    <p>Free Delivery</p>
                  </div>
                  <div className="product-warranty-data">
                    <CgTrack className="warranty" />
                    <p>Track Your Order</p>
                  </div>
                  <div className="product-warranty-data">
                    <MdSecurity className="warranty" />
                    <p>Warranty</p>
                  </div>
                  <div className="product-warranty-data">
                    <TbReplace className="warranty" />
                    <p>30 Days Replacement</p>
                  </div>
                </div>
              </div>

              <div className="detailsBlock-3 product-data-info">
                <p className="p-20">
                  Available :{" "}
                  <span
                    className={
                      product.stock > 0
                        ? "underLine-green c-black"
                        : "underLine-red c-black"
                    }
                  >
                    {product.stock > 0 ? "In Stock" : "Out of Stock"}
                  </span>
                </p>
                <p>
                  ID:
                  <span className="c-black">{product._id}</span>
                </p>
                <p>
                  Brand:
                  <span className="c-black">{product.brand}</span>
                </p>
              </div>

              <div className="hr"></div>
              {product.stock > 0 && <AddToCart product={product} />}
            </div>
          </div>
          <ProductInformation product={product} />

          <section className="related-products-container">
            <div>
              <h3>Related Products</h3>{" "}
              <div className="related-product-warper">
                {products &&
                  products.map((product) => (
                    <RelatedProduct key={product._id} product={product} />
                  ))}
              </div>
            </div>
          </section>
        </Fragment>
      )}
    </Fragment>
  );
}
