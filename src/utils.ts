export const supportsWebP = () => {
  const canvas = document.createElement("canvas");
  if (!canvas.getContext) {
    return false; // Если контекст канваса не доступен, WebP не поддерживается
  }
  return canvas.toDataURL("image/webp").indexOf("data:image/webp") === 0;
};

export const isSafariOrIos = (): boolean => {
    const userAgent = navigator.userAgent;
    const isSafari = /Safari/.test(userAgent) && !/Chrome/.test(userAgent); // Проверка на Safari
    const isIOS = /iPhone|iPad|iPod/.test(userAgent); // Проверка на iOS устройство
    return isSafari || isIOS; // Возвращаем true, если это Safari или iOS
  };
