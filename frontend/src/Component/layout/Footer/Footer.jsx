import React from "react";
import Appstore from "../../../images/Appstore.png";
import Playstore from "../../../images/playstore.png";

import "./Footer.css";
function newFile() {
  return (
    <footer className="footer">
      <div className="leftEle">
        <h4>Download Today!</h4>
        <div className="image-down">
          <img src={Playstore} alt="playStore" />
          <img src={Appstore} alt="AppStore" />
        </div>
      </div>

      <div className="mainEle">
        <h1>MaNa-ecomm</h1>
        <p> high quality is our first priority</p>
        <p>Copyright 2023 &copy; MaNa-ecomm</p>
      </div>

      <div className="rightEle">
        <h4>FOLLOW US</h4>
        <a href="https://github.com/abdullakhan8999">GitHub</a>
        <a href="https://www.linkedin.com/in/abdulla-khan-patan-279154174/">
          Linkedin
        </a>
        <a href="https://www.instagram.com/abdulla_bin_samiullakhan/">
          Instagram
        </a>
      </div>
    </footer>
  );
}

export default newFile;
