import { storeButton } from "../../buttons/storeButton.js";
import { qtyCell } from "../cell/qtyCell.js";
import { setData, getData } from "../../../../utils/dataProcessing.js";
import {
  productMap,
  fullWidthProductMap,
} from "../../../../dataSets/pxMarts.js";

function storeRow(
  area,
  store,
  monthStocksData,
  todaySellsData,
  productThrehold
) {
  function getThresholdQty(store, index, productThrehold) {
    const thresholdValues = productThrehold.get(store.id) || [];

    return thresholdValues[index] !== undefined
      ? thresholdValues[index]
      : "N/A";
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

  function getAccSellQty(monthStocksData, store, product) {
    const accSellQtys = monthStocksData?.[store.id]?.accSellQtys || [];
    const foundItem = accSellQtys.find((item) => item.hasOwnProperty(product));

    return foundItem ? foundItem[product] : "N/A";
  }

  const storeRow = $("<tr>")
    .attr("id", store.id)
    .addClass("table-row")
    .append(
      $("<td>").text(" "),
      $("<td>").text(area),
      $("<td>").append(storeButton(area, store))
    );

  const toggleMode = sessionStorage.getItem("toggleMode");
  const productMapToUse =
    toggleMode === "半形" || toggleMode === null
      ? productMap
      : fullWidthProductMap;

  Array.from(productMapToUse.values()).forEach((product, index) => {
    const accSellQty = getAccSellQty(monthStocksData, store, product);
    let accSellQtys = getData(store.id) || [];

    const text = `${product}累積銷貨量是${accSellQty}`;

    if (accSellQty !== 0 && !accSellQtys.includes(text)) {
      accSellQtys.push(text);
      setData(store.id, accSellQtys);
    }

    storeRow.append(
      qtyCell("threshold", getThresholdQty(store, index, productThrehold)),
      qtyCell("stock", getStockQty(monthStocksData, store, product)),
      qtyCell("sell", getSellQty(todaySellsData, store, product))
    );
  });

  return storeRow;
}

export { storeRow };
