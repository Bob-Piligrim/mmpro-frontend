import React, { useEffect, useState } from "react";
import "./Modal.css";
import lefttop from "../../Assets/Modal/topleft.png";
import righttop from "../../Assets/Modal/topright.png";
import rightbottom from "../../Assets/Modal/bottomright.png";
import skrepka from "../../Assets/Modal/skrepka.png";
import ThankYou from "../ThankYou/ThankYou";
import TextMask from "react-text-mask";

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
  const [submitted, setSubmitted] = useState<boolean>(false); // Состояние для отслеживания отправки (для ThankYou)

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

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let inputValue = e.target.value;

    /**
     * @param ((\+7 \(\s*)8/, "$1") - это группа захвата, которая ищет точную подстроку:
     * @param (\+7 \(\s*) - это группа захвата, которая ищет точную подстроку:
     * \+7 — символ +, за которым следуют "7";
     * \( — символ открывающей скобки. Чтобы экранировать его (поскольку ( имеет специальное значение в регулярных выражениях), используется обратная косая черта (\).
     * \s* — соответствует любому количеству пробелов (включая ноль).
     * 8 — это конкретно число "8", которое мы собираемся удалить.
     * $1 — это ссылка на первую группу захвата (в данном случае — на подстроку "+7 (" или "+7 (" с любым количеством пробелов после ().
     * */
    if (inputValue.startsWith("+7 (8")) {
      inputValue = inputValue.replace(/^(\+7 \(\s*)8/, "$1");
    }

    setPhone(inputValue); // Обновляем состояние
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    // Проверка валидности данных
    if (!name) {
      setError("Пожалуйста заполните Ваше имя");
      return;
    } else if (!phone) {
      setError("Пожалуйста заполните Ваш номер телефона");
      return;
    }

    const phoneRegex = /^\+7\s\(\d{3}\)\s\d{3}-\d{2}-\d{2}$/;
    if (!phoneRegex.test(phone)) {
      setError("Некорректный номер телефона");
      return;
    }
    console.log("Отправлен номер телефона:", phone);

    setError(null);

    if (!message && !file) {
      setError("Обязательно укажите либо сообщение, либо прикрепите файл");
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
      const response = await fetch(
        "https://www.mmproduction.ru:5000/sendMessage",
        {
          method: "POST",
          body: formData,
        }
      );

      const resData = await response.json();
      if (!response.ok) {
        throw new Error(resData.message || "Ошибка при отправке сообщения");
      }
      console.log("Отправили номер: ", `+7${phone}`);
      console.log("Response:", resData);
      setSubmitted(true); // Устанавливаем состояние отправленного после успешной отправки
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

  // Если форма была успешно отправлена, показываем компонент ThankYou
  if (submitted) {
    return <ThankYou />;
  }

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
                className="nameInput"
              />
              <TextMask
                mask={[
                  "+",
                  "7",
                  " ",
                  "(",
                  /[0-9]/,
                  /\d/,
                  /\d/,
                  ")",
                  " ",
                  /\d/,
                  /\d/,
                  /\d/,
                  "-",
                  /\d/,
                  /\d/,
                  "-",
                  /\d/,
                  /\d/,
                ]}
                type="tel"
                /* placeholder="+7 (___) ___-__-__" */
                placeholder="Ваш номер телефона"
                guide={false}
                value={phone}
                /* onChange={(e) => setPhone(e.target.value)} */
                onChange={handleChange}
                className="phoneInput"
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
              <label htmlFor="file-upload" className="fileUpload">
                <span style={{ marginRight: "8px" }}>
                  <img src={skrepka} alt="Upload" />
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
