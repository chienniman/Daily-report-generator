import { targetFilter } from "./helpers/targetFilter.js";
import pxMarts from "./dataSets/pxMarts.js";

// console.log(pxMarts);

const input = document.getElementById("input-file");
const handsontableContainer = document.getElementById("handsontable-container");

input.onchange = function () {
    const file = this.files[0];
    const reader = new FileReader();

    reader.onload = function (e) {
        const csv = e.target.result;
        const data = Papa.parse(csv, {
            header: true,
            skipEmptyLines: true,
        });

        const filteredData = data.data.filter((e) =>
            pxMarts.includes(e.PTDPNA)
        );

        console.log(filteredData);

        handsontableContainer.innerHTML = "";
        handsontableContainer.className = "";
        document.querySelector("input").remove();

        Handsontable(handsontableContainer, {
            data: filteredData,
            search: true,
            rowHeaders: true,
            colHeaders: data.meta.fields,
            columnSorting: true,
            width: "100%",
            licenseKey: "non-commercial-and-evaluation",
        });
    };

    file && reader.readAsText(file);
};
