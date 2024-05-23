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
	function sortStores() {
		const stores = $('.store');

		stores.each(function () {
			const store = $(this);
			const headers = store.find('.accordion-sub-header');
			const contents = store.find('.accordion-sub-content');

			const items = [];
			headers.each(function (index) {
				const header = $(this);
				const content = contents.eq(index);
				const value = parseInt(header.attr('data-sort-value'));
				items.push({ header, content, value });
			});

			items.sort(function (a, b) {
				return b.value - a.value;
			});

			items.forEach(function (item) {
				store.append(item.header);
				store.append(item.content);
			});
		});
	}

	function handleAccordion() {
		$('.accordion-content,.accordion-sub-content').hide();

		$('.accordion-header').click(function () {
			const content = $(this).next('.accordion-content');

			$('.accordion-content').not(content).slideUp();

			content.slideToggle();
		});

		$('.accordion-sub-header').click(function () {
			const content = $(this).next('.accordion-sub-content');

			$('.accordion-sub-content').not(content).slideUp();

			content.slideToggle();
		});

		$('.accordion-content').click(function (event) {
			event.stopPropagation();
		});
	}

	$('#inventoryAlertBtn').click(function () {
        $('.items').empty();
		$('#modal').show('slow');

		$('.close').click(function () {
			$('#modal').fadeOut('slow');
		});

		for (const areaKey in groupedByAreaAndStore) {
			const area = groupedByAreaAndStore[areaKey];
			const areaKeyLength = Object.keys(area).length;
			const storeDiv = $("<div class='store'></div>");
			const areaHeader = $(`<div class='accordion-header'>` + areaKey + `(${areaKeyLength})` + '</div>');
			const areaContent = $("<div class='accordion-content'></div>");

			for (const storeKey in area) {
				const storeItems = area[storeKey];
				let totalSum = 0;
				const storeHeader = $("<div class='accordion-sub-header'>" + storeKey + '</div>');
				const storeContent = $("<div class='accordion-sub-content'></div>");

				storeItems.forEach((item) => {
					const itemParts = item.split('_');
					const value = parseInt(itemParts[itemParts.length - 1]);
					totalSum += value;
					const itemElement = $("<div class='item'></div>")
						.attr('data-filter-item', item)
						.attr('data-filter-name', item)
						.text(item);
					storeContent.append(itemElement);
				});

				storeHeader.attr('data-sort-value', totalSum);
				storeContent.attr('data-sort-value', totalSum);

				const totalSumElement = $("<span class='total-sum'></span>").text(`(${totalSum})`);
				storeHeader.append(totalSumElement);
				storeDiv.append(storeHeader);
				storeDiv.append(storeContent);
				areaContent.append(storeDiv);
			}

			$('.items').append(areaHeader);
			$('.items').append(areaContent);
		}
		handleAccordion();
		sortStores();
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

			const infoText = `${storeName}\n\n庫存情況：\n${stockList}目前已持續爭取二位陳列、確認各品項庫存足夠，會再持續回訪，並觀察二位陳列的銷轉狀況`;

			const tempTextArea = $('<textarea>').val(infoText);

			$('body').append(tempTextArea);
			tempTextArea.select();
			document.execCommand('copy');
			tempTextArea.remove();

			alert(infoText);

			// const infoText = `店名: ${store}\n${storeInfo.join('\n')}`;

			// const tempTextArea = $('<textarea>').val(infoText).css({
			// 	position: 'absolute',
			// 	left: '-9999px',
			// });

			// $('body').append(tempTextArea);
			// tempTextArea.select();
			// document.execCommand('copy');
			// tempTextArea.remove();

			// alert(`店名: ${store}\n${storeInfo.join('\n')}`);
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
