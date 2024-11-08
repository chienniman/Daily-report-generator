import { button } from "../shared/buttons/button.js";

$(document).ready(function () {
  $(".top-row").append(
    button({
      id: "toggleWidth",
      text: "半形",
      styles: { display: "inline" },
    })
  );

  let currentMode = sessionStorage.getItem("toggleMode") || "半形";
  $("#toggleWidth").text(currentMode);

  function toggleWidth() {
    currentMode = currentMode === "全形" ? "半形" : "全形";

    $("#toggleWidth").text(currentMode);
    sessionStorage.setItem("toggleMode", currentMode);
    location.reload();
  }

  $("#toggleWidth").on("click", function () {
    toggleWidth();
  });
});
