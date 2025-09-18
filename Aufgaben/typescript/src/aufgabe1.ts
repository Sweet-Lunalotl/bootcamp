/*
Aufgabe 1:
Erstelle eine Funktion calculateDiscount, die zwei Parameter bekommt:
- price: number
- isMember: boolean
Wenn isMember true ist und der Preis über 100 liegt, gib den Preis mit
20% Rabatt zurück. Wenn isMember false ist und der Preis über 100 liegt,
gib den Preis mit 10% Rabatt zurück. Sonst gib den Originalpreis zurück.
 */

function calculateDiscount(price: number, isMember: boolean): number{
    if (isMember && price > 100){
        return price * 0.8;
    } else if (!isMember && price > 100){
        return price * 0.9;
    } else {
        return price;
    }
}

const price: number = 200;
const isMember: boolean = true;
console.log("Der alte Preis ist:", price, '\n', "Der neue Preis ist:", calculateDiscount(price, isMember));




