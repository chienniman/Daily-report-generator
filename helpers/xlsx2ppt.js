function getColumnLetter(colIndex) {
  let letter = "";
  while (colIndex >= 0) {
    letter = String.fromCharCode((colIndex % 26) + 65) + letter;
    colIndex = Math.floor(colIndex / 26) - 1;
  }
  return letter;
}

function createPPT(data) {
  const pptx = new PptxGenJS();
  const slide = pptx.addSlide();
  const tabOpts = {
    align: "center",
    valign: "middle",
    fontSize: 18,
    colW: [2.2, 5.2, 1.7],
    rowH: 0.35,
    border: { pt: "1", color: "FFFFFF" },
  };

  slide.addTable(data, tabOpts);
  pptx.writeFile({ fileName: "TableDemo.pptx" });
}

function createPhotos(workbook,worksheet) {
  worksheet.getImages().forEach(async function (image, index) {
    const img = workbook.model.media.find((m) => m.index === image.imageId);
    const row = image.range.tl.nativeRow + 1;
    const col = image.range.tl.nativeCol;
    const cellAddress = `${getColumnLetter(col)}${row}`;
    //   console.log(`${img.name}.${img.extension}`, cellAddress);
    const base64data = img.buffer.toString("base64");

    var imgElement = document.createElement("img");

    imgElement.src = "data:image/png;base64," + base64data;
    imgElement.style.width = "6cm";
    imgElement.style.height = "8cm";

    var container = document.getElementById("imageContainer");
    container.appendChild(imgElement);
  });
}

document
  .getElementById("xlsxFileInput")
  .addEventListener("change", function (e) {
    var files = e.target.files;
    if (!files.length) return;
    var file = files[0];

    var reader = new FileReader();
    reader.onloadend = async function (event) {
      var arrayBuffer = reader.result;
      var workbook = new ExcelJS.Workbook();
      await workbook.xlsx.load(arrayBuffer);

      const displayTable = [];

      workbook.eachSheet(function (worksheet, sheetId) {
        console.log(`Sheet ${sheetId}: ${worksheet.name}`);
        worksheet.eachRow({ includeEmpty: true }, function (row, rowId) {
          let rowData = [];
          row.eachCell(function (cell, colNumber) {
            // 店名、陳列品項、陳列位
            if (cell.value && [4, 7, 8].includes(colNumber)) {
              rowData.push(cell.value);
            }
          });
          if (rowData.length === 3) {
            const data = [
              { text: rowData[0], options: { fill: "99cdff" } },
              { text: rowData[1], options: { fill: "b5c7dd" } },
              { text: rowData[2], options: { fill: "b5c7dd" } },
            ];
            displayTable.push(data);
          }
        });

        createPPT(displayTable);
        createPhotos(workbook,worksheet);
      });
    };
    reader.readAsArrayBuffer(file);
  });
