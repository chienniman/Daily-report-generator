import {
  processDailyKpi,
  generateSummary,
  generateReport,
  validateInputs,
  reset,
} from "./main4.js";
import { exportToExcel } from "./helpers/table.js";

let dailyKpi = null;

$(document).ready(function () {
  // 清空
  $("#resetBtn").click(() => {
    reset();
  });

  // 導出數據
  $("#exportToExcelBtn").click(() => {
    exportToExcel();
  });

  // 每日總結
  $("#dailySummary").click(() => {
    generateSummary();
  });

  // 進銷存上傳
  $("#monthStocks").on("change", function () {
    var fileName = $(this).val().split("\\").pop();
    $("#monthStocksFileNameDisplay").text("單月進銷存 : " + fileName);
  });

  // 當日銷售上傳
  $("#todaySells").on("change", function () {
    var fileName = $(this).val().split("\\").pop();
    $("#todaySellsFileNameDisplay").text("單日銷貨 : " + fileName);
  });

  // 每日總結
  $("#dailyKpi").on("change", function () {
    dailyKpi = this;
    var fileName = $(this).val().split("\\").pop();
    $("#dailyKpiFileNameDisplay").text("每日業績 : " + fileName);
  });

  // 生成
  $("#generateBtn").on("click", async function () {
    processDailyKpi(dailyKpi);

    if (!validateInputs()) return;

    Pace.restart();

    await generateReport();

    Pace.stop();
  });
});
