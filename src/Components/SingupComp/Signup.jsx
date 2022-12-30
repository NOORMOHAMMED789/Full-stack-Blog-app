import React, { useState } from "react";
import "./Singup.css";
import { useNavigate } from "react-router-dom";
const URL = process.env.REACT_APP_API_URL || "http://localhost:3001";

const Signup = () => {
  const navigate = useNavigate();
  const [userData, setUserData] = useState({
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [errorMsg, setErrorMsg] = useState("");
  const [passerrorMsg, setPassErrorMsg] = useState("");
  const [cpasserrorMsg, setcPassErrorMsg] = useState("");

  const emailChangeHandler = (e) => {
    setUserData({ ...userData, email: e.target.value });
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
    setUserData({ ...userData, password: e.target.value });
    if (e.target.value.length < 8 || !e.target.value.match(/[^0-9]/)) {
      setPassErrorMsg(
        "Must be 8 or character and atleast contians 1number and 1 special character"
      );
    } else {
      setPassErrorMsg("");
    }
  };

  const cpassChangeHandler = (e) => {
    setUserData({ ...userData, confirmPassword: e.target.value });
    const { password, confirmPassword } = userData;
    if (e.target.value.length < 8 || !e.target.value.match(/[^0-9]/)) {
      setcPassErrorMsg(
        "Must be 8 or character and atleast contians 1number and 1 special character"
      );
    } else if (password.length !== confirmPassword.length) {
      setcPassErrorMsg("Password doesn't match");
    } else {
      setcPassErrorMsg("");
    }
  };

  const blurHandler = () => {
    setErrorMsg("");
    setPassErrorMsg("");
    setcPassErrorMsg("");
  };
  const submitHandler1 = (e) => {
    e.preventDefault();
    const { email, password, confirmPassword } = userData;

    fetch(`${URL}/api/v1/user/register`, {
      method: "POST",
      body: JSON.stringify({
        email: email,
        password: password,
        confirmPassword: confirmPassword,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        if (data.message === "Account already exists") {
          alert("User Already Exists.Please, Login !!!");
          navigate("/");
        } else {
          alert("Registration Successful");
          navigate("/");
        }
      })
      .catch((e) => {
        alert(e.message);
      });
  };
  return (
    <div className="container1">
      <div className="login_title">SINGUP</div>

      <form className="login-body" onSubmit={submitHandler1}>
        <label htmlFor="email" className="label">
          Email
        </label>
        <input
          type="email"
          id="email"
          required
          className="input"
          onChange={emailChangeHandler}
          onBlur={blurHandler}
        />
        <div className="emailerror error">{errorMsg}</div>
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
        <div className="passerror error">{passerrorMsg}</div>

        <label htmlFor="password" className="label">
          Confirm Password
        </label>
        <input
          type="password"
          id="password"
          className="input"
          required
          onChange={cpassChangeHandler}
          onBlur={blurHandler}
        />
        <div className="passerror error">{cpasserrorMsg}</div>

        <button className="login-btn1">SINGUP</button>
      </form>
    </div>
  );
};

export default Signup;
