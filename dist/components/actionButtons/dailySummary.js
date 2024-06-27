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

  // utils/dataProcessing.js
  function getData(key) {
    var storedData = sessionStorage.getItem(key);
    return storedData ? JSON.parse(storedData) : null;
  }

  // components/actionButtons/dailySummary.js
  $(document).ready(function() {
    $(".top-row").append(
      button({
        id: "dailySummary",
        text: "\u7E3D\u7D50",
        styles: { display: "none" }
      })
    );
    $("#dailySummary").on("click", async function() {
      function generateSummary() {
        const visitedAreas = getData("visitedAreas");
        const visitedAreasText = visitedAreas.join("\uFF0C");
        const summaryData = getData("summaryData");
        const areaSummaries = summaryData.filter((e) => visitedAreas.includes(e["C"])).map((e) => {
          const F = Math.ceil(e["F"]);
          const G = Math.ceil(e["G"]);
          const E = (e["E"] * 100).toFixed(2) + "%";
          const H = (e["H"] * 100).toFixed(2) + "%";
          return `${e["C"]}\u7684\u696D\u7E3E\u76EE\u6A19\u662F ${F}\uFF0C\u696D\u7E3E\u9054\u6210\u662F ${G}\uFF0C\u696D\u7E3E\u5360\u6BD4\u662F ${E}\uFF0C\u9054\u6210\u767E\u5206\u6BD4\u662F ${H}`;
        });
        let base = `\u4ECA\u65E5\u62DC\u8A2A\u4E86${visitedAreasText},\u56DE\u9867\u4ECA\u65E5\u696D\u7E3E\u9054\u6210\uFF0C`;
        if (areaSummaries.length > 0) {
          base += areaSummaries.join(";");
        }
        Swal.fire({
          title: "\u6BCF\u65E5\u7E3D\u7D50",
          text: base,
          icon: "success"
        });
      }
      generateSummary();
    });
  });
})();
