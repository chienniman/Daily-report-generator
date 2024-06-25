function mergeStyleString(fixedStyles, styles) {
  const mergedStyles = { ...fixedStyles, ...styles };

  return Object.keys(mergedStyles)
    .map((key) => `${key}: ${mergedStyles[key]};`)
    .join(" ");
}

export { mergeStyleString };
