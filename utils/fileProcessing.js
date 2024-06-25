import { arrayToNestedJson } from "/helpers/dataHandler.js";
import { getfilteredData } from "/utils/filterData.js";
import { checkCsvInput } from "/utils/checkers/checkCsvInput.js";

$.fn.csv2arr = function (callback) {
  const file = $(this)[0].files[0];
  checkCsvInput(file);
  const reader = new FileReader();
  reader.readAsDataURL(file);

  reader.onload = function (evt) {
    const data = evt.target.result;
    const encoding = jschardet.detect(atob(data.split(";base64,")[1])).encoding;
    Papa.parse(file, {
      encoding: encoding === "windows-1252" ? "ANSI" : encoding,
      complete: (results) => {
        const res = results.data;
        if (res[res.length - 1] === "") res.pop();
        callback && callback(res);
      },
    });
  };

  reader.onerror = function () {
    Swal.fire({ title: "無法預期的錯誤，請重新嘗試!", icon: "error" });
  };
};

async function processCSV(inputName) {
  return new Promise((resolve) => {
    $(`input[name=${inputName}]`).csv2arr((array) => {
      const json = arrayToNestedJson(getfilteredData(array), inputName);
      $(`input[name=${inputName}]`).val("");
      resolve(json);
    });
  });
}

export { processCSV };
