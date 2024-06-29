function isCSV(file) {
  return file && file.name.split(".").pop().toLowerCase() === "csv";
}

function isXLSX(file) {
  return file && file.name.split(".").pop().toLowerCase() === "xlsx";
}

export { isCSV, isXLSX };
