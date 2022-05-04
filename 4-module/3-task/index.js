function highlight(table) {
  const rows = table.rows;
  for (let row of rows) {
    if (row === rows[0]) {
      continue;
    }
    
    const status = row.cells[3];
    if (status.dataset.available) {
      if (status.dataset.available === 'true') {
        row.classList.add('available');
      } else if (status.dataset.available === 'false') {
        row.classList.add('unavailable');
      }
    } else {
      row.setAttribute('hidden', true);
    }

    const gender = row.cells[2];
    row.className += gender.innerHTML === 'm' ? ' male' : ' female';

    const age = row.cells[1];
    if (+age.innerHTML < 18) {
      row.style.textDecoration = 'line-through';
    }
  }
}