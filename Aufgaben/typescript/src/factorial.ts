//this file is part of my presentation about algorithms

function iterativeFactorial(n: number): number{
  let answer = 1;
  for (let iteration: number = 2; iteration <= n; iteration++){
    answer = answer * iteration;
  }
  return answer;
}

function recursiveFactorial(n: number): number{
  //base case
  if(n === 0){
    return 1;
  }
  //recursive call
  return n * recursiveFactorial(n -1);
}

//returns 120
console.log(recursiveFactorial(5));

//returns 120
console.log(iterativeFactorial(5));

