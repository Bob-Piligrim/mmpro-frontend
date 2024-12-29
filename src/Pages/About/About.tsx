import React, { useEffect, useRef, useState } from "react";
import "./About.css";
import btn_prev from "../../Assets/Portfolio/btn-prev.png";
import btn_next from "../../Assets/About/next.png";
import btn_next_mob from "../../Assets/About/nextMobile.png";
import link2 from "../../Assets/About/link2.png";
import link3 from "../../Assets/About/link3.png";
import link4 from "../../Assets/About/link4.png";
import link5 from "../../Assets/About/link5.png";

import WeDo from "../WeDo/WeDo";
import OurClients from "../OurClients/OurClients";
import Call from "../Call/Call";
import WhoAreWe from "../WhoAreYou/WhoAreWe";

const components = [
  { id: 1, component: <WhoAreWe />, title: "КТО МЫ" },
  { id: 2, component: <WeDo />, title: "МЫ ДЕЛАЕМ" },
  { id: 3, component: <OurClients />, title: "НАШИ КЛИЕНТЫ" },
  { id: 4, component: <Call />, title: "СВЯЖИТЕСЬ С НАМИ" },
];

const About: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  // для высоты .about-content-container
  const [containerHeight, setContainerHeight] = useState(0);
  const activeComponentRef = useRef<HTMLDivElement>(null);

  // для пролистывания
  const threshold = 50;
  const [startX, setStartX] = useState<number | null>(null);

  const handleNextSlide = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === components.length - 1 ? 0 : prevIndex + 1
    );
  };

  const handlePrevSlide = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? components.length - 1 : prevIndex - 1
    );
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    // начальная координата х касания
    setStartX(e.touches[0].clientX);
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (startX === null) return; // проверяем начальную точку

    const endX = e.changedTouches[0].clientX; // конечная координата х касания
    const distance = endX - startX;

    if (distance > threshold) {
      // вправо
      handlePrevSlide();
    } else if (distance < -threshold) {
      // влево
      handleNextSlide();
    }

    setStartX(null); // сброс координата
  };

  useEffect(() => {
    if (activeComponentRef.current) {
      setContainerHeight(activeComponentRef.current.clientHeight);
    }
  }, [currentIndex]);

  return (
    <>
      <div
        className="about-background"
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
      >
        <video preload="auto" id="background-video" autoPlay loop muted>
          {" "}
          {/* добавить "poster" */}
          <source src="/videos/about.mp4" type="video/mp4" />
          Ваш браузер не поддерживает видео.
        </video>
        <div
          className="about-content-container"
          style={{ height: containerHeight }}
        >
          {components.map((item, index) => (
            <div
              key={item.id}
              ref={index === currentIndex ? activeComponentRef : null}
              className={`component ${index === currentIndex ? "active" : ""}`}
            >
              <div className="count">
                <span className="main-count">{`0${currentIndex + 1}`}</span>
                <span>/</span>
                <span>04</span>
                <h2 className="title-who">{item.title}</h2>
              </div>
              <div>{item.component}</div>
            </div>
          ))}
        </div>
        <button onClick={handleNextSlide} className="next-button">
          <img src={btn_next} alt="Следующий" />
        </button>
        <div className="about-footer">
          {" "}
          <div>
            <div className="about-link-mobile">
              <a href="https://vk.com">
                <img src={link2} alt="линк" />
              </a>
              <a href="https://vk.com">
                <img src={link2} alt="линк" />
              </a>
              <a href="https://vk.com">
                <img src={link3} alt="линк" />
              </a>
              <a href="https://vk.com">
                <img src={link4} alt="линк" />
              </a>
            </div>
            <div className="about-btn-mobile">
              <button onClick={handlePrevSlide} className="footer-prev">
                <img src={btn_prev} alt="" /> <span>Назад</span>
              </button>
              <button
                onClick={handleNextSlide}
                className="next-button-mobile"
                id={currentIndex === components.length - 1 ? "last-page" : ""}
              >
                <span>Дальше</span> <img src={btn_next_mob} alt="Следующий" />{" "}
              </button>
            </div>
          </div>
          <div className="messanger">
            <a href="https://vk.com">
              <img src={link2} alt="линк" />
            </a>
            <a href="https://vk.com">
              <img src={link2} alt="линк" />
            </a>
            <a href="https://vk.com">
              <img src={link3} alt="линк" />
            </a>
            <a href="https://vk.com">
              <img src={link4} alt="линк" />
            </a>
            <a href="https://vk.com">
              <img src={link5} alt="линк" />
            </a>
          </div>
          <div className="info-links">
            <a href="/portfolio">Портфолио</a>
            <a href="https://vk.com">Контакты</a>
          </div>
        </div>
      </div>
    </>
  );
};

export default About;
