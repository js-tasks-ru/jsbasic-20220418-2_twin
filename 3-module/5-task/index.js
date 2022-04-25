function getMinMax(str) {
  const newStr = str.split(' ');
  let tempArr = [];

  for (let char of newStr) {
    char = +char;
    if (Number.isFinite(char)) {
      tempArr.push(char);
    }
  }

  tempArr.sort((a, b) => a - b);

  let result = {
    min: tempArr[0],
    max: tempArr[tempArr.length - 1]
  };

  return result;
}