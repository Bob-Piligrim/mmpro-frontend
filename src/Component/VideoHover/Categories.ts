import kino1 from "../../Assets/Portfolio/kino1.png";
import kino2 from "../../Assets/Portfolio/kino2.png";
import example1 from "../../Assets/Portfolio/example1.png";
import example2 from "../../Assets/Portfolio/example2.png";
import example3 from "../../Assets/Portfolio/example3.png";
import example4 from "../../Assets/Portfolio/example4.png";

interface VideoContent {
  poster: string;
  videoUrl: string;
  description: string;
}

interface Category {
  name: string;
  content: VideoContent[];
}

const categories: Category[] = [
  {
    name: "КИНО",
    content: [
      { poster: kino1, videoUrl: kino1, description: "Курс по IT" },
      { poster: kino2, videoUrl: kino2, description: "Курс по IT" },
    ],
  },
  {
    name: "РЕКЛАМА",
    content: [
      { poster: example1, videoUrl: example1, description: "Курс по IT" },
      { poster: example2, videoUrl: example2, description: "Курс по IT" },
    ],
  },
  {
    name: "ОТЧЁТНЫЕ ВИДЕО",
    content: [
      { poster: example3, videoUrl: example3, description: "Курс по IT" },
      { poster: example4, videoUrl: example4, description: "Курс по IT" },
    ],
  },
  {
    name: "РЕПОРТАЖ",
    content: [
      { poster: example1, videoUrl: example1, description: "Курс по IT" },
      { poster: example2, videoUrl: example2, description: "Курс по IT" },
    ],
  },
  {
    name: "КУРСЫ",
    content: [
      { poster: example3, videoUrl: example3, description: "Курс по IT" },
      { poster: example4, videoUrl: example4, description: "Курс по IT" },
    ],
  },
  {
    name: "ИНТЕРВЬЮ",
    content: [
      { poster: example1, videoUrl: example1, description: "Курс по IT" },
      { poster: example2, videoUrl: example2, description: "Курс по IT" },
    ],
  },
  {
    name: "РИЛС",
    content: [
      { poster: example3, videoUrl: example3, description: "Курс по IT" },
      { poster: example4, videoUrl: example4, description: "Курс по IT" },
    ],
  },
  {
    name: "YOUTUBE",
    content: [
      { poster: example1, videoUrl: example1, description: "Курс по IT" },
      { poster: example2, videoUrl: example2, description: "Курс по IT" },
    ],
  },
  {
    name: "ОНЛАЙН ТРАНСЛЯЦИЯ",
    content: [
      { poster: example3, videoUrl: example3, description: "Курс по IT" },
      { poster: example4, videoUrl: example4, description: "Курс по IT" },
    ],
  },
  {
    name: "CG",
    content: [
      { poster: example1, videoUrl: example1, description: "Курс по IT" },
      { poster: example2, videoUrl: example2, description: "Курс по IT" },
    ],
  },
  {
    name: "СВАДЬБЫ",
    content: [
      { poster: example3, videoUrl: example3, description: "Курс по IT" },
      { poster: example4, videoUrl: example4, description: "Курс по IT" },
    ],
  },
];

export default categories;
