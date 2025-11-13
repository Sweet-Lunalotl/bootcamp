//task 1a
type nonEmpty<T> = [T, ...T[]];



const example: nonEmpty<Number> = [1];
const exampleTwo: nonEmpty<Number> = [1, 2];

//the following throw errors which was the goal
//const exampleThree: nonEmpty<Number> = [[1, 2], [3, 4]];
//const  exampleFour: nonEmpty<Number> = [];

//task 1b
//What should the array be filled with?! Or should it just accept non empty arrays? I think the second one must be right
//What even is an object type containing arrays? For Example an interface containing multiple arrays as their parameters
//but it should not be an interface it should be a type AHHHHHH
//and how should I change something without actually calling a function?