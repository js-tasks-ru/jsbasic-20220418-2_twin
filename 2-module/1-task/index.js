function sumSalary(salaries) {
  let result = 0;
  for (let key in salaries) {
    const item = salaries[key];
    result += typeof item === 'number' && Number.isFinite(item) ? item : 0;
  }
  return result;
}
