import React, { useEffect, useState } from "react";
import "./Home.css";
import { Helmet } from "react-helmet-async";
import { supportsWebP } from "../../supportWebP";

const Home: React.FC = () => {
  const [isLeftHovered, setIsLeftHovered] = useState<boolean>(false);
  const [isRightHovered, setIsRightHovered] = useState<boolean>(false);
  const [leftBackground, setLeftBackground] = useState<string>("");
  const [rightBackground, setRightBackground] = useState<string>("");

  useEffect(() => {
    const isMobile = window.matchMedia("(max-width: 767px)").matches;

    supportsWebP((isSupported) => {
      if (isSupported) {
        // Поддерживает WebP
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
    });
  }, [leftBackground, rightBackground]);

  return (
    <>
      <Helmet>
        <link rel="canonical" href="https://www.mmproduction.ru" />
        <title>Студия MMPRO - Производство видеоконтента</title>
        <meta
          name="description"
          content="MMRPO — ваша студия для создания качественного видеоконтента, включая рекламные ролики и корпоративные видео. Начните проект с нами на mmproduction.ru!"
        />
      </Helmet>
      <div className="home-background">
        <a href="/portfolio">
          <div
            className={`left-half ${isLeftHovered ? "leftHovered" : ""}`}
            style={{ backgroundImage: `url(${leftBackground})` }}
          />
        </a>

        <a href="/aboutus">
          <div
            className={`right-half ${isRightHovered ? "rightHovered" : ""}`}
            style={{ backgroundImage: `url(${rightBackground})` }}
          />
        </a>
        <div className="home-container">
          <div className="portfolio">
            <a
              href="/portfolio"
              className="portfolio-link"
              onMouseEnter={() => setIsLeftHovered(true)}
              onMouseLeave={() => setIsLeftHovered(false)}
            >
              ПОРТФОЛИО
            </a>
          </div>
          <div className="about">
            <a
              href="/aboutus"
              className="about-link"
              onMouseEnter={() => setIsRightHovered(true)}
              onMouseLeave={() => setIsRightHovered(false)}
            >
              О НАС
            </a>
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
