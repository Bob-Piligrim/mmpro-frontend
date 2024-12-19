import React from "react";
import "./Home.css";

const Home: React.FC = () => {
  return (
    <div className="">
      <div className="home-container">
        <div className="portfolio">
          <a href="#">ПОРТФОЛИО</a>
        </div>
        <div className="about">
          <a href="#">О НАС</a>
        </div>
      </div>
    </div>
  );
};

export default Home;
