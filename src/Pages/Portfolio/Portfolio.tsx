import React, { useState } from "react";
import "./Portfolio.css";
import format from "../../Assets/Portfolio/format.png";
import btn_prev from "../../Assets/Portfolio/btn-prev.png";
import btn_next from "../../Assets/Portfolio/btn-next.png";
import categories from "../../Component/VideoHover/Categories";

const Portfolio: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<
    (typeof categories)[0]
  >(categories[0]);

  /* Это для кнопок и "карусели" */
  const [currentIndex, setCurrentIndex] = useState(0);
  const numOfVisibleCategories = categories.length;

  
  const handleCategoryClick = (category: (typeof categories)[number]) => {
    setSelectedCategory(category);
  };


  // Доработать кнопки! Что именно нужно.

  const handleNext = () => {
    if (currentIndex < categories.length) {
      setCurrentIndex(currentIndex + 1);
    }
  };
  const handlePrev = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    }
  };

  return (
    <>
      <div className="portfolio-background"></div>
      <div className="portfolio-container">
        <div className="link-container">
          <img src={format} alt="format" />
          {categories
            .slice(currentIndex, currentIndex + numOfVisibleCategories)
            .map((category) => (
              <button
                key={category.name}
                onClick={() => handleCategoryClick(category)}
                className={`category ${
                  selectedCategory.name === category.name ? "active" : ""
                }`}
              >
                {category.name}
              </button>
            ))}
        </div>
        <div className="content-container">
          <div
            className={
              selectedCategory.name === "КИНО"
                ? "posterKino-container"
                : "posterOther-container"
            }
          >
            {selectedCategory.content.map((video) => (
              <div key={video.poster}>
                <a href={`${video.videoUrl}`}>
                  <img
                    src={video.poster}
                    alt={video.poster}
                    className={
                      selectedCategory.name === "КИНО"
                        ? "poster-kino"
                        : "poster-other"
                    }
                  />{" "}
                </a>{" "}
                {selectedCategory.name !== "КИНО" && (
                  <div className="other-discription">{video.description}</div>
                )}
              </div>
            ))}
          </div>
        </div>
        <div className="footer-link">
          <a href="/">
            <img src={btn_prev} alt="" className="footer-link-img" />
            Назад
          </a>
          <div className="btn">
            <button
              onClick={handlePrev} /* Доработать, уточнить */
              disabled={currentIndex === 0} 
              className="btn-prev"
            >
              <img src={btn_prev} alt="Назад" /> 
            </button>
            <button
              onClick={handleNext}  /* Доработать, уточнить */
              disabled={
                currentIndex >= categories.length - numOfVisibleCategories
              }
              className="btn-next"
            >
              <img src={btn_next} alt="Вперед" />
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Portfolio;
