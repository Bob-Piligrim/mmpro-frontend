import React, { useEffect, useState } from "react";
import "./VideoOtherHover.css";
import "../VideoHover/VideoHover.css";
import VideoHoverInterface from "../VideoHoverInterface";
import useVideoPlayer from "../useVideoPlayer";

interface VideoOtherHoverProps {
  video: VideoHoverInterface;
  onBack?: () => void;
  currentCat?: string;
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
    handleMouseOut,
    handleTouchStart,
    handleUserInteraction,
    handleButtonClick,
    formatTime,
    handleProgressClick,
    handleTouchProgressClick,
    progressBarRef,
    /* handleMouseDown,
    handleMouseUp,
    handleMouseMove, */
    handleBackClick,
  } = useVideoPlayer(video, onBack);
  const [mobile, setMobile] = useState<boolean>(false);

  useEffect(() => {
    const updateMobileOrDesctop = () => {
      const isMobile = window.matchMedia("(max-width: 656px)").matches;
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
          ref={progressBarRef}
            className="videoOtherLineProgress"
            style={{ cursor: "pointer" }}
            onClick={handleProgressClick}
            /* onMouseDown={handleMouseDown}
            onMouseUp={handleMouseUp}
            onMouseMove={handleMouseMove} */
            onTouchStart={handleTouchProgressClick}
            onTouchMove={handleTouchProgressClick}
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
        <div className="videoOther-descFooter">
          <div className="videoOther-title">
            <div className="videoOther-videoName">{video.description}</div>
            <div className="videoOther-contentType">{video.contentType}</div>
          </div>
          <div className="videoFooter-other">
            <button onClick={handleBackClick} className="video-footerPrev2">
              <div>←</div> <span>Назад</span>
            </button>
          </div>
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
            ref={progressBarRef}
            className="videoOtherLineProgress"
            style={{ cursor: "pointer" }}
            onClick={handleProgressClick}
            /* onMouseDown={handleMouseDown}
            onMouseUp={handleMouseUp}
            onMouseMove={handleMouseMove} */
            onTouchStart={handleTouchProgressClick}
            onTouchMove={handleTouchProgressClick}
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
        <div className="videoFooter-other">
          <button onClick={handleBackClick} className="video-footerPrev2">
            <div>←</div> <span>Назад</span>
          </button>
        </div>
      </>
    );
  };

  return (
    <div
      className="video-container"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onMouseOut={handleMouseOut}
      onTouchStart={handleTouchStart}
      onClick={handleUserInteraction}
    >
      <video
        preload={shouldPlay ? "auto" : "none"}
        playsInline
        autoPlay={isSafariIosSupported ? false : true}
        id="video"
        className={!isPlaying ? "grayScale" : ""}
        ref={videoRef}
        poster={video.poster}
        onPause={() => setIsPlaying(false)}
        onPlay={() => setIsPlaying(true)}
        /* onCanPlayThrough={() => videoRef.current?.play()} */
      >
        {shouldPlay && <source src={video.videoUrl} type="video/mp4" />}
        Ваш браузер не поддерживает видео
      </video>
      <div
        id="OtherHoverMain"
        className={showInfo ? "showInfo" : "notShowInfo"}
      >
        <button onClick={handleButtonClick} onTouchMove={handleButtonClick} className="OtherHover-on-off">
          <span>{isPlaying ? "❚❚" : "▶"}</span>
        </button>

        {mobile ? <MobileHover /> : <DesctopHover />}
      </div>
    </div>
  );
};

export default VideoOtherHover;
