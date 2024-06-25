function splitArrayByMaxSize(arr, maxSize) {
  const header = arr[0];

  return Array.from(
    { length: Math.ceil((arr.length - 1) / maxSize) },
    (_, i) => [header, ...arr.slice(i * maxSize + 1, i * maxSize + 1 + maxSize)]
  );
}

function collectImagesData(workbook, worksheet) {
  const imagesData = new Map();
  const processedRows = new Set();

  worksheet.getImages().forEach((image) => {
    const img = workbook.model.media.find((m) => m.index === image.imageId);
    const rowId = image.range.tl.nativeRow + 1;

    if (!processedRows.has(rowId)) {
      processedRows.add(rowId);
      imagesData.set(rowId, img.buffer.toString("base64"));
    }
  });

  return imagesData;
}

function preparePPTData(worksheet) {
  const displayData = [];
  const storeData = [];

  worksheet.eachRow({ includeEmpty: true }, (row, rowId) => {
    const rowData = [4, 7, 8].map((col) => row.getCell(col).value || null);
    if (rowData.every((cell) => cell)) {
      displayData.push(
        rowData.map((text, i) => ({
          text,
          options: { fill: i === 0 ? "99cdff" : "b5c7dd" },
        }))
      );
      storeData.push({ rowId, store: rowData[0] });
    }
  });

  return {
    displayData,
    storeData,
  };
}

function countCompleteRows(worksheet) {
  let completeRowsCount = 0;
  const headerCount = 1;
  worksheet.eachRow({ includeEmpty: true }, (row) => {
    const rowData = [4, 7, 8].map((col) => row.getCell(col).value || null);
    if (rowData.every((cell) => cell)) {
      completeRowsCount++;
    }
  });

  return completeRowsCount - headerCount;
}

function arrayToNestedJson(array, type) {
  return array.reduce((json, e) => {
    const PTDPNO = Number(e[3]);
    const key = type === "monthStocks" ? "stockQtys" : "sellQtys";
    const value = Number(e[type === "monthStocks" ? 12 : 8]);
    const dynamicKey = e[7];

    if (!json[PTDPNO]) {
      json[PTDPNO] = {
        PTDPNA: e[4],
        stockQtys: [],
        sellQtys: [],
      };
    }

    json[PTDPNO][key].push({ [dynamicKey]: value });

    return json;
  }, {});
}

export {
  splitArrayByMaxSize,
  collectImagesData,
  preparePPTData,
  countCompleteRows,
  arrayToNestedJson
};
