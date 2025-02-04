// function headerRow(productMap) {
//   let headerRow = "<tr class='gray'><th>處</th><th>區</th><th>店名</th>";

//   Array.from(productMap.values()).forEach((product) => {
//     headerRow += `<th colspan=3">${product}</th>`;
//   });

//   return headerRow + "</tr>";
// }

function headerRow(productMap) {
  let headerRow = "<tr class='gray'><th>處</th><th>區</th><th>店名</th>";

  Array.from(productMap.values()).forEach((product) => {
    headerRow += `<th colspan=2">${product}</th>`;
  });

  return headerRow + "</tr>";
}

export { headerRow };
