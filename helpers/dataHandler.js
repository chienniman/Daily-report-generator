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

export { splitArrayByMaxSize, collectImagesData, preparePPTData };
