import { processData, setData } from "./dataProcessing.js";
import { getfilteredData } from "/utils/filterData.js";
import { arrayToNestedJson } from "/helpers/dataHandler.js";

function filePicked(oEvent) {
  return new Promise((resolve, reject) => {
    var oFile = oEvent.files[0];
    var reader = new FileReader();

    reader.onload = function (e) {
      try {
        var data = e.target.result;
        var cfb = XLSX.read(data, { type: "binary" });
        var summaryData = processData(cfb.Sheets["總表"]);
        setData("summaryData", summaryData);
        var oJS = XLSX.utils.sheet_to_json(cfb.Sheets["簡雯樺"]);
        setData("ojs", oJS);
        resolve();
      } catch (error) {
        reject(error);
      }
    };

    reader.onerror = function (e) {
      reject(e);
    };

    reader.readAsBinaryString(oFile);
  });
}

async function processDailyKpi(dailyKpi) {
  if (!dailyKpi) {
    console.log("上傳每日績效表為空");
    return;
  }

  await filePicked(dailyKpi);
}

async function processCSV(inputName) {
  return new Promise(function (resolve, reject) {
    $(`input[name=${inputName}]`).csv2arr(function (array) {
      const json = arrayToNestedJson(getfilteredData(array), inputName);

      $(`input[name=${inputName}]`).val("");
      resolve(json);
    });
  });
}

export { processDailyKpi, processCSV };
