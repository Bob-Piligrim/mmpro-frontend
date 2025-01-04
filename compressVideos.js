const fs = require("fs");
const path = require("path");
const ffmpeg = require("fluent-ffmpeg");
const ffmpegPath = require("ffmpeg-static");

// Проверяем, что ffmpegPath не null
if (!ffmpegPath) {
  throw new Error("ffmpeg не найден. Проверьте установку ffmpeg-static.");
}

// Устанавливаем путь к ffmpeg
ffmpeg.setFfmpegPath(ffmpegPath);

const compressVideo = (inputPath, outputPath) => {
  return new Promise((resolve, reject) => {
    ffmpeg(inputPath)
      .videoCodec("libx264")
      .outputOptions("-crf 23")
      .outputOptions("-preset medium")
      .outputOptions("-movflags faststart")
      .save(outputPath)
      .on("end", () => {
        console.log("Сжатие завершено, файл: ", outputPath);
        resolve();
      })
      .on("error", (err) => {
        console.log("Ошибка при сжатии: ", err.message);
        reject();
      });
  });
};

const processVideos = async () => {
  const videosDir = path.join(__dirname, "public", "videos", "new");

  try {
    const categories = fs.readdirSync(videosDir);
    for (const category of categories) {
      const categoryPath = path.join(videosDir, category);
      if (fs.lstatSync(categoryPath).isDirectory()) {
        const videoFiles = fs.readdirSync(categoryPath);
        for (const videoFile of videoFiles) {
          if (path.extname(videoFile) === ".mp4") {
            const inputPath = path.join(categoryPath, videoFile);
            const outputPath = path.join(
              categoryPath,
              `compressed_${videoFile}`
            );
            await compressVideo(inputPath, outputPath);
          }
        }
      }
    }
  } catch (err) {
    console.error("Ошибка при обработке видео", err);
  }
};

processVideos();
