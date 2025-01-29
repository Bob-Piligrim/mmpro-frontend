import React from "react";
import "./ProjectInformation.css";

/* for example */
import example1 from "../../Assets/ProjectInformation/example1.png";
import example2 from "../../Assets/ProjectInformation/example2.png";
import example3 from "../../Assets/ProjectInformation/example3.png";
import example4 from "../../Assets/ProjectInformation/example4.png";
import example5 from "../../Assets/ProjectInformation/example5.png";
import example6 from "../../Assets/ProjectInformation/example6.png";
/* import VideoHoverInterface from "../Video/VideoHoverInterface"; */

/* interface projectInformationProps {
  project: VideoHoverInterface;
} */

const ProjectInformation: React.FC = () => {
  return (
    <>
      <div className="projectInformation-container">
        <div className="block block1">
          <img src={example1} alt="example1" className="grid-item image1" />
          <img src={example2} alt="example2" className="grid-item image2" />
          <div className="grid-item text1">
            <div className="project-corner proj-top-right"></div>
            <div className="project-corner proj-top-left"></div>
            <div className="project-corner proj-bottom-right"></div>
            <div className="project-corner proj-bottom-left"></div>
            Кадры, наполненные атмосферой и эмоциями. История разворачивается
            через мельчайшие детали: от напряжённых взглядов до символичных
            жестов. Каждый штрих здесь — это шаг к созданию глубокого
            визуального повествования.{" "}
          </div>
        </div>
        <div className="block block2">
          <div className="grid-item text2">
            <div className="project-corner proj-top-right"></div>
            <div className="project-corner proj-top-left"></div>
            <div className="project-corner proj-bottom-right"></div>
            <div className="project-corner proj-bottom-left"></div>
            От первой задумки до финального кадра — мы превращаем идеи в живую
            историю. Каждая сцена, свет и движение передают атмосферу, оживляя
            проект и создавая сильное визуальное впечатление.
          </div>
          <img src={example3} alt="example3" className="grid-item image3" />
          <img src={example4} alt="example4" className="grid-item image4" />
        </div>
        <div className="block block3">
          <img src={example5} alt="example5" className="grid-item image5" />
          <img src={example6} alt="example6" className="grid-item image6" />
        </div>
        <div className="project-footer">
        <button onClick={() => window.history.back()} className="project-back">
          <div>←</div>
          <span>Назад</span>
        </button>
        </div>
      </div>
    </>
  );
};

export default ProjectInformation;
