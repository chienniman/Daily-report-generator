function qtyCell(id, qty) {
  return $(`<td id='${id}'>`).html(
    `<div class="split-td"><div class="darkred-text">${qty}</div></div>`
  );
}

export { qtyCell };
