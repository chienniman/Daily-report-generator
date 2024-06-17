function getColumnLetter(colIndex) {
  let letter = "";
  while (colIndex >= 0) {
    letter = String.fromCharCode((colIndex % 26) + 65) + letter;
    colIndex = Math.floor(colIndex / 26) - 1;
  }
  return letter;
}

function splitArrayByMaxSize(arr, maxSize) {
  const header = arr[0];

  return Array.from(
    { length: Math.ceil((arr.length - 1) / maxSize) },
    (_, i) => [header, ...arr.slice(i * maxSize + 1, i * maxSize + 1 + maxSize)]
  );
}

function createPPT(data) {
  const pptx = new PptxGenJS();
  const maxRowsPerSlide = 10;
  const dataChunks = splitArrayByMaxSize(data, maxRowsPerSlide);

  dataChunks.forEach((chunk) => {
    const slide = pptx.addSlide();

    slide.addTable(chunk, {
      align: "center",
      valign: "middle",
      fontSize: 18,
      colW: [2.2, 5.2, 1.7],
      rowH: 0.35,
      border: { pt: "1", color: "FFFFFF" },
    });
  });

  pptx.writeFile({ fileName: "TableDemo.pptx" });
}

function createTableIfNotExists() {
  let table = $("#tableContainer table");

  if (!table.length) {
    table = $("<table>").appendTo("#tableContainer");
  }

  return table;
}

function createRowIfNotExists(table, row) {
  return table.find(`tr[data-row="${row}"]`).length
    ? table.find(`tr[data-row="${row}"]`)
    : $("<tr>").attr("data-row", row).appendTo(table);
}

function createCellIfNotExists(rowElement, col) {
  return rowElement.find(`td[data-col="${col}"]`).length
    ? rowElement.find(`td[data-col="${col}"]`)
    : $("<td>").attr("data-col", col).appendTo(rowElement);
}

function addImageToCell(cellElement, base64data) {
  const imgElement = $("<img>")
    .attr("src", "data:image/png;base64," + base64data)
    .css({ width: "4cm", height: "auto" });

  cellElement.empty().append(imgElement);
}

function collectImagesData(workbook, worksheet) {
  const imagesData = new Map();

  worksheet.getImages().forEach((image) => {
    const img = workbook.model.media.find((m) => m.index === image.imageId);
    const row = image.range.tl.nativeRow + 1;

    if (!imagesData.has(row)) {
      imagesData.set(row, img.buffer.toString("base64"));
    }
  });

  return imagesData;
}

function createPhotos(workbook, worksheet) {
  const imagesData = collectImagesData(workbook, worksheet);
  const table = createTableIfNotExists();

  imagesData.forEach((base64data, row) => {
    const rowElement = createRowIfNotExists(table, row);
    const cellElement = createCellIfNotExists(rowElement, 1);
    addImageToCell(cellElement, base64data);
  });

  console.log(imagesData);

  return imagesData;
}

$("#xlsxFileInput").on("change", function (e) {
  const file = e.target.files[0];
  if (!file) return;

  const reader = new FileReader();
  reader.onloadend = async function () {
    const workbook = new ExcelJS.Workbook();
    await workbook.xlsx.load(reader.result);

    workbook.eachSheet((worksheet) => {
      const displayTable = [];
      const photosTable = [];

      worksheet.eachRow({ includeEmpty: true }, (row, rowId) => {
        const rowData = [4, 7, 8].map((col) => row.getCell(col).value || null);
        if (rowData.every((cell) => cell)) {
          displayTable.push(
            rowData.map((text, i) => ({
              text,
              options: { fill: i === 0 ? "99cdff" : "b5c7dd" },
            }))
          );
          photosTable.push({ rowId, store: rowData[0] });
        }
      });

      //   if (displayTable.length > 1) console.log(displayTable);

      createPhotos(workbook, worksheet);
      //   createPPT(displayTable);

      if (displayTable.length > 1) console.log(photosTable);
    });
  };
  reader.readAsArrayBuffer(file);
});
