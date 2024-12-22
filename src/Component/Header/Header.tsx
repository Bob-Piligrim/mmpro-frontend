import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import MMPRO from "../../Assets/Header/MMPRO.png";
import "./Header.css";
import arrowButton from "../../Assets/Header/arrowButton.png";
import Home from "../../Pages/Home/Home";
import Portfolio from "../../Pages/Portfolio/Portfolio";

const Header: React.FC = () => {
  return (
    <>
      <div className="header-container">
        <div className="logoword">
          <a href="/">
            <img src={MMPRO} alt="MMPRO" className="logoimage" />
          </a>
        </div>
        <div className="headerTitle-container">
          <h1 className="header-title"> МЕДИАПРОИЗВОДСТВО ПОЛНОГО ЦИКЛА</h1>
        </div>
        <button className="header-button">
          ОСТАВИТЬ ЗАЯВКУ
          <img src={arrowButton} alt="Arrow" className="arrow-icon" />
        </button>
      </div>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/portfolio" element={<Portfolio />} />
        </Routes>
      </Router>
    </>
  );
};

export default Header;
