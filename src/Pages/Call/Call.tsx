import React, { useState } from "react";
import "./Call.css";
import Modal from "../../Component/Modal/Modal";

const Call: React.FC = () => {
  const handleDownload = () => {
    const link = document.createElement("a");
    link.href = "/file/english.pdf"; /* поменять файл! */
    link.setAttribute("download", "presentacia.pdf");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const [isModalOpens, setIsModalOpens] = useState<boolean>(false);

  const toggleModals = () => {
    setIsModalOpens(!isModalOpens);
  };

  return (
    <>
      <div className="mail">info@mmproduct.ru</div>
      <div className="btn-title">
        <button id="btn-for-mobile" onClick={handleDownload}>
          ПРЕЗЕНТАЦИЯ
        </button>
        <button onClick={toggleModals}>БРИФ</button>
        {isModalOpens && <Modal onClose={toggleModals} />}
      </div>
    </>
  );
};

export default Call;
