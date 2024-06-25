import { mergeStyleString } from "/helpers/mergeStyleString.js";

function button(buttonOptions) {
  const { id, text, styles } = buttonOptions;
  const fixedStyles = {
    "max-width": "100px",
    "min-height": "58px",
  };

  return `<button id="${id}" class="button" style="${mergeStyleString(
    fixedStyles,
    styles
  )}">${text}</button>`;
}

export { button };
