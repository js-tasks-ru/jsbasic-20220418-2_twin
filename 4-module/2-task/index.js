function makeDiagonalRed(table) {
  let rows = 0;
  let cells = 0;
  while (rows < table.rows.length) {
    table.rows[rows].cells[cells].style.backgroundColor = 'red';
    rows++;
    cells++;
  }
  return table;
}