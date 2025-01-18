import React from "react";
import "./VideoOtherHover.css";
import "../VideoHover/VideoHover.css";
import VideoHoverInterface from "../VideoHoverInterface";
import useVideoPlayer from "../useVideoPlayer";

interface VideoOtherHoverProps {
  video: VideoHoverInterface;
  onBack: () => void;
  currentCat: string;
}

const VideoOtherHover: React.FC<VideoOtherHoverProps> = ({ video, onBack }) => {
  const {
    videoRef,
    isPlaying,
    setIsPlaying,
    progress,
    duration,
    currentTime,
    showInfo,
    shouldPlay,
    isSafariIosSupported,
    handleMouseEnter,
    handleMouseLeave,
    handleTouchStart,
    handleUserInteraction,
    handleButtonClick,
    formatTime,
    handleProgressClick,
    handleMouseDown,
    handleMouseUp,
    handleMouseMove,
  } = useVideoPlayer(video, onBack);

  const handleBackClick = () => {
    if (onBack) {
      onBack(); // Проверяем, что onBack определен
    }
  };

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
        autoPlay={isSafariIosSupported ? false : true}
        /* loop */
        id="video"
        ref={videoRef}
        poster={video.poster}
        onPause={() => setIsPlaying(false)}
        onPlay={() => setIsPlaying(true)}
        onCanPlayThrough={() => videoRef.current?.play()}
      >
        {shouldPlay && <source src={video.videoUrl} type="video/mp4" />}
        Ваш браузер не поддерживает видео
      </video>

      <div
        id="OtherHoverMain"
        className={showInfo ? "showInfo" : "notShowInfo"}
      >
        <button onClick={handleButtonClick} className="OtherHover-on-off">
          <span>{isPlaying ? "❚❚" : "▶"}</span>
        </button>

        <div className="videoOtherInformation-container">
          <div>Продолжительность:</div>
          <div
            className="videoOtherLineProgress"
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
              }}
            />
            <div className="videoOtherProgressTime">
              <div>{formatTime(currentTime)}</div>
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
        onClick={handleBackClick}
        className="video-footerPrev2"
        id={showInfo ? "showInfo" : "notShowInfo"}
      >
        <div>←</div> <span>Назад</span>
      </button>
    </div>
  );
};

export default VideoOtherHover;
