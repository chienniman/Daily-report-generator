import {
  exportToExcel,
  clearTableAndInput,
  appendHeaderRows,
} from "./helpers/table.js";

let dailyKpi = null, visitedAreas = [];

async function processDailyKpi() {
  if (!dailyKpi) {
    console.log('上傳每日績效表為空');
  }

  try {
    await filePicked(dailyKpi); 

    console.log(getData('summaryData'));
  } catch (error) {
    console.error('錯誤', error);
  }
}

function generateSummary(){
  let base = `今日拜訪了${visitedAreas.join("，")},回顧今日業績達成，`;
  let summaryData = getData('summaryData');
  let areaSummaries = [];
  // C 區，D 店數，E 業績占比，F 業績目標，G 業績達成，H 達成 % 數
  summaryData.forEach((e)=>{
    if (visitedAreas.includes(e["C"])) {
      let F = Math.ceil(e["F"]);
      let G = Math.ceil(e["G"]); 
      let E = (e["E"] * 100).toFixed(2) + "%"; 
      let H = (e["H"] * 100).toFixed(2) + "%"; 
  
      let areaText = `${e["C"]}的業績目標是 ${F}，業績達成是 ${G}，業績占比是 ${E}，達成百分比是 ${H}`;
      areaSummaries.push(areaText);
    }
  })
  if (areaSummaries.length > 0) {
    base += areaSummaries.join(";");
  }

  Swal.fire({
    title: "每日總結",
    text: base,
    icon: "success"
});
}

$(document).ready(function () {
  $("#resetBtn").click(() => {
    clearTableAndInput();
  });

  $("#exportToExcelBtn").click(() => {
    exportToExcel();
  });

  $("#dailySummary").click(() => {
    generateSummary();
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
    $("#dailyKpiFileNameDisplay").text("每日業績 : " + fileName);
  });
  
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

          if (!visitedAreas.includes(area)) {
            visitedAreas.push(area);
          } 

          const dailyKpiArray = getData('ojs');

		  if(!dailyKpiArray){
			Swal.fire({
				title: "請先上傳當月績效總表",
				icon: "error"
			});
			return;
		  }

          const result = dailyKpiArray.find(e => e.店名 === store);

          if (result) {
            if (result["差異金額"].startsWith("--")) {
              result["差異金額"] = result["差異金額"].replace("--", "少");
            } else {
              result["差異金額"] = "多" + result["差異金額"];
            }
            
            const text = `達成率${result["達成%"]}，差異金額${result["差異金額"]}`

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
