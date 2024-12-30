import React, { useState } from "react";
import MMPRO from "../../Assets/Header/MMPRO.png";
import "./Header.css";
import arrowButton from "../../Assets/Header/arrowButton.png";
import Modal from "../Modal/Modal";

const Header: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };

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
        <button onClick={toggleModal} className="header-button">
          ОСТАВИТЬ ЗАЯВКУ
          <img src={arrowButton} alt="Arrow" className="arrow-icon" />
        </button>
        {isModalOpen && <Modal onClose={toggleModal} />}
      </div>
    </>
  );
};

export default Header;
