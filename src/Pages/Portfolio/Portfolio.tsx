import React, { useEffect, useRef, useState } from "react";
import "./Portfolio.css";
import format from "../../Assets/Portfolio/format.png";
import VideoHover from "../../Component/VideoHover/VideoHover";
import VideoHoverInterface from "../../Component/VideoHover/VideoHoverInterface";
import VideoOtherHover from "../../Component/VideoHover/VideoOtherHover";
import { useParams, useNavigate } from "react-router-dom";
import Category from "../../Component/VideoHover/CategoryInterface";

interface PortfolioProps {
  categories: Category[];
}

const Portfolio: React.FC<PortfolioProps> = ({ categories }) => {
  /* const [selectedCategory, setSelectedCategory] = useState(categories[0]); */
  const [selectedCategoryIndex, setSelectedCategoryIndex] = useState<number>(0);
  const selectedCategory = categories[selectedCategoryIndex];
  const [offset, setOffset] = useState<number>(0);
  const linkContainerRef = useRef<HTMLDivElement>(null);
  const linksRef = useRef<(HTMLButtonElement | null)[]>([]);
  const portfolioContainerRef = useRef<HTMLDivElement>(null);
  const [linkItemWidth, setLinkItemWidth] = useState(0);
  const [containerWidth, setContainerWidth] = useState(0);

  // для маршрутизации
  const { categoryName } = useParams<{ categoryName: string }>();
  const navigate = useNavigate();
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
    // для маршрутизации
    navigate(`/portfolio/${category.route}`);
  };

  const handleVideoClick = (video: VideoHoverInterface) => {
    setSelectedVideo(video);
  };

  // Получаем(изменяем) ширину каждого button (категории)
  useEffect(() => {
    if (linkContainerRef.current) {
      const linkItems = linkContainerRef.current.children;
      if (linkItems.length > 0) {
        setLinkItemWidth(linkItems[1].getBoundingClientRect().width);
      }
    }
  }, [linkItemWidth]);

  // Получаем ширину каждого link-container'a (всех ссылок)
  useEffect(() => {
    if (linkContainerRef.current) {
      setContainerWidth(linkContainerRef.current.getBoundingClientRect().width);
    }
  }, [containerWidth]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            console.log(`${entry.target.textContent} is in view`);
          } else {
            console.log(`${entry.target.textContent} is out of view`);
          }
        });
      },
      {
        threshold: 0.1, // 10%
      }
    );

    const currentLinks = linksRef.current;

    currentLinks.forEach((link) => {
      if (link) {
        observer.observe(link);
      }
    });

    return () => {
      currentLinks.forEach((link) => {
        if (link) {
          observer.unobserve(link);
        }
      });
    };
  }, [linkContainerRef]);

  const scrollToCategory = (index: number) => {
    setSelectedCategoryIndex(index);

    const portfolioContainerWidth = portfolioContainerRef.current?.clientWidth;
    if (portfolioContainerWidth) {
      if (portfolioContainerWidth > linkItemWidth * categories.length) {
        setOffset(0);
      } else {
        setOffset(-index * linkItemWidth);
      }
    }
  };

  const nextCategory = () => {
    if (selectedCategoryIndex < categories.length - 1) {
      const newIndex = selectedCategoryIndex + 1;
      scrollToCategory(selectedCategoryIndex + 1);
      setSelectedCategoryIndex(newIndex);
      navigate(`/portfolio/${categories[newIndex].route}`)
    }
  };

  const prevCategory = () => {
    if (selectedCategoryIndex > 0) {
      const newIndex = selectedCategoryIndex - 1; 
      scrollToCategory(selectedCategoryIndex - 1);
      setSelectedCategoryIndex(newIndex);
      navigate(`/portfolio/${categories[newIndex].route}`)
    }
  };

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
                      videoName: video.videoName,
                      contentType: video.contentType,
                    })
                  }
                >
                  <img
                    src={video.poster}
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
            ))}
          </div>
        </div>
        <div className="footer-link">
          {" "}
          <a href="/">
            <div className="circle">←</div>
            <span>Назад</span>
          </a>
          <div className="btn">
            <button
              onClick={prevCategory}
              disabled={selectedCategoryIndex === 0}
              className="btn-prev"
            >
              ←
            </button>
            <button
              onClick={nextCategory}
              disabled={selectedCategoryIndex >= categories.length - 1}
              className="btn-next"
            >
              →
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

        {selectedCategory.name !== "КИНО" && selectedVideo && (
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
