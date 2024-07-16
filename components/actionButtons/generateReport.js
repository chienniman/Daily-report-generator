import { createReport } from "../../utils/report.js";
import { validateInputs } from "../../utils/validation.js";
import { button } from "../shared/buttons/button.js";

$(document).ready(function () {
  $(".top-row").append(
    button({
      id: "generateReport",
      text: "生成",
    })
  );

  function showHiddenBtns() {
    $("#dailySummary,#exportToExcel,#reset,#searchBox").show();
  }

  $("#generateReport").on("click", async function () {
    if (!validateInputs()) return;
    Pace.restart();
    await createReport();
    Pace.stop();
    showHiddenBtns();
  });
});
