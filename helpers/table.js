function exportToExcel() {
    const table2excel = new Table2Excel();
    const htmlTable = $("#resultTable");

    if (htmlTable.children().length === 0) {
        alert("無法導出空表格");
        return;
    }

    const today = new Date();
    const month = today.getMonth() + 1;
    const day = today.getDate();
    const formattedDate = `${month}月_${day}日`;

    table2excel.export(htmlTable, `PX台中日銷庫存表_${formattedDate}`);
}

function clearTableAndInput() {
    $("#fileNameDisplay").empty();
    $("#resultTable").empty();
    $("input[name=monthStocks]").val("");
    $("#monthStocksFileNameDisplay").text("");
    $("input[name=todaySells]").val("");
    $("#todaySellsFileNameDisplay").text("");
}

function appendHeaderRows() {
    var headerRow = `
    <tr class='gray'>
        <th>處</th>
        <th>區</th>
        <th>店名</th>
    `;

    var subHeaderRow = `
    <tr class='white'>
        <th></th>
        <th></th>
        <th></th>
    `;

    for (const i in targetProductName) {
        const product = targetProductName[i];
        headerRow += `<th colspan="2">${product}</th>`;

        subHeaderRow += `
            <th>
                <div class='darkred-text'>
                    庫存
                </div>
            </th>
            <th>
                <div class='darkred-text'>
                    日銷
                </div>
            </th>
        `;
    }

    headerRow += "</tr>";
    $("#resultTable").append(headerRow);

    subHeaderRow += "</tr>";
    $("#resultTable").append(subHeaderRow);
}

export { exportToExcel, clearTableAndInput, appendHeaderRows };
