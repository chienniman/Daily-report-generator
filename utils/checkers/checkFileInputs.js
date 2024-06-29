import { isCSV, isXLSX } from "./checkFileType.js";

function checkMonthStocks(file) {
  if (!isCSV(file)) {
    Swal.fire({ title: "不支援的檔案類型，必須是 CSV 檔!", icon: "error" });

    return false;
  }

  if (!file.name.includes("dp")) {
    Swal.fire({ title: "必須上傳庫存(dp)", icon: "error" });

    return false;
  }

  return true;
}

function checkTodaySells(file) {
  if (!isCSV(file)) {
    Swal.fire({ title: "不支援的檔案類型，必須是 CSV 檔!", icon: "error" });

    return false;
  }

  if (!file.name.includes("sal")) {
    Swal.fire({ title: "必須上傳庫存(sal)", icon: "error" });

    return false;
  }

  return true;
}

function checkDailyKpi(file) {
  if (!isXLSX(file)) {
    Swal.fire({ title: "不支援的檔案類型，必須是 XLSX 檔!", icon: "error" });

    return false;
  }

  return true;
}

function checkXLSX2PPT(file) {
  if (!isXLSX(file)) {
    Swal.fire({ title: "不支援的檔案類型，必須是 XLSX 檔!", icon: "error" });

    return false;
  }

  return true;
}

export { checkMonthStocks, checkTodaySells, checkDailyKpi, checkXLSX2PPT };
