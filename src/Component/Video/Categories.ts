import VideoHoverInterface from "./VideoHoverInterface";

interface Category {
  name: string;
  route?: string;
  content: VideoHoverInterface[];
}

let videoIndex = 0;
const generateVideoId = (index: number): string => {
  return `video-${index + 1}`; // Генерируем уникальный ID
};

const categories: Category[] = [
  {
    name: "КИНО",
    route: "kino",
    content: [
      {
        poster: "/posters/kino/ХОРОР ЧАСТЬ 1.png",
        videoUrl: "/videos/kino/ХОРОР ЧАСТЬ 1.mp4",
        description: "короткометражный хоррор",
        ageLimit: "18",
        videoName: "СОСЕД",
      },
      {
        poster: "/posters/kino/ХОРОР ЧАСТЬ 2.png",
        videoUrl: "/videos/kino/ХОРОР ЧАСТЬ 2.mp4",
        description: "короткометражный хоррор",
        ageLimit: "18",
        videoName: "СОСЕД",
      },
      {
        poster: "/posters/kino/ХОРОР ЧАСТЬ 3.png",
        videoUrl: "/videos/kino/ХОРОР ЧАСТЬ 3.mp4",
        description: "короткометражный хоррор",
        ageLimit: "18",
        videoName: "СОСЕД",
      },
    ].map((video) => {
      videoIndex++;
      return {
        ...video,
        id: generateVideoId(videoIndex),
      };
    }) as VideoHoverInterface[],
  },
  {
    name: "РЕКЛАМА",
    route: "reklama",
    content: [
      {
        poster: "/posters/reklama/BEAST.png",
        videoUrl: "/videos/reklama/BEAST.mp4",
        description: "BEAST",
        contentType: "Реклама",
        ageLimit: "18",
      },
      {
        poster: "/posters/reklama/LOTUS.png",
        videoUrl: "/videos/reklama/LOTUS.mp4",
        description: "LOTUS",
        contentType: "Реклама",
        ageLimit: "18",
      },
      {
        poster: "/posters/reklama/MMPRO.png",
        videoUrl: "/videos/reklama/MMPRO.mp4",
        description: "MMPRO",
        contentType: "Реклама",
        ageLimit: "18",
      },
      {
        poster: "/posters/reklama/THE БАНЯ.png",
        videoUrl: "/videos/reklama/THE БАНЯ.mp4",
        description: "THE БАНЯ",
        contentType: "Реклама",
        ageLimit: "18",
      },
      {
        poster: "/posters/reklama/СК ДЕВУШКИ.png",
        videoUrl: "/videos/reklama/СК ДЕВУШКИ.mp4",
        description: "СК Девушки",
        contentType: "Реклама",
        ageLimit: "18",
      },
      {
        poster: "/posters/reklama/СК ЛИСТОВКИ.png",
        videoUrl: "/videos/reklama/СК ЛИСТОВКИ.mp4",
        description: "СК Листовки",
        contentType: "Реклама",
        ageLimit: "18",
      },
      {
        poster: "/posters/reklama/СК.png",
        videoUrl: "/videos/reklama/СК.mp4",
        description: "СК",
        contentType: "Реклама",
        ageLimit: "18",
      },
      {
        poster: "/posters/reklama/ФОКУСЫ.png",
        videoUrl: "/videos/reklama/ФОКУСЫ.mp4",
        description: "Дым машина",
        contentType: "Реклама",
        ageLimit: "18",
      },
    ].map((video) => {
      videoIndex++;
      return {
        ...video,
        id: generateVideoId(videoIndex),
      };
    }) as VideoHoverInterface[],
  },
  {
    name: "ОТЧЁТНЫЕ ВИДЕО",
    route: "otchetnie_video",
    content: [
      {
        poster: "/posters/otchetnie_video/ФОНД ЛЮСИ ВОРОНОВОЙ.png",
        videoUrl: "/videos/otchetnie_video/ФОНД ЛЮСИ ВОРОНОВОЙ.mp4",
        description: "Фонд Люси Вороновой",
        ageLimit: "18",
      },
      {
        poster: "/posters/otchetnie_video/СК - СТРЕЛЬБЫ.png",
        videoUrl: "/videos/otchetnie_video/СК - СТРЕЛЬБЫ.mp4",
        description: "СК",
        contentType: "Стрельбы",
        ageLimit: "18",
        videoName: "СК",
      },
      {
        poster: "/posters/otchetnie_video/FORTBOYAR.png",
        videoUrl: "/videos/otchetnie_video/FORTBOYAR.mp4",
        description: "FORTBOYAR",
        ageLimit: "18",
        videoName: "FORTBOYAR",
      },
      {
        poster: "/posters/otchetnie_video/ДГП 143 - ДЕНЬ СЕМЬИ.png",
        videoUrl: "/videos/otchetnie_video/ДГП 143 - ДЕНЬ СЕМЬИ.mp4",
        description: "ДГП 143",
        contentType: "День семьи",
        ageLimit: "18",
        videoName: "День семьи",
      },
      {
        poster: "/posters/otchetnie_video/ФСБ.png",
        videoUrl: "/videos/otchetnie_video/ФСБ.mp4",
        description: "ФСБ",
        ageLimit: "18",
        videoName: "ФСБ",
      },
    ].map((video) => {
      videoIndex++;
      return {
        ...video,
        id: generateVideoId(videoIndex),
      };
    }) as VideoHoverInterface[],
  },
  {
    name: "РЕПОРТАЖ",
    route: "reportazh",
    content: [
      {
        poster: "/posters/reportazh/АКЦИЯ ДОНОРСТВА.png",
        videoUrl: "/videos/reportazh/АКЦИЯ ДОНОРСТВА.mp4",
        description: "Донорская акция",
        contentType: "Репортаж",
        ageLimit: "18",
        videoName: "Донорская акция",
      },
      {
        poster: "/posters/reportazh/БЕРГ АВТО.png",
        videoUrl: "/videos/reportazh/БЕРГ АВТО.mp4",
        description: "BERG AUTO",
        contentType: "Репортаж",
        ageLimit: "18",
        videoName: "BERG AUTO",
      },
      {
        poster: "/posters/reportazh/СК - РЕПОРТАЖ.png",
        videoUrl: "/videos/reportazh/СК - РЕПОРТАЖ.mp4",
        description: "СК",
        contentType: "Репортаж",
        ageLimit: "18",
        videoName: "СК",
      },
      {
        poster: "/posters/reportazh/ФОНД ЛЮСИ ВОРОНОВОЙ - РЕПОРТАЖ.png",
        videoUrl: "/videos/reportazh/ФОНД ЛЮСИ ВОРОНОВОЙ - РЕПОРТАЖ.mp4",
        description: "Фонд Люси Вороновой",
        contentType: "Репортаж",
        ageLimit: "18",
        videoName: "Фонд Люси Вороновой",
      },
    ].map((video) => {
      videoIndex++;
      return {
        ...video,
        id: generateVideoId(videoIndex),
      };
    }) as VideoHoverInterface[],
  },
  {
    name: "КУРСЫ",
    route: "kursi",
    content: [
      {
        poster: "/posters/kursi/ОКСАНА ХАЛВАШИ.png",
        videoUrl: "/videos/kursi/ОКСАНА ХАЛВАШИ.mp4",
        description: "Оксана Халваши",
        contentType: "Лекция",
        ageLimit: "18",
      },
      {
        poster: "/posters/kursi/IT.png",
        videoUrl: "/videos/kursi/IT.mp4",
        description: "Курс по IT",
        ageLimit: "18",
      },
      {
        poster: "/posters/kursi/ГИМНАСТИКА.png",
        videoUrl: "/videos/kursi/ГИМНАСТИКА.mp4",
        description: "Тренинг",
        contentType: "Гимнастика",
        ageLimit: "18",
      },

      {
        poster: "/posters/kursi/СЕРГЕЙ ДЕГТЯРЕВ.png",
        videoUrl: "/videos/kursi/СЕРГЕЙ ДЕГТЯРЕВ.mp4",
        description: "Сергей Дегтярев",
        contentType: "Курс",
        ageLimit: "18",
      },
    ].map((video) => {
      videoIndex++;
      return {
        ...video,
        id: generateVideoId(videoIndex),
      };
    }) as VideoHoverInterface[],
  },
  {
    name: "ИНТЕРВЬЮ",
    route: "interviu",
    content: [
      {
        poster: "/posters/interviu/ВАДИМ РЫДКИН.png",
        videoUrl: "/videos/interviu/ВАДИМ РЫДКИН.mp4",
        description: "Вадим Рыдкин",
        contentType: "Интервью",
        ageLimit: "18",
      },
      {
        poster: "/posters/interviu/ВЛАД ЧИЖОВ.png",
        videoUrl: "/videos/interviu/ВЛАД ЧИЖОВ.mp4",
        description: "Влад Чижов",
        contentType: "Интервью",
        ageLimit: "18",
      },
      {
        poster: "/posters/interviu/КОСМОЭНЕРГЕТИКА.png",
        videoUrl: "/videos/interviu/КОСМОЭНЕРГЕТИКА.mp4",
        description: "Космоэнергетика",
        contentType: "Интервью",
        ageLimit: "18",
      },
    ].map((video) => {
      videoIndex++;
      return {
        ...video,
        id: generateVideoId(videoIndex),
      };
    }) as VideoHoverInterface[],
  },
  {
    name: "РИЛС",
    route: "rils",
    content: [
      {
        poster: "/posters/rils/ИНФО MMPRO.png",
        videoUrl: "/videos/rils/ИНФО MMPRO.mp4",
        description: "INFO MMPRO",
        contentType: "Рилс",
        ageLimit: "18",
      },
      {
        poster: "/posters/rils/МУСТАНГ.png",
        videoUrl: "/videos/rils/МУСТАНГ.mp4",
        description: "MUSTANG",
        contentType: "Рилс",
        ageLimit: "18",
      },
      {
        poster: "/posters/rils/СЕРГЕЙ ДЕГТЯРЕВ.png" /* деньги */,
        videoUrl: "/videos/rils/СЕРГЕЙ ДЕГТЯРЕВ.mp4",
        description: "Сергей Дегтярев",
        contentType: "Рилс",
        ageLimit: "18",
      },
      {
        poster: "/posters/rils/ОКСАНА ХАЛВАШИ.png" /* в белом */,
        videoUrl: "/videos/rils/ОКСАНА ХАЛВАШИ.mp4",
        description: "Оксана Халваши",
        contentType: "Рилс",
        ageLimit: "18",
      },
      {
        poster: "/posters/rils/ОКСАНА ХАЛВАШИ 2.png",
        videoUrl: "/videos/rils/ОКСАНА ХАЛВАШИ 2.mp4",
        description: "Оксана Халваши",
        contentType: "Рилс",
        ageLimit: "18",
      },
      {
        poster: "/posters/rils/БЕКСТЕЙДЖ С ТРАНСЛЯЦИИ.png",
        videoUrl: "/videos/rils/БЕКСТЕЙДЖ С ТРАНСЛЯЦИИ.mp4",
        description: "Онлайн трансляция",
        contentType: "Рилс",
        ageLimit: "18",
      },
      {
        poster: "/posters/rils/СЕРГЕЙ ДЕГТЯРЕВ 2.png",
        videoUrl: "/videos/rils/СЕРГЕЙ ДЕГТЯРЕВ 2.mp4",
        description: "Сергей Дегтярев",
        contentType: "Рилс",
        ageLimit: "18",
      },
      {
        poster: "/posters/rils/LOTUS.png",
        videoUrl: "/videos/rils/LOTUS.mp4",
        description: "LOTUS",
        contentType: "Рилс",
        ageLimit: "18",
      },
    ].map((video) => {
      videoIndex++;
      return {
        ...video,
        id: generateVideoId(videoIndex),
      };
    }) as VideoHoverInterface[],
  },
  {
    name: "YOUTUBE",
    route: "youtube",
    content: [
      {
        poster: "/posters/youtube/LOTUS.png",
        videoUrl: "/videos/youtube/LOTUS.mp4",
        description: "LOTUS",
        contentType: "YouTube",
        ageLimit: "18",
      },
      {
        poster: "/posters/youtube/AITO M9.png",
        videoUrl: "/videos/youtube/AITO M9.mp4",
        description: "AITO M9",
        contentType: "YouTube",
        ageLimit: "18",
      },
    ].map((video) => {
      videoIndex++;
      return {
        ...video,
        id: generateVideoId(videoIndex),
      };
    }) as VideoHoverInterface[],
  },
  {
    name: "ОНЛАЙН ТРАНСЛЯЦИЯ",
    route: "online",
    content: [
      {
        poster: "/posters/online/КОСМОЭНЕРГЕТИКА ТРАНСЛЯЦИЯ.png",
        videoUrl: "/videos/online/КОСМОЭНЕРГЕТИКА ТРАНСЛЯЦИЯ.mp4",
        description: "Космоэнергетика",
        contentType: "Трансляция",
        ageLimit: "18",
      },
      {
        poster: "/posters/online/СЕРГЕЙ ДЕГТЯРЁВ ТРАНСЛЯЦИЯ.png",
        videoUrl: "/videos/online/СЕРГЕЙ ДЕГТЯРЁВ ТРАНСЛЯЦИЯ.mp4",
        description: "Сергей Дегтярев",
        contentType: "Трансляция",
        ageLimit: "18",
      },
    ].map((video) => {
      videoIndex++;
      return {
        ...video,
        id: generateVideoId(videoIndex),
      };
    }) as VideoHoverInterface[],
  },
  {
    name: "CG",
    route: "cg",
    content: [
      {
        poster: "/posters/cg/BALANCE 2.png",
        videoUrl: "/videos/cg/BALANCE 2.mp4",
        description: "Balance",
        contentType: "GG",
        ageLimit: "18",
      },
      {
        poster: "/posters/cg/ГБОУ СШ 1.png",
        videoUrl: "/videos/cg/ГБОУ СШ 1.mp4",
        description: "MБОУ СШ №1",
        contentType: "GG",
        ageLimit: "18",
      },
      {
        poster: "/posters/cg/КУРДАРРИ.png",
        videoUrl: "/videos/cg/КУРДАРРИ.mp4",
        description: "КУРДАРРИ",
        contentType: "GG",
        ageLimit: "18",
      },
      {
        poster: "/posters/cg/THE RIYADH HOURSE.png",
        videoUrl: "/videos/cg/THE RIYADH HOURSE",
        description: "RIYADH HOUSE",
        contentType: "GG",
        ageLimit: "18",
      },
      {
        poster: "/posters/cg/LOW.png",
        videoUrl: "/videos/cg/LOW.mp4",
        description: "LOW",
        contentType: "GG",
        ageLimit: "18",
      },
      {
        poster: "/posters/cg/СК.png",
        videoUrl: "/videos/cg/СК.mp4",
        description: "СИЛОВОЙ КАРТЕЛЬ",
        contentType: "",
        ageLimit: "18",
      },
      {
        poster: "/posters/cg/ЗОЛОТОЙ ОРЛАН.png",
        videoUrl: "/videos/cg/ЗОЛОТОЙ ОРЛАН.mp4",
        description: "ИИНП",
        contentType: "GG",
        ageLimit: "18",
      },
      {
        poster: "/posters/cg/ИИНП.png",
        videoUrl: "/videos/cg/ИИНП.mp4",
        description: "ИИН",
        contentType: "GG",
        ageLimit: "18",
      },
    ].map((video) => {
      videoIndex++;
      return {
        ...video,
        id: generateVideoId(videoIndex),
      };
    }) as VideoHoverInterface[],
  },
  {
    name: "СВАДЬБЫ",
    route: "svadbi",
    content: [
      {
        poster: "/posters/svadba/СВАДЬБА 1.png",
        videoUrl: "/videos/svadba/СВАДЬБА 1.mp4",
        description: "Свадьба. 1",
        contentType: "",
        ageLimit: "18",
      },
      {
        poster: "/posters/svadba/СВАДЬБА 2.png",
        videoUrl: "/videos/svadba/СВАДЬБА 2.mp4",
        description: "Свадьба. 2",
        contentType: "",
        ageLimit: "18",
      },
    ].map((video) => {
      videoIndex++;
      return {
        ...video,
        id: generateVideoId(videoIndex),
      };
    }) as VideoHoverInterface[],
  },
];

categories.forEach((category) => {
  category.content.forEach((video) => {
    console.log(video.id); // Логируем ID каждого видео
  });
});
export default categories;
