import React, { useCallback, useEffect, useRef, useState } from "react";
import "./VideoOtherHover.css";
import "./VideoHover.css";
import VideoHoverInterface from "./VideoHoverInterface";
import btn_prev from "../../Assets/Portfolio/btn-prev.png";
import { useHeader } from "../Header/HeaderContext";

interface VideoOtherHoverProps {
  video: VideoHoverInterface;
  onBack: () => void;
  currentCat: string;
}

const VideoOtherHover: React.FC<VideoOtherHoverProps> = ({
  video,
  onBack,
  currentCat,
}) => {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [progress, setProgress] = useState(0);
  const [duration, setDuration] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [showInfo, setShowInfo] = useState<boolean>(true); // Состояние для видимости информации
  const { hideHeader, showHeader } = useHeader();

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

  const handleTouchStart = (e: React.TouchEvent) => {
    const target = e.target as HTMLElement;
    if (target.classList.contains("OtherHover-on-off")) {
      return;
    }
    if (videoRef.current) {
      setShowInfo((prev) => !prev);
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

  const handleTimeUpdate = useCallback(() => {
    if (videoRef.current) {
      const current = videoRef.current.currentTime;
      setCurrentTime(current);
      if (duration > 0) {
        setProgress((current / duration) * 100);
      }
    }
  }, [duration]);

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
        id="video"
        ref={videoRef}
        poster={video.poster}
        onPause={() => setIsPlaying(false)}
        onPlay={() => setIsPlaying(true)}
      >
        <source src={video.videoUrl} type="video/mp4" />
        Ваш браузер не поддерживает видео
      </video>

      <div
        id="OtherHoverMain"
        className={showInfo ? "showInfo" : "notShowInfo"}
      >
        <button
          onClick={(e) => {
            e.stopPropagation();
            handlePlayPause(e);
          }}
          className="OtherHover-on-off"
        >
          <span>{isPlaying ? "❚❚" : "▶"}</span>
        </button>

        <div className="videoOtherInformation-container">
          <div>Продолжительность:</div>
          <div className="videoOtherLineProgress">
            <div
              style={{
                width: `${progress}%`,
                height: "100%",
                background: "rgba(255, 209, 47, 1)",
              }}
            />
            <div className="videoOtherProgressTime">
              <div>{formatTime(duration - currentTime)}</div>
              <div>{formatTime(duration)}</div>
            </div>
          </div>
        </div>
        <div className="videoOther-title">
          <div className="videoOther-videoName">{video.description}</div>
          <div className="videoOther-contentType">{video.contentType}</div>
        </div>
      </div>
      <button
        onClick={onBack}
        className="video-footerPrev"
        id={showInfo ? "showInfo" : "notShowInfo"}
      >
        <div>←</div> <span>Назад</span>
      </button>
    </div>
  );
};

export default VideoOtherHover;
