import { exportToExcel, clearTableAndInput, appendHeaderRows } from './helpers/table.js';

const inventoryAlert = {
	'華強　南僑水晶肥皂 / ２００ｇ＊３塊': 12,
	'華強　南僑水晶肥皂－檸檬清香 / １５０ｇ＊３入': 12,
	'華強　南僑水晶肥皂－檸檬１５０ / ｇ＊６贈食器洗滌液體２５０ｍｌ': 7,
	'華強　水晶肥皂液體補充包－輕柔型 / １６００ｇ': 4,
	'華強　水晶肥皂食器洗滌液體 / １０００ｍｌ': 6,
	'華強　水晶肥皂食器洗滌液体 / －速淨＆清新８００ｍｌ': 6,
};

const groupedByAreaAndStore = {};

$(document).ready(function () {
	$('#dailyReviewBtn').click(function () {
        const htmlTable = $("#resultTable");

        if (htmlTable.children().length === 0) {
            alert("無法生成空資料");
            return;
        }

        const areaInfo = {};
    
        for (const areaKey in groupedByAreaAndStore) {
            const area = groupedByAreaAndStore[areaKey];
    
            const storeCount = Object.keys(area).length;
    
            areaInfo[areaKey] = {
                storeCount: storeCount,
                stores: Object.keys(area),
                itemLists: {}
            };
    
            for (const storeKey in area) {
                const storeItems = area[storeKey];
                areaInfo[areaKey].itemLists[storeKey] = storeItems;
            }
        }
    
        const sortedAreaInfo = Object.entries(areaInfo).sort((a, b) => a[1].storeCount - b[1].storeCount);
    
        let output = "台中缺貨較少區域：\n";

        output += "\n";
        output += "名稱：" + sortedAreaInfo[0][0] + "\n";
        output += "列表：" + sortedAreaInfo[0][1].stores.join(", ") + "\n";
        output += "\n";
        output += "台中缺貨較多區域：\n";
        output += "\n";
        output += "名稱：" + sortedAreaInfo[sortedAreaInfo.length - 1][0] + "\n";
        output += "列表：" + sortedAreaInfo[sortedAreaInfo.length - 1][1].stores.join(", ") + "\n";
        output += "\n";
        output += "會持續追蹤台中各區庫存狀況，持續與各店代表溝通，提高庫存、業績達成率，為公司創造更大的利益\n";

        const tempTextArea = $('<textarea>').val(output);

        $('body').append(tempTextArea);
        tempTextArea.select();
        document.execCommand('copy');
        tempTextArea.remove();

        alert(output);
    });
	$('#resetBtn').click(() => {
		clearTableAndInput();
	});
	$('#exportToExcelBtn').click(() => {
		exportToExcel();
	});
	$('#monthStocks').on('change', function () {
		var fileName = $(this).val().split('\\').pop();
		$('#monthStocksFileNameDisplay').text('單月進銷存 : ' + fileName);
	});
	$('#todaySells').on('change', function () {
		var fileName = $(this).val().split('\\').pop();
		$('#todaySellsFileNameDisplay').text('單日銷貨 : ' + fileName);
	});
	$('#generateBtn').on('click', function () {
		if ($('#monthStocks').val() && $('#todaySells').val()) {
			var monthStocksExtension = $('#monthStocks')[0].files[0].name.split('.').pop().toLowerCase();

			var todaySellsExtension = $('#todaySells')[0].files[0].name.split('.').pop().toLowerCase();

			if (monthStocksExtension !== 'csv' || todaySellsExtension !== 'csv') {
				alert('輸入必須是 CSV 檔!');
				return;
			}

			$('#loading').removeClass('hidden');

			generateReport().then(() => {
				$('#loading').addClass('hidden');
			});
		} else {
			alert('必須同時上傳單月進銷存跟當日銷售');
		}
	});
});

function filterByPrdtAndPxMarts(array) {
	return array.filter((e) => targetPrdtCodes.includes(e[5]) && targetPxMarts.includes(e[4]));
}

function convertToJson(array, type) {
	const jsonData = {};

	array.forEach((e) => {
		const store = e[4];
		const product = e[7];
		const quantityKey = type === 'monthStocks' ? 'stockQty' : 'sellQty';
		const quantity = Number(e[type === 'monthStocks' ? 12 : 8]);

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
		  .text(store)
		  .css("cursor", "pointer")
		  .on("click", () => {
			const storeInfo = [];
			let index = 1;
			for (const e of targetProductName) {
			  const stockQty =
				monthStocksData &&
				monthStocksData[store] &&
				monthStocksData[store][e]
				  ? monthStocksData[store][e].stockQty
				  : "N/A";
  
			  const sellQty =
				todaySellsData &&
				todaySellsData[store] &&
				todaySellsData[store][e]
				  ? todaySellsData[store][e].sellQty
				  : "0";
  
			  	storeInfo.push(
					`${index}. ${e}: 庫存 ${stockQty}, 日銷 ${sellQty}`
				  );
				index++;
			}

			const storeName = `店名: ${store}`;
			const stockList = storeInfo.map((item) => `${item}`).join('\n');

			const infoText = `${storeName}\n\n庫存情況:\n${stockList}目前已持續爭取二位陳列、確認各品項庫存足夠，會再持續回訪，並觀察二位陳列的銷轉狀況`;

			const tempTextArea = $('<textarea>').val(infoText);

			$('body').append(tempTextArea);
			tempTextArea.select();
			document.execCommand('copy');
			tempTextArea.remove();

			alert(infoText);
		  });
  
		storeRow.append($("<td>").append(storeButton));
  
		for (const e of targetProductName) {
		  const stockQty =
			monthStocksData && monthStocksData[store] && monthStocksData[store][e]
			  ? monthStocksData[store][e].stockQty
			  : "N/A";
  
		  if (inventoryAlert.hasOwnProperty(e)) {
			if (Number(stockQty) === stockQty && stockQty < inventoryAlert[e]) {
			  const restockItem = `${e}_缺_${Math.abs(
				stockQty - inventoryAlert[e]
			  )}`;
  
			  if (!groupedByAreaAndStore.hasOwnProperty(area)) {
				groupedByAreaAndStore[area] = {};
			  }
  
			  if (!groupedByAreaAndStore[area].hasOwnProperty(store)) {
				groupedByAreaAndStore[area][store] = [];
			  }
			  groupedByAreaAndStore[area][store].push(restockItem);
			}
		  }
  
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
		const monthStocksData = await processCSV('monthStocks');
		const todaySellsData = await processCSV('todaySells');

		appendHeaderRows();
		appendTableRows(monthStocksData, todaySellsData);
	} catch (error) {
		console.error('報表生成錯誤', error);
	}
}

async function processCSV(inputName) {
	return new Promise(function (resolve, reject) {
		$(`input[name=${inputName}]`).csv2arr(function (array) {
			const filteredData = filterByPrdtAndPxMarts(array);
			const jsonData = convertToJson(filteredData, inputName);

			$(`input[name=${inputName}]`).val('');
			resolve(jsonData);
		});
	});
}
