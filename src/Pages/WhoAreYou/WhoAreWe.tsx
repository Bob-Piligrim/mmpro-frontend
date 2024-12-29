import React from "react";
import "./WhoAreWe.css";

const WhoAreWe: React.FC = () => {
  return (
    <>
      <div className="descript-who">
        MMPRO - студия видеопродакшена полного цикла. <br></br> Качественные видео - это
        не просто сценарий и <br></br> съемка, а целый комплекс подготовительных работ.
      </div>
      <div className="descript-who-mobile">
        MMPRO - студия видеопродакшена <br></br> полного цикла. Качественные видео - это <br></br>
        не просто сценарий и съемка, а целый <br></br> комплекс подготовительных работ.
      </div>
      <div className="info-who">
        <div className="info-who-1">
          <div className="info-who-main">3000 +</div>
          <div>часов съемок</div>
        </div>
        <div className="info-who-2">
          <div className="info-who-main">600 +</div>
          <div>
            довольных<br></br> клиентов
          </div>
        </div>
        <div className="info-who-3">
          <div className="info-who-main">9,5 / 10</div>
          <div>средний рейтинг</div>
        </div>
      </div>
    </>
  );
};

export default WhoAreWe;