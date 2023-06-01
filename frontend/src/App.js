import React, { useEffect } from "react";
import Navbar from "./Component/layout/Navbar/Navbar";
import Footer from "./Component/layout/Footer/Footer";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import WebFont from "webfontloader";
import Home from "./Component/Home/Home";
import ProductDetails from "./Component/Product/ProductDetails Page/ProductDetails"
import Products from "./Component/Product/All Products page/Products"
import Search from "./Component/Product/Search.jsx"
import "./App.css";

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
      <Navbar />
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route exact path="/product/:id" element={<ProductDetails />} />
        <Route exact path="/product/:id" element={<ProductDetails />} />
        <Route exact path="/products" element={<Products />} />
        <Route path="/products/:keyword" element={<Products />} />
        <Route exact path="/search" element={<Search />} />
      </Routes>
      <Footer />
    </Router>
  );
} 