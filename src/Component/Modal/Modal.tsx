import React, { useEffect, useState } from "react";
import "./Modal.css";
import "./Circle.css";
import lefttop from "../../Assets/Modal/topleft.png";
import skrepka from "../../Assets/Modal/skrepka.png";
import ThankYou from "../ThankYou/ThankYou";
import TextMask from "react-text-mask";
/* import Power from "./Power/Power";
import { supportsSVG } from "../../utils"; */

interface ModalProps {
  onClose: () => void;
}

const ModalWithCircles: React.FC = () => {
  const numberOfCircles = 10;
  const [filledCirclesRow1, setFilledCirclesRow1] = useState<boolean[]>(
    Array(numberOfCircles).fill(false)
  );
  const [filledCirclesRow2, setFilledCirclesRow2] = useState<boolean[]>(
    Array(numberOfCircles).fill(false)
  );

  const fillCircles = (
    setFilledCircles: React.Dispatch<React.SetStateAction<boolean[]>>,
    delay: number
  ) => {
    let currentIndex = 0;

    const interval = setInterval(() => {
      setFilledCircles((prev) => {
        const newRow = [...prev];
        newRow[currentIndex] = true;
        currentIndex += 1;

        if (currentIndex === numberOfCircles) {
          clearInterval(interval);
          setTimeout(() => {
            setFilledCircles(Array(numberOfCircles).fill(false));
            fillCircles(setFilledCircles, delay);
          }, 1000);
        }

        return newRow;
      });
    }, delay);

    return () => clearInterval(interval);
  };

  useEffect(() => {
    fillCircles(setFilledCirclesRow1, 1000);
  }, []);

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      fillCircles(setFilledCirclesRow2, 1000);
    }, 1000);

    return () => clearTimeout(timeoutId);
  }, []);

  return (
    <div className="circle-container">
      <div className="row row1">
        <div className="C1">C1</div>
        {Array.from({ length: numberOfCircles }).map((_, index) => (
          <div
            key={index}
            className={`circleAnnimation ${
              filledCirclesRow1[index] ? "filled" : ""
            }`}
          />
        ))}
      </div>
      <div className="row row2">
        <div className="C2">C2</div>
        {Array.from({ length: numberOfCircles }).map((_, index) => (
          <div
            key={index}
            className={`circleAnnimation ${
              filledCirclesRow2[index] ? "filled" : ""
            }`}
          />
        ))}
      </div>
    </div>
  );
};

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
  const [loading, setLoading] = useState<boolean>(false); // Состояние для аннимации ожидания
  const [time, setTime] = useState<string>("00:00:00"); // Состояние для таймера
  const [intervalId, setIntervalId] = useState<NodeJS.Timeout | null>(null); // Состояние для таймера
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

  useEffect(() => {
    // Новое время от 0 до 3599 секунд
    const randomTimeInSeconds = Math.floor(Math.random() * 3600);
    setTime(formatTime(randomTimeInSeconds));

    const id = setInterval(() => {
      setTime((prevTime) => {
        // увеличение на 1 секунду
        const totalSeconds = convertToSeconds(prevTime) + 1;
        return formatTime(totalSeconds);
      });
    }, 1000);
    // Сохраняем ID интервала (в дальнейшем может понадобится)
    setIntervalId(id);

    return () => {
      clearInterval(id);
    };
  }, []);

  // Формати в нужную строку
  const formatTime = (totalSeconds: number): string => {
    const hours = String(Math.floor(totalSeconds / 3600)).padStart(2, "0");
    const minutes = String(Math.floor((totalSeconds % 3600) / 60)).padStart(
      2,
      "0"
    );
    const seconds = String(totalSeconds % 60).padStart(2, "0");
    return `${hours}:${minutes}:${seconds}`;
  };

  const convertToSeconds = (time: string): number => {
    const [hours, minutes, seconds] = time.split(":").map(Number);
    return hours * 3600 + minutes * 60 + seconds;
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = event.target.files?.[0];
    setFile(selectedFile || null);
    console.log("Выбранный файл:", selectedFile);
  };

  const deleteFileChange = () => {
    setFile(null);
    const fileInput = document.getElementById(
      "file-upload"
    ) as HTMLInputElement;
    console.log(`Файл ${fileInput.value} удален`);
    if (fileInput) {
      fileInput.value = "";
    }
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

    /* if (!message && !file) {
      setError("Обязательно укажите либо сообщение, либо прикрепите файл");
      return;
    }

    setError(null); */ /* Сервер доработать! */

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

    console.log("FormData перед отправкой:", {
      chat_id: process.env.REACT_APP_CHAT_ID || "",
      text: `Имя: ${name}\nТелефон: ${phone}\nСообщение: ${message || ""}`,
      file: file ? file.name : null,
    });

    setLoading(true);

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
    } finally {
      setLoading(false);
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
              {/* {supportsSVG() ? <Power /> : <img src={lefttop} alt="Corner1" />} */}
              <img src={lefttop} alt="Corner1" />
            </div>
            <div className="corner top-right">
              {/* <img src={righttop} alt="Corner2" /> */}
              <div id="rec-label">
                <span id="dot"></span>
                <span id="REC">REC </span>
              </div>
            </div>
            <div className="corner bottom-left">
              {/* <div>00:00:00</div> */}
              <div>{time}</div>
            </div>
            <div className="corner bottom-right">
              {/* <img src={rightbottom} alt="Corner4" /> */}
              <ModalWithCircles />
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
              <div className="containerFile">
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
                {file ? (
                  <button onClick={deleteFileChange} id="deleteFile">
                    Удалить файл
                  </button>
                ) : null}
              </div>
              {loading && <div className="loading-spinner"></div>}
              <button type="submit" id="modal-button">
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
