import React from "react";
import "./HomePage.css";
import { Link } from "react-router-dom";
import { getToken } from "../../Authentication";

const HomePage = () => {
  const logoutHandler = () => {
    localStorage.clear();
  };
  return (
    <div>
      <div className="home_header">
        <h1 className="home__heading">BLOGAPP</h1>
        <ul className="home__navlist">
          <li>Home</li>
          <Link to="/createpage">
            <li>Create</li>
          </Link>
          <span className="useremail"></span>
          {getToken("Useremail")}
          <Link to="/">
            <li onClick={logoutHandler}>Logout</li>
          </Link>
        </ul>
      </div>

      <div></div>
    </div>
  );
};

export default HomePage;
