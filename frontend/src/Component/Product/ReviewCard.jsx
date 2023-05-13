import React from "react";
import ReactStar from "react-rating-stars-component";
export default function ReviewCard({ review }) {
  const options = {
    edit: false,
    color: "rgba(20,20,20,0.1)",
    size: window.innerWidth < 600 ? 25 : 30,
    activeColor: "tomato",
    value: review && review.rating,
    isHalf: true,
  };
  return (
    <div className="review-card">
      <div>
        <img
          className="profilePng"
          src="/Resources/images/user.svg"
          alt="User"
        />
        <p>{review.name}</p>
        <ReactStar classNames="stars-in-review" {...options} />
      </div>
      <span className="review-comment">{review.comment}</span>
    </div>
  );
}
