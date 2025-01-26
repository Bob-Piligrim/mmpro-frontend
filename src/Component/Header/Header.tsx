import React, { useEffect, useState } from "react";
import "./Header.css";
import Modal from "../Modal/Modal";
import { useHeader } from "./HeaderContext";
import { supportsWebP } from "../../utils";

const Header: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const { isVisible } = useHeader();
  const [logoImage, setLogoImage] = useState<string>("");
  const isSuppurtedWebP = supportsWebP();

  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };

  useEffect(() => {
    const isMobile = window.matchMedia("(max-width: 767px)").matches;

    if (isSuppurtedWebP) {
      if (isMobile) {
        setLogoImage("/header/webp/mMMPRO.webp");
      } else {
        setLogoImage("/header/webp/MMPRO.webp");
      }
      console.log(logoImage);
    } else {
      if (isMobile) {
        setLogoImage("/header/mMMPRO.png");
      } else {
        setLogoImage("/header/MMPRO.png");
      }
      console.log(logoImage);
    }
  }, [logoImage, isSuppurtedWebP]);

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
