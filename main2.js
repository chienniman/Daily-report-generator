const targetPrdtCodes = [
    "61010960",
    // 華強　南僑水晶肥皂 / ２００ｇ＊３塊
    "61010830",
    // 華強　南僑水晶肥皂－檸檬清香 / １５０ｇ＊３入
    "61011024",
    // 華強　南僑水晶肥皂－檸檬１５０ / ｇ＊６贈食器洗滌液體２５０ｍｌ
    "61010953",
    // 華強　水晶肥皂液體補充包－輕柔型 / １６００ｇ
    "71210073",
    // 華強　水晶肥皂食器洗滌液體 / １０００ｍｌ
    "61050066",
    // 華強　水晶肥皂食器洗滌液体 / －速淨＆清新８００ｍｌ
    "61010929",
    // 華強　南僑水晶皂力淨洗衣液體皂 / １６００ｇ
    "61010942",
    // 華強　南僑葡萄柚籽抗菌洗衣液體 / 皂－維他命Ｅ護纖配方１４００ｇ
    "61010950",
    // 華強　水晶肥皂洗衣用液體輕柔系 / 列補充包－優雅花香１６００ｇ
    "61010951",
    // 華強　水晶肥皂洗衣用液體補充包－ / 輕柔系列舒緩草香１６００ｇ
    "61010952",
    // 華強　南僑水晶肥皂液体補充包－ / 抗菌輕柔型１５００ｇ
    "61010992",
    // 華強　南僑水晶Ｓｐｏｒｔｓ抗菌 / 除臭洗衣液體皂補充包８００ｇ
    "61010995",
    // 華強　南僑水晶葡萄柚籽防霉洗衣 / 液體皂補充包－室內晾１２００ｇ
    "61010991",
    // 華強　南僑水晶Ｓｐｏｒｔｓ抗菌 / 除臭洗衣液體皂瓶裝１０００ｇ
    "61010994",
    // 華強　南僑水晶葡萄柚籽抗菌防霉 / 洗衣液體皂－室內晾２ｋｇ
    "71140132",
    // 華強　水晶肥皂液體－輕柔型 / ２﹒４ｋｇ
    "71018500",
    // 華強　南僑水晶肥皂液体－抗菌輕 / 柔型２．２ｋｇ
    "71018608",
    // 華強　水晶肥皂洗衣用液體輕柔系 / 列－優雅花香２．４ｋｇ
    "71110016",
    // 華強　水晶肥皂洗衣用粉体 / １．７９ｋｇ
];

const targetProductName = [
    "華強　南僑水晶肥皂 / ２００ｇ＊３塊",
    "華強　南僑水晶肥皂－檸檬清香 / １５０ｇ＊３入",
    "華強　南僑水晶肥皂－檸檬１５０ / ｇ＊６贈食器洗滌液體２５０ｍｌ",
    "華強　水晶肥皂液體補充包－輕柔型 / １６００ｇ",
    "華強　水晶肥皂食器洗滌液體 / １０００ｍｌ",
    "華強　水晶肥皂食器洗滌液体 / －速淨＆清新８００ｍｌ",
    "華強　南僑水晶皂力淨洗衣液體皂 / １６００ｇ",
    "華強　南僑葡萄柚籽抗菌洗衣液體 / 皂－維他命Ｅ護纖配方１４００ｇ",
    "華強　水晶肥皂洗衣用液體輕柔系 / 列補充包－優雅花香１６００ｇ",
    "華強　水晶肥皂洗衣用液體補充包－ / 輕柔系列舒緩草香１６００ｇ",
    "華強　南僑水晶肥皂液体補充包－ / 抗菌輕柔型１５００ｇ",
    "華強　南僑水晶Ｓｐｏｒｔｓ抗菌 / 除臭洗衣液體皂補充包８００ｇ",
    "華強　南僑水晶葡萄柚籽防霉洗衣 / 液體皂補充包－室內晾１２００ｇ",
    "華強　南僑水晶Ｓｐｏｒｔｓ抗菌 / 除臭洗衣液體皂瓶裝１０００ｇ",
    "華強　南僑水晶葡萄柚籽抗菌防霉 / 洗衣液體皂－室內晾２ｋｇ",
    "華強　水晶肥皂液體－輕柔型 / ２﹒４ｋｇ",
    "華強　南僑水晶肥皂液体－抗菌輕 / 柔型２．２ｋｇ",
    "華強　水晶肥皂洗衣用液體輕柔系 / 列－優雅花香２．４ｋｇ",
    "華強　水晶肥皂洗衣用粉体 / １．７９ｋｇ",
];

const targetAreaPxMarts = {
    大甲區: [
        "大甲民生",
        "大甲甲后",
        "大甲光明",
        "大甲復興",
        "大甲經國",
        "大甲黎明",
        "台中豐后",
        "后里",
        "后里文明",
        "神岡五權",
        "豐原大豐",
        "豐原成功",
    ],
    北中區: [
        "五權",
        "台中二中",
        "台中三民",
        "台中太原",
        "台中永興",
        "台中明新",
        "台中東光",
        "台中陜西",
        "台中健行",
        "台中崇德",
        "台中進化",
        "台中新民",
        "台中學士",
    ],
    北屯區: [
        "大連",
        "中清",
        "台中大坑",
        "台中大鵬",
        "台中四平",
        "台中北屯二",
        "台中東山",
        "台中松五",
        "台中松竹",
        "台中南興",
        "台中軍太",
        "台中崇德八",
        "台中敦化",
        "台中敦富",
        "北屯",
        "軍功",
    ],
    西屯區: [
        "中工",
        "文心",
        "台中文華",
        "台中水湳",
        "台中西屯",
        "台中忠義",
        "台中青海",
        "台中國安",
        "台中福星",
        "台中福科",
        "台中環中",
        "台中寶慶",
        "逢甲",
    ],
    沙鹿區: [
        "沙鹿",
        "沙鹿中山",
        "沙鹿北勢東",
        "沙鹿屏西",
        "清水中山",
        "清水中興",
        "清水五權",
        "清水鰲峰",
    ],
    南西區: [
        "台中工學",
        "台中仁和",
        "台中民權",
        "台中建國南",
        "台中忠明南",
        "台中林森",
        "台中南門",
        "台中復興",
        "台中樂群",
        "台中學府",
        "美村綠",
    ],
    雅潭區: [
        "大雅民生",
        "大雅雅環",
        "大雅學府",
        "神岡中山",
        "神岡中正",
        "神岡昌平",
        "潭子",
        "潭子中山",
        "潭子得天",
        "潭子福潭",
        "潭子潭陽",
        "潭子潭豐",
        "潭子豐興",
    ],
    新屯區: [
        "天津",
        "台中大昌",
        "台中大進",
        "台中山西",
        "台中市政",
        "台中河北東",
        "台中河南",
        "台中博二",
        "台中博館",
        "台中龍門",
        "旅順",
        "精誠",
    ],
    龍井區: [
        "大肚",
        "大肚中蔗",
        "大肚遊園",
        "大肚榮華",
        "台中東海",
        "烏日中山",
        "烏日長春",
        "梧棲中華",
        "梧棲文化",
        "梧棲文昌",
        "龍井中央",
        "龍井沙田",
        "龍井龍津",
        "龍井藝術",
    ],
    豐原區: [
        "台中石岡",
        "卓蘭昭永",
        "卓蘭經國",
        "東勢東蘭",
        "東勢豐勢",
        "新社中和",
        "豐原大順",
        "豐原田心",
        "豐原北陽",
        "豐原向陽",
        "豐原忠孝",
        "豐原豐東",
    ],
    大里區: [
        "大里",
        "大里仁化",
        "大里立中",
        "大里成功",
        "大里益民",
        "大里爽文",
        "大里新芳",
        "大里新芳小時",
        "大里新興",
        "大里練武",
        "國光",
        "塗城金德",
        "霧峰中正",
        "霧峰民生",
    ],
    太平區: [
        "十甲",
        "大智",
        "太平中平",
        "太平中和",
        "太平光興",
        "太平宜昌",
        "太平東平",
        "太平勤益",
        "太平新興",
        "太平樹孝",
        "太平樹德",
        "台中忠孝",
        "台中振興",
        "台中樂業",
    ],
    南屯區: [
        "台中三和",
        "台中大忠",
        "台中永春東",
        "台中向上",
        "台中向上三厝",
        "台中惠文",
        "台中萬和",
        "台中楓樹",
        "台中黎明",
        "台中嶺東",
        "台中豐樂",
        "忠明",
    ],
};

const targetPxMarts = [
    "大甲民生",
    "大甲甲后",
    "大甲光明",
    "大甲復興",
    "大甲經國",
    "大甲黎明",
    "台中豐后",
    "后里",
    "后里文明",
    "神岡五權",
    "豐原大豐",
    "豐原成功",
    "五權",
    "台中二中",
    "台中三民",
    "台中太原",
    "台中永興",
    "台中明新",
    "台中東光",
    "台中陜西",
    "台中健行",
    "台中崇德",
    "台中進化",
    "台中新民",
    "台中學士",
    "大連",
    "中清",
    "台中大坑",
    "台中大鵬",
    "台中四平",
    "台中北屯二",
    "台中東山",
    "台中松五",
    "台中松竹",
    "台中南興",
    "台中軍太",
    "台中崇德八",
    "台中敦化",
    "台中敦富",
    "北屯",
    "軍功",
    "中工",
    "文心",
    "台中文華",
    "台中水湳",
    "台中西屯",
    "台中忠義",
    "台中青海",
    "台中國安",
    "台中福星",
    "台中福科",
    "台中環中",
    "台中寶慶",
    "逢甲",
    "沙鹿",
    "沙鹿中山",
    "沙鹿北勢東",
    "沙鹿屏西",
    "清水中山",
    "清水中興",
    "清水五權",
    "清水鰲峰",
    "台中工學",
    "台中仁和",
    "台中民權",
    "台中建國南",
    "台中忠明南",
    "台中林森",
    "台中南門",
    "台中復興",
    "台中樂群",
    "台中學府",
    "美村綠",
    "大雅民生",
    "大雅雅環",
    "大雅學府",
    "神岡中山",
    "神岡中正",
    "神岡昌平",
    "潭子",
    "潭子中山",
    "潭子得天",
    "潭子福潭",
    "潭子潭陽",
    "潭子潭豐",
    "潭子豐興",
    "天津",
    "台中大昌",
    "台中大進",
    "台中山西",
    "台中市政",
    "台中河北東",
    "台中河南",
    "台中博二",
    "台中博館",
    "台中龍門",
    "旅順",
    "精誠",
    "大肚",
    "大肚中蔗",
    "大肚遊園",
    "大肚榮華",
    "台中東海",
    "烏日中山",
    "烏日長春",
    "梧棲中華",
    "梧棲文化",
    "梧棲文昌",
    "龍井中央",
    "龍井沙田",
    "龍井龍津",
    "龍井藝術",
    "台中石岡",
    "卓蘭昭永",
    "卓蘭經國",
    "東勢東蘭",
    "東勢豐勢",
    "新社中和",
    "豐原大順",
    "豐原田心",
    "豐原北陽",
    "豐原向陽",
    "豐原忠孝",
    "豐原豐東",
    "大里",
    "大里仁化",
    "大里立中",
    "大里成功",
    "大里益民",
    "大里爽文",
    "大里新芳",
    "大里新芳小時",
    "大里新興",
    "大里練武",
    "國光",
    "塗城金德",
    "霧峰中正",
    "霧峰民生",
    "十甲",
    "大智",
    "太平中平",
    "太平中和",
    "太平光興",
    "太平宜昌",
    "太平東平",
    "太平勤益",
    "太平新興",
    "太平樹孝",
    "太平樹德",
    "台中忠孝",
    "台中振興",
    "台中樂業",
    "台中三和",
    "台中大忠",
    "台中永春東",
    "台中向上",
    "台中向上三厝",
    "台中惠文",
    "台中萬和",
    "台中楓樹",
    "台中黎明",
    "台中嶺東",
    "台中豐樂",
    "忠明",
];

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

        console.log(monthStocksData);

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
