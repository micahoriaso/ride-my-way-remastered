export const svgBackgroundImageUrl = (svgPath: any) => {
  const svg = require(`../assets/${svgPath}`);
  const encodedSvg = encodeURIComponent(svg);

  return `url("data:image/svg+xml;utf8,${encodedSvg}")`;
};

export const svgUrl = (svgPath: any) => {
  const svg = require(`../assets/${svgPath}`);
  const encodedSvg = encodeURIComponent(svg);

  return `data:image/svg+xml;utf8,${encodedSvg}`;
};
