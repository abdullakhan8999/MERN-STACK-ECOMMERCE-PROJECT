import React from "react";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import "./popularProducts.css";
import CarouselCard from "./CarousalCard";

const responsive = {
  superLargeDesktop: {
    // the naming can be any, depends on you.
    breakpoint: { max: 4000, min: 1024 },
    items: 5,
    slidesToSlide: 2,
  },
  desktop: {
    breakpoint: { max: 1024, min: 800 },
    items: 3,
    slidesToSlide: 3,
  },
  tablet: {
    breakpoint: { max: 800, min: 464 },
    items: 2,
    slidesToSlide: 1,
  },
  mobile: {
    breakpoint: { max: 464, min: 0 },
    items: 1,
    slidesToSlide: 1,
  },
};

const ProductCarousel = ({ products }) => {
  const CarouselCardProduct = products
    ? products.map((product) => (
        <CarouselCard key={product._id} product={product} />
      ))
    : null;

  return (
    <Carousel
      responsive={responsive}
      autoPlaySpeed={2000}
      autoPlay={true}
      draggable={true}
      infinite={true}
      arrows={true} // Show arrow navigation
    >
      {CarouselCardProduct}
    </Carousel>
  );
};

export default ProductCarousel;
