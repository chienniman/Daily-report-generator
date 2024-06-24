import { isCSV } from "/utils/checkFileType.js";

function validateInputs() {
  const monthStocks = $("#monthStocks").val();
  const todaySells = $("#todaySells").val();

  if (!monthStocks || !todaySells) {
    Swal.fire({
      title: "必須同時上傳單月進銷存跟當日銷售!",
      icon: "error",
    });

    return false;
  }

  if (!isCSV("#monthStocks") || !isCSV("#todaySells")) {
    Swal.fire({ title: "輸入必須是 CSV 檔!", icon: "error" });

    return false;
  }

  return true;
}

export { validateInputs };
