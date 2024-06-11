import { appendHeaderRows } from "./helpers/table.js";

let visitedAreas = [];

async function processDailyKpi() {
  if (!dailyKpi) {
    console.log("上傳每日績效表為空");
  }

  try {
    await filePicked(dailyKpi);

    console.log(getData("summaryData"));
  } catch (error) {
    console.error("錯誤", error);
  }
}

function generateSummary() {
  let base = `今日拜訪了${visitedAreas.join("，")},回顧今日業績達成，`;
  let summaryData = getData("summaryData");
  let areaSummaries = [];
  // C 區，D 店數，E 業績占比，F 業績目標，G 業績達成，H 達成 % 數
  summaryData.forEach((e) => {
    if (visitedAreas.includes(e["C"])) {
      let F = Math.ceil(e["F"]);
      let G = Math.ceil(e["G"]);
      let E = (e["E"] * 100).toFixed(2) + "%";
      let H = (e["H"] * 100).toFixed(2) + "%";

      let areaText = `${e["C"]}的業績目標是 ${F}，業績達成是 ${G}，業績占比是 ${E}，達成百分比是 ${H}`;
      areaSummaries.push(areaText);
    }
  });
  if (areaSummaries.length > 0) {
    base += areaSummaries.join(";");
  }

  Swal.fire({
    title: "每日總結",
    text: base,
    icon: "success",
  });
}

function filterByPrdtAndPxMarts(array) {
  return array.filter(
    (e) => targetPrdtCodes.includes(e[5]) && targetPxMarts.includes(e[4])
  );
}

function convertToJson(array, type) {
  return array.reduce((json, e) => {
    const [store, product, quantityKey] = [
      e[4],
      e[7],
      type === "monthStocks" ? "stockQty" : "sellQty",
    ];
    json[store] = json[store] || {};
    json[store][product] = json[store][product] || {};
    json[store][product][quantityKey] = Number(
      e[type === "monthStocks" ? 12 : 8]
    );

    return json;
  }, {});
}

function appendTableRows(monthStocksData, todaySellsData) {
  const table = $("#resultTable");

  for (const area in targetAreaPxMarts) {
    const stores = targetAreaPxMarts[area];
    for (const store of stores) {
      const storeRow = createStoreRow(
        area,
        store,
        monthStocksData,
        todaySellsData
      );
      table.append(storeRow);
    }
  }
}

function createStoreRow(area, store, monthStocksData, todaySellsData) {
  const storeRow = $("<tr>").addClass("table-row");
  storeRow.append($("<td>").text(" "));
  storeRow.append($("<td>").text(area));
  storeRow.append($("<td>").append(createStoreButton(area, store)));

  for (const product of targetProductName) {
    const stockQty = getStockQty(monthStocksData, store, product);
    const sellQty = getSellQty(todaySellsData, store, product);
    storeRow.append(
      createQtyCell("stock", stockQty),
      createQtyCell("sell", sellQty)
    );
  }

  return storeRow;
}

function createStoreButton(area, store) {
  return $("<button>")
    .addClass(store)
    .text(store)
    .css("cursor", "pointer")
    .on("click", () => handleStoreButtonClick(area, store));
}

function handleStoreButtonClick(area, store) {
  $(`.${store}`).prop("disabled", true);

  if (!visitedAreas.includes(area)) visitedAreas.push(area);

  const dailyKpiArray = getData("ojs");

  if (!dailyKpiArray) {
    Swal.fire({ title: "請先上傳當月績效總表", icon: "error" });
    return;
  }

  const result = dailyKpiArray.find((e) => e.店名 === store);

  if (result) {
    result["差異金額"] = formatDifference(result["差異金額"]);
    Swal.fire({
      title: "後續追蹤事項",
      text: `達成率${result["達成%"]}，差異金額${result["差異金額"]}`,
      icon: "success",
    });
  }
}

function formatDifference(diff) {
  return diff.startsWith("--") ? diff.replace("--", "少") : "多" + diff;
}

function getStockQty(monthStocksData, store, product) {
  return monthStocksData?.[store]?.[product]?.stockQty ?? "N/A";
}

function getSellQty(todaySellsData, store, product) {
  return todaySellsData?.[store]?.[product]?.sellQty ?? "0";
}

function createQtyCell(id, qty) {
  return $(`<td id='${id}'>`).html(
    `<div class="split-td"><div class="darkred-text">${qty}</div></div>`
  );
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

function validateInputs() {
  const monthStocks = $("#monthStocks").val();
  const todaySells = $("#todaySells").val();

  if (!monthStocks || !todaySells) {
    Swal.fire({
      title: "必須同時上傳單月進銷存跟當日銷售!",
      icon: "error",
    });
    return false;
  }

  if (!isCSV("#monthStocks") || !isCSV("#todaySells")) {
    Swal.fire({ title: "輸入必須是 CSV 檔!", icon: "error" });
    return false;
  }
  return true;
}

function isCSV(input) {
  const ext = $(input)[0].files[0].name.split(".").pop().toLowerCase();
  return ext === "csv";
}

export {
  processDailyKpi,
  generateSummary,
  generateReport,
  validateInputs,
};
