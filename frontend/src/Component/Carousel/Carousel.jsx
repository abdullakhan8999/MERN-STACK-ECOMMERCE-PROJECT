import React from "react";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import "./main-carousel.css";
function CarouselComponent() {
  const products = [
    {
      imageSrc:
        "https://res.cloudinary.com/dwpi8ryr2/image/upload/c_scale,h_1002,w_1920/v1684826315/Slides/slide-bg-1_acedb7.jpg",
      caption: "Caption for Image 1",
    },
    {
      imageSrc:
        "https://res.cloudinary.com/dwpi8ryr2/image/upload/c_scale,h_1002,w_1920/v1684826315/Slides/slide-bg-3_ksrciz.jpg",
      caption: "Caption for Image 2",
    },
    {
      imageSrc:
        "https://res.cloudinary.com/dwpi8ryr2/image/upload/c_scale,h_1002,w_1920/v1684826315/Slides/slide-bg-1_acedb7.jpg",
      caption: "Caption for Image 3",
    },
  ];

  return (
    <Carousel
      autoPlay={true}
      infiniteLoop={true}
      showThumbs={false}
      showArrows={false}
      showStatus={false}
      swipeable={true}
    >
      {products.map((product, index) => (
        <div key={index}>
          <img
            src={product.imageSrc}
            alt={product.caption}
            style={{ height: "1002px", objectFit: "cover" }}
          />
          <div
            className="legend"
            style={{
              background: "none",
              position: "absolute",
              top: "50%",
              left: "25%",
            }}
          >
            <h3 className="legend-h3">Featured Product</h3>
            <p className="legend-p">{product.caption}</p>
            <button type="button" className="legend-btn">
              Shop Now
            </button>
          </div>
        </div>
      ))}
    </Carousel>
  );
}

export default CarouselComponent;
