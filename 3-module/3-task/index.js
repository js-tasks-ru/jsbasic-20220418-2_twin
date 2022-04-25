function camelize(str) {
  const newStr = str.split('-');
  for (let i = 1; i < newStr.length; i++) {
    newStr[i] = newStr[i].charAt(0).toUpperCase() + newStr[i].slice(1);
  }
  return newStr.join('');
}