import { storeButton } from "../../buttons/storeButton.js";
import { qtyCell } from "../cell/qtyCell.js";
import { setData, getData } from "../../../../utils/dataProcessing.js";
import {
  productMap,
  abbreviationProductMap
} from "../../../../dataSets/pxMarts.js";

function storeRow(
  area,
  store,
  monthStocksData,
  todaySellsData,
) {
  function getStockQty(monthStocksData, store, productId) {
    const stockQtys = monthStocksData?.[store.id]?.stockQtys || [];
    const foundItem = stockQtys.find((item) => item.hasOwnProperty(productId));

    return foundItem ? foundItem[productId] : "N/A";
  }

  function getSellQty(todaySellsData, store, productId) {
    return (
      todaySellsData?.[store.id]?.sellQtys?.find(
        (item) => item[productId] !== undefined
      )?.[productId] || "0"
    );
  }

  function getAccSellQty(monthStocksData, store, productId) {
    const accSellQtys = monthStocksData?.[store.id]?.accSellQtys || [];
    const foundItem = accSellQtys.find((item) => item.hasOwnProperty(productId));

    return foundItem ? foundItem[productId] : "N/A";
  }

  const storeRow = $("<tr>")
    .attr("id", store.id)
    .addClass("table-row")
    .append(
      $("<td>").text(" "),
      $("<td>").text(area),
      $("<td>").append(storeButton(area, store))
    );

  Array.from(productMap.entries()).forEach(([key, __v], __index) => {
    const productId = key;
    const accSellQty = getAccSellQty(monthStocksData, store, productId);
    let accSellQtys = getData(store.id) || [];
    const text = `${abbreviationProductMap.get(key)}累積銷貨量是${accSellQty}`;

    if (accSellQty !== 0 && !accSellQtys.includes(text)) {
      accSellQtys.push(text);
      setData(store.id, accSellQtys);
    }

    storeRow.append(
      qtyCell("stock", getStockQty(monthStocksData, store, productId)),
      qtyCell("sell", getSellQty(todaySellsData, store, productId))
    );
  });

  return storeRow;
}

export { storeRow };
