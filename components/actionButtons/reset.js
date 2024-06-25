import { button } from "../shared/buttons/button.js";

$(document).ready(function () {
  $(".top-row").append(
    button({
      id: "reset",
      text: "重置",
      styles: { display: 'none' }
    })
  );

  $("#reset").on("click", async function () {
    function reset() {
      sessionStorage.clear();

      $("#fileNameDisplay, #resultTable").empty();
      $(
        "input[name=monthStocks], input[name=todaySells], input[name=dailyKpi]"
      ).val("");
      $(
        "#monthStocksFileNameDisplay, #todaySellsFileNameDisplay, #dailyKpiFileNameDisplay"
      ).text("");
    }

    reset();
  });
});
