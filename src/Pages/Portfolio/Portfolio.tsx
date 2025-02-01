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
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [boxShadowColor, setBoxShadowColor] =
    useState<string>("rgba(0, 0, 0, 0.5)");

  const getDominantColor = (src: string): Promise<string> => {
    return new Promise((resolve) => {
      const img = new Image();
      img.src = src;

      img.onload = () => {
        // Canvas
        const canvas = document.createElement("canvas");
        const ctx = canvas.getContext("2d");

        if (ctx) {
          canvas.width = img.width;
          canvas.height = img.height;
          ctx.drawImage(img, 0, 0);
          const data = ctx.getImageData(0, 0, canvas.width, canvas.height).data;

          // Извлечение среднего цвета
          let r = 0,
            g = 0,
            b = 0,
            count = 0;

          for (let i = 0; i < data.length; i += 4) {
            r += data[i];
            g += data[i + 1];
            b += data[i + 2];
            count++;
          }

          r = Math.floor(r / count);
          g = Math.floor(g / count);
          b = Math.floor(b / count);

          resolve(`rgba(${r}, ${g}, ${b}, 0.7)`);
        }
      };

      img.onerror = () => {
        resolve("rgba(0, 0, 0, 0.5)");
      };
    });
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

  useEffect(() => {
    if (categoryName) {
      const index = categories.findIndex((cat) => cat.route === categoryName);
      if (index !== -1 && linksRef.current[index]) {
        const linkElement = linksRef.current[index];
        if (linkElement) {
          linkElement.scrollIntoView({
            behavior: "smooth",
            block: "center",
            inline: "start",
          });
        }
      }
    }
  }, [categories, categoryName]);

  const handleVideoClick = (video: VideoHoverInterface) => {
    setSelectedVideo(video);
    navigate(`/portfolio/${categoryName}/${video.id}/${video.description}`);
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
            {selectedCategory.content.map((video, index) => {
              const posterPath = supportWepB
                ? video.poster
                    ?.replace("/posters/", "/posters/webp/")
                    .replace(/\.png$/, ".webp")
                : video.poster;
              return (
                <div
                  key={video.poster}
                  style={{
                    position: "relative",
                    display: "inline-block",
                  }}
                  onMouseEnter={() => {
                    if (posterPath) {
                      getDominantColor(posterPath).then((color) =>
                        setBoxShadowColor(color)
                      );
                      setHoveredIndex(index);
                    }
                  }}
                  onMouseLeave={() => {
                    setHoveredIndex(null);
                    setBoxShadowColor("rgba(0, 0, 0, 0.5)");
                  }}
                >
                  {hoveredIndex === index &&
                    selectedCategory.name === "КИНО" && (
                      <div
                        style={{
                          position: "absolute",
                          top: "0",
                          left: "0",
                          right: "0",
                          bottom: "0",
                          backgroundColor: "transparent",
                          boxShadow: `0 0 100px ${boxShadowColor}, 
                          0 0 20px ${boxShadowColor}, 
                          0 0 30px ${boxShadowColor}, 
                          0 0 40px ${boxShadowColor}, 
                          0 0 50px ${boxShadowColor},
                          0 0 60px ${boxShadowColor},
                          0 0 70px ${boxShadowColor},
                          0 0 80px ${boxShadowColor},
                          0 0 90px ${boxShadowColor},
                          0 0 100px ${boxShadowColor}`,
                          borderRadius: "5px",
                          pointerEvents: "none",
                          transition: "box-shadow 0.3s ease-in-out",
                          zIndex: 0,
                        }}
                      />
                    )}
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
                        id: video.id,
                      })
                    }
                    style={{
                      position: "relative",
                      zIndex: 0,
                    }}
                  >
                    <img
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
            onClick={() => window.history.back()}
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
              id: selectedVideo.id,
            }}
            onBack={() => setSelectedVideo(null)}
            /*  currentCat={categories[selectedCategoryIndex].name} */
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
              id: selectedVideo.id,
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
                id: selectedVideo.id,
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
