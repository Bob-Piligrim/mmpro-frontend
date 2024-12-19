import React from "react";
import MMPRO from "../../Assets/Header/MMPRO.png";
import "./Header.css";

const Header: React.FC = () => {
  return (
    <>
      <div className="header-container">
        <div className="logoword">
          <img src={MMPRO} alt="MMPRO" />
        </div>
        <div className="headerTitle-container">
          <h1 className="header-title"> МЕДИАПРОИЗВОДСТВО ПОЛНОГО ЦИКЛА</h1>
        </div>
        <button className="header-button">Оставить заявку</button>{" "}
        {/* Нужно поставить стрелку после текста!!! */}
      </div>
    </>
  );
};

export default Header;
