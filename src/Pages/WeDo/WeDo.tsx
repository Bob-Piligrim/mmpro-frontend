import React, { useState } from "react";
import "./WeDo.css";
import arrow from "../../Assets/About/arrow.png";
import Modal from "../../Component/Modal/Modal";
import { Link } from "react-router-dom";
import categories from "../../Component/Video/Categories";

const WeDo: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };

  return (
    <>
      <div className="services-content">
        <div className="first-services">
          <div>
            <Link
              to={`/portfolio/${
                categories.find((cat) => cat.name === "КИНО")?.route
              }`}
              style={{ all: "unset", cursor: "pointer" }}
            >
              КИНО
            </Link>
          </div>
          <div>
            <Link
              to={`/portfolio/${
                categories.find((cat) => cat.name === "РЕКЛАМА")?.route
              }`}
              style={{ all: "unset", cursor: "pointer" }}
            >
              РЕКЛАМА
            </Link>
          </div>
          <div>
            <Link
              to={`/portfolio/${
                categories.find((cat) => cat.name === "ОТЧЁТНЫЕ ВИДЕО")?.route
              }`}
              style={{ all: "unset", cursor: "pointer" }}
            >
              ОТЧЁТНОЕ ВИДЕО
            </Link>
          </div>
          <div>
            <Link
              to={`/portfolio/${
                categories.find((cat) => cat.name === "РЕПОРТАЖ")?.route
              }`}
              style={{ all: "unset", cursor: "pointer" }}
            >
              РЕПОРТАЖ
            </Link>
          </div>
          <div>
            <Link
              to={`/portfolio/${
                categories.find((cat) => cat.name === "КУРСЫ")?.route
              }`}
              style={{ all: "unset", cursor: "pointer" }}
            >
              КУРСЫ
            </Link>
          </div>
          <div>
            <Link
              to={`/portfolio/${
                categories.find((cat) => cat.name === "ИНТЕРВЬЮ")?.route
              }`}
              style={{ all: "unset", cursor: "pointer" }}
            >
              ИНТЕРВЬЮ
            </Link>
          </div>
        </div>
        <div className="second-services">
          <div>
            <Link
              to={`/portfolio/${
                categories.find((cat) => cat.name === "РИЛС")?.route
              }`}
              style={{ all: "unset", cursor: "pointer" }}
            >
              РИЛС
            </Link>
          </div>
          <div>
            <Link
              to={`/portfolio/${
                categories.find((cat) => cat.name === "YOUTUBE")?.route
              }`}
              style={{ all: "unset", cursor: "pointer" }}
            >
              YOUTUBE
            </Link>
          </div>
          <div>
            <Link
              to={`/portfolio/${
                categories.find((cat) => cat.name === "ОНЛАЙН ТРАНСЛЯЦИЯ")
                  ?.route
              }`}
              style={{ all: "unset", cursor: "pointer" }}
            >
              ОНЛАЙН ТРАНСЛЯЦИЯ
            </Link>
          </div>
          <div>
            <Link
              to={`/portfolio/${
                categories.find((cat) => cat.name === "CG")?.route
              }`}
              style={{ all: "unset", cursor: "pointer" }}
            >
              CG
            </Link>
          </div>
          <div>
            <Link
              to={`/portfolio/${
                categories.find((cat) => cat.name === "СВАДЬБЫ")?.route
              }`}
              style={{ all: "unset", cursor: "pointer" }}
            >
              СВАДЬБА
            </Link>
          </div>
          <button onClick={toggleModal} className="services-link">
            {" "}
            ЗАКАЗАТЬ СЪЕМКУ <img src={arrow} alt="стрелка" />{" "}
          </button>{" "}
          {isModalOpen && <Modal onClose={toggleModal} />}
        </div>
      </div>
    </>
  );
};

export default WeDo;
