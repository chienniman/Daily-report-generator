function isCSV(input) {
  const ext = $(input)[0].files[0].name.split(".").pop().toLowerCase();

  return ext === "csv";
}

export { isCSV };
