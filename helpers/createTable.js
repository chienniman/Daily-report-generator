function createTable(container, className, tableId) {
  return $("<table>", { class: className, id: tableId }).appendTo(container);
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

function createTableWithRows(
  table,
  storesData,
  imagesData,
  startIndex,
  imagesPerRow
) {
  const tableRows = [];

  for (let j = 0; j < 2; j++) {
    const currentStoreRow = createRow(table);
    const currentImageRow = createRow(table);

    createCell(currentStoreRow, "empty-td", null);
    createCell(currentImageRow, "description-td", null).text("陳列位");

    const startIdx = startIndex + j * imagesPerRow;
    const storesSlice = storesData.slice(startIdx, startIdx + imagesPerRow);

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
      imageCells: imageCells.filter((cell) => cell !== null),
    });

    if (storesData.length <= startIdx + imagesPerRow) break;
  }

  return tableRows;
}

function addImageToCell(cellElement, base64data) {
  const imgElement = $("<img>")
    .attr("src", "data:image/png;base64," + base64data)
    .css({ width: "100%", height: "100%" });

  cellElement.empty().append(imgElement);
}

function populateRows(
  storesSlice,
  imagesData,
  currentStoreRow,
  currentImageRow
) {
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
      ).text("無圖像");
      imageCells.push(emptyImageCell);
    }
  });

  return { storeCells, imageCells };
}

function fillEmptyCells(currentStoreRow, currentImageRow, cellsToAdd) {
  for (let k = 0; k < cellsToAdd; k++) {
    createCell(currentStoreRow, "store-td", null).text("無資料");
    createCell(currentImageRow, "photo-td", null).text("無圖像");
  }
}

export { createTable, createTableWithRows };
