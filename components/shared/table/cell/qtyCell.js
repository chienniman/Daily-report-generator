function qtyCell(className, qty) {
  return $(`<td class='${className}'>`).html(
    `<div class="split-td"><div class="darkred-text">${qty}</div></div>`
  );
}

export { qtyCell };
