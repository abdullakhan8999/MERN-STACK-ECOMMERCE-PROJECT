import React from "react";
import { FiMenu } from "react-icons/fi";
import { FaSearch } from "react-icons/fa";
import { Link } from "react-router-dom";
import NavLogo from "../../../images/logo.png";
import { FaShoppingCart, FaUserCircle } from "react-icons/fa";
import "./Navbar.css";

function Navbar() {
  const [isMenuOpen, setMenuOpen] = React.useState(false);

  const handleMenuBtn = () => {
    setMenuOpen(!isMenuOpen);
  };

  return (
    <div className="nav-container">
      <nav className="nav-bar">
        <Link className="nav-logo" to="/">
          <img src={NavLogo} alt="Logo-img" />
          <h1>MaNa-Ecomm</h1>
        </Link>
        <div className="nav-links">
          <ul className={`ul-links ${isMenuOpen ? "show-ul-links" : null}`}>
            <li className="nav-li">
              <Link
                onClick={() => {
                  setMenuOpen(!isMenuOpen);
                  window.scrollTo({ top: 0, behavior: "smooth" });
                }}
                to="/"
              >
                Home
              </Link>
            </li>
            <li className="nav-li">
              <Link
                onClick={() => {
                  setMenuOpen(!isMenuOpen);
                  window.scrollTo({ top: 0, behavior: "smooth" });
                }}
                to="/products"
              >
                Products
              </Link>
            </li>
            <li className="nav-li">
              <Link
                onClick={() => {
                  setMenuOpen(!isMenuOpen);
                  window.scrollTo({ top: 0, behavior: "smooth" });
                }}
                to="/about"
              >
                About
              </Link>
            </li>
            <li className="nav-li">
              <Link
                onClick={() => {
                  setMenuOpen(!isMenuOpen);
                  window.scrollTo({ top: 0, behavior: "smooth" });
                }}
                to="/contact"
              >
                Contact US
              </Link>
            </li>
            <li className="nav-li">
              <Link
                onClick={() => {
                  setMenuOpen(!isMenuOpen);
                  window.scrollTo({ top: 0, behavior: "smooth" });
                }}
                to="/search"
              >
                <FaSearch />
              </Link>
            </li>
            <li className="nav-li">
              <Link
                onClick={() => {
                  setMenuOpen(!isMenuOpen);
                  window.scrollTo({ top: 0, behavior: "smooth" });
                }}
                to="/cart"
              >
                <FaShoppingCart />
              </Link>
            </li>
            <li className="nav-li">
              <Link
                onClick={() => {
                  setMenuOpen(!isMenuOpen);
                  window.scrollTo({ top: 0, behavior: "smooth" });
                }}
                to="/login"
              >
                <FaUserCircle />
              </Link>
            </li>
          </ul>
          <button
            className="menu"
            onClick={handleMenuBtn}
            type="button"
            aria-label="Menu"
          >
            <FiMenu />
          </button>
        </div>
      </nav>
    </div>
  );
}

export default Navbar;
