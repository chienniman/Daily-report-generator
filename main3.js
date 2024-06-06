import {
  exportToExcel,
  clearTableAndInput,
  appendHeaderRows,
} from "./helpers/table.js";

let dailyKpi = null;

$(document).ready(function () {
  $("#resetBtn").click(() => {
    clearTableAndInput();
  });

  $("#exportToExcelBtn").click(() => {
    exportToExcel();
  });

  $("#monthStocks").on("change", function () {
    var fileName = $(this).val().split("\\").pop();
    $("#monthStocksFileNameDisplay").text("單月進銷存 : " + fileName);
  });

  $("#todaySells").on("change", function () {
    var fileName = $(this).val().split("\\").pop();
    $("#todaySellsFileNameDisplay").text("單日銷貨 : " + fileName);
  });

  $("#dailyKpi").on("change", function () {
    dailyKpi = this;
    var fileName = $(this).val().split("\\").pop();
    $("#dailyKpiDisplay").text("每日業績 : " + fileName);
  });
  
  $("#generateBtn").on("click", function () {
    filePicked(dailyKpi);

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
            icon: "error"
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
        icon: "error"
    });
    }
  });
});


function filterByPrdtAndPxMarts(array) {
  return array.filter(
    (e) => targetPrdtCodes.includes(e[5]) && targetPxMarts.includes(e[4])
  );
}

function convertToJson(array, type) {
  const jsonData = {};

  array.forEach((e) => {
    const store = e[4];
    const product = e[7];
    const quantityKey = type === "monthStocks" ? "stockQty" : "sellQty";
    const quantity = Number(e[type === "monthStocks" ? 12 : 8]);

    if (!jsonData[store]) {
      jsonData[store] = {};
    }
    if (!jsonData[store][product]) {
      jsonData[store][product] = {};
    }
    jsonData[store][product][quantityKey] = quantity;
  });

  return jsonData;
}

function appendTableRows(monthStocksData, todaySellsData) {
  const table = $("#resultTable");

  for (const area in targetAreaPxMarts) {
    const stores = targetAreaPxMarts[area];
    for (const store of stores) {
      const storeRow = $("<tr>").addClass("table-row");
      storeRow.append($("<td>").text(" "));
      storeRow.append($("<td>").text(area));

      const storeButton = $("<button>")
        .addClass(store)
        .text(store)
        .css("cursor", "pointer")
        .on("click", () => {
          $(`.${store}`).prop("disabled", true);
          console.log(getOjs());

          const dailyKpiArray = getOjs();
          const result = dailyKpiArray.find(e => e.店名 === store);

          if (result) {
            if (result["差異金額"].startsWith("--")) {
              result["差異金額"] = result["差異金額"].replace("--", "少");
            } else {
              result["差異金額"] = "多" + result["差異金額"];
            }
            
            const text = `達成率${result["達成%"]}，差異金額${result["差異金額"]}`
            console.log(text);

            Swal.fire({
              title: "後續追蹤事項",
              text: text,
              icon: "success"
          });
          }

          })

      storeRow.append($("<td>").append(storeButton));

      for (const e of targetProductName) {
        const stockQty =
          monthStocksData && monthStocksData[store] && monthStocksData[store][e]
            ? monthStocksData[store][e].stockQty
            : "N/A";

        const sellQty =
          todaySellsData && todaySellsData[store] && todaySellsData[store][e]
            ? todaySellsData[store][e].sellQty
            : "0";

        const stockQtyCell = $("<td id='stock'>").html(
          `<div class="split-td"><div class="darkred-text">${stockQty}</div></div>`
        );
        const sellQtyCell = $("<td id='sell'>").html(
          `<div class="split-td"><div class="darkred-text">${sellQty}</div></div>`
        );
        storeRow.append(stockQtyCell, sellQtyCell);
      }
      table.append(storeRow);
    }
  }
}

async function generateReport() {
  try {
    const monthStocksData = await processCSV("monthStocks");
    const todaySellsData = await processCSV("todaySells");

    appendHeaderRows();
    appendTableRows(monthStocksData, todaySellsData);
  } catch (error) {
    console.error("報表生成錯誤", error);
  }
}

async function processCSV(inputName) {
  return new Promise(function (resolve, reject) {
    $(`input[name=${inputName}]`).csv2arr(function (array) {
      const filteredData = filterByPrdtAndPxMarts(array);
      const jsonData = convertToJson(filteredData, inputName);

      $(`input[name=${inputName}]`).val("");
      resolve(jsonData);
    });
  });
}
