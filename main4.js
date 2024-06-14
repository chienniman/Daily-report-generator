import {
  groupedStores,
  storeCodes,
  targetPrdtCodes,
  targetProductName,
} from "./dataSets/pxMarts.js";
import { appendHeaderRows, clearTableAndInput } from "./helpers/table.js";

let visitedAreas = [];

function reset() {
  sessionStorage.clear();

  clearTableAndInput();
}

async function processDailyKpi(dailyKpi) {
  if (!dailyKpi) {
    console.log("上傳每日績效表為空");

    return;
  }

  await filePicked(dailyKpi);
}

function generateSummary() {
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

function getfilteredData(array) {
  return array.filter((item) => {
    const PTDPNO = Number(item[3]);
    const PRDTCODE = item[5];

    return storeCodes.includes(PTDPNO) && targetPrdtCodes.includes(PRDTCODE);
  });
}

function convertToJson(array, type) {
  return array.reduce((json, e) => {
    const PTDPNO = Number(e[3]);
    const key = type === "monthStocks" ? "stockQtys" : "sellQtys";
    const value = Number(e[type === "monthStocks" ? 12 : 8]);
    const dynamicKey = e[7];

    if (!json[PTDPNO]) {
      json[PTDPNO] = {
        PTDPNA: e[4],
        stockQtys: [],
        sellQtys: [],
      };
    }

    json[PTDPNO][key].push({ [dynamicKey]: value });

    return json;
  }, {});
}

function appendTableRows(monthStocksData, todaySellsData) {
  const table = $("#resultTable");

  groupedStores.forEach((stores, area) => {
    stores.forEach((storeName, storeId) => {
      const storeRow = createStoreRow(
        area,
        { id: storeId, name: storeName },
        monthStocksData,
        todaySellsData
      );
      table.append(storeRow);
    });
  });
}

function createStoreRow(area, store, monthStocksData, todaySellsData) {
  const storeRow = $("<tr>")
    .addClass("table-row")
    .append(
      $("<td>").text(" "),
      $("<td>").text(area),
      $("<td>").append(createStoreButton(area, store))
    );

  targetProductName.forEach((product) => {
    const stockQty = getStockQty(monthStocksData, store, product);
    const sellQty = getSellQty(todaySellsData, store, product);

    storeRow.append(
      createQtyCell("stock", stockQty),
      createQtyCell("sell", sellQty)
    );
  });

  return storeRow;
}

function createStoreButton(area, store) {
  return $("<button>")
    .addClass(store.name)
    .text(store.name)
    .css("cursor", "pointer")
    .on("click", () => handleStoreButtonClick(area, store));
}

function handleStoreButtonClick(area, store) {
  $(`.${store.name}`).prop("disabled", true);

  if (!visitedAreas.includes(area)) visitedAreas.push(area);

  const dailyKpiArray = getData("ojs");

  if (!dailyKpiArray) {
    Swal.fire({ title: "請先上傳當月績效總表", icon: "error" });

    return;
  }

  const result = dailyKpiArray.find((e) => e.店號 === store.id.toString());

  if (!result) {
    Swal.fire({
      title: "無店家資料",
      icon: "error",
    });

    return;
  }

  result["差異金額"] = formatDifference(result["差異金額"]);

  Swal.fire({
    title: "後續追蹤事項",
    text: `達成率${result["達成%"]}，差異金額${result["差異金額"]}`,
    icon: "success",
  });
}

function formatDifference(diff) {
  return diff.startsWith("--") ? diff.replace("--", "少") : "多" + diff;
}

function getStockQty(monthStocksData, store, product) {
  const stockQtys = monthStocksData?.[store.id]?.stockQtys || [];
  const foundItem = stockQtys.find((item) => item.hasOwnProperty(product));

  return foundItem ? foundItem[product] : "N/A";
}

function getSellQty(todaySellsData, store, product) {
  return (
    todaySellsData?.[store.id]?.sellQtys?.find(
      (item) => item[product] !== undefined
    )?.[product] || "0"
  );
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
      const data = getfilteredData(array);
      const jsonData = convertToJson(data, inputName);

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
  reset,
};
