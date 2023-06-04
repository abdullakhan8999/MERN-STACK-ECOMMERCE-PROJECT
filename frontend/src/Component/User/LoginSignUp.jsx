import React, { Fragment, useEffect, useRef, useState } from "react";
import { MdOutlineEmail, MdOutlineLock } from "react-icons/md";
import { FaUserCircle } from "react-icons/fa";
import { Link } from "react-router-dom";
import userSVG from "../../images/user.svg";
import { clearErrors, login } from "../../actions/UserAction";
import { useDispatch, useSelector } from "react-redux";
import { useAlert } from "react-alert";
import { useNavigate } from "react-router-dom";

import "./LoginSignUp.css";
import Loader from "../Loader/Loader";

function LoginSignUp() {
  const loginTab = useRef(null);
  const registerTab = useRef(null);
  const switcherTab = useRef(null);
  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  const alert = useAlert();
  const navigate = useNavigate();

  //background
  const dispatch = useDispatch();
  const { error, loading, isAuthenticated } = useSelector(
    (state) => state.user
  );
  //background

  console.log(isAuthenticated);
  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }
    if (isAuthenticated) {
      navigate(`/account`);
    }
  }, [dispatch, error, alert, navigate, isAuthenticated]);

  const switchTabs = (e, tab) => {
    if (tab === "login") {
      switcherTab.current.classList.add("shiftToNeutral");
      switcherTab.current.classList.remove("shiftToRight");

      registerTab.current.classList.remove("shiftToNeutralForm");
      loginTab.current.classList.remove("shiftToLeft");
    }
    if (tab === "register") {
      switcherTab.current.classList.add("shiftToRight");
      switcherTab.current.classList.remove("shiftToNeutral");

      registerTab.current.classList.add("shiftToNeutralForm");
      loginTab.current.classList.add("shiftToLeft");
    }
  };
  const loginSubmit = (e) => {
    //background
    e.preventDefault();
    dispatch(login(loginEmail, loginPassword));
  };

  const [user, setUser] = useState({
    name: "",
    email: "",
    password: "",
  });

  const { name, email, password } = user;
  const [avatarPreview, setAvatarPreview] = useState(userSVG);
  const registerSubmit = (e) => {
    e.preventDefault();
    const myForm = new FormData();
    myForm.set("name");
    myForm.set("email");
    myForm.set("password");
    myForm.set("avatar");
    console.log("Register");
  };

  const registerDataChange = (e) => {
    if (e.target.name === "avatar") {
      const reader = new FileReader();
      reader.onload = () => {
        if (reader.readyState === 2) {
          // upload done then
          // setAvatar(reader.result);
          setAvatarPreview(reader.result);
        }
      };
      reader.readAsDataURL(e.target.files[0]);
    } else {
      setUser({ ...user, [e.target.name]: e.target.value });
    }
  };

  return (
    <Fragment>
      {loading ? (
        <Loader />
      ) : (
        <div className="LoginSignUpContainer">
          <div className="LoginSignUpBox">
            <div className="">
              <div className="login-signUp-toggle">
                <p onClick={(e) => switchTabs(e, "login")}>LOGIN</p>
                <p onClick={(e) => switchTabs(e, "register")}>REGISTER</p>
              </div>
              <button type="submit" ref={switcherTab}></button>
            </div>
            <form className="loginForm" ref={loginTab} onSubmit={loginSubmit}>
              <div className="loginEmail">
                <MdOutlineEmail />
                <input
                  type="text"
                  placeholder="Email"
                  value={loginEmail}
                  onChange={(e) => setLoginEmail(e.target.value)}
                />
              </div>
              <div className="loginPassword">
                <MdOutlineLock />
                <input
                  type="text"
                  placeholder="Password"
                  value={loginPassword}
                  onChange={(e) => setLoginPassword(e.target.value)}
                />
              </div>
              <Link to="/password/forgot">Forgot Password?</Link>
              <input type="submit" value="Login" className="loginBtn" />
            </form>
            <form
              className="signUpForm"
              ref={registerTab}
              onSubmit={registerSubmit}
              encType="multipart/form-data"
            >
              {/* {avatarPreview && <img src={avatarPreview} alt="Avatar Preview" />} */}
              <div className="signUpName">
                <FaUserCircle />
                <input
                  type="text"
                  placeholder="Name"
                  name="name"
                  value={name}
                  onChange={registerDataChange}
                />
              </div>
              <div className="signUpEmail">
                <MdOutlineEmail />
                <input
                  type="text"
                  placeholder="Email"
                  value={email}
                  name="email"
                  onChange={registerDataChange}
                />
              </div>
              <div className="signUpPassword">
                <MdOutlineLock />
                <input
                  type="text"
                  placeholder="Password"
                  value={password}
                  name="password"
                  onChange={registerDataChange}
                />
              </div>
              <div className="" id="registerImage">
                <img src={avatarPreview} alt="Avatar Preview" />
                <input
                  type="file"
                  name="avatar"
                  accept="image/*"
                  onChange={registerDataChange}
                />
              </div>
              <input
                type="submit"
                value="Register"
                className="signUpBtn"
                // disabled={loading ? true : false}
              />
            </form>
          </div>
        </div>
      )}
    </Fragment>
  );
}

export default LoginSignUp;
