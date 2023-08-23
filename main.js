const targetPrdtCodes = [
    "61010953",
    "61010830",
    "61010960",
];

const targetProductName = [
    "華強　南僑水晶肥皂 / ２００ｇ＊３塊",
    "華強　南僑水晶肥皂－檸檬清香 / １５０ｇ＊３入",
    "華強　水晶肥皂液體補充包－輕柔型 / １６００ｇ",
];

const targetPxMarts = [
    "豐原成功",
    "豐原田心",
    "豐原豐東",
    "豐原向陽",
    "東勢豐勢",
    "新社中和",
    "大雅學府",
    "大雅雅環",
    "神岡中正",
    "潭子中山",
    "大里",
    "大里成功",
    "霧峰民生",
    "太平樹德",
    "太平宜昌",
    "逢甲",
    "台中忠義",
    "台中崇德",
    "台中松竹",
    "台中四平",
    "台中大鵬",
    "北屯",
    "台中大昌",
    "精誠",
    "旅順",
    "台中大進",
    "台中博館",
    "忠明",
    "台中嶺東",
    "台中忠明南",
    "台中復興",
    "台中林森",
    "台中建國南",
    "台中樂群",
    "美村綠",
    "台中工學",
    "台中南門",
    "烏日長春",
    "烏日中山",
    "沙鹿",
    "清水中興",
    "清水五權",
    "清水鰲峰",
];

$(document).ready(function () {
    $("#resetBtn").click(() => {
        clearTableAndInput();
    });
    $("#file-input").on("change", function () {
        var fileName = $(this).val().split("\\").pop();
        $("#fileNameDisplay").text(fileName);
    });
    $("#generateBtn").on("click", function () {
        if ($("#file-input").val()) {
            $("#loading").removeClass("hidden");
            generateStockReport().then(() => {
                $("#loading").addClass("hidden");
            });
        }
    });
});

function clearTableAndInput() {
    $("#fileNameDisplay").empty();
    $("#resultTable").empty();
    $("input[name=csvfile]").val("");
}

function filterByPrdtAndPxMarts(array) {
    return array.filter(
        (e) => targetPrdtCodes.includes(e[5]) && targetPxMarts.includes(e[4])
    );
}

function convertToJson(array) {
    const jsonData = {};
    array.forEach((e) => {
        const store = e[4];
        const product = e[7];
        const purchaseQty = Number(e[9]);
        const stockQty = Number(e[12]);
        const totalQty = purchaseQty + stockQty;

        if (!jsonData[store]) {
            jsonData[store] = {};
        }
        if (!jsonData[store][product]) {
            jsonData[store][product] = {
                purchaseQty: 0,
                totalQty: 0,
            };
        }
        jsonData[store][product].purchaseQty = purchaseQty;
        jsonData[store][product].totalQty = totalQty;
    });
    return jsonData;
}

function appendHeaderRows() {
    var headerRow = "<tr class='gray'><th></th>";
    var subHeaderRow = "<tr class='white'><th></th>";

    for (const i in targetProductName) {
        const product = targetProductName[i];
        headerRow += "<th>" + product + "</th>";

        subHeaderRow += `
		    <th>
		        <div class="split-td">
		            <div>進貨</div>
		            <div class='darkred-text'>總庫存</div>
		        </div>
		    </th>
		`;
    }

    headerRow += "</tr>";
    $("#resultTable").append(headerRow);

    subHeaderRow += "</tr>";
    $("#resultTable").append(subHeaderRow);
}

function appendTableRows(targetPxMarts, targetProductName, jsonData) {
    for (const i in targetPxMarts) {
        const store = targetPxMarts[i];
        var row = "<tr class='white'><td class='yellow'>" + store + "</td>";
        for (const e of targetProductName) {
            row += `<td>
                    <div class="split-td">
                        <div>${jsonData[store][e].purchaseQty}</div>
                        <div class='darkred-text'>${jsonData[store][e].totalQty}</div>
                    </div>
                </td>`;
        }
        row += "</tr>";
        $("#resultTable").append(row);
    }
}

function generateStockReport() {
    return new Promise(function (resolve, reject) {
        $("input[name=csvfile]").csv2arr(function (arr) {
            clearTableAndInput();

            const filteredData = filterByPrdtAndPxMarts(arr);
            const jsonData = convertToJson(filteredData);

            appendHeaderRows();
            appendTableRows(targetPxMarts, targetProductName, jsonData);

            resolve("Stock report generated successfully");
        });
    });
}
