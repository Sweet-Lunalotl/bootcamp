function quicksort(arr: number[]): number[] {
  //Base case
  if (arr.length <= 1) {
    return arr;
  }
  const randomIndex: number = Math.floor(Math.random() * arr.length);
  //zufälliges Pivot Element wird gewählt
  const pivot: number = arr[randomIndex];
  const left: number[] = [];
  const right: number[] = [];

  //kleiner als Pivot -> links vom Pivot einsortieren; größer als Pivot -> rechts vom Pivot einsortieren
  for (let i: number = 0; i < arr.length; i++) {
    if (i === randomIndex) continue;
    if (arr[i] < pivot) {
      left.push(arr[i]);
    } else {
      right.push(arr[i]);
    }
  }
  //kombiniert drei arrays zu einem
  return [...quicksort(left), pivot, ...quicksort(right)];
}

const unsortedArray: number[] = [3, 6, 8, 10, 1, 2, 1];
const sortedArray: number[] = quicksort(unsortedArray);
console.log(sortedArray);




