import React, { useEffect, useState } from "react";
import "./Modal.css";
import arrowButton from "../../Assets/Header/arrowButton.png";
import lefttop from "../../Assets/Modal/topleft.png";
import righttop from "../../Assets/Modal/topright.png";
import rightbottom from "../../Assets/Modal/bottomright.png";

interface ModalProps {
  onClose: () => void;
}

const Modal: React.FC<ModalProps> = ({ onClose }) => {
  const [placeholder, setPlaceholder] = useState<string>(
    "Отправить техническое задание"
  );

  const [name, setName] = useState<string>("");
  const [phone, setPhone] = useState<string>("");
  const [message, setMessage] = useState<string>("");
  const [error, setError] = useState<string | null>(null);

  const updatePlaceHolder = () => {
    if (window.innerWidth < 656) {
      setPlaceholder("Техническое задание");
    } else {
      setPlaceholder("Отправить техническое задание");
    }
  };

  useEffect(() => {
    updatePlaceHolder();
    window.addEventListener("resize", updatePlaceHolder);
    return () => {
      window.removeEventListener("resize", updatePlaceHolder);
    };
  }, []);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    // Проверка валидности данных
    if (!name || !phone || !message) {
      setError("Все поля обязательны для заполнения");
      return;
    }

    // Проверка формата телефона (пример)
    const phoneRegex = /^[0-9]{11}$/; // Пример для 10-значного номера
    if (!phoneRegex.test(phone)) {
      setError("Некорректный номер телефона");
      return;
    }

    // Если всё верно, отправить данные
    const formData = {
      name,
      phone,
      message,
    };

    console.log(formData); // Здесь вы можете отправить данные на сервер или сделать с ними что-то еще

    // Успешная отправка данных
    onClose(); // Закрываем модальное окно после успешной отправки
  };

  // Обработчик клика для фона модального окна
  const handleBackgroundClick = (event: React.MouseEvent<HTMLDivElement>) => {
    // Закрываем модальное окно только, если клик был не на контейнере
    if (event.currentTarget === event.target) {
      onClose();
    }
  };

  return (
    <>
      <div className="modal-background" onClick={handleBackgroundClick}>
        <div className="modal-container-background">
          <div className="modal-container">
            {/* Угловые изображения */}
            <div className="corner top-left">
              <img src={lefttop} alt="Corner1" />
            </div>
            <div className="corner top-right">
              <img src={righttop} alt="Corner2" />
            </div>
            <div className="corner bottom-left">
              <div>00:00:00</div>
            </div>
            <div className="corner bottom-right">
              <img src={rightbottom} alt="Corner4" />
            </div>
            <h2>ОСТАВЬТЕ ЗАЯВКУ</h2>
            <div>и мы свяжемся с вами в ближайшее время</div>
            {error && <div className="error-message">{error}</div>}{" "}
            <form className="modal-form" onSubmit={handleSubmit}>
              <input
                type="text"
                placeholder="Ваше имя"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
              <input
                type="tel"
                placeholder="Ваш номер телефона"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                required
              />
              <textarea
                placeholder={placeholder}
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                required
              ></textarea>
              <button type="submit">
                ОТПРАВИТЬ
                <img src={arrowButton} alt="Arrow" className="arrow-icon" />
              </button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default Modal;
