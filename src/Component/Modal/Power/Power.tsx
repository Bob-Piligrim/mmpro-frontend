import React from "react";
import "./Power.css";

const Power: React.FC = () => {
  return (
    <div className="battery-icon">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="60"
        height="30"
        viewBox="0 0 80 40"
      >
        {/* Корпус батареи */}
        <rect
          x="1"
          y="10"
          width="50"
          height="24"
          fill="none"
          stroke="white"
          strokeWidth="4"
          rx="2"
        />
        {/* Статические шкалы */}
        <rect x="5" y="14" width="6" height="16" fill="white" />
        <rect x="13" y="14" width="6" height="16" fill="white" />
        <rect x="21" y="14" width="6" height="16" fill="white" />
        <rect x="29" y="14" width="6" height="16" fill="white" />
        {/* Анимируемая шкала */}
        <rect
          className="battery-charge"
          x="37"
          y="14"
          width="50"
          height="16"
          fill="lime"
        />
        <rect x="52" y="14" width="6" height="16" fill="white" />
      </svg>
    </div>
  );
};

export default Power;
