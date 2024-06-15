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

      workbook.eachSheet(function (worksheet, sheetId) {
        console.log(`Sheet ${sheetId}: ${worksheet.name}`);

        worksheet.eachRow({ includeEmpty: true }, function (row, rowNumber) {
          let rowData = [];
          row.eachCell(function (cell, colNumber) {
            if (cell.value) {
              rowData.push(cell.value);
            }
          });
          if (rowData.length > 0) {
            // console.log(`Row ${rowNumber}: ${rowData.join(", ")}`);
          }
        });

        function getColumnLetter(colIndex) {
          let letter = "";
          while (colIndex >= 0) {
            letter = String.fromCharCode((colIndex % 26) + 65) + letter;
            colIndex = Math.floor(colIndex / 26) - 1;
          }
          return letter;
        }

        worksheet.getImages().forEach(async function (image, index) {
          const img = workbook.model.media.find(
            (m) => m.index === image.imageId
          );

          const row = image.range.tl.nativeRow + 1;
          const col = image.range.tl.nativeCol;
          const cellAddress = `${getColumnLetter(col)}${row}`;

          console.log(`${img.name}.${img.extension}`, cellAddress);

          const base64data = img.buffer.toString("base64");

        //   var imgElement = document.createElement("img");

        //   imgElement.src = "data:image/png;base64," + base64data;
        //   imgElement.style.width = "6cm";
        //   imgElement.style.height = "8cm";

        //   var container = document.getElementById("imageContainer");
        //   container.appendChild(imgElement);
        });
      });
    };
    reader.readAsArrayBuffer(file);
  });
