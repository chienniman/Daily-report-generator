function cell(rowElement, className, id) {
  var cell = $("<td>", {
    class: className,
    id: id,
  });
  cell.appendTo(rowElement);

  return cell;
}

export { cell };
