import React, { Fragment, useEffect } from "react";
import { FiChevronDown } from "react-icons/fi";
import "./Home.css";
import Product from "./Product/Product.js";
import MetaData from "../layout/MetaData";
import { getProduct } from "../../actions/productAction";
import { useSelector, useDispatch } from "react-redux";
import Loader from "../layout/Loader/Loader";
// import { useAlert } from "react-alert";


// example product
const product = {
  name: "Blue TShirt",
  image: [
    {
      url: "https://lp2.hm.com/hmgoepprod?set=quality%5B79%5D%2Csource%5B%2Fcc%2Ff4%2Fccf4564f8bb0682c92f55d1136fc0869a3812dcb.jpg%5D%2Corigin%5Bdam%5D%2Ccategory%5Bkids_boys_clothing_tshirtsshirts_tshirts%5D%2Ctype%5BDESCRIPTIVESTILLLIFE%5D%2Cres%5Bm%5D%2Chmver%5B2%5D&call=url[file:/product/main]",
    },
  ],
  price: "3000",
  _id: "Abdul",
};

export default function Home() {

  // const alert = useAlert();
  const dispatch = useDispatch();
  // const { loading, error, products, productsCount } = useSelector(state => state.products);
  const { loading } = useSelector(state => state.products);
  // useSelector(state => console.log(state.products, "HOME"));


  useEffect(() => {
  //   if (error) {                                
  //     return alert.error(error);
  //   }
    dispatch(getProduct())
  }, [dispatch]);

  return (
    <Fragment>
      {
        loading ? <Loader /> : <Fragment>
          <MetaData title={"MaNa-Ecomm-Store"} />
          <div className="banner">
            <p>Welcome to MaNa-Ecomm</p>
            <h1>FIND AMAZING PRODUCTS BELOW</h1>
            <a href="#container">
              <button type="click">
                Scroll <FiChevronDown />
              </button>
            </a>
          </div>

          <h2 className="homeHeading">Featured Product</h2>

          <div className="container" id="container">
            {/* {products && products.map((product) => <Product key={product._id} product={product} />)} */}
            {product && <Product key={product._id} product={product} />}
          </div>
        </Fragment>
      }
    </Fragment>
  );
}
