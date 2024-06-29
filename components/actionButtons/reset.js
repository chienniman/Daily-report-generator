import { button } from "../shared/buttons/button.js";
import {
  resetFileInputs,
  resetTable,
  resetStorage,
} from "../../utils/resetUtilities.js";

$(document).ready(function () {
  $(".top-row").append(
    button({
      id: "reset",
      text: "重置",
      styles: { display: "none" },
    })
  );

  $("#reset").on("click", async function () {
    function reset() {
      resetFileInputs();
      resetTable();
      resetStorage();
    }

    reset();
  });
});
