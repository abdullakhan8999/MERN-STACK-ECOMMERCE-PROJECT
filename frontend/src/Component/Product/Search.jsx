import React, { Fragment, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Search.css";
import MetaData from "../layout/MetaData";

function Search() {
  const navigate = useNavigate();
  const [keyword, setKeyword] = useState("");
  const HandleSearchSubmit = (e) => {
    e.preventDefault();
    if (keyword.trim()) {
      navigate(`/products/${keyword}`);
    } else {
      navigate(`/products`);
    }
  };
  console.log(keyword);
  return (
    <Fragment>
      <MetaData title={`Search A Products -- MaNa-Ecomm-Store`} />
      <form className="search-box" onSubmit={HandleSearchSubmit}>
        <input
          type="text"
          placeholder="Search a product..."
          onChange={(e) => setKeyword(e.target.value)}
        />
        <input type="submit" value="Search" />
      </form>
    </Fragment>
  );
}

export default Search;
