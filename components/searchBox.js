$(document).ready(function () {
  $(".top-row").append(
    `<div style="display:none" id="searchBox" class="search-box">
        <input type="text" class="input-search" placeholder="搜尋店家...">
     </div>
    `
  );

  $(".input-search").on("input", function () {
    var searchText = $(this).val().trim().toLowerCase();

    $(".table-row").each(function () {
      var thirdTdButtonClass = $(this)
        .find("td:nth-child(3) button")
        .attr("class");

      if (
        thirdTdButtonClass &&
        thirdTdButtonClass.toLowerCase().includes(searchText)
      ) {
        $(this).show();
      } else {
        $(this).hide();
      }
    });
  });
});
