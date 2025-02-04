// function subHeaderRow(productMap) {
//   let subHeaderRow = "<tr class='white'><th></th><th></th><th></th>";

//   Array.from(productMap.values()).forEach(() => {
//     subHeaderRow += `
//               <th id="threshold">
//                   <div class='darkred-text'>
//                       水位
//                   </div>
//               </th>
//               <th id="stock">
//                   <div class='darkred-text'>
//                       庫存
//                   </div>
//               </th>
//               <th id="sell">
//                   <div class='darkred-text'>
//                       日銷
//                   </div>
//               </th>
//           `;
//   });

//   return subHeaderRow + "</tr>";
// }

function subHeaderRow(productMap) {
    let subHeaderRow = "<tr class='white'><th></th><th></th><th></th>";
  
    Array.from(productMap.values()).forEach(() => {
      subHeaderRow += `
                <th id="stock">
                    <div class='darkred-text'>
                        庫存
                    </div>
                </th>
                <th id="sell">
                    <div class='darkred-text'>
                        日銷
                    </div>
                </th>
            `;
    });
  
    return subHeaderRow + "</tr>";
  }

export { subHeaderRow };
