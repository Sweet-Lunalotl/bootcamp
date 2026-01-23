import {Board} from './Board.ts'
import {DrawPile} from './DrawPile.ts'

let board: Board;
let drawPile: DrawPile;

function initGame(): void{
    //create Player 1
    //create Player 2
    //create Board
    board = new Board(15, 9);
    //create starting Tile in the middle of Board
    //create draw pile
    drawPile = new DrawPile(50, 0.60)
    drawPile.fillDrawPile()
    //shuffel drawpile
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