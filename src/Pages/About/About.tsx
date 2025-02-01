import React, { useEffect, useRef, useState } from "react";
import "./About.css";
import btn_next from "../../Assets/About/next.png";
import phone from "../../Assets/About/link2.png";
import youtube from "../../Assets/About/link3.png";
import vk from "../../Assets/About/link4.png";
import tg from "../../Assets/About/link5.png";

/* import WeDo from "../WeDo/WeDo";
import OurClients from "../OurClients/OurClients";
import Call from "../Call/Call";
import WhoAreWe from "../WhoAreYou/WhoAreWe"; */
import { Link, useNavigate, useParams } from "react-router-dom";
import { ComponentsInterface } from "./Components";

interface AboutProps {
  components: ComponentsInterface[];
}

const About: React.FC<AboutProps> = ({ components }) => {
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  // для высоты .about-content-container
  /* const [containerHeight, setContainerHeight] = useState(0); */
  const activeComponentRef = useRef<HTMLDivElement>(null);
  // для пролистывания
  const threshold = 50;
  const [startX, setStartX] = useState<number | null>(null);
  const navigate = useNavigate();
  const { componentName } = useParams<{ componentName: string }>();

  useEffect(() => {
    console.log("Компонент: ", componentName);
    const index = components.findIndex(
      (component) => component.route === componentName
    );
    if (index !== -1) {
      setCurrentIndex(index);
    } else {
      setCurrentIndex(0);
      navigate(`/aboutus/${components[0].route}`);
    }
  }, [componentName, navigate, components]);

  // для номера телефона
  /*  const phoneNumber = "+79661309045";
  const [confirmed, setConfirmed] = useState(false);

  const handleCall = () => {
    if (window.confirm(`Вы хотите позвонить на ${phoneNumber}?`)) {
      setConfirmed(true);
      return (window.location.href = `tel:${phoneNumber}`);
    }
  }; */

  const handleNextSlide = () => {
    /*  setCurrentIndex((prevIndex) =>
      prevIndex === components.length - 1 ? 0 : prevIndex + 1
    );
      navigate(`/aboutus/${components[currentIndex].route}`); */
    if (currentIndex < components.length - 1) {
      const newIndex = currentIndex + 1;
      setCurrentIndex(newIndex);
      navigate(`/aboutus/${components[newIndex].route}`);
    }
  };

  const handlePrevSlide = () => {
    /* setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? components.length - 1 : prevIndex - 1
    );
    navigate(`/aboutus/${components[currentIndex].route}`); */
    if (currentIndex > 0) {
      const newIndex = currentIndex - 1;
      setCurrentIndex(newIndex);
      navigate(`/aboutus/${components[newIndex].route}`);
    }
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

  /* useEffect(() => {
    if (activeComponentRef.current) {
      setContainerHeight(activeComponentRef.current.clientHeight);
    }
  }, [currentIndex]); */

 /*  const handleBackClick = () => {
    const canGoBack = window.history.length > 1;

    if (canGoBack) {
      window.history.back();
      console.log("История есть, история: ", window.history);
    } else {
      // Вводим таймер, чтобы позволить браузеру обработать событие
      setTimeout(() => {
        window.location.href = "/";
      }, 100); // небольшая задержка
      console.log("Истории нет: ", window.history);
    }
  }; */

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
          /* style={{ minHeight: containerHeight }} */
        >
          {components.map((component, index) => (
            <div
              key={component.id}
              ref={component.id === currentIndex ? activeComponentRef : null}
              className={`component ${index === currentIndex ? "active" : ""}`}
            >
              <div className="count">
                <span className="main-count">{`0${currentIndex + 1}`}</span>
                <span>/</span>
                <span className="main-count_1">04</span>
                <h2 className="title-who">{component.title}</h2>
              </div>
              <div>{component.component({})}</div>
            </div>
          ))}
        </div>
        <button
          onClick={handlePrevSlide}
          className="prev-button"
          id={currentIndex === 0 ? "last-page-button" : ""}
        >
          <img src={btn_next} alt="Следующий" />
        </button>
        <button
          onClick={handleNextSlide}
          className="next-button"
          id={currentIndex === components.length - 1 ? "last-page-button" : ""}
        >
          <img src={btn_next} alt="Следующий" />
        </button>
        <div className="about-footer">
          {" "}
          <div>
            <div className="about-link-mobile">
              <a href="tel:+79038924705">
                <img src={phone} alt="линк" />
              </a>
              <a href="https://youtube.com/@mosmedia-yi7km?si=Bwm9_GLZHhY3GSYh">
                <img src={youtube} alt="линк" />
              </a>
              <a href="https://vk.com/mosmedia_pro">
                <img src={vk} alt="линк" />
              </a>
              <a href="https://t.me/mos_media">
                <img src={tg} alt="линк" />
              </a>
            </div>
            <div className="about-btn-mobile">
              <button
                /* onClick={() => (window.location.href = "/")} */
                onClick={() => window.location.href = "/"}
                className="footer-prev-desctop"
              >
                <div className="circle">←</div> <span>Назад</span>
              </button>
              <button onClick={handlePrevSlide} className="footer-prev-mobile">
                <div className="circle">←</div> <span>Назад</span>
              </button>
              <button
                onClick={handleNextSlide}
                className="next-button-mobile"
                id={currentIndex === components.length - 1 ? "last-page" : ""}
              >
                <span>Дальше</span> <div className="circle">→</div>
              </button>
            </div>
          </div>
          <div className="messanger">
            <a href="tel:+79038924705">
              <img src={phone} alt="линк" />
            </a>
            <a href="https://youtube.com/@mosmedia-yi7km?si=Bwm9_GLZHhY3GSYh">
              <img src={youtube} alt="линк" />
            </a>
            <a href="https://vk.com/mosmedia_pro">
              <img src={vk} alt="линк" />
            </a>
            <a href="https://t.me/mos_media">
              <img src={tg} alt="линк" />
            </a>
          </div>
          <div className="info-links">
            <a href="/portfolio">Портфолио</a>
            <Link to="/aboutus/svyazhitec_s_nami">Контакты</Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default About;
