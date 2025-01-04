import React, { useRef, useState } from "react";
import "./Portfolio.css";
import format from "../../Assets/Portfolio/format.png";
import btn_prev from "../../Assets/Portfolio/btn-prev.png";
import btn_next from "../../Assets/Portfolio/btn-next.png";
import categories from "../../Component/VideoHover/Categories";
import VideoHover from "../../Component/VideoHover/VideoHover";
import VideoHoverInterface from "../../Component/VideoHover/VideoHoverInterface";
import VideoOtherHover from "../../Component/VideoHover/VideoOtherHover";

const Portfolio: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState(categories[0]);
  const [offset, setOffset] = useState(0);
  const linkContainerRef = useRef<HTMLDivElement>(null);
  const [selectedVideo, setSelectedVideo] =
    useState<VideoHoverInterface | null>(null);

  const handleCategoryClick = (category: (typeof categories)[number]) => {
    setSelectedCategory(category);
    setOffset(0);
  };

  const handleVideoClick = (video: VideoHoverInterface) => {
    setSelectedVideo(video);
  };

  return (
    <>
      <div className="portfolio-container">
        <div className="linkfixed-container">
          <div
            className="link-container"
            ref={linkContainerRef}
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
          <a href="/">
            <img src={btn_prev} alt="" className="footer-link-img" />
            Назад
          </a>
          <div className="btn">
            <button disabled={offset === 0} className="btn-prev">
              <img src={btn_prev} alt="Назад" />
            </button>
            <button
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

        {selectedCategory.name === "КИНО" && selectedVideo && (
          <VideoHover
            poster={selectedVideo.poster}
            videoUrl={selectedVideo.videoUrl}
            description={selectedVideo.description}
            ageLimit={selectedVideo.ageLimit}
            videoName={selectedVideo.videoName}
            contentType={selectedVideo.contentType}
          />
        )}

        {selectedCategory.name !== "КИНО" && selectedVideo && (
          <VideoOtherHover
            poster={selectedVideo.poster}
            videoUrl={selectedVideo.videoUrl}
            description={selectedVideo.description}
            ageLimit={selectedVideo.ageLimit}
            videoName={selectedVideo.videoName}
            contentType={selectedVideo.contentType}
          />
        )}
      </div>
    </>
  );
};

export default Portfolio;
