import { storeButton } from "/components/shared/buttons/storeButton.js";
import { qtyCell } from "/components/shared/table/cell/qtyCell.js";
import { productMap } from "/dataSets/pxMarts.js";

function storeRow(area, store, monthStocksData, todaySellsData) {
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

  const storeRow = $("<tr>")
    .addClass("table-row")
    .append(
      $("<td>").text(" "),
      $("<td>").text(area),
      $("<td>").append(storeButton(area, store))
    );

  Array.from(productMap.values()).forEach((product) => {
    storeRow.append(
      qtyCell("stock", getStockQty(monthStocksData, store, product)),
      qtyCell("sell", getSellQty(todaySellsData, store, product))
    );
  });

  return storeRow;
}

export { storeRow };
