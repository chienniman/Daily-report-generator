(()=>{$(document).ready(function(){$(".top-row").append(`<div style="display:none" id="searchBox" class="search-box">
        <input type="text" class="input-search" placeholder="\u641C\u5C0B\u5E97\u5BB6...">
     </div>
    `),$(".input-search").on("input",function(){var e=$(this).val().trim().toLowerCase();$(".table-row").each(function(){var t=$(this).find("td:nth-child(3) button").attr("class");t&&t.toLowerCase().includes(e)?$(this).show():$(this).hide()})})});})();
