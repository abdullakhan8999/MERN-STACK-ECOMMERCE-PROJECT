import React, { useState } from "react";
import ReviewCard from "../ProductDetails Page/ReviewCard";
import Accordion from "../../Accordion/Accordion";
import "./ProductInformation.css";

function ProductInformation({ product }) {
  const [ReviewTabPane, setReviewTabPane] = useState(true);
  const [InfoTabPane, setInfoTabPane] = useState(false);
  const HandleShowReview = () => {
    setReviewTabPane(true);
    setInfoTabPane(false);
  };
  const HandleShowInfo = () => {
    setInfoTabPane(true);
    setReviewTabPane(false);
  };

  const accordionData = [
    {
      title: "Shipping Options",
      content:
        "We offer various shipping options to cater to your needs. Choose from our Express Delivery for fast delivery within 1-2 business days, or our Standard Delivery for packages to arrive within 3-5 business days. Additionally, we provide Free Shipping on orders above a certain value, and for our international customers, we have shipping options available to select countries.",
    },
    {
      title: "Delivery TimeFrames",
      content:
        "To ensure your order reaches you promptly, we strive to process orders within 1-2 business days. The estimated transit time depends on your location and the shipping option chosen. Please note that delivery delays may occur due to unforeseen circumstances such as weather conditions or customs clearance, and we apologize for any inconvenience caused.",
    },
    {
      title: "Tracking Orders",
      content:
        "Once your order is shipped, we will send you a confirmation email with a tracking number. You can use this number to track your package in real-time through our website or the shipping carrier's website. We want to keep you informed about the status of your shipment every step of the way.",
    },
    {
      title: "Shipping Costs",
      content:
        "Shipping fees are calculated based on factors such as the weight, size, and destination of your order. The shipping cost will be displayed at the checkout before you finalize your purchase. To qualify for free shipping, simply spend above the designated threshold, which is mentioned on our website and in promotional materials.",
    },
    {
      title: "Delivery Notifications",
      content:
        "We understand the excitement of receiving your package. That's why we send an order confirmation email immediately after your purchase, followed by a shipment confirmation email with tracking details once your order is on its way. You can also opt-in to receive delivery notifications through email or SMS, allowing you to stay updated on the progress of your delivery.",
    },
  ];
  return (
    <section className="review-proInfo">
      <div className="item-decribe">
        <div className="nav">
          <button
            onClick={() => HandleShowReview()}
            className={ReviewTabPane ? "show-btn" : "hide-btn"}
            title={`Show Reviews (${product.numberOfReview})`}
          >
            Reviews ({product.numberOfReview})
          </button>

          <button
            onClick={() => HandleShowInfo()}
            className={!ReviewTabPane ? "show-btn" : "hide-btn"}
            title="Show Delivery Information"
          >
            Delivery Information
          </button>
        </div>
      </div>

      <div className="tab-content">
        {/* <!-- REVIEW --> */}
        <div className={ReviewTabPane ? "show" : "hide"} id="review">
          {/* <!-- REVIEW PEOPLE  --> */}
          {product.reviews && product.reviews[0] ? (
            <div className="reviews">
              {product.reviews &&
                product.reviews.map((review) => (
                  <ReviewCard
                    key={review._id}
                    review={review}
                    numberOfReview={product.numberOfReview}
                  />
                ))}
            </div>
          ) : (
            <p className="no-reviews">No reviews Yet!</p>
          )}

          {/* <!-- ADD REVIEW --> */}
          <form className="add-review">
            <h6 className="margin-t-40">ADD REVIEW</h6>

            <div className="commuter-in">
              <label>
                {" "}
                *NAME
                <input type="text" />
              </label>

              <label>
                {" "}
                *EMAIL
                <input type="email" />
              </label>
            </div>

            <div className="product-review">
              <label>
                {" "}
                *YOUR REVIEW
                <textarea data-gramm="false" wt-ignore-input="true"></textarea>
              </label>
            </div>

            <div className="commuter-rating-btn">
              {/* <!-- Rating Stars --> */}
              <div className="stars">
                {" "}
                <span>YOUR RATING</span> <i className="fa fa-star"></i>
                <i className="fa fa-star"></i>
                <i className="fa fa-star"></i>
                <i className="fa fa-star"></i>
                <i className="fa fa-star"></i>
              </div>

              <button
                type="submit"
                className="btn btn-dark btn-small pull-right no-margin"
              >
                POST REVIEW
              </button>
            </div>
          </form>
        </div>

        {/* <!-- DESCRIPTION --> */}
        <div className={InfoTabPane ? "show" : "hide"} id="descr">
          <p>
            At MaNA-Ecomm Store, we prioritize a seamless shopping experience.
            Timely delivery and transparent communication are our top
            priorities. Find essential information about delivery options,
            timeframes, tracking, shipping costs, and more. We are dedicated to
            delivering your orders swiftly and securely, ensuring an enjoyable
            and hassle-free experience. Contact our customer support team for
            any inquiries or assistance.
            <br />
          </p>
          <div className="accordion-section">
            {accordionData.map((item, index) => (
              <Accordion
                key={index}
                title={item.title}
                content={item.content}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export default ProductInformation;
