import { button } from "../shared/buttons/button.js";

$(document).ready(function () {
  $(".top-row").append(
    button({
      id: "exportToExcel",
      text: "導出",
      styles: { display: 'none' }
    })
  );

  $("#exportToExcel").on("click", async function () {
    function isTableEmpty(table) {
      return table.children().length === 0;
    }

    function downloadDate() {
      const today = new Date();
      const month = today.getMonth() + 1;
      const day = today.getDate();

      return `${month}月_${day}日`;
    }

    function exportToExcel() {
      const htmlTable = $("#resultTable");

      if (isTableEmpty(htmlTable)) {
        Swal.fire({ title: "無法導出空表格!", icon: "error" });
      }

      new Table2Excel().export(htmlTable, `PX台中日銷庫存表_${downloadDate()}`);
    }

    exportToExcel();
  });
});
