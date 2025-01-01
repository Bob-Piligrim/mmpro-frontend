import React, { useEffect, useRef, useState } from "react";
import "./VideoHover.css";
import VideoHoverInterface from "./VideoHoverInterface";
import btn_prev from "../../Assets/Portfolio/btn-prev.png";

/* Как пример: */

import image1 from "../../Assets/VideoHover/image 2259.png";
import image2 from "../../Assets/VideoHover/image 42.png";

const VideoHover: React.FC<VideoHoverInterface> = ({
  videoUrl,
  poster,
  description,
  ageLimit,
  videoName,
}) => {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [progress, setProgress] = useState(0);
  const [duration, setDuration] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [showInfo, setShowInfo] = useState<boolean>(true); // Состояние для видимости информации

  const handleMouseEnter = () => {
    if (videoRef.current) {
      setShowInfo(!showInfo);
    }
  };

  const handleMouseLeave = () => {
    if (videoRef.current) {
      setShowInfo(!showInfo);
    }
  };

  const handleTouchStart = () => {
    if (videoRef.current) {
      setShowInfo(!showInfo);
    }
  };

  const handlePlayPause = () => {
    const videoElement = videoRef.current;

    if (videoElement) {
        if (isPlaying) {
            videoElement.pause();
        } else {
            videoElement.play();
        }
        setIsPlaying(true);
    }
};

  const handleLoadedMetadata = () => {
    if (videoRef.current) {
      setDuration(videoRef.current.duration);
    }
  };

  // Узнаем продолжительность для линии
  const handleTimeUpdate = () => {
    if (videoRef.current) {
      const current = videoRef.current.currentTime;
      setCurrentTime(current);
      setProgress((current / duration) * 100);
    }
  };

  useEffect(() => {
    console.log(`Состояние isPlaying изменилось на: ${isPlaying}`);
  }, [isPlaying]);

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
    // разобраться в чем проблема!!!
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds < 10 ? `0${seconds}` : seconds}`;
  };

  return (
    <div
      className="video-container"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onTouchStart={handleTouchStart}
    >
      <video
        preload="auto"
        loop
        muted
        id="video"
        ref={videoRef}
        poster={poster}
        onPause={() => setIsPlaying(false)}
        onPlay={() => setIsPlaying(true)}
      >
        <source src={videoUrl} type="video/mp4" />
        Ваш браузер не поддерживает видео
      </video>

      {/* Кнопка Play */}

      <div className={showInfo ? "showInfo" : "notShowInfo"}>
        <button
          onClick={(e) => {
            e.stopPropagation(); // Останавливаем всплытие события, чтобы информация не скрылась
            handlePlayPause();
          }}
          className="on-off"
        >
          <span>{isPlaying ? "❚❚" : "▶"}</span>
        </button>

        {/* Информационный контейнер */}

        <div className="video-title">
          <div className="video-description">{description.toUpperCase()}</div>
          <div className="video-videoName">{videoName}</div>
        </div>

        <div className="information-container">
          <div className="information-container1">
            <div>Подробнее узнать о проекте:</div>
            <div className="information-image">
              <img src={image1} alt="" />
              <img src={image2} alt="" />
              <div className="ageLimit">{ageLimit}+</div>
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

      <a href="/portfolio" className="video-footerPrev">
        <img src={btn_prev} alt="" /> <span>Назад</span>
      </a>
    </div>
  );
};

export default VideoHover;
