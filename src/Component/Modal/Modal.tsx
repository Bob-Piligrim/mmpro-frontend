import React, { useEffect, useState } from "react";
import "./Modal.css";
import lefttop from "../../Assets/Modal/topleft.png";
import righttop from "../../Assets/Modal/topright.png";
import rightbottom from "../../Assets/Modal/bottomright.png";
import skrepka from "../../Assets/Modal/skrepka.png";

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
  const [file, setFile] = useState<File | null>(null);

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

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = event.target.files?.[0];
    setFile(selectedFile || null);
    console.log("Выбранный файл:", selectedFile);
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    // Проверка валидности данных
    if (!name || !phone) {
      setError("Имя и телефон обязательны для заполнения");
      return;
    }

    // Проверка формата телефона (пример)
    const phoneRegex = /^[0-9]{11}$/; // Пример для 10-значного номера
    if (!phoneRegex.test(phone)) {
      setError("Некорректный номер телефона"); // Переделать красиво через css
      return;
    }

    setError(null);

    const formData = new FormData();
    formData.append("chat_id", process.env.REACT_APP_CHAT_ID || "");
    formData.append("name", name);
    formData.append("phone", phone);
    formData.append("message", message);

    if (file) {
      formData.append("document", file);
      formData.append("caption", message);
    } else {
      console.log("Файла нет у клиента");
    }

    /* if (message && file) {
      formData.append("message", message);
      formData.append("document", file)
    } else if (message && !file) {
      formData.append("message", message)
    } 
    if (message) {
      formData.append("message", message);
    } else if (file) {
      formData.append("document", file);
    } else if (!file && !message) {
      console.log("Нужно отправить или сообщение, или файл")
    } */
    /* if (file && message) {
      formData.append("caption", message)
    } */

    /* formData.append(
      "text",
      `Имя: ${name}\nТелефон: ${phone}\nСообщение: ${message || ""}`
    ); */

    console.log("FormData перед отправкой:", {
      chat_id: process.env.REACT_APP_CHAT_ID || "",
      text: `Имя: ${name}\nТелефон: ${phone}\nСообщение: ${message || ""}`,
      file: file ? file.name : null, // Показываем имя файла, если он есть
    });

    try {
      const response = await fetch("http://localhost:5000/sendMessage", {
        method: "POST",
        body: formData,
      });

      const resData = await response.json();
      if (!response.ok) {
        throw new Error(resData.message || "Ошибка при отправке сообщения");
      }

      console.log("Response:", resData);
    } catch (error) {
      console.error("Ошибка при отправке сообщения: ", error);
      setError("Произошла ошибка при отправке сообщения");
    }
  };

  // Обработчик клика для фона модального окна
  const handleBackgroundClick = (
    event: React.MouseEvent<HTMLDivElement> | React.TouchEvent<HTMLDivElement>
  ) => {
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
              ></textarea>
              <input
                type="file" // Поле для загрузки файла
                name="document"
                accept=".txt, .jpg, .png, .pdf" // Указываем типы файлов, которые можно загрузить
                onChange={handleFileChange}
                style={{ display: "none" }}
                id="file-upload"
              />
              <label
                htmlFor="file-upload"
                
                className="fileUpload"
              >
                <span style={{ marginRight: "8px" }}>
                  <img
                    src={skrepka}
                    alt="Upload"
                    width="24"
                    height="24"
                  />
                </span>
                <span>{file ? file.name : "Прикрепить файл"}</span>{" "}
                
              </label>
              <button type="submit">
                ОТПРАВИТЬ
                <div className="arrow-up-modal">↑</div>
              </button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default Modal;
