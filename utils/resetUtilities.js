function resetFileInputs() {
  $(
    "input[name=monthStocks], input[name=todaySells], input[name=dailyKpi]"
  ).val("");
  $(
    "#monthStocksFileNameDisplay, #todaySellsFileNameDisplay, #dailyKpiFileNameDisplay"
  ).text("");
}

function resetTable() {
  $("#resultTable").empty();
  $(".photo-table").empty();
  
  $(".clicked-btn").removeClass("clicked-btn");
}

function resetStorage() {
  sessionStorage.clear();
}

export { resetFileInputs, resetTable, resetStorage };
