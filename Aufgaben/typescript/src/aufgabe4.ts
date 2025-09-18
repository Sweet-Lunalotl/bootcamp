/*
Schreibe eine Funktion die ein Array von Strings als Parameter erhält und
einen Character.
Ermittle in wie vielen Strings der Character vorkommt
Beispiel:
Input: [„hallo“, „welt“], „l“
Output: 2
 */

function count(words: string[], letter: string): number{
  const newLetter: string = letter.toLowerCase();
  const newWords: string[] = words;
  let amount: number = 0;
  for(let i: number = 0; i < newWords.length; i++){
    newWords[i] = newWords[i].toLowerCase();
  }
  for(let i: number = 0; i < newWords.length; i++){
    if(newWords[i].includes(newLetter)){
      amount+=1;
    }
  }
  return amount;
}

const words: string[] = ["Mehr", "Kaese", "kuchen", "in", "Kantinen"];
const letter: string = "k";
console.log("In dem übergebenem String bindet sich", count(words, letter), "mal der Buchstabe", letter);
