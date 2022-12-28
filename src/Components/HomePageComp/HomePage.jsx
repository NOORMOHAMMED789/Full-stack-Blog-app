import React from "react";
import "./HomePage.css";
import { Link } from "react-router-dom";

const HomePage = () => {
  return (
    <div>
      <div className="home_header">
        <h1 className="home__heading">BLOGAPP</h1>
        <ul className="home__navlist">
          <li>Home</li>
          <Link to="/createpage">
            <li>Create</li>
          </Link>
          <li>Logout</li>
        </ul>
      </div>

      <div></div>
    </div>
  );
};

export default HomePage;
