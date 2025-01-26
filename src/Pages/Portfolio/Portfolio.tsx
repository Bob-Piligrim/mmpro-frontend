import React, { useEffect, useRef, useState } from "react";
import "./Portfolio.css";
import format from "../../Assets/Portfolio/format.png";
import VideoHover from "../../Component/Video/VideoHover/VideoHover";
import VideoHoverInterface from "../../Component/Video/VideoHoverInterface";
import VideoOtherHover from "../../Component/Video/VideoOtherHover/VideoOtherHover";
import { useParams, useNavigate } from "react-router-dom";
import Category from "../../Component/Video/CategoryInterface";
import { supportsWebP } from "../../utils";
import VideoRilsHover from "../../Component/Video/VideoRilsHover/VideoRilsHover";

interface PortfolioProps {
  categories: Category[];
}

const Portfolio: React.FC<PortfolioProps> = ({ categories }) => {
  const [selectedCategoryIndex, setSelectedCategoryIndex] = useState<number>(0);
  const selectedCategory = categories[selectedCategoryIndex];
  const [offset, setOffset] = useState<number>(0);
  const [linkItemWidth, setLinkItemWidth] = useState<number[]>([]);
  const linkContainerRef = useRef<HTMLDivElement>(null);
  const linksRef = useRef<(HTMLButtonElement | null)[]>([]);
  const portfolioContainerRef = useRef<HTMLDivElement>(null);
  const { categoryName } = useParams<{ categoryName: string }>();
  const navigate = useNavigate();
  const supportWepB = supportsWebP();

  /* Свечение постера (инкапсулировать) */
  const [boxShadowColor, setBoxShadowColor] =
    useState<string>("rgba(0, 0, 0, 0.7)");
  const imgRef = useRef<HTMLImageElement | null>(null);
  const [hoveredIdx, setHoveredIdx] = useState<number | null>(null); // Индекс наведённого изображения

  const getDominantColor = (img: HTMLImageElement) => {
    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");

    if (ctx) {
      const width = img.naturalWidth;
      const height = img.naturalHeight;
      canvas.width = width;
      canvas.height = height;
      ctx.drawImage(img, 0, 0);
      const imgData = ctx.getImageData(0, 0, width, height);
      const data = imgData.data;

      let r = 0,
        g = 0,
        b = 0;
      let count = 0;

      // Подсчет цветов по пикселям
      for (let i = 0; i < data.length; i += 4) {
        r += data[i];
        g += data[i + 1];
        b += data[i + 2];
        count++;
      }

      // Средний цвет
      r = Math.floor(r / count);
      g = Math.floor(g / count);
      b = Math.floor(b / count);
      return `rgba(${r}, ${g}, ${b}, 0.7)`; // Установите желаемую прозрачность
    }
    return "rgba(0, 0, 0, 0.5)"; // Возврат цвета по умолчанию
  };
  /* Свечение постера (инкапсулировать) */

  // Навигация
  useEffect(() => {
    const index = categories.findIndex((cat) => cat.route === categoryName);
    if (index !== -1) {
      setSelectedCategoryIndex(index);
    } else {
      // Если категория не найдена, перенаправляем на первую категорию по умолчанию
      setSelectedCategoryIndex(0);
      navigate(`/portfolio/${categories[0].route}`);
    }
  }, [categoryName, categories, navigate]);

  const [selectedVideo, setSelectedVideo] =
    useState<VideoHoverInterface | null>(null);

  const handleCategoryClick = (category: (typeof categories)[number]) => {
    const index = categories.findIndex((cat) => cat.name === category.name);
    setSelectedCategoryIndex(index);
    setOffset(0);
    navigate(`/portfolio/${category.route}`);
  };

  const handleVideoClick = (video: VideoHoverInterface) => {
    setSelectedVideo(video);
  };

  useEffect(() => {
    const updateButtonWidths = () => {
      const widths = linksRef.current.map((button) => {
        return button ? button.getBoundingClientRect().width : 0;
      });
      setLinkItemWidth(widths); // Сохраняем ширины всех кнопок в массив
    };

    updateButtonWidths();

    // Обновляем ширину при изменении размеров окна
    window.addEventListener("resize", updateButtonWidths);

    return () => {
      window.removeEventListener("resize", updateButtonWidths);
    };
  }, [categories]);

  const scrollToCategory = (index: number) => {
    setSelectedCategoryIndex(index);

    if (linkContainerRef.current) {
      // Тут ширина всего, что есть
      const totalWidth = linkItemWidth
        .slice(0, index)
        .reduce((acc, width, i) => {
          const button = linksRef.current[i];
          if (button) {
            // Ширина marginRight и borderRight
            const marginRight = parseFloat(
              getComputedStyle(button).marginRight
            );
            const borderRight = parseFloat(
              getComputedStyle(button).borderRightWidth
            );
            return acc + width + marginRight + borderRight; // Суммируем ширину и отступ
          }
          return acc; // Если кнопка null, просто возвращаем текущее значение (чтобы ошибки не было)
        }, 0);

      // Получаем ширину текущей кнопки
      const currentButtonWidth = linkItemWidth[index] || 0;

      // Получаем ширину контейнера и родителя
      const containerWidth = linkContainerRef.current.clientWidth;

      // Общее смещение для последнего элемента
      const scrollToPosition = totalWidth + currentButtonWidth;

      // Если индекс последний
      if (index === linkItemWidth.length - 1) {
        // Проверяем, чтобы при прокрутке элемент не оставался наполовину видимым (не работает так, как я хочу!!!)
        if (scrollToPosition > containerWidth) {
          linkContainerRef.current.scrollTo({
            left: scrollToPosition + 200, // Добавьте запас для полного отображения элемента
            behavior: "smooth",
          });
        } else {
          // Если элемент помещается, прокручиваем просто до него
          linkContainerRef.current.scrollTo({
            left: scrollToPosition,
            behavior: "smooth",
          });
        }
      } else {
        // Прокручиваем к текущему элементу
        linkContainerRef.current.scrollTo({
          left: totalWidth,
          behavior: "smooth",
        });
      }
    }
  };

  const nextCategory = () => {
    if (selectedCategoryIndex < categories.length - 1) {
      const newIndex = selectedCategoryIndex + 1;
      scrollToCategory(newIndex);
      navigate(`/portfolio/${categories[newIndex].route}`);
    }
  };

  const prevCategory = () => {
    if (selectedCategoryIndex > 0) {
      const newIndex = selectedCategoryIndex - 1;
      scrollToCategory(newIndex);
      navigate(`/portfolio/${categories[newIndex].route}`);
    }
  };

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          /* if (entry.isIntersecting) {
            console.log(`${entry.target.textContent} is in view`);
          } else {
            console.log(`${entry.target.textContent} is out of view`);
          } */
        });
      },
      {
        threshold: 0.1,
      }
    );

    const currentLinks = linksRef.current;

    // Наблюдаем за всеми кнопками
    currentLinks.forEach((link) => {
      if (link) observer.observe(link);
    });

    return () => {
      // Отменяем наблюдение
      currentLinks.forEach((link) => {
        if (link) observer.unobserve(link);
      });
    };
  }, [linksRef]);

  return (
    <>
      <div ref={portfolioContainerRef} className="portfolio-container">
        <div className="linkfixed-container">
          <img src={format} alt="format" />
          <div className="link-container" ref={linkContainerRef}>
            {categories.map((category, index) => (
              <button
                key={category.name}
                ref={(el) => (linksRef.current[index] = el)}
                style={{
                  transform: `translateX(${offset}px)`,
                  transition: "transform 0.6s ease",
                }}
                onClick={() => handleCategoryClick(category)}
                className={`category ${
                  selectedCategory.name === category.name ? "active" : ""
                }`}
              >
                {category.name}
              </button>
            ))}
          </div>
        </div>
        <div className="content-container">
          <div
            className={
              selectedCategory.name === "КИНО"
                ? "posterKino-container"
                : selectedCategory.name === "РИЛС"
                ? "posterRils-container"
                : "posterOther-container"
            }
          >
            {selectedCategory.content.map((video) => {
              const posterPath = supportWepB
                ? video.poster
                    ?.replace("/posters/", "/posters/webp/")
                    .replace(/\.png$/, ".webp")
                : video.poster;
              return (
                <div key={video.poster}>
                  <button
                    className="poster-button"
                    onClick={() =>
                      handleVideoClick({
                        videoUrl: video.videoUrl,
                        poster: posterPath,
                        description: video.description,
                        ageLimit: video.ageLimit,
                        videoName: video.videoName,
                        contentType: video.contentType,
                      })
                    }
                  >
                    <img
                      ref={imgRef}
                      src={posterPath}
                      alt={video.poster}
                      className={
                        selectedCategory.name === "КИНО"
                          ? "poster-kino"
                          : selectedCategory.name === "РИЛС"
                          ? "poster-rils"
                          : "poster-other"
                      }
                    />{" "}
                  </button>{" "}
                  {selectedCategory.name !== "КИНО" && (
                    <div className="other-discription">
                      {video.description && video.contentType
                        ? `${video.description}. ${video.contentType}`
                        : !video.description && video.contentType
                        ? `${video.contentType}`
                        : `${video.description}`}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
        <div className="footer-link">
          {" "}
          <button
            onClick={() => (window.location.href = "/")}
            className="portfolio-back"
          >
            <div>←</div>
            <span>Назад</span>
          </button>
          <div className="btn">
            <button
              onClick={prevCategory}
              disabled={selectedCategoryIndex === 0}
              className="btn-prev"
            >
              <div>←</div>
            </button>
            <button
              onClick={nextCategory}
              disabled={selectedCategoryIndex >= categories.length - 1}
              className="btn-next"
            >
              <div>→</div>
            </button>
          </div>
        </div>

        {selectedCategory.name === "КИНО" && selectedVideo && (
          <VideoHover
            video={{
              videoUrl: selectedVideo.videoUrl,
              description: selectedVideo.description,
              poster: selectedVideo.poster,
              ageLimit: selectedVideo.ageLimit,
              videoName: selectedVideo.videoName,
              contentType: selectedVideo.contentType,
            }}
            onBack={() => setSelectedVideo(null)}
            currentCat={categories[selectedCategoryIndex].name}
          />
        )}

        {selectedCategory.name === "РИЛС" && selectedVideo && (
          <VideoRilsHover
            video={{
              videoUrl: selectedVideo.videoUrl,
              description: selectedVideo.description,
              poster: selectedVideo.poster,
              ageLimit: selectedVideo.ageLimit,
              videoName: selectedVideo.videoName,
              contentType: selectedVideo.contentType,
            }}
            onBack={() => setSelectedVideo(null)}
            currentCat={categories[selectedCategoryIndex].name}
          />
        )}

        {selectedCategory.name !== "КИНО" &&
          selectedCategory.name !== "РИЛС" &&
          selectedVideo && (
            <VideoOtherHover
              video={{
                videoUrl: selectedVideo.videoUrl,
                description: selectedVideo.description,
                poster: selectedVideo.poster,
                ageLimit: selectedVideo.ageLimit,
                videoName: selectedVideo.videoName,
                contentType: selectedVideo.contentType,
              }}
              onBack={() => setSelectedVideo(null)}
              currentCat={categories[selectedCategoryIndex].name}
            />
          )}
      </div>
    </>
  );
};

export default Portfolio;
