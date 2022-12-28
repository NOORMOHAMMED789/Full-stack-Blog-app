import React from "react";
import Login from "./Components/LoginComp/Login";
import Signup from "./Components/SingupComp/Signup";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from "./Components/HomePageComp/HomePage";
import Create from "./Components/CreateComp/Create";
const Home = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/homepage" element={<HomePage />} />
        <Route path="/createpage" element={<Create />} />
      </Routes>
    </BrowserRouter>
  );
};

export default Home;
