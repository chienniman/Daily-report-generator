(() => {
  // helpers/mergeStyleString.js
  function mergeStyleString(fixedStyles, styles) {
    const mergedStyles = { ...fixedStyles, ...styles };
    return Object.keys(mergedStyles).map((key) => `${key}: ${mergedStyles[key]};`).join(" ");
  }

  // components/shared/buttons/button.js
  function button({ id, text, styles }) {
    const fixedStyles = {
      "max-width": "80px",
      cursor: "pointer"
    };
    return `<button id="${id}" class="button" style="${mergeStyleString(
      fixedStyles,
      styles
    )}">${text}</button>`;
  }

  // components/actionButtons/exportToExcel.js
  $(document).ready(function() {
    $(".top-row").append(
      button({
        id: "exportToExcel",
        text: "\u5C0E\u51FA",
        styles: { display: "none" }
      })
    );
    $("#exportToExcel").on("click", async function() {
      function isTableEmpty(table) {
        return table.children().length === 0;
      }
      function downloadDate() {
        const today = /* @__PURE__ */ new Date();
        const month = today.getMonth() + 1;
        const day = today.getDate();
        return `${month}\u6708_${day}\u65E5`;
      }
      function exportToExcel() {
        const htmlTable = $("#resultTable");
        if (isTableEmpty(htmlTable)) {
          Swal.fire({ title: "\u7121\u6CD5\u5C0E\u51FA\u7A7A\u8868\u683C!", icon: "error" });
        }
        new Table2Excel().export(htmlTable, `PX\u53F0\u4E2D\u65E5\u92B7\u5EAB\u5B58\u8868_${downloadDate()}`);
      }
      exportToExcel();
    });
  });
})();
