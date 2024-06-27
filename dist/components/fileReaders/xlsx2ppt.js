(() => {
  // helpers/createTable.js
  function createTable(container, className, tableId) {
    return $("<table>", { class: className, id: tableId }).appendTo(container);
  }
  function createRow(table) {
    return $("<tr>").appendTo(table);
  }
  function createCell(rowElement, className, id) {
    var cell = $("<td>", {
      class: className,
      id
    });
    cell.appendTo(rowElement);
    return cell;
  }
  function createTableWithRows(table, storesData, imagesData, startIndex, imagesPerRow) {
    const tableRows = [];
    for (let j = 0; j < 2; j++) {
      const currentStoreRow = createRow(table);
      const currentImageRow = createRow(table);
      createCell(currentStoreRow, "empty-td", null);
      createCell(currentImageRow, "description-td", null).text("\u9673\u5217\u4F4D");
      const storesSlice = storesData.slice(
        startIndex + j * imagesPerRow,
        startIndex + (j + 1) * imagesPerRow
      );
      const { storeCells, imageCells } = populateRows(
        storesSlice,
        imagesData,
        currentStoreRow,
        currentImageRow
      );
      fillEmptyCells(
        currentStoreRow,
        currentImageRow,
        imagesPerRow - storesSlice.length
      );
      tableRows.push({
        storeCells,
        imageCells: imageCells.filter((cell) => cell !== null)
      });
      if (storesData.length <= startIndex + (j + 1) * imagesPerRow) break;
    }
    return tableRows;
  }
  function addImageToCell(cellElement, base64data) {
    const imgElement = $("<img>").attr("src", "data:image/png;base64," + base64data).css({ width: "100%", height: "100%" });
    cellElement.empty().append(imgElement);
  }
  function populateRows(storesSlice, imagesData, currentStoreRow, currentImageRow) {
    const storeCells = [];
    const imageCells = [];
    storesSlice.forEach((store) => {
      const base64data = imagesData.get(store.rowId) || null;
      const storeId = `store-${store.rowId}`;
      const imageId = `photo-${store.rowId}`;
      const storeCell = createCell(currentStoreRow, "store-td", storeId).text(
        store.store
      );
      storeCells.push(storeCell);
      if (base64data) {
        const imageCell = createCell(currentImageRow, "photo-td", imageId);
        addImageToCell(imageCell, base64data);
        imageCells.push(imageCell);
      } else {
        const emptyImageCell = createCell(
          currentImageRow,
          "photo-td",
          imageId
        ).text("\u7121\u5716\u50CF");
        imageCells.push(emptyImageCell);
      }
    });
    return { storeCells, imageCells };
  }
  function fillEmptyCells(currentStoreRow, currentImageRow, cellsToAdd) {
    for (let k = 0; k < cellsToAdd; k++) {
      createCell(currentStoreRow, "store-td", null).text("\u7121\u8CC7\u6599");
      createCell(currentImageRow, "photo-td", null).text("\u7121\u5716\u50CF");
    }
  }

  // helpers/dataHandler.js
  function splitArrayByMaxSize(arr, maxSize) {
    const header = arr[0];
    return Array.from(
      { length: Math.ceil((arr.length - 1) / maxSize) },
      (_, i) => [header, ...arr.slice(i * maxSize + 1, i * maxSize + 1 + maxSize)]
    );
  }
  function collectImagesData(workbook, worksheet) {
    const imagesData = /* @__PURE__ */ new Map();
    const processedRows = /* @__PURE__ */ new Set();
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
            options: { fill: i === 0 ? "99cdff" : "b5c7dd" }
          }))
        );
        storeData.push({ rowId, store: rowData[0] });
      }
    });
    return {
      displayData,
      storeData
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

  // helpers/createPPT.js
  var pptx = new PptxGenJS();
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
        border: { pt: "1", color: "FFFFFF" }
      });
    });
  }
  function addPhotoAlbum(data) {
    const promises = [];
    data.tables.forEach((tableInfo, index) => {
      const tableElement = document.getElementById(tableInfo.id);
      if (!tableElement) {
        console.error(`Table-id ${tableInfo.id} empty.`);
        return;
      }
      const height = tableInfo.rows.length < 2 ? "50%" : "100%";
      const promise = domtoimage.toPng(tableElement).then((imgDataUrl) => {
        const slide = pptx.addSlide();
        slide.addImage({
          data: imgDataUrl,
          w: "100%",
          h: height
        });
      }).catch((error) => {
        console.error(`Error table-id ${tableInfo.id}:`, error);
      });
      promises.push(promise);
    });
    Promise.all(promises).then(() => {
      pptx.writeFile({
        fileName: `PX${(/* @__PURE__ */ new Date()).getFullYear() - 1911}\u5E74${(/* @__PURE__ */ new Date()).getMonth() + 1}\u6708\u4EFD\u9673\u5217\u7167\u7247.pptx`
      });
    });
  }
  function createPhotoAlbum(workbook, worksheet, storesData, imagesPerRow = 6) {
    storesData.shift();
    const imagesData = collectImagesData(workbook, worksheet);
    let tableCount = 0;
    const tableInfo = [];
    for (let i = 0; i < storesData.length; i += imagesPerRow * 2) {
      const tableId = `photo-table-${tableCount}`;
      const table = createTable($("#pptTableContainer"), "photo-table", tableId);
      const tableRows = createTableWithRows(
        table,
        storesData,
        imagesData,
        i,
        imagesPerRow
      );
      tableInfo.push({
        id: tableId,
        rows: tableRows,
        rowCount: tableRows.length,
        columnCount: imagesPerRow
      });
      tableCount++;
      if (tableCount === 2) break;
    }
    return {
      tableCount,
      tables: tableInfo
    };
  }
  function addCover() {
    const slide = pptx.addSlide();
    slide.addText(
      [
        {
          text: "\u5357\u50D1\u6C34\u6676",
          options: {
            fontFace: "\u6A19\u6977\u9AD4",
            fontSize: 54,
            color: "000000",
            breakLine: true,
            align: "center",
            valign: "middle"
          }
        },
        {
          fontFace: "\u6A19\u6977\u9AD4",
          text: `PX113${((/* @__PURE__ */ new Date()).getMonth() + 1).toString().padStart(2, "0")}`,
          options: {
            fontSize: 60,
            color: "000000",
            breakLine: true,
            align: "center",
            valign: "middle"
          }
        },
        {
          fontFace: "\u6A19\u6977\u9AD4",
          text: "DM\u5546\u54C1\u7B2C\u4E8C\u9673\u5217",
          options: {
            fontSize: 60,
            color: "000000",
            align: "center",
            valign: "middle"
          }
        }
      ],
      { h: "100%", w: "100%" }
    );
  }
  function createPreview(workbook) {
    const sheetSummary = [];
    const options = {
      fontFace: "\u6A19\u6977\u9AD4",
      fontSize: 32,
      color: "000000",
      breakLine: true,
      align: "center",
      valign: "middle"
    };
    let totalCounts = 0;
    workbook.eachSheet((worksheet) => {
      totalCounts += countCompleteRows(worksheet);
      sheetSummary.push({
        text: `${worksheet.name}\u7B2C\u4E8C\u9673\u5217\u5E97\u5BB6-\u5171${countCompleteRows(worksheet)}\u5BB6`,
        options
      });
    });
    sheetSummary.push({
      text: `\u76EE\u524D\u9673\u5217${totalCounts}\u5BB6(\u6301\u7E8C\u66F4\u65B0\u4E2D)`,
      options
    });
    return sheetSummary;
  }
  function addPreview(preview) {
    const slide = pptx.addSlide();
    slide.addText(preview, { h: "100%", w: "100%" });
  }
  function addBody(storeData, displayData, workbook, worksheet) {
    displayData.length > 1 ? addDisplayTable(displayData) : console.log("\u7121\u9673\u5217\u5E97\u5BB6\u8CC7\u6599");
    storeData.length > 1 ? addPhotoAlbum(createPhotoAlbum(workbook, worksheet, storeData)) : console.log("\u7121\u9673\u5217\u7167\u7247");
  }
  function addBodys(workbook) {
    workbook.eachSheet((worksheet) => {
      const data = preparePPTData(worksheet);
      addBody(data.storeData, data.displayData, workbook, worksheet);
    });
  }
  function createPPT(workbook) {
    addCover();
    addPreview(createPreview(workbook));
    addBodys(workbook);
    Swal.fire({
      title: "\u5DF2\u8F49\u63DB\u6210PPT\u6A94",
      icon: "success"
    });
  }

  // helpers/mergeStyleString.js
  function mergeStyleString(fixedStyles, styles) {
    const mergedStyles = { ...fixedStyles, ...styles };
    return Object.keys(mergedStyles).map((key) => `${key}: ${mergedStyles[key]};`).join(" ");
  }

  // components/shared/fileInput.js
  function fileInput({ id, text, styles }) {
    const styleString = mergeStyleString([], styles);
    return `
          <div class="file-input">
              <input type="file" name="${id}" id="${id}" class="file-input-input">
              <label class="file-input-label" for="${id}" style="${styleString}">
                    <svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="upload" class="svg-inline--fa fa-upload fa-w-16" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
                        <path fill="currentColor" d="M296 384h-80c-13.3 0-24-10.7-24-24V192h-87.7c-17.8 0-26.7-21.5-14.1-34.1L242.3 5.7c7.5-7.5 19.8-7.5 27.3 0l152.2 152.2c12.6 12.6 3.7 34.1-14.1 34.1H320v168c0 13.3-10.7 24-24 24zm216-8v112c0 13.3-10.7 24-24 24H24c-13.3 0-24-10.7-24-24V376c0-13.3 10.7-24 24-24h136v8c0 30.9 25.1 56 56 56h80c30.9 0 56-25.1 56-56v-8h136c13.3 0 24 10.7 24 24zm-124 88c0-11-9-20-20-20s-20 9-20 20 9 20 20 20 20-9 20-20zm64 0c0-11-9-20-20-20s-20 9-20 20 9 20 20 20 20-9 20-20z"></path>
                    </svg>
                  <span>${text}</span>
              </label>
          </div>
      `;
  }

  // components/fileReaders/xlsx2ppt.js
  $(document).ready(function() {
    function createBaseElement() {
      $(".top-row").append(
        fileInput({
          id: "xlsx2ppt",
          text: "PPT",
          styles: {
            background: "#d04424"
          }
        })
      );
    }
    createBaseElement();
    $("#xlsx2ppt").on("change", function(e) {
      const file = e.target.files[0];
      if (!file) return;
      Pace.restart();
      const reader = new FileReader();
      reader.onloadend = async function() {
        const workbook = new ExcelJS.Workbook();
        await workbook.xlsx.load(reader.result);
        createPPT(workbook);
        Pace.stop();
      };
      reader.readAsArrayBuffer(file);
    });
  });
})();
