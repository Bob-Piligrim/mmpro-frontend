import React, { useEffect, useRef, useState } from "react";

interface VideoHoverProps {
  videoSrc: string;
  posterSrc: string;
  projectInfo: {
    description: string;
    ageLimit: number;
  };
}

const VideoHover: React.FC<VideoHoverProps> = ({
  videoSrc,
  posterSrc,
  projectInfo,
}) => {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);

  // Нажали на мышку, видео включилось
  const handleMouseEnter = () => {
    if (videoRef.current) {
      videoRef.current.play();
      setIsPlaying(true);
    }
  };

  // Нажали мышкой, видео выключили
  const handleMouseLeave = () => {
    if (videoRef.current) {
      videoRef.current.pause();
      videoRef.current.currentTime = 0; // сбрасываем видео
      setIsPlaying(false);
    }
  };

  const handleTouchStart = () => {
    if (videoRef.current) {
      if (videoRef.current.paused) {
        videoRef.current.play();
        setIsPlaying(true);
      } else {
        videoRef.current.pause();
        setIsPlaying(false);
        videoRef.current.currentTime = 0; // останавливаем и сбрасываем
      }
    }
  };

  // Кнопка play

  const handleButtonClick = () => {
    if(videoRef.current) {
        if(isPlaying) {
            videoRef.current.pause()
        } else {
            videoRef.current.play()
        };
        setIsPlaying(!isPlaying)
    }
  }

  // Узнаем продолжительность для линии
  const handleTimeUpdate = () => {
    if (videoRef.current) {
      setProgress(
        (videoRef.current.currentTime / videoRef.current.duration) * 100
      );
    }
  };

  useEffect(() => {
    const videoElement = videoRef.current;
    if (videoElement) {
      videoElement.addEventListener("timeupdate", handleTimeUpdate);
    }
    return () => {
      if (videoElement) {
        videoElement.removeEventListener("timeupdate", handleTimeUpdate);
      }
    };
  }, [videoRef]);

  return (
    <div
      className="video-container"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onTouchStart={handleTouchStart}
    >
      <video
        className="video"
        ref={videoRef}
        style={{ display: isPlaying ? "block" : "none" }} // Показываем или скрываем видео
        poster={posterSrc}
        preload="metadata"
      >
        <source src={videoSrc} type="video/mp4" />
        Ваш браузер не поддерживает видео
      </video>

      {/* Кнопка Play */}
      {!isPlaying && (
        <button
          onClick={handleButtonClick}
          style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            borderRadius: "50%",
            backgroundColor: "white",
            border: "none",
            width: "60px",
            height: "60px",
            cursor: "pointer",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            boxShadow: "0 2px 10px rgba(0,0,0,0.3)",
          }}
        >
          <span
            style={{ fontSize: "30px", fontWeight: "bold", color: "black" }}
          >
            ▶
          </span>
        </button>
      )}

      {/* Информационный контейнер */}
      <div
        style={{
          position: "absolute",
          bottom: "10px",
          right: "10px",
          backgroundColor: "rgba(0, 0, 0, 0.7)",
          color: "#fff",
          padding: "10px",
          borderRadius: "5px",
        }}
      >
        <p>{projectInfo.description}</p>
        <div style={{ display: "flex", alignItems: "center" }}>
          <span
            style={{
              borderRadius: "50%",
              width: "20px",
              height: "20px",
              backgroundColor: "red",
              color: "#fff",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              marginRight: "5px",
            }}
          >
            {projectInfo.ageLimit}+
          </span>
          <div
            style={{
              width: "100px",
              height: "5px",
              background: "#ddd",
              borderRadius: "5px",
              overflow: "hidden",
              position: "relative",
            }}
          >
            <div
              style={{
                width: `${progress}%`,
                height: "100%",
                background: "green",
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default VideoHover;
