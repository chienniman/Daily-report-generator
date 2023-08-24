const targetPrdtCodes = ["61010953", "61010830", "61010960"];

const targetProductName = [
    "華強　南僑水晶肥皂 / ２００ｇ＊３塊",
    "華強　南僑水晶肥皂－檸檬清香 / １５０ｇ＊３入",
    "華強　水晶肥皂液體補充包－輕柔型 / １６００ｇ",
];

const targetPxMarts = [
    "豐原成功",
    "神岡五權",
    "后里文明",
    "豐原田心",
    "豐原豐東",
    "豐原向陽",
    "豐原北陽",
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
    "台中忠孝",
    "逢甲",
    "台中忠義",
    "台中大鵬",
    "台中福科",
    "台中陜西",
    "台中崇德",
    "五權",
    "台中松竹",
    "台中四平",
    "北屯",
    "台中大坑",
    "台中軍太",
    "精誠",
    "天津",
    "旅順",
    "台中大進",
    "台中博館",
    "台中大昌",
    "台中市政",
    "忠明",
    "台中嶺東",
    "台中黎明",
    "台中豐樂",
    "台中向上",
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
            var fileName = $("#file-input")[0].files[0].name;
            var fileExtension = fileName.split(".").pop().toLowerCase();

            if (fileExtension !== "csv") {
                alert("Invalid file type. Please select a CSV file.");
                return;
            }

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
        const stockQty = Number(e[12]);

        if (!jsonData[store]) {
            jsonData[store] = {};
        }
        if (!jsonData[store][product]) {
            jsonData[store][product] = {
                stockQty: 0,
            };
        }
        jsonData[store][product].stockQty = stockQty;
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
                <div class='darkred-text'>昨日庫存</div>
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
        var row = "<tr class='table-row'><td class='yellow'>" + store + "</td>";
        for (const e of targetProductName) {
            row += `<td>
                    <div class="split-td">
                        <div class='darkred-text'>${jsonData[store][e]?.stockQty}</div>
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
