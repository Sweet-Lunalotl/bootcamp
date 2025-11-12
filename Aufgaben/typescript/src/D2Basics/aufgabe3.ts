/*
Erstelle eine Funktion printTree(height: number), die einen Baum
aus Sternchen (*) in der Konsole ausgibt.
Beispiel für height = 4:
   *
  ***
 *****
*******
*/

function printTree(height: number): void{
  let spaces: number = height - 1;
  let stars: number = 1;
  for(let currHeight: number = 0; currHeight < height; currHeight++){
    for( let j: number = 0; j < spaces; j++){
      process.stdout.write(" ");
    }
    spaces-=1;
    for(let k: number = 0; k < stars; k++){
      process.stdout.write("*");
    }
    stars+=2;
    process.stdout.write("\n");
  }
}

const height: number = 10;
 printTree(height);

