import React, { useState } from "react";
import "./Singup.css";
import { Link } from "react-router-dom";

const URL = process.env.REACT_APP_API_URL || "http://localhost:3001";

const Signup = () => {
  const [data, setData] = useState({
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [errorMsg, setErrorMsg] = useState("");
  const [passerrorMsg, setPassErrorMsg] = useState("");
  const [cpasserrorMsg, setcPassErrorMsg] = useState("");

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

  const cpassChangeHandler = (e) => {
    setData({ ...data, confirmPassword: e.target.value });
    const { password, confirmPassword } = data;
    console.log(password);
    console.log(confirmPassword);

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
  const submitHandler = (e) => {
    e.preventDefault();
    const { email, password, confirmPassword } = data;
    fetch(`${URL}/api/v1/user/register`, {
      method: "POST",
      body: JSON.stringify({
        email: email,
        password: password,
        confirmPassword: confirmPassword,
      }),
      header: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        if (data.status === "Account already exists") {
        } else {
          alert("Registration successfull");
        }
      })
      .catch((err) => {
        alert(err.message);
      });
  };
  return (
    <div className="container1">
      <div className="login_title">SINGUP</div>

      <form className="login-body" onSubmit={submitHandler}>
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

        <Link to="/homepage">
          <button className="login-btn1">SINGUP</button>
        </Link>
      </form>
    </div>
  );
};

export default Signup;
