import { button } from "/components/shared/buttons/button.js";
import { getData } from "/utils/dataProcessing.js";

$(document).ready(function () {
  $(".top-row").append(
    button({
      id: "dailySummary",
      text: "每日總結",
      styles: { display: 'none' }
    })
  );

  $("#dailySummary").on("click", async function () {
    function generateSummary() {
      const visitedAreas = getData("visitedAreas");
      const visitedAreasText = visitedAreas.join("，");
      const summaryData = getData("summaryData");
      const areaSummaries = summaryData
        .filter((e) => visitedAreas.includes(e["C"]))
        .map((e) => {
          const F = Math.ceil(e["F"]);
          const G = Math.ceil(e["G"]);
          const E = (e["E"] * 100).toFixed(2) + "%";
          const H = (e["H"] * 100).toFixed(2) + "%";

          return `${e["C"]}的業績目標是 ${F}，業績達成是 ${G}，業績占比是 ${E}，達成百分比是 ${H}`;
        });

      let base = `今日拜訪了${visitedAreasText},回顧今日業績達成，`;

      if (areaSummaries.length > 0) {
        base += areaSummaries.join(";");
      }

      Swal.fire({
        title: "每日總結",
        text: base,
        icon: "success",
      });
    }

    generateSummary();
  });
});
