import { isCSV } from "./checkFileType.js";

function checkCsvInput(file) {
  if (typeof FileReader === "undefined") {
    Swal.fire({ title: "瀏覽器不支援!", icon: "error" });

    return false;
  }

  if (!file) {
    Swal.fire({ title: "必須選擇檔案!", icon: "error" });

    return false;
  }

  if (!isCSV(file)) {
    Swal.fire({ title: "不支援的檔案類型，必須是 CSV 檔!", icon: "error" });

    return false;
  }
}

export { checkCsvInput };
