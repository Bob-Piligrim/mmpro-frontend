import React from "react";
import "./Call.css";

const Call: React.FC = () => {
  const handleDownload = () => {
    const link = document.createElement("a");
    link.href = "/file/english.pdf"; /* поменять файл! */
    link.setAttribute("download", "presentacia.pdf");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <>
      <div className="mail">info@mmproduct.ru</div>
      <div className="btn-title">
        <button id="btn-for-mobile" onClick={handleDownload}>
          ПРЕЗЕНТАЦИЯ
        </button>
        <button>БРИФ</button>
      </div>
    </>
  );
};

export default Call;
