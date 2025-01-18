// useVideoPlayer.ts
import React, { useRef, useState, useEffect, useCallback } from "react";
import { useHeader } from "../Header/HeaderContext";
import { isSafariOrIos } from "../../utils";
import VideoHoverInterface from "./VideoHoverInterface";

const isSafariIosSupported = isSafariOrIos();

const useVideoPlayer = (video: VideoHoverInterface, onBack?: () => void) => {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [progress, setProgress] = useState(0);
  const [isDragging, setIsDragging] = useState<boolean>(false);
  const [duration, setDuration] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [showInfo, setShowInfo] = useState<boolean>(true);
  const { hideHeader, showHeader } = useHeader();
  const [showPlayPrompt, setShowPlayPrompt] = useState<boolean>(false);
  const [shouldPlay, setShouldPlay] = useState<boolean>(false);

  // Логика воспроизведения (монтирования) на сафари и ios
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

  // Загрузка методанных и линии прогресса
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

  // Логика для линии загрузки
  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds < 10 ? `0${seconds}` : seconds}`;
  };

  // Логика событий после окончания видео
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

  // Логика каасания прогресса видео
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

  // Событие нажатия мышкой
  const handleMouseEnter = () => {
    if (videoRef.current) {
      setShowInfo(true);
      showHeader();
    }
  };

  // Событие ухода мышки
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

  // Собыытие нажатия пальчиками
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

  // Прячем/показываем хедер
  const forHeader = (e: React.TouchEvent) => {
    if (e.target) {
      hideHeader();
    } else {
      showHeader();
    }
  };

  // Изменения под safari и ios (ios не тестировал еще)
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

  // Для сафари и ios (ios не тестирован)
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

  // Логика для кнопочки
  const handleButtonClick = (e: React.MouseEvent) => {
    e.stopPropagation(); // Предотвращаем всплытие события
    handlePlayPause();
  };

  // Для ленивой загрузки наблюдатель
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

  return {
    video,
    onBack,
    videoRef,
    isPlaying,
    setIsPlaying,
    progress,
    isDragging,
    duration,
    currentTime,
    showInfo,
    hideHeader,
    showHeader,
    showPlayPrompt,
    shouldPlay,
    isSafariIosSupported,
    handleMouseEnter,
    handleMouseLeave,
    forHeader,
    handleTouchStart,
    handlePlayPause,
    handleUserInteraction,
    handleButtonClick,
    handleLoadedMetadata,
    handleTimeUpdate,
    handleVideoEnded,
    formatTime,
    handleProgressClick,
    handleMouseDown,
    handleMouseUp,
    handleMouseMove
  };
};
export default useVideoPlayer;
