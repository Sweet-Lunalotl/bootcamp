interface Cars {
    brand: string;
    model: string;
}


const cars: Cars[] = [
    {brand: 'Ford', model: 'Mustang'},
    {brand: 'Ford', model: 'Fiesta'},
    {brand: 'Ford', model: 'Focus'},
    {brand: 'VW', model: 'Golf'},
    {brand: 'VW', model: 'Polo'},
    {brand: 'VW', model: 'Passat'},
    {brand: 'Audi', model: 'A6'},
    {brand: 'Audi', model: 'A4'},
    {brand: 'Audi', model: 'A3'},
    {brand: 'Audi', model: 'R8'},
    {brand: 'BMW', model: 'M5'},
    {brand: 'BMW', model: 'M3'},
    {brand: 'BMW', model: 'X6'},
    {brand: 'Mercedes', model: 'C-Class'},
    {brand: 'Mercedes', model: 'E-Class'},
    {brand: 'Mercedes', model: 'S-Class'},
];


//Aufgabe 1: Makes an Array models with only the model names of CarF
const models: string[] = cars.map((model: Cars) => {return model.model});
console.log(models);

//Aufgabe 2: sort array carF by brand alphabetically
cars.sort((a: Cars, b: Cars) => a.brand.localeCompare(b.brand));
console.log(cars);

//Aufgabe 3: new array audis with all cars from the brand Audi
const audis: Cars[]= cars.filter((brand: Cars) => brand.brand === "Audi");
console.log(audis);

