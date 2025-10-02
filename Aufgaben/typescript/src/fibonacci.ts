function fibonacciSequenz(number: number): void{
  let sequence: number[] = [0, 1, 1];

  while (sequence[sequence.length-1] <= number){
    sequence.push((sequence[sequence.length-1] + sequence[sequence.length-2]));
  }
  sequence.pop()
  printFibonacciSequenz(number, sequence)
}


function printFibonacciSequenz(number: number, sequence: number[]): void{
  console.log("The fibonacci sequenz until", number)
  if(number === 0){
    console.log(number);
    return;
  }
  let stringOut: string = "";
  sequence.forEach((item: number) => {stringOut = stringOut + item.toString() + " "});
  console.log(stringOut);
}



//here you can enter the number to which you want the fibonacci sequenz calculated
const n: number = 20;
fibonacciSequenz(n);