export const supportsWebP = () => {
  const canvas = document.createElement("canvas");
  if (!canvas.getContext) {
      return false; // Если контекст канваса не доступен, WebP не поддерживается
  }
  return canvas.toDataURL("image/webp").indexOf("data:image/webp") === 0;
};