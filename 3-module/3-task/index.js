function camelize(str) {
  const newStr = str.split('-');
  const first = newStr[0];
  return first + newStr
                  .filter((word) => word !== first)
                  .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
                  .join('');
}