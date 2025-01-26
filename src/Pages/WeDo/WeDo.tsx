import React, { useState } from "react";
import "./WeDo.css";
import arrow from "../../Assets/About/arrow.png";
import Modal from "../../Component/Modal/Modal";

const WeDo: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };

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
          <button onClick={toggleModal} className="services-link">
            {" "}
            {/* доработать ссылку */}
            ЗАКАЗАТЬ СЪЕМКУ <img src={arrow} alt="стрелка" />{" "}
          </button>{" "}
          {isModalOpen && <Modal onClose={toggleModal} />}
          {/* ВРЕМЕННО!!! */}
        </div>
      </div>
    </>
  );
};

export default WeDo;
