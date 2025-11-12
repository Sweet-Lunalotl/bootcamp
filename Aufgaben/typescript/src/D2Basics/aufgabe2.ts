/*
Erstelle eine Funktion calculator, die drei Parameter entgegennimmt:

  a: number
b: number
operation: string (z. B. "add", "subtract", "multiply", "divide")

Die Funktion soll je nach operation die entsprechende Rechenoperation durchführen und das
Ergebnis zurückgeben.
  Zusatzanforderungen:
Gib eine Fehlermeldung zurück, wenn eine ungültige Operation übergeben wird.
  Verhindere Division durch 0.
*/

function calculator(a: number, b: number, operation: string): number{
  switch (operation) {
    case 'add':
      return a + b;
    case 'subtract':
      return a - b;
    case 'multiply':
      return a * b;
    case 'divide':
      if (b === 0) {
        throw new Error('Division by 0 is not allowed');
      } else {
        return a / b;
      }
    default:
      throw new Error("Invalid Operation");
  }
}

const a: number = 10;
const b: number = 2;
const operation: string = "divide"

console.log(a, operation, b, "eqauls to", calculator(a, b, operation));