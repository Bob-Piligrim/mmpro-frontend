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
  onBack?: () => void;
  currentCat: string;
}

// для сафари:
/* const isSafari = (): boolean => {
  const userAgent = navigator.userAgent;
  return /Safari/.test(userAgent) && !/Chrome/.test(userAgent);
}; */

const isSafariOrIos = (): boolean => {
  const userAgent = navigator.userAgent;
  const isSafari = /Safari/.test(userAgent) && !/Chrome/.test(userAgent); // Проверка на Safari
  const isIOS = /iPhone|iPad|iPod/.test(userAgent); // Проверка на iOS устройство
  return isSafari || isIOS; // Возвращаем true, если это Safari или iOS
};

const VideoHover: React.FC<VideoHoverProps> = ({
  video,
  onBack,
  /*   currentCat, */
}) => {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [progress, setProgress] = useState(0);
  const [isDragging, setIsDragging] = useState<boolean>(false);
  const [duration, setDuration] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [showInfo, setShowInfo] = useState<boolean>(true);
  const { hideHeader, showHeader } = useHeader();

  // для сафари:
  const [showPlayPrompt, setShowPlayPrompt] = useState<boolean>(false);

  useEffect(() => {
    if (isSafariOrIos()) {
      setShowPlayPrompt(true);
      console.log("Состояние под сафари и ios: ", showPlayPrompt);
      console.log("Состояние проигрывания для сафари и ios: ", isPlaying);
      const videoElement = document.getElementById("video");
      if (videoElement) {
        videoElement.style.opacity = "1";
      }
    } else {
      setShowPlayPrompt(false);
      setIsPlaying(true);
      console.log("Состояние под сафари и ios: ", showPlayPrompt);
      console.log("Состояние проигрывания для сафари и ios: ", isPlaying);
    }
  }, [isPlaying, showPlayPrompt]);

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

  /* const handlePlayPause = (e: React.MouseEvent) => {
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
  }; */

  //Для сафари
  const handlePlayPause = () => {
    const videoElement = videoRef.current;
    console.log("handlePlayPause called, isPlaying:", isPlaying); // Отладка
    if (videoElement) {
      if (isPlaying) {
        console.log("Pausing video"); // Отладка
        videoElement.pause();
        setIsPlaying(false);
      } else {
        console.log("Playing video"); // Отладка
        if (isSafariOrIos()) {
          setShowPlayPrompt(true);
        }
        if (isSafariOrIos() && !isPlaying) {
          videoElement.play();
          setIsPlaying(true);
        } else if (isSafariOrIos() && isPlaying) {
          videoElement.pause();
          setIsPlaying(false);
        } else {
          videoElement
            .play()
            .then(() => {
              console.log("Video is now playing"); // Отладка
              setIsPlaying(true);
            })
            .catch((error) => {
              console.log("Ошибка воспроизведения", error);
              setIsPlaying(false);
            });
        }
      }
    } else {
      console.log("videoElement is null"); // Отладка
    }
  };

  //Для сафари
  const handleUserInteraction = () => {
    const videoElement = videoRef.current;
    if (videoElement && isSafariOrIos() && !isPlaying) {
      // Для Safari: запускаем воспроизведение при взаимодействии пользователя
      videoElement
        .play()
        .then(() => {
          setIsPlaying(true);
          setShowPlayPrompt(false);
        })
        .catch(() => {
          console.log("Ошибка воспроизведения");
          setIsPlaying(false);
        });
    } else if (videoElement && isSafariOrIos() && isPlaying) {
      videoElement.pause();
      setIsPlaying(false);
    }
  };

  const handleButtonClick = (e: React.MouseEvent) => {
    e.stopPropagation(); // Предотвращаем всплытие события
    handlePlayPause(); // Вызываем функцию для воспроизведения/остановки видео
  };

  const handleLoadedMetadata = () => {
    if (videoRef.current) {
      if (isSafariOrIos()) {
        videoRef.current.pause();
        setIsPlaying(false);
      } else {
        videoRef.current.play();
        setIsPlaying(true);
      }
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

  const handleVideoEnded = () => {
    setIsPlaying(false); // Устанавливаем состояние на "не играет"
    setCurrentTime(0); // Сбрасываем текущее время
    setProgress(0); // Сбрасываем прогресс
  };

  useEffect(() => {
    const videoElement = videoRef.current;
    if (videoElement) {
      videoElement.addEventListener("loadedmetadata", handleLoadedMetadata);
      videoElement.addEventListener("timeupdate", handleTimeUpdate);
      videoElement.addEventListener("ended", handleVideoEnded);
      /* videoElement.play(); */
    }
    return () => {
      if (videoElement) {
        videoElement.removeEventListener(
          "loadedmetadata",
          handleLoadedMetadata
        );
        videoElement.removeEventListener("timeupdate", handleTimeUpdate);
        videoElement.removeEventListener("ended", handleVideoEnded);
      }
    };
  }, [handleTimeUpdate]);

  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds < 10 ? `0${seconds}` : seconds}`;
  };

  const handleProgressClick = (e: React.MouseEvent<HTMLDivElement>) => {
    const progressBar = e.currentTarget as HTMLDivElement;
    const rect = progressBar.getBoundingClientRect();
    const offsetX = e.clientX - rect.left; // Позиция клика относительно прогресс-бара
    /* const newProgress = offsetX / rect.width; */ // Новое значение прогресса (от 0 до 1)
    const newProgress = Math.max(0, Math.min(1, offsetX / rect.width)); // Ограничиваем значение от 0 до 1
    const newTime = newProgress * duration; // Новое время видео
    if (videoRef.current) {
      videoRef.current.currentTime = newTime; // Устанавливаем новое время
      setCurrentTime(newTime); // Обновляем состояние текущего времени
    }
  };

  const handleMouseDown = () => {
    setIsDragging(true);
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (isDragging) {
      handleProgressClick(e);
    }
  };

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

  useEffect(() => {
    const playVideo = async () => {
      if (videoRef.current) {
        try {
          await videoRef.current.play();
          console.log("Видео работает");
        } catch (error) {
          console.log("Ошибка воспроизведения");
        }
      }
    };

    playVideo();
  }, []);

  return (
    <div
      className="video-container"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onTouchStart={handleTouchStart}
      onClick={handleUserInteraction}
    >
      <video
        preload={shouldPlay ? "auto" : "none"}
        playsInline
        autoPlay={isSafariOrIos() ? false : true}
        id="video"
        ref={videoRef}
        poster={video.poster}
        onPause={() => setIsPlaying(false)}
        onPlay={() => setIsPlaying(true)}
        onCanPlayThrough={() => videoRef.current?.play()}
      >
        {shouldPlay && <source src={video.videoUrl} type="video/mp4" />}
        Ваш браузер не поддерживает видео.
      </video>
      <div id={showInfo ? "showInfo" : "notShowInfo"}>
        <div className="contentShow">
          <div className="emptyContent"></div>
          <button
            /* onClick={(e) => {
              e.stopPropagation();
              handlePlayPause();
            }} */
            onClick={handleButtonClick}
            className="on-off"
          >
            <span>{isPlaying ? "❚❚" : "▶"}</span>
          </button>
          {/* {showPlayPrompt && !isPlaying && (
            <div className="play-prompt">
              <p>Нажмите "Play", чтобы начать воспроизведение видео.</p>
            </div>
          )} */}
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
                <div
                  className="lineProgress"
                  style={{ cursor: "pointer" }}
                  onClick={handleProgressClick}
                  onMouseDown={handleMouseDown}
                  onMouseUp={handleMouseUp}
                  onMouseMove={handleMouseMove}
                >
                  <div
                    style={{
                      width: `${progress}%`,
                      height: "100%",
                      background: "rgba(255, 209, 47, 1)",
                      cursor: "pointer",
                    }}
                  />
                </div>
                <div className="progressTime">
                  <div>{formatTime(currentTime)}</div>
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
