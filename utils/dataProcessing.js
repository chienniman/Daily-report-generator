function processData(worksheet) {
  var dataArray = [];
  for (var row = 22; row <= 36; row++) {
    var rowObject = {};
    for (var col = 2; col <= 7; col++) {
      var cellAddress = XLSX.utils.encode_cell({ r: row, c: col });
      var cell = worksheet[cellAddress];
      rowObject[XLSX.utils.encode_col(col)] = cell ? cell.v : null;
    }
    dataArray.push(rowObject);
  }

  return dataArray;
}

function setData(key, value) {
  sessionStorage.setItem(key, JSON.stringify(value));
}

function getData(key) {
  var storedData = sessionStorage.getItem(key);

  return storedData ? JSON.parse(storedData) : null;
}

export { processData, setData, getData };
