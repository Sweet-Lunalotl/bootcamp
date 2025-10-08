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

function fiboRec(n: number): number{
    if (n<=1){
        return n;
    }
    else{
        return fiboRec(n-1)+fiboRec(n-2);
    }
}


const fiboUntil: number = 20;
let curr: number = 0;
let i: number = 0;


while (curr <= fiboUntil){
    curr = fiboRec(i);
    i++;
    if (curr <= fiboUntil){
        console.log(curr)
    }
}