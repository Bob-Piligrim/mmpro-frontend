import React, { useState } from "react";
import "./Home.css";

const Home: React.FC = () => {
  const [isLeftHovered, setIsLeftHovered] = useState<boolean>(false);
  const [isRightHovered, setIsRightHovered] = useState<boolean>(false);
  return (
    <>
      <div className="home-background">
        <div className={`left-half ${isLeftHovered ? "leftHovered" : ""}`} />
        <div className={`right-half ${isRightHovered ? "rightHovered" : ""}`} />
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
