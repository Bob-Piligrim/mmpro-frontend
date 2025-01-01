import ffmpegPath from "ffmpeg-static";
import ffprobe from "ffprobe-static";
import ffmpeg from "fluent-ffmpeg";
import path from "path";
import fs from "fs";

// Проверяем, что ffmpegPath не null
if (!ffmpegPath) {
  throw new Error("ffmpeg не найден. Проверьте установку ffmpeg-static.");
}

ffmpeg.setFfmpegPath(ffmpegPath);
ffmpeg.setFfprobePath(ffprobe.path);

console.log("FFmpeg Path:", ffmpegPath);
console.log("FFprobe Path:", ffprobe.path);

const videosDir = path.join(__dirname, "public/videos"); // Путь к папке с видео
const outputDir = path.join(__dirname, "public/posters"); // Путь к папке для постеров

// Проверяем, существует ли директория для постеров, если нет, создаём её
if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir);
}

// Чтение содержимого директории с видео
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
        .outputOptions('-vf', 'scale=150:-1,crop=150:505') // Масштабирование с обрезкой
        .screenshots({
          timestamps: ["26%"], // Берем кадр на 26% длительности видео
          filename: posterFileName, // Имя постера
          folder: outputDir, // Папка, в которую сохраняем постеры
        });
    }
  });
});
