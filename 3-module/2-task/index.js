function filterRange(arr, a, b) {
  let result = arr.filter((elem) => elem >= a && elem <= b);
  return result;
}