import React, { useEffect, useState } from "react";
import "./ThankYou.css";
import { supportsWebP } from "../../utils";

const ThankYou: React.FC = () => {
  const [leftBackground, setLeftBackground] = useState<string>("");
  const [rightBackground, setRightBackground] = useState<string>("");
  const isSuppurtedWebP = supportsWebP();

  useEffect(() => {
    const isMobile = window.matchMedia("(max-width: 767px)").matches;

    if (isSuppurtedWebP) {
      if (isMobile) {
        setLeftBackground("/home/webp/mportfolioHover.webp");
        setRightBackground("/home/webp/maboutUsHover.webp");
      } else {
        setLeftBackground("/home/webp/portfolioHover.webp");
        setRightBackground("/home/webp/aboutUsHover.webp");
      }
      console.log(leftBackground, rightBackground);
    } else {
      if (isMobile) {
        setLeftBackground("/home/mportfolioHover.png");
        setRightBackground("/home/maboutUsHover.png");
      } else {
        setLeftBackground("/home/portfolioHover.png");
        setRightBackground("/home/aboutUsHover.png");
      }
      console.log(leftBackground, rightBackground);
    }
  }, [leftBackground, rightBackground, isSuppurtedWebP]);

  return (
    <div className="thankYou-container">
      <div  className="thankYou">
        <div
          className="left-thank-image"
          style={{ backgroundImage: `url(${leftBackground})` }}
        />
        <div
          className="right-thank-image"
          style={{ backgroundImage: `url(${rightBackground})` }}
        />
        <div className="thankYou-content">
          <h1>Спасибо за вашу заявку!</h1>
          <p>Мы свяжемся с вами в ближайшее время.</p>
          <a href="/">Перейти на главную</a>
        </div>
      </div>
    </div>
  );
};

export default ThankYou;
