//task 1a
//when creating an array of this type it is only possible to when the Array is a) not empty, b) has only one kind of data in it c) one Dimension
//T stands in for the type
//[T] would be an array with exactly one element that has the Type T
//...T[] means that 0 to whatever many array elements of the Type T can be added
type NonEmptyArrayType<T> = [T, ...T[]];

//a few examples that work
const example: NonEmptyArrayType<Number> = [1];
const exampleTwo: NonEmptyArrayType<Number> = [1, 2];
const exampleThree: NonEmptyArrayType<String> = ["Geckos", "Are", "The", "Best!!!"];

//a few examples that don't work
//const exampleThree: nonEmpty<Number> = [[1, 2], [3, 4]];
//const  exampleFour: nonEmpty<Number> = [];

//task 1b

//What I think the task wants:
// Create a type that that only accepts non-empty arrays (like in 1a)
//But now it should work for multiple arrays that are part of an object (like interface)
//So I have a type with arrays as parameters, that may be empty
//Then I write that interface into a generic Interface that just accepts non-empty types

//a dynamic type that can do arrays of the type T
type ArrayType<T> = T[];

//an example i had fun with
interface Gecko {
  mealplan: ArrayType<string>;
  fingersPerHand: ArrayType<number>;
  thoughts: ArrayType<string>;
  inTree: ArrayType<boolean>;
}

//here is the type that should make my little gecko non-empty
//[K in keyof T]: looks what type is inside of T, makes a new type that is specified after ":"
//infer checks if it an array
//after that it gets replaced with the NonEmptyArrayType
type MakeNonEmptyGecko<T> = {[K in keyof T]: T[K] extends (infer U)[] ? NonEmptyArrayType<U> : T[K]};

type FullGecko = MakeNonEmptyGecko<Gecko>;

//oh look! a jellyfish and it's baby!!!
//        C{≡
//           O≡
//it has the same brain mass as I do....


//task 1c
//looking at that it feels like recursive might be tha way to go
//reminds me from the looks of it of recursive depth search
