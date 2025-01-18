import React from "react";
import "./VideoHover.css";
import VideoHoverInterface from "../VideoHoverInterface";

/* Как пример: */

import image1 from "../../../Assets/VideoHover/image 2259.png";
import image2 from "../../../Assets/VideoHover/image 42.png";
import useVideoPlayer from "../useVideoPlayer";
/* import categories from "./Categories";
import ProjectInformation from "../ProjectInformation/ProjectInformation";
 */
interface VideoHoverProps {
  video: VideoHoverInterface;
  onBack?: () => void;
  currentCat: string;
}

const VideoHover: React.FC<VideoHoverProps> = ({ video, onBack }) => {
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
            onClick={handleButtonClick}
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
        onClick={handleBackClick}
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
