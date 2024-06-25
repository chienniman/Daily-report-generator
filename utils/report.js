import { productMap } from "../dataSets/pxMarts.js";
import { appendHeaderRows, appendTableRows } from "../helpers/appendRows.js";
import { processCSV } from "./fileProcessing.js";

async function createReport() {
  try {
    const monthStocksData = await processCSV("monthStocks");
    const todaySellsData = await processCSV("todaySells");

    appendHeaderRows(productMap);
    appendTableRows($("#resultTable"), monthStocksData, todaySellsData);
  } catch (error) {
    console.error("報表生成錯誤", error);
  }
}

export { createReport };
