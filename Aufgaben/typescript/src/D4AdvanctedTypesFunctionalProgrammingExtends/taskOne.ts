//task 1a
type nonEmpty<T> = [T, ...T[]];



const example: nonEmpty<Number> = [1];
const exampleTwo: nonEmpty<Number> = [1, 2];

//the following throw errors which was the goal
//const exampleThree: nonEmpty<Number> = [[1, 2], [3, 4]];
//const  exampleFour: nonEmpty<Number> = [];

//task 1b

//What I think the task wants:
// Create a type that that only accepts non empty arrays- (like in 1a)
//But now it should work for multiple arrays that are part of an object (like an Interface)
//So I have a interface with arrays as parameters, that may be empty
//Then I write that interface into a generic Interfase that just accepts non empty types