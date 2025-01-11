const fs = require("fs");
const path = require("path");
const sharp = require("sharp");

const compressImage = (inputPath, outputPath) => {
  return sharp(inputPath)
    .resize(290, 160, { fit: sharp.fit.inside }) // Устанавливаем конкретный размер
    .png({ quality: 90 }) // Устанавливаем качество (это не всегда влияет на PNG)
    .toFile(outputPath);
};

const processImages = async () => {
  const imagesDir = path.join(__dirname, "public", "posters");
  const outputDir = path.join(__dirname, "public", "posters2");

  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
  }

  try {
    const categories = fs.readdirSync(imagesDir);
    for (const category of categories) {
      const categoryPath = path.join(imagesDir, category);
      const outputCategoryPath = path.join(outputDir, category);

      if (!fs.existsSync(outputCategoryPath)) {
        fs.mkdirSync(outputCategoryPath, { recursive: true });
      }

      if (fs.lstatSync(categoryPath).isDirectory()) {
        const imageFiles = fs.readdirSync(categoryPath);
        for (const imageFile of imageFiles) {
          if (path.extname(imageFile).toLowerCase() === ".png") {
            const inputPath = path.join(categoryPath, imageFile);
            const outputPath = path.join(outputCategoryPath, `${imageFile}`);
            await compressImage(inputPath, outputPath);
            console.log(`Сжатие завершено для: ${outputPath}`);
          }
        }
      }
    }
  } catch (err) {
    console.error("Ошибка при обработке изображения", err);
  }
};

processImages();
