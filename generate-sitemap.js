const { SitemapStream, streamToPromise } = require("sitemap"); // Импортируем необходимые функции
const fs = require("fs"); // Импортируем fs

// Здесь укажите ваши маршруты
const links = [
  { url: "/", changefreq: "daily", priority: 1.0 },
  { url: "/portfolio", changefreq: "monthly", priority: 0.9 },
  { url: "/aboutus", changefreq: "monthly", priority: 0.8 },
  // Добавить другие маршруты вашего сайта
];

// Создайте поток для карты сайта
const sitemapStream = new SitemapStream({
  hostname: "https://www.mmproduction.ru",
});

// Добавляем все ссылки в поток
links.forEach((link) => sitemapStream.write(link));
sitemapStream.end();

// Конвертируем поток в строку
streamToPromise(sitemapStream)
  .then((sitemap) => {
    // Записываем карту сайта в файл
    fs.writeFileSync("./public/sitemap.xml", sitemap.toString());
    console.log("Sitemap has been generated!");
  })
  .catch((error) => {
    console.error("Error generating sitemap:", error);
  });
