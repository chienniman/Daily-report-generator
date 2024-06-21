import { createTable, createTableWithRows } from "./table.js";
import {
  splitArrayByMaxSize,
  collectImagesData,
  preparePPTData,
} from "./dataHandler.js";

const pptx = new PptxGenJS();

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

function addPhotoAlbum(data) {
  const promises = [];

  data.tables.forEach((tableInfo, index) => {
    const tableElement = document.getElementById(tableInfo.id);

    if (!tableElement) {
      console.error(`Table-id ${tableInfo.id} empty.`);
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
          `Error table-id ${tableInfo.id}:`,
          error
        );
      });

    promises.push(promise);
  });

  Promise.all(promises).then(() => {
    pptx.writeFile({
      fileName: `PX${new Date().getFullYear() - 1911}${
        new Date().getMonth() + 1
      }月份陳列照片.pptx`,
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
          fontFace: "標楷體",
          fontSize: 54,
          color: "000000",
          breakLine: true,
          align: "center",
          valign: "middle",
        },
      },
      {
        fontFace: "標楷體",
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
        fontFace: "標楷體",
        text: "DM商品第二陳列",
        options: {
          fontSize: 60,
          color: "000000",
          align: "center",
          valign: "middle",
        },
      },
    ],
    { h: "100%", w: "100%" }
  );
}

function addBody(storeData, displayData, workbook, worksheet) {
  displayData.length > 1
    ? addDisplayTable(displayData)
    : console.log("無陳列店家資料");

  storeData.length > 1
    ? addPhotoAlbum(createPhotoAlbum(workbook, worksheet, storeData))
    : console.log("無陳列照片");
}

function createPPT(workbook) {
  addCover();
  workbook.eachSheet((worksheet) => {
    const data = preparePPTData(worksheet);

    addBody(data.storeData, data.displayData, workbook, worksheet);
  });

  Swal.fire({
    title: "已轉換成PPT檔",
    icon: "success",
  });
}

export { createPPT };
