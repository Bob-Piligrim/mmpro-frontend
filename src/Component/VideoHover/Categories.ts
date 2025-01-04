import example1 from "../../Assets/Portfolio/example1.png";
import example2 from "../../Assets/Portfolio/example2.png";
import example3 from "../../Assets/Portfolio/example3.png";
import example4 from "../../Assets/Portfolio/example4.png";
import VideoHoverInterface from "./VideoHoverInterface";

interface Category {
  name: string;
  content: VideoHoverInterface[];
}

const categories: Category[] = [
  {
    name: "КИНО",
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
    ],
  },
  /* не сделал */
  {
    name: "РЕКЛАМА",
    content: [
      {
        poster: "/posters/reklama/СК ДЕВУШКИ.png",
        videoUrl: "/videos/reklama/СК ДЕВУШКИ.mp4",
        description: "СК ДЕВУШКИ",
        ageLimit: "18",
      },
      {
        poster: "/posters/reklama/СК ЛИСТОВКИ.png",
        videoUrl: "/videos/reklama/СК ЛИСТОВКИ.mp4",
        description: "СК ЛИСТОВКИ",
        ageLimit: "18",
      },
      {
        poster: "/posters/reklama/СК.png",
        videoUrl: "/videos/reklama/СК.mp4",
        description: "СК",
        ageLimit: "18",
      },
      {
        poster: "/posters/reklama/ФОКУСЫ.png",
        videoUrl: "/videos/reklama/ФОКУСЫ.mp4",
        description: "ФОКУСЫ",
        ageLimit: "18",
      },
      {
        poster: "/posters/reklama/BEAST.png",
        videoUrl: "/videos/reklama/BEAST.mp4",
        description: "BEAST",
        ageLimit: "18",
      },
      {
        poster: "/posters/reklama/LOTUS.png",
        videoUrl: "/videos/reklama/LOTUS.mp4",
        description: "LOTUS",
        ageLimit: "18",
      },
      {
        poster: "/posters/reklama/MMPRO.png",
        videoUrl: "/videos/reklama/MMPRO.mp4",
        description: "MMPRO",
        ageLimit: "18",
      },
      {
        poster: "/posters/reklama/THE БАНЯ.png",
        videoUrl: "/videos/reklama/THE БАНЯ.mp4",
        description: "THE БАНЯ",
        ageLimit: "18",
      },
    ],
  },
  {
    name: "ОТЧЁТНЫЕ ВИДЕО",
    content: [
      {
        poster: "/posters/otchetnie_video/ДГП 143 - ДЕНЬ СЕМЬИ.png",
        videoUrl: "/videos/otchetnie_video/ДГП 143 - ДЕНЬ СЕМЬИ.mp4",
        description: "ДЕНЬ СЕМЬИ",
        ageLimit: "18",
      },
      {
        poster: "/posters/otchetnie_video/СК - СТРЕЛЬБЫ.png",
        videoUrl: "/videos/otchetnie_video/СК - СТРЕЛЬБЫ.mp4",
        description: "СТРЕЛЬБЫ",
        ageLimit: "18",
      },
      {
        poster: "/posters/otchetnie_video/ФОНД ЛЮСИ ВОРОНОВОЙ.png",
        videoUrl: "/videos/otchetnie_video/ФОНД ЛЮСИ ВОРОНОВОЙ.mp4",
        description: "ФОНД ЛЮСИ ВОРОНОВОЙ",
        ageLimit: "18",
      },
      {
        poster: "/posters/otchetnie_video/ФСБ.png",
        videoUrl: "/videos/otchetnie_video/ФСБ.mp4",
        description: "ФСБ",
        ageLimit: "18",
      },
      {
        poster: "/posters/otchetnie_video/FORTBOYAR.png",
        videoUrl: "/videos/otchetnie_video/FORTBOYAR.mp4",
        description: "FORTBOYAR",
        ageLimit: "18",
      },
    ],
  },
  {
    name: "РЕПОРТАЖ",
    content: [
      {
        poster: "/posters/reportazh/АКЦИЯ ДОНОРСТВА.png",
        videoUrl: "/videos/reportazh/АКЦИЯ ДОНОРСТВА.mp4",
        description: "АКЦИЯ ДОНОРСТВА",
        ageLimit: "18",
      },
      {
        poster: "/posters/reportazh/БЕРГ АВТО.png",
        videoUrl: "/videos/reportazh/БЕРГ АВТО.mp4",
        description: "БЕРГ АВТО",
        ageLimit: "18",
      },
      {
        poster: "/posters/reportazh/СК - РЕПОРТАЖ.png",
        videoUrl: "/videos/reportazh/СК - РЕПОРТАЖ.mp4",
        description: "РЕПОРТАЖ",
        ageLimit: "18",
      },
      {
        poster: "/posters/reportazh/ФОНД ЛЮСИ ВОРОНОВОЙ - РЕПОРТАЖ.png",
        videoUrl: "/videos/reportazh/ФОНД ЛЮСИ ВОРОНОВОЙ - РЕПОРТАЖ.mp4",
        description: "ФОНД ЛЮСИ ВОРОНОВОЙ",
        contentType: "РЕПОРТАЖ",
        ageLimit: "18",
      },
    ],
  },
  {
    name: "КУРСЫ",
    content: [
      {
        poster: "/posters/kursi/ГИМНАСТИКА.png",
        videoUrl: "/videos/kursi/ГИМНАСТИКА.mp4",
        description: "Тренинг",
        contentType: "Гимнастика",
        ageLimit: "18",
      },
      {
        poster: "/posters/kursi/ОКСАНА ХАЛВАШИ.png",
        videoUrl: "/videos/kursi/ОКСАНА ХАЛВАШИ.mp4",
        description: "Оксана Халваши",
        contentType: "Лекция",
        ageLimit: "18",
      },
      {
        poster: "/posters/kursi/СЕРГЕЙ ДЕГТЯРЕВ.png",
        videoUrl: "/videos/kursi/СЕРГЕЙ ДЕГТЯРЕВ.mp4",
        description: "Сергей Дегтярев",
        contentType: "Курс",
        ageLimit: "18",
      },
      {
        poster: "/posters/kursi/IT.png",
        videoUrl: "/videos/kursi/IT.mp4",
        description: "IT",
        ageLimit: "18",
      },
    ],
  },
  {
    name: "ИНТЕРВЬЮ",
    content: [
      {
        poster: "/posters/interv'u/ВАДИМ РЫДКИН.png",
        videoUrl: "/videos/interv'u/ВАДИМ РЫДКИН.mp4",
        description: "Вадим Рыдкин",
        contentType: "",
        ageLimit: "18",
      },
      {
        poster: "/posters/interv'u/ВЛАД ЧИЖОВ.png",
        videoUrl: "/videos/interv'u/ВЛАД ЧИЖОВ.mp4",
        description: "Влад Чижов",
        contentType: "",
        ageLimit: "18",
      },
      {
        poster: "/posters/interv'u/КОСМОЭНЕРГЕТИКА.png",
        videoUrl: "/videos/interv'u/КОСМОЭНЕРГЕТИКА.mp4",
        description: "Космоэнергетика",
        contentType: "",
        ageLimit: "18",
      },
    ],
  },
  {
    name: "РИЛС",
    content: [
      {
        poster: "/posters/rils/БЕКСТЕЙДЖ С ТРАНСЛЯЦИИ.png",
        videoUrl: "/videos/rils/БЕКСТЕЙДЖ С ТРАНСЛЯЦИИ.mp4",
        description: "БЕКСТЕЙДЖ",
        contentType: "",
        ageLimit: "18",
      },
      {
        poster: "/posters/rils/ИНФО MMPRO.png",
        videoUrl: "/videos/rils/ИНФО MMPRO.mp4",
        description: "MMPRO",
        contentType: "",
        ageLimit: "18",
      },
      {
        poster: "/posters/rils/МУСТАНГ.png",
        videoUrl: "/videos/rils/МУСТАНГ.mp4",
        description: "Мустанг",
        contentType: "",
        ageLimit: "18",
      },
      {
        poster: "/posters/rils/ОКСАНА ХАЛВАШИ.png",
        videoUrl: "/videos/rils/ОКСАНА ХАЛВАШИ.mp4",
        description: "Оксана Халваши",
        contentType: "Лекция",
        ageLimit: "18",
      },
      {
        poster: "/posters/rils/ОКСАНА ХАЛВАШИ 2.png",
        videoUrl: "/videos/rils/ОКСАНА ХАЛВАШИ 2.mp4",
        description: "Оксана Халваши",
        contentType: "Лекция",
        ageLimit: "18",
      },
      {
        poster: "/posters/rils/СЕРГЕЙ ДЕГТЯРЕВ.png",
        videoUrl: "/videos/rils/СЕРГЕЙ ДЕГТЯРЕВ.mp4",
        description: "Сергей Дегтярев",
        contentType: "Курс",
        ageLimit: "18",
      },
      {
        poster: "/posters/rils/СЕРГЕЙ ДЕГТЯРЕВ 2.png",
        videoUrl: "/videos/rils/СЕРГЕЙ ДЕГТЯРЕВ 2.mp4",
        description: "Сергей Дегтярев",
        contentType: "Курс",
        ageLimit: "18",
      },
      {
        poster: "/posters/rils/LOTUS.png",
        videoUrl: "/videos/rils/LOTUS.mp4",
        description: "Lotus",
        contentType: "",
        ageLimit: "18",
      },
    ],
  },
  {
    name: "YOUTUBE",
    content: [
      {
        poster: "/posters/youtube/AITO M9.png",
        videoUrl: "/videos/youtube/AITO M9.mp4",
        description: "AITO M9",
        contentType: "",
        ageLimit: "18",
      },
      {
        poster: "/posters/youtube/LOTUS.png",
        videoUrl: "/videos/youtube/LOTUS.mp4",
        description: "Lotus",
        contentType: "",
        ageLimit: "18",
      },
    ],
  },
  {
    name: "ОНЛАЙН ТРАНСЛЯЦИЯ",
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
    ],
  },
  {
    name: "CG",
    content: [
      {
        poster: "/posters/cg/ГБОУ СШ 1.png",
        videoUrl: "/videos/cg/ГБОУ СШ 1.mp4",
        description: "ГБОУ СШ 1",
        contentType: "",
        ageLimit: "18",
      },
      {
        poster: "/posters/cg/ЗОЛОТОЙ ОРЛАН.png",
        videoUrl: "/videos/cg/ЗОЛОТОЙ ОРЛАН.mp4",
        description: "Золотой Орлан",
        contentType: "",
        ageLimit: "18",
      },
      {
        poster: "/posters/cg/ИИНП.png",
        videoUrl: "/videos/cg/ИИНП.mp4",
        description: "ИИНП",
        contentType: "",
        ageLimit: "18",
      },
      {
        poster: "/posters/cg/КУРДАРРИ.png",
        videoUrl: "/videos/cg/КУРДАРРИ.mp4",
        description: "КУРДАРРИ",
        contentType: "",
        ageLimit: "18",
      },
      {
        poster: "/posters/cg/СК.png",
        videoUrl: "/videos/cg/СК.mp4",
        description: "СК",
        contentType: "",
        ageLimit: "18",
      },
      {
        poster: "/posters/cg/BALANCE 2.png",
        videoUrl: "/videos/cg/BALANCE 2.mp4",
        description: "Balance",
        contentType: "",
        ageLimit: "18",
      },
      {
        poster: "/posters/cg/LOW.png",
        videoUrl: "/videos/cg/LOW.mp4",
        description: "Low",
        contentType: "",
        ageLimit: "18",
      },
      {
        poster: "/posters/cg/SCINCE TV.png",
        videoUrl: "/videos/cg/SCINCE TV.mp4",
        description: "Scince TV",
        contentType: "",
        ageLimit: "18",
      },
      {
        poster: "/posters/cg/THE RIYADH HOURSE.png",
        videoUrl: "/videos/cg/THE RIYADH HOURSE",
        description: "The Riyadh Hourse",
        contentType: "",
        ageLimit: "18",
      },
    ],
  },
  {
    name: "СВАДЬБЫ",
    content: [
      {
        poster: "/posters/svad'ba/СВАДЬБА 1.png",
        videoUrl: "/videos/svad'ba/СВАДЬБА 1",
        description: "Свадьба",
        contentType: "",
        ageLimit: "18",
      },
      {
        poster: "/posters/svad'ba/СВАДЬБА 2.png",
        videoUrl: "/videos/svad'ba/СВАДЬБА 2",
        description: "Свадьба",
        contentType: "",
        ageLimit: "18",
      },
    ],
  },
];

export default categories;
