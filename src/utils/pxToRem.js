let fontSize = 0;
const pxToRem = (px) => {
  const pxStr = `${px}`.replace("px", "");

  if (isNaN(parseFloat(pxStr))) return px;
  if (!fontSize) {
    const temp = window.getComputedStyle(document.documentElement).fontSize;

    fontSize = parseFloat(temp);
  }

  return `${px / (fontSize || 1)}rem`;
};

export default pxToRem;
