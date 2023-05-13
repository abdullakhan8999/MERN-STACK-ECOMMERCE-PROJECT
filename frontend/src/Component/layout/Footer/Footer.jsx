import React from "react";
import Appstore from "../../../images/Appstore.png";
import Playstore from "../../../images/playstore.png";
import "./Footer.css";
export default function Footer() {
  return (
    <footer id="footer">
      <div className="leftFooter">
        <h4>Download Today!</h4>
        <img src={Playstore} alt="playStore" />
        <img src={Appstore} alt="AppStore" />
      </div>

      <div className="midFooter">
        <h1>MaNa-ecomm</h1>
        <p> high quality is our first priority</p>
        <p>Copyright 2023 &copy; MaNa-ecomm</p>
      </div>

      <div className="rightFooter">
        <h4>FOLLOW US</h4>
        <a href="https://github.com/abdullakhan8999">
          GitHub
        </a>
        <a
          href="https://www.linkedin.com/in/abdulla-khan-patan-279154174/"
        
        >
          Linkedin
        </a>
        <a
          href="https://www.instagram.com/abdulla_bin_samiullakhan/"
        
        >
          Instagram
        </a>
      </div>
    </footer>
  );
}
