import React, { useEffect, useRef, useState } from "react";
import "./Portfolio.css";
import format from "../../Assets/Portfolio/format.png";
import btn_prev from "../../Assets/Portfolio/btn-prev.png";
import btn_next from "../../Assets/Portfolio/btn-next.png";
import categories from "../../Component/VideoHover/Categories";

const Portfolio: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState(categories[0]);
  const [offset, setOffset] = useState(0);
  const linkContainerRef = useRef<HTMLDivElement>(null);
  const touchStartRef = useRef<number>(0);

  // пересчет ширины
  useEffect(() => {
    setOffset(0);
  }, [selectedCategory]);

  const getVisibleElementWidth = (index: number): number => {
    if (linkContainerRef.current) {
      const element = linkContainerRef.current.children[index] as HTMLElement;
      return element ? element.getBoundingClientRect().width : 0; // Получаем ширину элемента по индексу
    }
    return 0; // Если элемента нет, вернуть 0
  };

  const handleNext = () => {
    const container = linkContainerRef.current;
    if (container) {
      const currentIndex = Math.floor(
        Math.abs(offset) / getVisibleElementWidth(0)
      );
      const nextIndex = currentIndex + 1;

      if (nextIndex < container.children.length) {
        const elementWidth = getVisibleElementWidth(nextIndex);
        setOffset((prev) => prev - elementWidth);
      }
    }
  };

  const handlePrev = () => {
    if (offset < 0) {
      const currentIndex = Math.floor(
        Math.abs(offset) / getVisibleElementWidth(0)
      );
      if (currentIndex > 0) {
        const elementWidth = getVisibleElementWidth(currentIndex - 1);
        setOffset((prev) => Math.min(0, prev + elementWidth));
      }
    }
  };

  // Обработчики событий для свайпа
  const handleTouchStart = (e: React.TouchEvent<HTMLDivElement>) => {
    touchStartRef.current = e.touches[0].clientX;
  };

  const handleTouchMove = (e: React.TouchEvent<HTMLDivElement>) => {
    const touchEnd = e.touches[0].clientX;
    const threshold = 50; // Минимальное расстояние для распознавания свайпа

    if (touchStartRef.current - touchEnd > threshold) {
      handleNext(); // Свайп влево
    } else if (touchEnd - touchStartRef.current > threshold) {
      handlePrev(); // Свайп вправо
    }
  };

  const handleCategoryClick = (category: (typeof categories)[number]) => {
    setSelectedCategory(category);
  };

  const isNextDisabled = () => {
    const container = linkContainerRef.current;
    return container
      ? Math.abs(offset) >= container.scrollWidth - container.clientWidth
      : true;
  };

  const isPrevDisabled = () => offset === 0;

  return (
    <>
      <div className="portfolio-background"></div>
      <div className="portfolio-container">
        <div
          className="link-container"
          ref={linkContainerRef}
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          style={{
            transform: `translateX(${offset}px)`,
          }}
        >
          <img src={format} alt="format" />
          {categories.map((category) => (
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
        <div
          className="content-container"
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
        >
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
              disabled={isPrevDisabled()}
              className="btn-prev"
            >
              <img src={btn_prev} alt="Назад" />
            </button>
            <button
              onClick={handleNext} /* Доработать, уточнить */
              disabled={isNextDisabled()}
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
