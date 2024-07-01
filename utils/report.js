import { productMap } from "../dataSets/pxMarts.js";
import { appendHeaderRows, appendTableRows } from "../helpers/appendRows.js";
import { processCSV } from "./fileProcessing.js";
import { resetFileInputs, resetTable } from "./resetUtilities.js";

async function createReport() {
  try {
    resetTable();

    const monthStocksData = await processCSV("monthStocks");
    const todaySellsData = await processCSV("todaySells");

    appendHeaderRows(productMap);
    appendTableRows($("#resultTable"), monthStocksData, todaySellsData);

    resetFileInputs();
  } catch (error) {
    console.error("報表生成錯誤", error);
  }
}

export { createReport };
