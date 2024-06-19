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
    table = $("<table>", { id: "photosTable" }).appendTo("#tableContainer");
  }

  return table;
}

function createRow(table) {
  return $("<tr>").appendTo(table);
}

function createCell(rowElement, className, id) {
  var cell = $("<td>", {
    class: className,
    id: id,
  });
  cell.appendTo(rowElement);

  return cell;
}

function addImageToCell(cellElement, base64data) {
  const imgElement = $("<img>")
    .attr("src", "data:image/png;base64," + base64data)
    .css({ width: "4cm", height: "100%" });

  cellElement.empty().append(imgElement);
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

function generatePptFromTable(tableId) {
  html2canvas(document.getElementById(tableId)).then((canvas) => {
    const imgData = canvas.toDataURL("image/png");
    const pptx = new PptxGenJS();
    const slide = pptx.addSlide();
    slide.addImage({ data: imgData, x: 0.5, y: 0.5, w: 8, h: 6 });
    pptx.writeFile({ fileName: "TableDemo.pptx" });
  });
}

function createPhotosTable(workbook, worksheet, storesData, imagesPerRow = 6) {
  storesData.shift();

  const imagesData = collectImagesData(workbook, worksheet);
  const table = createTableIfNotExists();

  storesData.forEach((_, index) => {
    if (index % imagesPerRow === 0) {
      const currentStoreRow = createRow(table);
      const currentImageRow = createRow(table);
      createCell(currentStoreRow, "empty-td", null);
      createCell(currentImageRow, "description-td", null).text("陳列位");

      storesData.slice(index, index + imagesPerRow).forEach((store) => {
        const base64data = imagesData.get(store.rowId) || null;
        const storeId = `store-${store.rowId}`;
        const imageId = `photo-${store.rowId}`;
        createCell(currentStoreRow, "store-td", storeId).text(store.store);

        if (base64data) {
          addImageToCell(
            createCell(currentImageRow, "photo-td", imageId),
            base64data
          );
        }
      });
    }
  });
}

$("#xlsxFileInput").on("change", function (e) {
  const file = e.target.files[0];
  if (!file) return;

  const reader = new FileReader();
  reader.onloadend = async function () {
    const workbook = new ExcelJS.Workbook();
    await workbook.xlsx.load(reader.result);

    workbook.eachSheet((worksheet) => {
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

      if (storeData.length > 1) {
        createPhotosTable(workbook, worksheet, storeData);

        generatePptFromTable("photosTable");
      }

      if (displayData.length > 1) {
        createPPT(displayData);
      }
    });
  };
  reader.readAsArrayBuffer(file);
});
