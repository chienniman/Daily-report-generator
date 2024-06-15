import { productMap } from "../dataSets/pxMarts.js";

function isTableEmpty(table) {
  return table.children().length === 0;
}

function showError(message) {
  Swal.fire({ title: message, icon: "error" });
}

function getFormattedDate() {
  const today = new Date();
  const month = today.getMonth() + 1;
  const day = today.getDate();

  return `${month}月_${day}日`;
}

function exportToExcel() {
  const htmlTable = $("#resultTable");

  if (isTableEmpty(htmlTable)) return showError("無法導出空表格!");

  const formattedDate = getFormattedDate();

  new Table2Excel().export(htmlTable, `PX台中日銷庫存表_${formattedDate}`);
}

function clearTableAndInput() {
  $("#fileNameDisplay, #resultTable").empty();
  $(
    "input[name=monthStocks], input[name=todaySells], input[name=dailyKpi]"
  ).val("");
  $(
    "#monthStocksFileNameDisplay, #todaySellsFileNameDisplay, #dailyKpiFileNameDisplay"
  ).text("");
}

function appendHeaderRows() {
  let headerRow = createHeaderRow();
  let subHeaderRow = createSubHeaderRow();

  $("#resultTable").append(headerRow);
  $("#resultTable").append(subHeaderRow);
}

function createHeaderRow() {
  let headerRow = "<tr class='gray'><th>處</th><th>區</th><th>店名</th>";

  Array.from(productMap.values()).forEach((product) => {
    headerRow += `<th colspan="2">${product}</th>`;
  });

  return headerRow + "</tr>";
}

function createSubHeaderRow() {
  let subHeaderRow = "<tr class='white'><th></th><th></th><th></th>";

  Array.from(productMap.values()).forEach(() => {
    subHeaderRow += `
            <th id="stock">
                <div class='darkred-text'>
                    庫存
                </div>
            </th>
            <th id="sell">
                <div class='darkred-text'>
                    日銷
                </div>
            </th>
        `;
  });

  return subHeaderRow + "</tr>";
}

export { exportToExcel, clearTableAndInput, appendHeaderRows };
