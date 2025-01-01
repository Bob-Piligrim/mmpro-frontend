import React, { useRef, useState } from "react";
import "./Portfolio.css";
import format from "../../Assets/Portfolio/format.png";
import btn_prev from "../../Assets/Portfolio/btn-prev.png";
import btn_next from "../../Assets/Portfolio/btn-next.png";
import categories from "../../Component/VideoHover/Categories";
import VideoHover from "../../Component/VideoHover/VideoHover";
import VideoHoverInterface from "../../Component/VideoHover/VideoHoverInterface";


const Portfolio: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState(categories[0]);
  const [offset, setOffset] = useState(0);
  const linkContainerRef = useRef<HTMLDivElement>(null);

  const [selectedVideo, setSelectedVideo] = useState<VideoHoverInterface | null>(
    null
  );
  /*   const touchStartRef = useRef<number>(0);
  const currentIndexRef = useRef(0); */

  const handleCategoryClick = (category: (typeof categories)[number]) => {
    setSelectedCategory(category);
    setOffset(0);
  };

  const handleVideoClick = (video: VideoHoverInterface) => {
    setSelectedVideo(video); // Устанавливаем выбранное видео
  };

  /* const handleCloseVideo = () => {
    setSelectedVideo(null); // Закрываем видео
  }; */

  /* const handleNext = () => {
    const container = linkContainerRef.current;
    if (container) {
      const widths: number[] = Array.from(container.children).map(
        (child) => child.getBoundingClientRect().width
      );
      const currentIndex = currentIndexRef.current;

      // Проверяем, можем ли мы перейти к следующему элементу
      if (currentIndex < widths.length - 1) {
        const nextButtonWidth = widths[currentIndex]; // Ширина текущего элемента
        setOffset((prev) => {
          const newOffset = prev - nextButtonWidth; // Сдвиг влево
          currentIndexRef.current += 1; // Увеличиваем индекс
          return newOffset;
        });
      } else {
        console.log("Достигнут конец элементов");
      }
    }
  };
  const handlePrev = () => {
    const container = linkContainerRef.current;
    if (container) {
      const widths: number[] = Array.from(container.children).map(
        (child) => child.getBoundingClientRect().width
      );
      const currentIndex = currentIndexRef.current;

      // Проверяем, можем ли мы вернуться к предыдущему элементу
      if (currentIndex > 0) {
        const prevButtonWidth = widths[currentIndex - 1]; // Ширина предыдущего элемента
        setOffset((prev) => {
          const newOffset = Math.min(0, prev + prevButtonWidth); // Сдвиг вправо
          currentIndexRef.current -= 1; // Уменьшаем индекс
          return newOffset;
        });
      } else {
        console.log("Достигнут начало элементов");
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
  }; */

  return (
    <>
      <div className="portfolio-background"></div>
      <div className="portfolio-container">
        <div
          className="link-container"
          ref={linkContainerRef}
          /* onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove} */
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
          /* onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove} */
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
                <button
                className="poster-button"
                  onClick={() =>
                    handleVideoClick({
                      videoUrl: video.videoUrl,
                      poster: video.poster,
                      description: video.description,
                      ageLimit: video.ageLimit,
                      videoName: video.videoName
                    })
                  } 
                >
                  <img
                    src={video.poster}
                    alt={video.poster}
                    className={
                      selectedCategory.name === "КИНО"
                        ? "poster-kino"
                        : "poster-other"
                    }
                  />{" "}
                </button>{" "}
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
              /* onClick={handlePrev} */
              disabled={offset === 0}
              className="btn-prev"
            >
              <img src={btn_prev} alt="Назад" />
            </button>
            <button
              /* onClick={handleNext} */
              disabled={
                linkContainerRef.current
                  ? Math.abs(offset) >=
                    linkContainerRef.current.scrollWidth -
                      linkContainerRef.current.clientWidth
                  : true
              }
              className="btn-next"
            >
              <img src={btn_next} alt="Вперед" />
            </button>
          </div>
        </div>
        {/* Условный рендеринг VideoPlayer */}
        {selectedVideo && (
          <VideoHover
            videoUrl={selectedVideo.videoUrl}
            poster={selectedVideo.poster}
            description={selectedVideo.description}
            ageLimit={selectedVideo.ageLimit}
            videoName={selectedVideo.videoName}
          />
        )}
      </div>
    </>
  );
};

export default Portfolio;
