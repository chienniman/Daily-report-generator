function isCSV(file) {
  return file && file.name.split(".").pop().toLowerCase() === "csv";
}

export { isCSV };

