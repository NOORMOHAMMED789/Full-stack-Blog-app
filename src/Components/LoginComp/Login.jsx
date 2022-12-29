import React, { useState } from "react";
import "./Login.css";
import { Link } from "react-router-dom";
import { getToken, setToken } from "../../Authentication";

const URL = process.env.REACT_APP_API_URL || "http://localhost:3001";

const Login = () => {
  const [data, setData] = useState({
    email: "",
    password: "",
  });
  const [errorMsg, setErrorMsg] = useState("");
  const [passerrorMsg, setPassErrorMsg] = useState("");
  const [message, setMessage] = useState("");

  const emailChangeHandler = (e) => {
    setData({ ...data, email: e.target.value });
    if (
      !e.target.value.match(/[^a-zA-Z0-9]/) ||
      !e.target.value.includes("@") ||
      !e.target.value.endsWith(".com")
    ) {
      setErrorMsg("Please enter a valid email");
    } else {
      setErrorMsg("");
    }
  };

  const passChangeHandler = (e) => {
    setData({ ...data, password: e.target.value });
    if (e.target.value.length < 8 || !e.target.value.match(/[^0-9]/)) {
      setPassErrorMsg(
        "Must be 8 or character and atleast contians 1number and 1 special character"
      );
    } else {
      setPassErrorMsg("");
    }
  };

  const blurHandler = () => {
    setErrorMsg("");
    setPassErrorMsg("");
  };

  const submitHandler = (e) => {
    e.preventDefault();
    const { email, password } = data;
    fetch(`${URL}/api/v1/user/login`, {
      method: "POST",
      body: JSON.stringify({
        email: email,
        password: password,
      }),
      header: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        if (data.status === "Failed") {
          setMessage(data.message);
        } else {
          const token = data.token;
          setToken("token", token);
          if (token === getToken("token")) {
            setToken("Invalid User");
          }
          <Link to="/"></Link>;
        }
      })
      .catch((err) => {
        setMessage("server down, try after sometime");
      });
  };
  return (
    <div className="container">
      <div className="login_title">LOGIN</div>

      <form className="login-body" onSubmit={submitHandler}>
        <label htmlFor="email" className="label">
          Email
        </label>
        <input
          type="email"
          id="email"
          className="input"
          required
          onChange={emailChangeHandler}
          onBlur={blurHandler}
        />
        <div className="emailerror">{errorMsg}</div>
        <label htmlFor="password" className="label">
          Password
        </label>
        <input
          type="password"
          id="password"
          className="input"
          required
          onChange={passChangeHandler}
          onBlur={blurHandler}
        />
        <div className="passerror">{passerrorMsg}</div>
        <input type="checkbox" className="checkbox" />
        <span className="remember">Remember me ?</span>

        <button className="login-btn">LOGIN</button>
        <span className="forgot">Forgot Password ?</span>
        <div className="passerror">{message}</div>

        <div className="login-footer">
          Need an account ?{" "}
          <Link to="/signup">
            <button className="singup-btn">SIGNUP</button>
          </Link>
        </div>
      </form>
    </div>
  );
};

export default Login;
