import { mergeStyleString } from "/helpers/mergeStyleString.js";

function button({ id, text, styles }) {
  const fixedStyles = {
    "max-width": "80px",
    cursor: "pointer",
  };

  return `<button id="${id}" class="button" style="${mergeStyleString(
    fixedStyles,
    styles
  )}">${text}</button>`;
}

export { button };
