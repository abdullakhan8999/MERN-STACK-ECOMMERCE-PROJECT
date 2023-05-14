import React, { useEffect } from "react";
import Header from "./Component/layout/Header/Header";
import Footer from "./Component/layout/Footer/Footer";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import WebFont from "webfontloader";
import Home from "./Component/Home/Home";
import ProductDetails from "./Component/Product/ProductDetails"
import Products from "./Component/Product/Products"
import "./App.css"
export default function App() {
  //Loading font style
  useEffect(() => {
    WebFont.load({
      google: {
        families: ["Roboto", "Droid Sans", "Chilanka"],
      },
    });
  }, []);

  return (
    <Router>
      <Header />
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route exact path="/product/:id" element={<ProductDetails />} />
        <Route exact path="/products" element={<Products />} />
      </Routes>
      {/* <Footer /> */}
    </Router>
  );
}
