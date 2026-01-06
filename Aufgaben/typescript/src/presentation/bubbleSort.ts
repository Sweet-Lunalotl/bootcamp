//this file is part of my presentation about algorithms

function bubbleSort(array: number[]): void {
  for(let i: number = 0; i < array.length; i++) {
    for(let j: number = 0; j < ( array.length - i -1 ); j++) {
      if(array[j] > array[j+1]) {
        let temp: number = array[j];
        array[j] = array[j + 1];
        array[j+1] = temp;
      }
    }
  }
}

//unsorted array with 30 random numbers
const arr: number[] = [43 ,8 ,96 ,68 ,17 ,96 ,50 ,77 ,9 ,35 ,2 ,4 ,95 ,48 ,42 ,46 ,57 ,78 ,20 ,10 ,47 ,64 ,12 ,31 ,57 ,47 ,54 ,76 ,14 ,17];
bubbleSort(arr);
console.log(arr);


//Zur anschaulichkeit habe ich den Array direkt verändert. Bitte nicht nachmachen. Wenn ihr Daten verändert/sortiert, bitte macht immer vorher eine Kopie




/*

function getRandomInt1(min: number, max: number): number {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

for(let i: number = 0; i < 30; i++){
  process.stdout.write(getRandomInt1(0, 99).toString() + " ,")
}
*/