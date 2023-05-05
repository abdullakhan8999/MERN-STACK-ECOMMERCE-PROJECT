import React, { useEffect } from "react";
import Header from "./Component/layout/Header/Header.js";
import Footer from "./Component/layout/Footer/Footer.js";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import WebFont from "webfontloader";
import Home from "./Component/Home/Home.js";
// import ProductDetails from "./Component/Product/ProductDetails.jsx"
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
        {/* <Route exact path="/product/:id" element={<ProductDetails />} /> */}
      </Routes>
      <Footer />
    </Router>
  );
}
