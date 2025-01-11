export function supportsWebP(callback: (supported: boolean) => void) {
  const img = new Image();
  img.onload = function () {
    callback(!!(img.width > 0 && img.height > 0));
  };
  img.onerror = function () {
    callback(false);
  };
  img.src =
    "data:image/webp;base64,UklGRhQAAABXRUJQVlA4TAYAAAABAAEAAQAAAABAAEAAQAAAAAA";
}
