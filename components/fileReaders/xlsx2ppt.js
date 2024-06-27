import { createPPT } from "../../helpers/createPPT.js";
import { fileInput } from "../shared/fileInput.js";

$(document).ready(function () {
  function createBaseElement() {
    $(".top-row").append(
      fileInput({
        id: "xlsx2ppt",
        text: "PPT",
        styles: {
          background: "#d04424",
        },
      })
    );
  }

  createBaseElement();

  $("#xlsx2ppt").on("change", function (e) {
    const file = e.target.files[0];
    if (!file) return;

    Pace.restart();

    const reader = new FileReader();
    reader.onloadend = async function () {
      const workbook = new ExcelJS.Workbook();
      await workbook.xlsx.load(reader.result);
      createPPT(workbook);
      Pace.stop();
    };
    reader.readAsArrayBuffer(file);
  });
});
