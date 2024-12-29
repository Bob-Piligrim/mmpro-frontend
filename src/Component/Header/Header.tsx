import React from "react";
import MMPRO from "../../Assets/Header/MMPRO.png";
import "./Header.css";
import arrowButton from "../../Assets/Header/arrowButton.png";

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
    </>
  );
};

export default Header;
