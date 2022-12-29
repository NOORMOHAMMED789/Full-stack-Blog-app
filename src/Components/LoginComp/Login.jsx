import React, { useState } from "react";
import "./Login.css";
import { getToken, setToken } from "../../Authentication";
import { useNavigate } from "react-router-dom";

const URL = process.env.REACT_APP_API_URL || "http://localhost:3001";

const Login = () => {
  const navigate = useNavigate();
  const [data1, setData1] = useState({
    email1: "",
    password1: "",
  });
  const [errorMsg, setErrorMsg] = useState("");
  const [passerrorMsg, setPassErrorMsg] = useState("");
  const [message, setMessage] = useState("");

  const emailChangeHandler = (e) => {
    setData1({ ...data1, email1: e.target.value });
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
    setData1({ ...data1, password1: e.target.value });
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
    const { email1, password1 } = data1;
    fetch(`${URL}/api/v1/user/login`, {
      method: "POST",
      body: JSON.stringify({
        email: email1,
        password: password1,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        console.log("reached here");

        if (data.status === "Failed") {
          setMessage(data.message);
        } else {
          const token = data.token;
          setToken("token", token);
          if (token === getToken("token")) {
            console.log(token);
            console.log(data.email.split("@")[0]);
            setToken("Useremail", data.email.split("@")[0]);
            navigate("/HomePage");
          }
        }
      })
      .catch((e) => {
        console.log(e);
        setMessage("Server down. try after sometime !!");
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
          <button
            className="singup-btn"
            onClick={() => {
              navigate("/signup");
            }}
          >
            SIGNUP
          </button>
        </div>
      </form>
    </div>
  );
};

export default Login;
