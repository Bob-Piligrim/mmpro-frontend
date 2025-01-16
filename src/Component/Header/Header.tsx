import React, { useEffect, useState } from "react";
import MMPRO from "../../Assets/Header/MMPRO.png";
import mMMPRO from "../../Assets/Header/mMMPRO.png";
import "./Header.css";
import Modal from "../Modal/Modal";
import { useHeader } from "./HeaderContext";

const Header: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const { isVisible } = useHeader();
  const [logoImage, setLogoImage] = useState<string>("");

  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };

  const updateLogo = () => {
    if (window.innerWidth < 100) {
      setLogoImage(mMMPRO);
    } else {
      setLogoImage(MMPRO);
    }
  };

  useEffect(() => {
    updateLogo();

    window.addEventListener("resize", updateLogo);

    return () => {
      window.removeEventListener("resize", updateLogo);
    };
  }, []);

  return (
    <>
      <div
        id={isVisible ? "isVisible" : "notVisible"}
        className="header-container"
      >
        <div className="logoword">
          <a href="/">
            <img src={logoImage} alt="MMPRO" className="logoimage" />
          </a>
        </div>
        <div className="headerTitle-container">
          <h1 className="header-title"> МЕДИАПРОИЗВОДСТВО ПОЛНОГО ЦИКЛА</h1>
        </div>
        <button onClick={toggleModal} className="header-button">
          ОСТАВИТЬ ЗАЯВКУ
          <div className="arrow-up">↑</div>
        </button>
        {isModalOpen && <Modal onClose={toggleModal} />}
      </div>
    </>
  );
};

export default Header;
