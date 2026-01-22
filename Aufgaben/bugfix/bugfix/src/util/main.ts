import {Board} from './Board.ts'

let board;

function initGame(): void{
    //create Player 1
    //create Player 2
    //create Board
    board = new Board(15, 9);
    //create starting Tile in the middle of Board
    //create Nachziehstapel (da will ich einen Algo schreiben, der aus einer Lsite an möglichen Tiles einen schönen Stapel bildet, sodass man Ralationen gut anpassen kann)
    //Handkarten ausgeben
    //Coinflip Startspieler (let Spielerin1amZug: boolean)

}

function runGame(): void{
    initGame();
    //solange der der Nachziehstapel nicht leer ist{
    //nachziehen
    //Stein aus dem Inventar wählen
    //ablageort auf dem Spielfeld wählen
    //Punkte Auswertung
    // Spielerin1amZug = !Spielerin1amZug
    // }


}

runGame();