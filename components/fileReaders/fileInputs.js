import { fileInput } from "../shared/fileInput.js";
import { processData, setData } from "../../utils/dataProcessing.js";

$(document).ready(function () {
  function createBaseElement() {
    $("#uploadedFiles").append(`
      <div id="monthStocksFileNameDisplay"></div>
      <div id="todaySellsFileNameDisplay"></div>
      <div id="dailyKpiFileNameDisplay"></div>
    `);

    $(".top-row").append(
      fileInput({
        id: "monthStocks",
        text: "庫存",
        styles: {
          background: "#02723b",
        },
      }),
      fileInput({
        id: "todaySells",
        text: "日銷",
        styles: {
          background: "#02723b",
        },
      }),
      fileInput({
        id: "dailyKpi",
        text: "績效",
        styles: {
          background: "#02723b",
        },
      })
    );
  }

  createBaseElement();

  $("#monthStocks").on("change", function () {
    var fileName = $(this).val().split("\\").pop();
    $("#monthStocksFileNameDisplay").text("進銷存 : " + fileName);
  });

  $("#todaySells").on("change", function () {
    var fileName = $(this).val().split("\\").pop();
    $("#todaySellsFileNameDisplay").text("單日銷貨 : " + fileName);
  });

  $("#dailyKpi").on("change", function () {
    var fileName = $(this).val().split("\\").pop();
    $("#dailyKpiFileNameDisplay").text("每日業績 : " + fileName);

    var file = this.files[0];
    var reader = new FileReader();

    new Promise((resolve, reject) => {
      reader.onload = function (e) {
        try {
          var data = e.target.result;
          var cfb = XLSX.read(data, { type: "binary" });
          var summaryData = processData(cfb.Sheets["總表"]);

          console.log(summaryData);
          setData("summaryData", summaryData);
          var dailyKpiArray = XLSX.utils.sheet_to_json(cfb.Sheets["簡雯樺"]);
          setData("dailyKpiArray", dailyKpiArray);
          resolve();
        } catch (error) {
          reject(error);
        }
      };

      reader.onerror = function (e) {
        reject(e);
      };

      reader.readAsBinaryString(file);
    })
      .then(() => {
        console.log("績效總表成功上傳");
      })
      .catch((error) => {
        console.error("績效總表上傳失敗", error);
      });
  });
});
