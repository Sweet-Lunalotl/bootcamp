//task 1a
type nonEmpty<T> = [T, ...T[]];



const example: nonEmpty<Number> = [1];
const exampleTwo: nonEmpty<Number> = [1, 2];

//the following throw errors which was the goal
//const exampleThree: nonEmpty<Number> = [[1, 2], [3, 4]];
//const  exampleFour: nonEmpty<Number> = [];
