import { processDailyKpi, generateSummary, generateReport } from "./main3.js";
import { exportToExcel, clearTableAndInput } from "./helpers/table.js";

let dailyKpi = null;

$(document).ready(function () {
  // 清空
  $("#resetBtn").click(() => {
    clearTableAndInput();
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
  $("#generateBtn").on("click", function () {
    processDailyKpi();

    if ($("#monthStocks").val() && $("#todaySells").val()) {
      var monthStocksExtension = $("#monthStocks")[0]
        .files[0].name.split(".")
        .pop()
        .toLowerCase();

      var todaySellsExtension = $("#todaySells")[0]
        .files[0].name.split(".")
        .pop()
        .toLowerCase();

      if (monthStocksExtension !== "csv" || todaySellsExtension !== "csv") {
        Swal.fire({
          title: "輸入必須是 CSV 檔!",
          icon: "error",
        });
        return;
      }

      $("#loading").removeClass("hidden");

      generateReport().then(() => {
        $("#loading").addClass("hidden");
      });
    } else {
      Swal.fire({
        title: "必須同時上傳單月進銷存跟當日銷售!",
        icon: "error",
      });
    }
  });
});
