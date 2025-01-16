import React, { useEffect, useState } from "react";
import "./NotFound.css";
import { supportsWebP } from "../../Pages/Portfolio/utils";

const NotFound: React.FC = () => {
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
    <div className="notFound-container">
      <div
        className="left-image"
        style={{ backgroundImage: `url(${leftBackground})` }}
      />
      <div
        className="right-image"
        style={{ backgroundImage: `url(${rightBackground})` }}
      />
      <div className="notFound-content">
        <h1>404 - Страница не найдена</h1>
        <p>К сожалению, запрашиваемая страница не существует.</p>
        <a href="/">Перейти на главную</a>
      </div>
    </div>
  );
};

export default NotFound;
