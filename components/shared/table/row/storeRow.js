import { storeButton } from "../../buttons/storeButton.js";
import { qtyCell } from "../cell/qtyCell.js";
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

  const storeRow = $("<tr>")
    .attr("id", store.id)
    .addClass("table-row")
    .append(
      $("<td>").text(" "),
      $("<td>").text(area),
      $("<td>").append(storeButton(area, store))
    );

  const productMapToUse =
    sessionStorage.getItem("toggleMode") === "全形"
      ? fullWidthProductMap
      : productMap;

  Array.from(productMapToUse.values()).forEach((product, index) => {
    storeRow.append(
      qtyCell("threshold", getThresholdQty(store, index, productThrehold)),
      qtyCell("stock", getStockQty(monthStocksData, store, product)),
      qtyCell("sell", getSellQty(todaySellsData, store, product))
    );
  });

  return storeRow;
}

export { storeRow };
