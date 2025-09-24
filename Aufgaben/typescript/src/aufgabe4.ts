/*
Schreibe eine Funktion die ein Array von Strings als Parameter erhält und
einen Character.
Ermittle in wie vielen Strings der Character vorkommt
Beispiel:
Input: [„hallo“, „welt“], „l“
Output: 2
 */

function count(words: string[], letter: string): number{
  let amount: number = 0;
  for(let i: number = 0; i < words.length; i++){
    if(words[i].toLowerCase().includes(letter.toLowerCase())){
      amount+=1;
    }
  }
  return amount;
}

const words: string[] = ["Mehr", "Kaese", "kuchen", "in", "Kantinen"];
const letter: string = "k";
console.log("In dem übergebenem String bindet sich", count(words, letter), "mal der Buchstabe", letter);
