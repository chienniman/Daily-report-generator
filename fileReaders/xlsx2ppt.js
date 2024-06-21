import { createPPT } from "../helpers/createPPT.js";

function createStyle() {
  const styles = `
  #pptTableContainer>table>tbody{
    display: flex;
    justify-content: center;
    flex-wrap: wrap;
  }
  #pptTableContainer>table>tbody>tr{
      display: flex;
      justify-content: center;
      width: 100%;
  }
  #pptTableContainer>table>tbody>tr>td{
      padding: 0;
      border: 1px solid;
      width: 4cm;
  }
  #pptTableContainer{
      position: absolute;
      z-index: 10;
      background-color: whitesmoke;
  }
  .store-td{
      background-color: #99cdff;
  }
  .empty-td,.description-td{
      width: 1cm!important;
      writing-mode: vertical-lr;
      background-color: #99cdff;
  }
  .photo-table{
      border-collapse: collapse;
  }
`;

  $("<style>").text(styles).appendTo("head");
}

function createBaseElement() {
  const fileInput = $("<input>", {
    type: "file",
    id: "xlsx2ppt",
  });
  $(".top-row").append(fileInput);

  const pptTableContainer = $("<div>", {
    id: "pptTableContainer",
  });
  $("body").append(pptTableContainer);
}

$(document).ready(function () {
  createStyle();
  createBaseElement();

  $("#xlsx2ppt").on("change", function (e) {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onloadend = async function () {
      const workbook = new ExcelJS.Workbook();
      await workbook.xlsx.load(reader.result);
      createPPT(workbook);
    };
    reader.readAsArrayBuffer(file);
  });
});
