function button(buttonOptions) {
  const { id, text, styles } = buttonOptions;
  const styleString = Object.keys(styles || {})
    .map((key) => `${key}: ${styles[key]};`)
    .join(" ");

  return `<button id="${id}" class="button" style="${styleString}">${text}</button>`;
}

export { button };
