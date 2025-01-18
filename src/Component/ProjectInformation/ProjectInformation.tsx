import React from "react";
import "./ProjectInformation.css";

/* for example */
import example1 from "../../Assets/ProjectInformation/example1.png";
import example2 from "../../Assets/ProjectInformation/example2.png";
import example3 from "../../Assets/ProjectInformation/example3.png";
import example4 from "../../Assets/ProjectInformation/example4.png";
import example5 from "../../Assets/ProjectInformation/example5.png";
import example6 from "../../Assets/ProjectInformation/example6.png";
import VideoHoverInterface from "../Video/VideoHoverInterface";

interface projectInformationProps {
    project: VideoHoverInterface;
  }

const ProjectInformation: React.FC<projectInformationProps> = (project) => {
  
  return (
    <>
      <div className="projectInformation-container">
        <img src={example1} alt="example1" />
        <img src={example2} alt="example2" />
        <div></div>
        <div></div>
        <img src={example3} alt="example3" />
        <img src={example4} alt="example4" />
        <img src={example5} alt="example5" />
        <img src={example6} alt="example6" />
      </div>
    </>
  );
};

export default ProjectInformation;
