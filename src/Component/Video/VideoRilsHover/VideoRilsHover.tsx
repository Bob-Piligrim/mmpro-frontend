import React, { useEffect, useState } from "react";
import "../VideoOtherHover/VideoOtherHover.css";
import "../VideoHover/VideoHover.css";
import VideoHoverInterface from "../VideoHoverInterface";
import useVideoPlayer from "../useVideoPlayer";

interface VideoRilsHoverProps {
  video: VideoHoverInterface;
  onBack: () => void;
  currentCat: string;
}

const VideoRilsHover: React.FC<VideoRilsHoverProps> = ({ video, onBack }) => {
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
  const [mobile, setMobile] = useState<boolean>(false);

  const handleBackClick = () => {
    if (onBack) {
      onBack(); // Проверяем, что onBack определен
    }
  };

  useEffect(() => {
    const updateMobileOrDesctop = () => {
      const isMobile = window.matchMedia("(max-width: 481px)").matches;
      return isMobile ? setMobile(true) : setMobile(false);
    };

    updateMobileOrDesctop();

    window.addEventListener("resize", updateMobileOrDesctop);

    return () => {
      window.removeEventListener("resize", updateMobileOrDesctop);
    };
  }, [mobile]);

  const DesctopHover: React.FC = () => {
    return (
      <>
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
        <div className="videoRils-descFooter">
          <div className="videoOther-title">
            <div className="videoOther-videoName">{video.description}</div>
            <div className="videoOther-contentType">{video.contentType}</div>
          </div>
          <button onClick={handleBackClick} className="video-footerPrev2">
            <div>←</div> <span>Назад</span>
          </button>
        </div>
      </>
    );
  };

  const MobileHover: React.FC = () => {
    return (
      <>
        <div className="videoOther-title">
          <div className="videoOther-videoName">{video.description}</div>
          <div className="videoOther-contentType">{video.contentType}</div>
        </div>
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
        <button onClick={handleBackClick} className="video-footerPrev2">
          <div>←</div> <span>Назад</span>
        </button>
      </>
    );
  };

  return (
    <div
      className="video-containerRils"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onTouchStart={handleTouchStart}
      onClick={handleUserInteraction}
    >
      <div className="videoRils-secondcontainer">
        <video
          preload={shouldPlay ? "auto" : "none"}
          playsInline
          autoPlay={isSafariIosSupported ? false : true}
          id="videoRils"
          className={!isPlaying ? "grayScale" : ""}
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
          id="OtherRilsMain"
          className={showInfo ? "showInfo" : "notShowInfo"}
        >
          <button onClick={handleButtonClick} className="OtherHover-on-off">
            <span>{isPlaying ? "❚❚" : "▶"}</span>
          </button>

          {mobile ? <MobileHover /> : <DesctopHover />}
        </div>
      </div>
    </div>
  );
};

export default VideoRilsHover;
