/* import ffmpegPath from "ffmpeg-static";
import ffprobe from "ffprobe-static";
import ffmpeg from "fluent-ffmpeg";
import path from "path";
import fs from "fs"; */

const fs = require("fs");
const path = require("path");
const ffmpeg = require("fluent-ffmpeg");
const ffmpegPath = require("ffmpeg-static");

const posterSizes = {
  kino: { width: 20, height: 20 },
};

// Проверяем, что ffmpegPath не null
if (!ffmpegPath) {
  throw new Error("ffmpeg не найден. Проверьте установку ffmpeg-static.");
}

ffmpeg.setFfmpegPath(ffmpegPath);
/* ffmpeg.setFfprobePath(ffprobe.path); */

console.log("FFmpeg Path:", ffmpegPath);
/* console.log("FFprobe Path:", ffprobe.path); */

const videosDir = path.join(__dirname, "public", "videos");
const postersDir = path.join(__dirname, "public", "posters");

// Проверяем, существует ли директория для постеров, если нет, создаём её
if (!fs.existsSync(postersDir)) {
  fs.mkdirSync(postersDir);
}

const generatePoster = (inputPath, outputPath, width, height) => {
  return new Promise((resolve, reject) => {
    ffmpeg(inputPath)
      // eslint-disable-next-line no-sparse-arrays
      .outputOptions([
        "-y",
        "-ss",
        "00:00:07",
        `-vf scale=${width}:${height}:force_original_aspect_ratio=decrease,unsharp=5:5:1.0`,
        "-frames:v",
        "1",
      ])
      .on("end", () => {
        console.log(`Постер создан: ${outputPath}`);
        resolve();
      })
      .on("error", (err) => {
        console.error(`Ошибка при создании постера: ${err.message}`);
        reject(err);
      })
      .save(outputPath);
  });
};

// Функция для обработки всех видео
const processVideos = async () => {
  try {
    const categories = fs.readdirSync(videosDir);
    for (const category of categories) {
      const categoryPath = path.join(videosDir, category);
      if (fs.lstatSync(categoryPath).isDirectory()) {
        const videoFiles = fs.readdirSync(categoryPath);

        const posterSize = posterSizes[category.toLowerCase()] || {
          width: 2160,
          height: 3840,
        };
        const { width, height } = posterSize;

        for (const videoFile of videoFiles) {
          if (path.extname(videoFile).toLowerCase() === ".mp4") {
            const inputPath = path.join(categoryPath, videoFile);
            const outputPath = path.join(
              postersDir,
              category,
              `${path.basename(videoFile, path.extname(videoFile))}.png`
            );

            // Создаем директорию для постеров, если она не существует
            fs.mkdirSync(path.dirname(outputPath), { recursive: true });
            await generatePoster(inputPath, outputPath, width, height);
          }
        }
      }
    }
  } catch (err) {
    console.error("Ошибка при обработке видео:", err);
  }
};

// Запуск процесса
processVideos();

/* // Чтение содержимого директории с видео
fs.readdir(videosDir, (err, files) => {
  if (err) {
    console.error("Ошибка чтения директории:", err);
    return;
  }

  // Проходим по всем файлам в директории
  files.forEach((file) => {
    if (file.endsWith(".mp4")) {
      // Проверяем, что файл - это видео
      const videoPath = path.join(videosDir, file);
      const posterFileName = file.replace(".mp4", ".png"); // Заменяем расширение
      const posterPath = path.join(outputDir, posterFileName); // Полный путь к постеру

      // Генерация постера
      ffmpeg(videoPath)
        .on("end", () => {
          console.log(`Постер для ${file} создан: ${posterPath}`);
        })
        .on("error", (err) => {
          console.error(
            `Ошибка при создании постера для ${file}: ${err.message}`
          );
        })
        .outputOptions("-vf", "scale=150:-1,crop=150:505") // Масштабирование с обрезкой
        .screenshots({
          timestamps: ["26%"], // Берем кадр на 26% длительности видео
          filename: posterFileName, // Имя постера
          folder: outputDir, // Папка, в которую сохраняем постеры
        });
    }
  });
}); */
