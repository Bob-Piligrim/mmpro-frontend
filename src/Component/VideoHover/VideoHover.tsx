import React, { useCallback, useEffect, useRef, useState } from "react";
import "./VideoHover.css";
import VideoHoverInterface from "./VideoHoverInterface";
import { useHeader } from "../Header/HeaderContext";

/* Как пример: */

import image1 from "../../Assets/VideoHover/image 2259.png";
import image2 from "../../Assets/VideoHover/image 42.png";
/* import categories from "./Categories";
import ProjectInformation from "../ProjectInformation/ProjectInformation";
 */
interface VideoHoverProps {
  video: VideoHoverInterface;
  onBack: () => void;
  currentCat: string;
}

const VideoHover: React.FC<VideoHoverProps> = ({
  video,
  onBack,
  currentCat,
}) => {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [progress, setProgress] = useState(0);
  const [duration, setDuration] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [showInfo, setShowInfo] = useState<boolean>(true);
  const { hideHeader, showHeader } = useHeader();

  // для страницы с подробностями, не проработан
  /*   const [selectedProject, setSelectedProject] =
    useState<VideoHoverInterface | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null); */
  // для страницы с подробностями, не проработан

  // lazy loading
  const [shouldPlay, setShouldPlay] = useState<boolean>(false);
  // lazy loading

  const handleMouseEnter = () => {
    if (videoRef.current) {
      setShowInfo(true);
      showHeader();
    }
  };

  const handleMouseLeave = (e: React.MouseEvent) => {
    if (videoRef.current) {
      if (
        e.relatedTarget &&
        (e.relatedTarget as HTMLElement).className !== "on-off"
      ) {
        setShowInfo(false);
        hideHeader();
      }
    }
  };

  const forHeader = (e: React.TouchEvent) => {
    if (e.target) {
      hideHeader();
    } else {
      showHeader();
    }
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    const target = e.target as HTMLElement;
    if (target.classList.contains("on-off")) {
      return;
    }

    if (videoRef.current) {
      setShowInfo((prev) => !prev);
      forHeader(e);
    }
  };

  const handlePlayPause = (e: React.MouseEvent) => {
    e.stopPropagation();
    const videoElement = videoRef.current;

    if (videoElement) {
      if (isPlaying) {
        videoElement.pause();
        setIsPlaying(false);
      } else {
        videoElement.play();
        setIsPlaying(true);
      }
    }
  };

  const handleLoadedMetadata = () => {
    if (videoRef.current) {
      setDuration(videoRef.current.duration);
    }
  };

  // Узнаем продолжительность для линии
  const handleTimeUpdate = useCallback(() => {
    if (videoRef.current) {
      const current = videoRef.current.currentTime;
      setCurrentTime(current);
      if (duration > 0) {
        setProgress((current / duration) * 100);
      }
    }
  }, [duration]);

  /*  useEffect(() => {
    console.log(`Состояние isPlaying изменилось на: ${isPlaying}`);
  }, [isPlaying]); */

  useEffect(() => {
    const videoElement = videoRef.current;
    if (videoElement) {
      videoElement.addEventListener("loadedmetadata", handleLoadedMetadata);
      videoElement.addEventListener("timeupdate", handleTimeUpdate);
      videoElement.play();
    }
    return () => {
      if (videoElement) {
        videoElement.removeEventListener(
          "loadedmetadata",
          handleLoadedMetadata
        );
        videoElement.removeEventListener("timeupdate", handleTimeUpdate);
      }
    };
  }, [handleTimeUpdate]);

  useEffect(() => {
    const videoElement = videoRef.current;
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            /* console.log(
              "Видео работает, ентри заработало: ",
              entry.isIntersecting
            ); */
            setShouldPlay(true);
            observer.unobserve(videoElement!);
          }
        });
      },
      { threshold: 0.5 }
    );

    if (videoElement) {
      observer.observe(videoElement);
    }

    return () => {
      if (videoElement) {
        observer.unobserve(videoElement);
      }
    };
  }, []);

  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds < 10 ? `0${seconds}` : seconds}`;
  };

  /* Для подробностей */
  /* const handleProjectClick = (project: VideoHoverInterface) => {
    setSelectedProject(project);
  };

  const handleCategoryClick = (categoryName: string) => {
    setSelectedCategory(categoryName);
    setSelectedProject(null);
  };

  // Фильтруем категории в зависимости от выбранной категории
  const currentCategory = categories.find(
    (category) => category.name === selectedCategory
  ); */

  return (
    <div
      className="video-container"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onTouchStart={handleTouchStart}
    >
      <video
        preload={shouldPlay ? "auto" : "none"}
        /* loop */
        id="video"
        ref={videoRef}
        poster={video.poster}
        onPause={() => setIsPlaying(false)}
        onPlay={() => setIsPlaying(true)}
      >
        {shouldPlay && <source src={video.videoUrl} type="video/mp4" />}
        Ваш браузер не поддерживает видео.
      </video>

      <div id={showInfo ? "showInfo" : "notShowInfo"}>
        <div className="contentShow">
          <div className="emptyContent"></div>
          <button
            onClick={(e) => {
              e.stopPropagation();
              handlePlayPause(e);
            }}
            className="on-off"
          >
            <span>{isPlaying ? "❚❚" : "▶"}</span>
          </button>
          <div className="content-information">
            <div className="video-title">
              <div className="video-description">
                {video.description.toUpperCase()}
              </div>
              <div className="video-videoName">{video.videoName}</div>
            </div>

            <div className="information-container">
              <div className="information-container1">
                {/*  {categories.map((category) => (
              <div>
                {category.content.map((project, index) => (
                  <button
                    className="handleProject"
                    key={index}
                    onClick={() =>
                      handleProjectClick({
                        videoUrl: project.videoUrl,
                        poster: project.poster,
                        description: project.description,
                        ageLimit: project.ageLimit,
                        videoName: project.videoName,
                        contentType: project.contentType,
                      })
                    }
                  >
                    Подробнее узнать о проекте:{" "}
                  </button>
                ))}
              </div>
            ))} */}
                {
                  <div>
                    <button className="handleProject" onClick={() => ({})}>
                      Подробнее узнать о проекте:{" "}
                    </button>
                  </div>
                }
                <div className="information-image">
                  <img src={image1} alt="" />
                  <img src={image2} alt="" />
                  <div className="ageLimit">{video.ageLimit}+</div>
                </div>
              </div>
              <div className="information-container2">
                <div>Продолжительность:</div>
                <div className="lineProgress">
                  <div
                    style={{
                      width: `${progress}%`,
                      height: "100%",
                      background: "rgba(255, 209, 47, 1)",
                    }}
                  />
                </div>
                <div className="progressTime">
                  <div>{formatTime(duration - currentTime)}</div>
                  <div>{formatTime(duration)}</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <button
        onClick={onBack}
        id={showInfo ? "showInfo" : "notShowInfo"}
        className="video-footerPrev"
      >
        <div className="arrow-left">←</div> <span>Назад</span>
      </button>

      {/* {selectedProject && <ProjectInformation project={selectedProject} />} */}
    </div>
  );
};

export default VideoHover;
