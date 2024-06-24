import { processDailyKpi } from "/utils/fileProcessing.js";
import { createReport } from "/utils/report.js";
import { validateInputs } from "/utils/validation.js";
import { button } from "../shared/buttons/button.js";

$(document).ready(function () {
  $(".top-row").append(button({ id: "generateReport", text: "生成" }));

  $("#generateReport").on("click", async function () {
    processDailyKpi(dailyKpi);
    if (!validateInputs()) return;
    Pace.restart();
    await createReport();
    Pace.stop();
    $("#exportToExcel").show();
  });
});
