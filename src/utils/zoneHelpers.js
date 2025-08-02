export const cropImageZone = (image, zone) => {
  const canvas = document.createElement('canvas');
  canvas.width = zone.width;
  canvas.height = zone.height;

  const ctx = canvas.getContext('2d');
  ctx.drawImage(
    image,
    zone.x,
    zone.y,
    zone.width,
    zone.height,
    0,
    0,
    zone.width,
    zone.height
  );

  return canvas.toDataURL('image/png');
};
