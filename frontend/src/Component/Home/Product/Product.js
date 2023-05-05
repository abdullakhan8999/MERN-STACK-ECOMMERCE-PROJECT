import React from "react";
import { Link } from "react-router-dom";
import ReactStar from "react-rating-stars-component";


// export default function Product({ product }) {

//   return (
//     <Link className="productCard" to={product._id}>
//       <img src={product.image[0].url} alt={product.name} />
//       <p>{product.name}</p>
//       <div className="stars">
//         <ReactStar {...options} /> <span>(265 reviews)</span>
//       </div>
//       <span>{product.price}</span>
//     </Link>
//   );
// }

export default function Product({ product }) {
  const options = {
    edit: false,
    color: "rgba(20,20,20,0.1)",
    size: window.innerWidth < 600 ? 25 : 30,
    activeColor: "tomato",
    value: product.ratings,
    isHalf: true,
  };

  const imageUrl = product.images && product.images.length > 0 ? product.images[0].url : null;

  return (
    <Link className="productCard" to={`/product/${product._id}`}>
      {imageUrl && <img src={imageUrl} alt={product.name} />}
      <p>{product.name}</p>
      <div className="stars">
        <ReactStar {...options} /> <span>({product.numberOfReview} reviews)</span>
      </div>
      <span>{`$${product.price}`}</span>
    </Link>
  );
};
