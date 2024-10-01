// Change image handling for CSS backgroundSize based on aspect ratios
export const getBackgroundSizeStyle = (imgSize, scrSize) => {
  let backgroundSizeStyle = 'cover'; // Fit to screen

  if (imgSize) {
    const imageAspect = imgSize.width / imgSize.height;
    const screenAspect = scrSize.width / scrSize.height;
    const ratio = imageAspect / screenAspect;

    if (ratio > 1.1) {
      backgroundSizeStyle = 'auto 100%'; // 100% width
    } else if (ratio < 0.8) {
      backgroundSizeStyle = '100% auto'; // 100% height
    }
  }
  return backgroundSizeStyle;
};
