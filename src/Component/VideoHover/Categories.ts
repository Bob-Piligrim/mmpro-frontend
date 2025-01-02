import kino3 from "../../Assets/Portfolio/kino3.png";
import kino4 from "../../Assets/Portfolio/kino4.png";
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
        poster: "/posters/ХОРОР ЧАСТЬ 1.png",
        videoUrl: "/videos/kino/ХОРОР ЧАСТЬ 1.mp4",
        description: "короткометражный хоррор",
        ageLimit: "18",
        videoName: "СОСЕД",
      },
      {
        poster: "/posters/ХОРОР ЧАСТЬ 2.png",
        videoUrl: "/videos/kino/ХОРОР ЧАСТЬ 2.mp4",
        description: "короткометражный хоррор",
        ageLimit: "28",
        videoName: "РОДСТВЕННИК",
      },
      {
        poster: "/posters/ХОРОР ЧАСТЬ 3.png",
        videoUrl: "/videos/kino/ХОРОР ЧАСТЬ 3.mp4",
        description: "короткометражный хоррор",
        ageLimit: "38",
        videoName: "БРАТ",
      },
      {
        poster: kino3,
        videoUrl: kino3,
        description: "Курс по IT",
        ageLimit: "18",
      },
      {
        poster: kino4,
        videoUrl: kino4,
        description: "Курс по IT",
        ageLimit: "18",
      },
    ],
  },
  {
    name: "РЕКЛАМА",
    content: [
      {
        poster: example1,
        videoUrl: example1,
        description: "Курс по IT",
        ageLimit: "18",
      },
      {
        poster: example2,
        videoUrl: example2,
        description: "Курс по IT",
        ageLimit: "18",
      },
    ],
  },
  {
    name: "ОТЧЁТНЫЕ ВИДЕО",
    content: [
      {
        poster: example3,
        videoUrl: example3,
        description: "Курс по IT",
        ageLimit: "18",
      },
      {
        poster: example4,
        videoUrl: example4,
        description: "Курс по IT",
        ageLimit: "18",
      },
    ],
  },
  {
    name: "РЕПОРТАЖ",
    content: [
      {
        poster: example2,
        videoUrl: example2,
        description: "Курс по IT",
        ageLimit: "18",
      },
      {
        poster: example3,
        videoUrl: example3,
        description: "Курс по IT",
        ageLimit: "18",
      },
    ],
  },
  {
    name: "КУРСЫ",
    content: [
      {
        poster: example1,
        videoUrl: "/videos/kursi/ОКСАНА ХАЛВАШИ.mp4" ,
        description: "Оксана Халваши",
        contentType: "Лекция",
        ageLimit: "18",
      },
      {
        poster: example4,
        videoUrl: "/videos/kursi/СЕРГЕЙ ДЕГТЯРЕВ.mp4",
        description: "Сергей Дегтярев",
        contentType: "Курс",
        ageLimit: "18",
      },
    ],
  },
  {
    name: "ИНТЕРВЬЮ",
    content: [
      {
        poster: example3,
        videoUrl: example3,
        description: "Курс по IT",
        ageLimit: "18",
      },
      {
        poster: example2,
        videoUrl: example2,
        description: "Курс по IT",
        ageLimit: "18",
      },
    ],
  },
  {
    name: "РИЛС",
    content: [
      {
        poster: example3,
        videoUrl: example3,
        description: "Курс по IT",
        ageLimit: "18",
      },
      {
        poster: example4,
        videoUrl: example4,
        description: "Курс по IT",
        ageLimit: "18",
      },
    ],
  },
  {
    name: "YOUTUBE",
    content: [
      {
        poster: example1,
        videoUrl: example1,
        description: "Курс по IT",
        ageLimit: "18",
      },
      {
        poster: example2,
        videoUrl: example2,
        description: "Курс по IT",
        ageLimit: "18",
      },
    ],
  },
  {
    name: "ОНЛАЙН ТРАНСЛЯЦИЯ",
    content: [
      {
        poster: example3,
        videoUrl: example3,
        description: "Курс по IT",
        ageLimit: "18",
      },
      {
        poster: example4,
        videoUrl: example4,
        description: "Курс по IT",
        ageLimit: "18",
      },
    ],
  },
  {
    name: "CG",
    content: [
      {
        poster: example1,
        videoUrl: example1,
        description: "Курс по IT",
        ageLimit: "18",
      },
      {
        poster: example2,
        videoUrl: example2,
        description: "Курс по IT",
        ageLimit: "18",
      },
    ],
  },
  {
    name: "СВАДЬБЫ",
    content: [
      {
        poster: example3,
        videoUrl: example3,
        description: "Курс по IT",
        ageLimit: "18",
      },
      {
        poster: example4,
        videoUrl: example4,
        description: "Курс по IT",
        ageLimit: "18",
      },
    ],
  },
];

export default categories;
