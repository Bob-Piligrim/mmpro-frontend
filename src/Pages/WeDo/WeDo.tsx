import React from "react";
import "./WeDo.css";
import arrow from "../../Assets/About/arrow.png";

const WeDo: React.FC = () => {
  return (
    <>
      <div className="services-content">
        <div className="first-services">
          <div>КИНО</div>
          <div>РЕКЛАМА</div>
          <div>ОТЧЁТНОЕ ВИДЕО</div>
          <div>РЕПОРТАЖ</div>
          <div>КУРСЫ</div>
          <div>ИНТЕРВЬЮ</div>
        </div>
        <div className="second-services">
          <div>РИЛС</div>
          <div>YOUTUBE</div>
          <div>ОНЛАЙН ТРАНСЛЯЦИЯ</div>
          <div>CG</div>
          <div>СВАДЬБА</div>
          <a href="/" className="services-link"> {/* доработать ссылку */}
            ЗАКАЗАТЬ СЪЕМКУ <img src={arrow} alt="стрелка" />{" "}
          </a>{" "}
          {/* ВРЕМЕННО!!! */}
        </div>
      </div>
    </>
  );
};

export default WeDo;
