import React, { useEffect } from "react";
import "./ProductImages.css";
import { useState } from "react";

function ProductImage({ images = [{ url: "" }] }) {
  const [mainImage, setMainImage] = useState(images[0]);
  useEffect(() => {
    setMainImage(images[0]);
  }, [images]);

  return (
    <section className="Wrapper">
      <div className="Main-screen">
        <img src={mainImage.url} alt={mainImage.Public_id} />
      </div>
      <div className="Sub-screen">
        {images.map((curElm, index) => {
          return (
            <figure key={index}>
              <img
                src={curElm.url}
                alt={curElm.Public_id}
                className="box-image--style"
                onClick={() => setMainImage(curElm)}
              />
            </figure>
          );
        })}
      </div>
    </section>
  );
}

export default ProductImage;
