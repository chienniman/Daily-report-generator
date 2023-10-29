const inventoryAlert = {
    "華強　南僑水晶肥皂 / ２００ｇ＊３塊": 12,
    "華強　南僑水晶肥皂－檸檬清香 / １５０ｇ＊３入": 12,
    "華強　南僑水晶肥皂－檸檬１５０ / ｇ＊６贈食器洗滌液體２５０ｍｌ": 7,
    "華強　水晶肥皂液體補充包－輕柔型 / １６００ｇ": 4,
    "華強　水晶肥皂食器洗滌液體 / １０００ｍｌ": 6,
    "華強　水晶肥皂食器洗滌液体 / －速淨＆清新８００ｍｌ": 6,
};

const restockMarts = [];

$(document).ready(function () {
    $("[data-search]").on("keyup", function () {
        var searchVal = $(this).val();
        var filterItems = $("[data-filter-item]");

        if (searchVal != "") {
            filterItems.addClass("hidden");
            $(
                '[data-filter-item][data-filter-name*="' +
                    searchVal.toLowerCase() +
                    '"]'
            ).removeClass("hidden");
        } else {
            filterItems.removeClass("hidden");
        }
    });
    $("#inventoryAlertBtn").click(function () {
        $("#modal").show("slow");

        $(".close").click(function () {
            $("#modal").fadeOut("slow");
        });

        if ($("#resultTable").children().length > 0) {
            restockMarts.forEach((item) => {
                const itemElement = $("<div>")
                    .attr("data-filter-item", item)
                    .attr("data-filter-name", item)
                    .text(item);
                $(".items").append(itemElement);
            });
        }
    });
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
    $("#generateBtn").on("click", function () {
        if ($("#monthStocks").val() && $("#todaySells").val()) {
            var monthStocksExtension = $("#monthStocks")[0]
                .files[0].name.split(".")
                .pop()
                .toLowerCase();

            var todaySellsExtension = $("#todaySells")[0]
                .files[0].name.split(".")
                .pop()
                .toLowerCase();

            if (
                monthStocksExtension !== "csv" ||
                todaySellsExtension !== "csv"
            ) {
                alert("輸入必須是 CSV 檔!");
                return;
            }

            $("#loading").removeClass("hidden");

            generateReport().then(() => {
                $("#loading").addClass("hidden");
            });
        } else {
            alert("必須同時上傳單月進銷存跟當日銷售");
        }
    });
});

function exportToExcel() {
    const table2excel = new Table2Excel();
    const htmlTable = $("#resultTable");

    if (htmlTable.children().length === 0) {
        alert("無法導出空表格");
        return;
    }

    const today = new Date();
    const month = today.getMonth() + 1;
    const day = today.getDate();
    const formattedDate = `${month}月_${day}日`;

    table2excel.export(htmlTable, `PX台中日銷庫存表_${formattedDate}`);
}

function clearTableAndInput() {
    $("#fileNameDisplay").empty();
    $("#resultTable").empty();
    $("input[name=monthStocks]").val("");
    $("#monthStocksFileNameDisplay").text("");
    $("input[name=todaySells]").val("");
    $("#todaySellsFileNameDisplay").text("");
}

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

function appendHeaderRows() {
    var headerRow = `
    <tr class='gray'>
        <th>處</th>
        <th>區</th>
        <th>店名</th>
    `;

    var subHeaderRow = `
    <tr class='white'>
        <th></th>
        <th></th>
        <th></th>
    `;

    for (const i in targetProductName) {
        const product = targetProductName[i];
        headerRow += `<th colspan="2">${product}</th>`;

        subHeaderRow += `
            <th>
                <div class='darkred-text'>
                    庫存
                </div>
            </th>
            <th>
                <div class='darkred-text'>
                    日銷
                </div>
            </th>
        `;
    }

    headerRow += "</tr>";
    $("#resultTable").append(headerRow);

    subHeaderRow += "</tr>";
    $("#resultTable").append(subHeaderRow);
}

function appendTableRows(monthStocksData, todaySellsData) {
    const table = $("#resultTable");

    for (const area in targetAreaPxMarts) {
        const stores = targetAreaPxMarts[area];
        for (const store of stores) {
            const storeRow = $("<tr>").addClass("table-row");
            storeRow.append($("<td>").text(" ")); 
            storeRow.append($("<td>").text(area)); 
            storeRow.append($("<td>").text(store));
            for (const e of targetProductName) {
                const stockQty =
                    monthStocksData &&
                    monthStocksData[store] &&
                    monthStocksData[store][e]
                        ? monthStocksData[store][e].stockQty
                        : "N/A";

                if (inventoryAlert.hasOwnProperty(e)) {
                    if (
                        Number(stockQty) === stockQty &&
                        stockQty < inventoryAlert[e]
                    ) {
                        const restockItem = `${area}_${store}_${e}_庫存_${monthStocksData[store][e].stockQty}`;
                        restockMarts.push(restockItem);
                    }
                }

                const sellQty =
                    todaySellsData &&
                    todaySellsData[store] &&
                    todaySellsData[store][e]
                        ? todaySellsData[store][e].sellQty
                        : "0";
                const cell1 = $("<td>").html(
                    `<div class="split-td"><div class="darkred-text">${stockQty}</div></div>`
                );
                const cell2 = $("<td>").html(
                    `<div class="split-td"><div class="darkred-text">${sellQty}</div></div>`
                );
                storeRow.append(cell1, cell2);
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
        console.error("Error generating stock report:", error);
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
