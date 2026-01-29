import {Board} from './Board.ts'
import {DrawPile} from './DrawPile.ts'
import {Player} from './Player.ts'
import {TileFood} from "./TileFood.ts";

let board: Board;
let drawPile: DrawPile;
let playerOne: Player;
let playerTwo: Player

function initGame(): void{
    //create Player 1
    playerOne = new Player("One", 1);
    //create Player 2
    playerTwo = new Player("Two", 2);
    //create Board
    board = new Board(15, 9);
    //create starting Tile in the middle of Board
    board.setField(Math.round(board.getWidth()/2), Math.round(board.getHeight()), new TileFood("start", 0, 0, 0))
    //create draw pile
    drawPile = new DrawPile(50, 0.60);
    drawPile.fillDrawPile();
    //shuffel draw pile
    drawPile.shuffelDrawPile();
    //Handkarten ausgeben
    playerOne.addToInventory(drawPile.getTilesFromPile(5));
    playerTwo.addToInventory(drawPile.getTilesFromPile(5));
    //Coin flip Startspieler (let Spielerin1amZug: boolean)
    if(Math.random() <= 0.5){
        playerOne.setChangeTurn();
    }
    else{
        playerTwo.setChangeTurn();
    }
}

function runGame(): void{
    initGame();
    //while there are cards in the draw pile
    while(!drawPile.isEmpty()){
        if(playerOne.getHasTurn()){
            turn(playerOne);
        }
        else if(playerTwo.getHasTurn()){
            turn(playerTwo);
        }
        else{
            throw new Error("No active player")
        }
        playerOne.setChangeTurn();
        playerTwo.setChangeTurn();
    }
    //announce Winner *fireworks*
    console.log("And the winner is...")
    if(board.getScorePlayerOne() >= board.getScorePlayerTwo()){
        console.log(playerOne.getPlayerName());
    }
    else{
        console.log(playerTwo.getPlayerName());
    }
}

function turn(activePlayer: Player): void{
    //nachziehen
    activePlayer.addToInventory(drawPile.getTilesFromPile(1));
    //Stein aus dem Inventar wählen und ablageort auf dem Spielfeld wählen
    //TODO irgendetwas damit man es tatsächlich wählen kann, gerade sind da magic numbers drin (1, 2 ,0)
    let tilePlaced: boolean = false;
    while (!tilePlaced){
        if(board.legalPlacement(1, 2)){
            board.setField(1, 2, activePlayer.getFromInventory(0));
            tilePlaced = true;
        }
    }
    //Punkte Auswertung
    board.updateCurrentScore(activePlayer.getPlayerNumber());
}

runGame();