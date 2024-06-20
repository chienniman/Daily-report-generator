const pptx = new PptxGenJS();

function splitArrayByMaxSize(arr, maxSize) {
  const header = arr[0];

  return Array.from(
    { length: Math.ceil((arr.length - 1) / maxSize) },
    (_, i) => [header, ...arr.slice(i * maxSize + 1, i * maxSize + 1 + maxSize)]
  );
}

function addDisplayTable(data) {
  const maxRowsPerSlide = 10;
  const dataChunks = splitArrayByMaxSize(data, maxRowsPerSlide);

  dataChunks.forEach((chunk) => {
    const slide = pptx.addSlide();

    slide.addTable(chunk, {
      align: "left",
      valign: "middle",
      fontSize: 18,
      colW: [2.2, 5.2, 1.7],
      rowH: 0.35,
      border: { pt: "1", color: "FFFFFF" },
    });
  });
}

function createTableIfNotExists() {
  let table = $("#pptTableContainer table");

  if (!table.length) {
    table = $("<table>", {
      id: "photosTable",
      class: "photo-table",
    }).appendTo("#pptTableContainer");
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
    .css({ width: "100%", height: "100%" });

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

function addPhotoAlbum(data) {
  const promises = [];

  data.tables.forEach((tableInfo, index) => {
    const tableElement = document.getElementById(tableInfo.id);

    if (!tableElement) {
      console.error(`Table element with id ${tableInfo.id} not found.`);
      return;
    }

    const height = tableInfo.rows.length < 2 ? "50%" : "100%";
    const promise = domtoimage
      .toPng(tableElement)
      .then((imgDataUrl) => {
        const slide = pptx.addSlide();
        slide.addImage({
          data: imgDataUrl,
          w: "100%",
          h: height,
        });
      })
      .catch((error) => {
        console.error(
          `Error generating image for table ${tableInfo.id}:`,
          error
        );
      });

    promises.push(promise);
  });

  Promise.all(promises).then(() => {
    pptx.writeFile({ fileName: "照片.pptx" });
  });
}

function createPhotoAlbum(workbook, worksheet, storesData, imagesPerRow = 6) {
  storesData.shift();

  const imagesData = collectImagesData(workbook, worksheet);
  const pptTableContainer = $("#pptTableContainer");
  let tableCount = 0;
  const tableInfo = [];

  for (let i = 0; i < storesData.length; i += imagesPerRow * 2) {
    const tableId = `photo-table-${tableCount}`;
    const table = $("<table>", { class: "photo-table", id: tableId }).appendTo(
      pptTableContainer
    );
    const tableRows = [];

    for (let j = 0; j < 2; j++) {
      const currentStoreRow = createRow(table);
      const currentImageRow = createRow(table);
      const storeCells = [];
      const imageCells = [];

      createCell(currentStoreRow, "empty-td", null);
      createCell(currentImageRow, "description-td", null).text("陳列位");

      storesData
        .slice(i + j * imagesPerRow, i + (j + 1) * imagesPerRow)
        .forEach((store) => {
          const base64data = imagesData.get(store.rowId) || null;
          const storeId = `store-${store.rowId}`;
          const imageId = `photo-${store.rowId}`;

          const storeCell = createCell(
            currentStoreRow,
            "store-td",
            storeId
          ).text(store.store);
          storeCells.push(storeCell);

          if (base64data) {
            const imageCell = createCell(currentImageRow, "photo-td", imageId);
            addImageToCell(imageCell, base64data);
            imageCells.push(imageCell);
          } else {
            imageCells.push(null);
          }
        });

      tableRows.push({
        storeCells: storeCells,
        imageCells: imageCells.filter((cell) => cell !== null),
      });

      if (storesData.length <= i + (j + 1) * imagesPerRow) break;
    }

    tableInfo.push({
      id: tableId,
      rows: tableRows,
      rowCount: tableRows.length,
      columnCount: imagesPerRow,
    });

    tableCount++;

    if (tableCount === 2) break;
  }

  return {
    tableCount: tableCount,
    tables: tableInfo,
  };
}

function addCover() {
  const slide = pptx.addSlide();

  slide.addText(
    [
      {
        text: "南僑水晶",
        options: {
          fontFace:"標楷體",
          fontSize: 54,
          color: "000000",
          breakLine: true,
          align: "center",
          valign: "middle",
        },
      },
      {
        fontFace:"標楷體",
        text: "PX11304",
        options: {
          fontSize: 60,
          color: "000000",
          breakLine: true,
          align: "center",
          valign: "middle",
        },
      },
      {
        fontFace:"標楷體",
        text: "DM商品第二陳列",
        options: {
          fontSize: 60,
          color: "000000",
          align: "center",
          valign: "middle",
        },
      },
    ],
    {h: "100%", w: "100%"}
  );
}

function createPPT(storeData, displayData, workbook, worksheet) {
  storeData.length > 1
    ? addPhotoAlbum(createPhotoAlbum(workbook, worksheet, storeData))
    : console.log("無陳列照片");

  displayData.length > 1 ? addDisplayTable(displayData) : "無陳列店家資料";
}

function prepareData(worksheet) {
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

$("#xlsx2ppt").on("change", function (e) {
  const file = e.target.files[0];
  if (!file) return;

  const reader = new FileReader();
  reader.onloadend = async function () {
    const workbook = new ExcelJS.Workbook();
    await workbook.xlsx.load(reader.result);

    addCover();
    workbook.eachSheet((worksheet) => {
      const data = prepareData(worksheet);

      createPPT(data.storeData, data.displayData, workbook, worksheet);
    });
  };
  reader.readAsArrayBuffer(file);
});
