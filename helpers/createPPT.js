import { createTable, createTableWithRows } from "./createTable.js";
import {
  splitArrayByMaxSize,
  collectImagesData,
  preparePPTData,
  countCompleteRows,
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
        console.error(`Error table-id ${tableInfo.id}:`, error);
      });

    promises.push(promise);
  });

  return Promise.all(promises);
}

let globalTableCounter = 0;

function createPhotoAlbum(workbook, worksheet, storesData, imagesPerRow = 6) {
  storesData.shift();
  const imagesData = collectImagesData(workbook, worksheet);
  const tableInfo = [];

  for (let i = 0; i < storesData.length; i += imagesPerRow * 2) {
    const tableId = `${worksheet.name}-photo-table-${globalTableCounter}`;
    globalTableCounter++;

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
  }

  return {
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
        text: `PX113${(new Date().getMonth() + 1).toString().padStart(2, "0")}`,
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

function createPreview(workbook) {
  const sheetSummary = [];
  const options = {
    fontFace: "標楷體",
    fontSize: 32,
    color: "000000",
    breakLine: true,
    align: "center",
    valign: "middle",
  };
  let totalCounts = 0;

  workbook.eachSheet((worksheet) => {
    totalCounts += countCompleteRows(worksheet);

    sheetSummary.push({
      text: `${worksheet.name}第二陳列店家-共${countCompleteRows(worksheet)}家`,
      options,
    });
  });

  sheetSummary.push({
    text: `目前陳列${totalCounts}家(持續更新中)`,
    options,
  });

  return sheetSummary;
}

function addPreview(preview) {
  const slide = pptx.addSlide();

  slide.addText(preview, { h: "100%", w: "100%" });
}

async function addBody(storeData, displayData, workbook, worksheet) {
  displayData.length > 1
    ? addDisplayTable(displayData)
    : console.log("無陳列店家資料");

  storeData.length > 1
    ? await addPhotoAlbum(createPhotoAlbum(workbook, worksheet, storeData))
    : console.log("無陳列照片");
}

async function addBodys(workbook) {
  const addBodyPromises = [];

  workbook.eachSheet((worksheet) => {
    const data = preparePPTData(worksheet);
    addBodyPromises.push(
      addBody(data.storeData, data.displayData, workbook, worksheet)
    );
  });

  await Promise.all(addBodyPromises);
}

function download() {
  pptx.writeFile({
    fileName: `PX${new Date().getFullYear() - 1911}年${
      new Date().getMonth() + 1
    }月份陳列照片.pptx`,
  });

  Swal.fire({
    title: "已成功轉換下載PPT",
    icon: "success",
  });
}

async function createPPT(workbook) {
  addCover();

  addPreview(createPreview(workbook));

  await addBodys(workbook);

  download();
}

export { createPPT };
