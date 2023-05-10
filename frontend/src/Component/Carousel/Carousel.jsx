import React, { useState, useEffect } from "react";
import "./Carousel.css";

export default function Carousel({ products }) {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [currentImage, setCurrentImage] = useState(products[0].url);
  const prevSlide = () => {
    setCurrentSlide((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  };

  //   useEffect(() => {
  //     const interval = setInterval(() => {
  //       setCurrentSlide((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  //     }, 5000); // Change slide every 3 seconds

  //     return () => clearInterval(interval);
  //   }, [images.length]);

  return (
    <div className="carousel-container">
      <div className="carousel">
        <img src={currentImage} alt={`Product ${index + 1}`} />
      </div>

      <button className="carousel-prev" onClick={prevSlide}>
        &#8249;
      </button>
      <button className="carousel-next" onClick={nextSlide}>
        &#8250;
      </button>
    </div>
  );
}
