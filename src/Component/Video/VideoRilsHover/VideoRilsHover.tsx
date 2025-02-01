import React, { useEffect, useState } from "react";
import "../VideoOtherHover/VideoOtherHover.css";
import "../VideoHover/VideoHover.css";
import "./VideoRilsHover.css";
import VideoHoverInterface from "../VideoHoverInterface";
import useVideoPlayer from "../useVideoPlayer";

interface VideoRilsHoverProps {
  video: VideoHoverInterface;
  onBack?: () => void;
  currentCat?: string;
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
        <div className="videoRilsInformation-container-double">
          <div>Продолжительность:</div>
          <div
            ref={progressBarRef}
            className="videoRilsLineProgress"
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
            <div className="videoRilsProgressTime">
              <div>{formatTime(currentTime)}</div>
              <div>{formatTime(duration)}</div>
            </div>
          </div>
        </div>
        <div className="videoRils-descFooter">
          <div className="videoRils-title">
            <div className="videoRils-videoName">{video.description}</div>
            <div className="videoRils-contentType">{video.contentType}</div>
          </div>
          <div className="videoRilsInformation-container">
            <div>Продолжительность:</div>
            <div
              ref={progressBarRef}
              className="videoRilsLineProgress"
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
              <div className="videoRilsProgressTime">
                <div>{formatTime(currentTime)}</div>
                <div>{formatTime(duration)}</div>
              </div>
            </div>
          </div>
          <div className="videoFooter-rils">
            <button onClick={handleBackClick} className="videoRils-footerPrev2">
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
        <div className="videoRils-title">
          <div className="videoRils-videoName">{video.description}</div>
          <div className="videoRils-contentType">{video.contentType}</div>
        </div>
        <div className="videoRilsInformation-container-double">
          <div>Продолжительность:</div>
          <div
            ref={progressBarRef}
            className="videoRilsLineProgress"
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
            <div className="videoRilsProgressTime">
              <div>{formatTime(currentTime)}</div>
              <div>{formatTime(duration)}</div>
            </div>
          </div>
        </div>
        <div className="videoFooter-rils">
          <button onClick={handleBackClick} className="videoRils-footerPrev2">
            <div>←</div> <span>Назад</span>
          </button>
        </div>
      </>
    );
  };

  return (
    <div
      className="video-containerRils"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onMouseOut={handleMouseOut}
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
          <button onClick={handleButtonClick} onTouchMove={handleButtonClick} className="OtherHover-on-off">
            <span>{isPlaying ? "❚❚" : "▶"}</span>
          </button>

          {mobile ? <MobileHover /> : <DesctopHover />}
        </div>
      </div>
    </div>
  );
};

export default VideoRilsHover;
