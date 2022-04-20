function checkSpam(str) {
  const newStr = str.toLowerCase();
  return newStr.includes('1xBet'.toLowerCase()) || newStr.includes('XXX'.toLowerCase());
}
