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

  // components/actionButtons/reset.js
  $(document).ready(function() {
    $(".top-row").append(
      button({
        id: "reset",
        text: "\u91CD\u7F6E",
        styles: { display: "none" }
      })
    );
    $("#reset").on("click", async function() {
      function reset() {
        sessionStorage.clear();
        $("#fileNameDisplay, #resultTable").empty();
        $(
          "input[name=monthStocks], input[name=todaySells], input[name=dailyKpi]"
        ).val("");
        $(
          "#monthStocksFileNameDisplay, #todaySellsFileNameDisplay, #dailyKpiFileNameDisplay"
        ).text("");
      }
      reset();
    });
  });
})();
