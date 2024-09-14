import { groupedStores } from "../dataSets/pxMarts.js";
import { headerRow } from "../components/shared/table/row/headerRow.js";
import { storeRow } from "../components/shared/table/row/storeRow.js";
import { subHeaderRow } from "../components/shared/table/row/subHeaderRow.js";
import { productThrehold } from "../dataSets/pxMarts.js";

function appendHeaderRows(productMap) {
  $("#resultTable").append(headerRow(productMap));
  $("#resultTable").append(subHeaderRow(productMap));
}

function appendTableRows(table, monthStocksData, todaySellsData) {
  groupedStores.forEach((stores, area) => {
    stores.forEach((storeName, storeId) => {
      table.append(
        storeRow(
          area,
          { id: storeId, name: storeName },
          monthStocksData,
          todaySellsData,
          productThrehold
        )
      );
    });
  });
}

export { appendHeaderRows, appendTableRows };
