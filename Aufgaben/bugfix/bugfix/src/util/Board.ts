import {Tile} from './Tile.ts'

export class Board{
    private readonly width: number;
    private readonly height: number;
    private readonly board: Tile[][];
    private scorePlayerOne: number = 0;
    private scorePlayerTwo: number = 0;

    /**
     * Constructor for a Board. Fills the board with a given width(x) and height(y) with null
     * @param width - width of the board (x)
     * @param height - height of the board(y)
     */
    constructor(width: number, height: number) {
        this.width = width;
        this.height = height;
        this.board = Array.from({ length: height }, () => Array(width).fill(null));
    }

    /**
     * Get width (x) of the board. Starts counting at 1.
     * @returns number
     */
    public getWidth(): number{
        return this.width;
    }

    /**
     * Get height (y) of the board. Starts counting at 1.
     * @returns number
     */
    public getHeight(): number{
        return this.height;
    }

    /**
     * Returns tile at specified position of the board. (0, 0) is in the upper left corner.
     * @param x - X coordinate. Min: 0 (most left); Max: getWidth-1 (most right)
     * @param y - Y coordinate. Min: 0 (top); Max: getHeight-1 (bottom)
     * @returns Tile
     */
    public getField(x: number, y: number): Tile{
        if(x < this.width && y < this.height && x >= 0 && y >= 0){
            return this.board[y][x];
        }
        else{
            throw new Error("Out of bounds")
        }
    }

    /**
     * Fill a specific field with a tile.
     * @param x - X coordinate
     * @param y - y coordinate
     * @param tile - Tile Object
     */
    public setField(x: number, y: number, tile: Tile): void{
        if(x < this.width && y < this.height && x >= 0 && y >= 0){
            this.board[y][x] = tile;
        }
        else{
            throw new Error("Out of bounds")
        }
    }

    /**
     * Returns an Array with all the neighboring Tiles
     * @param x - x of the field
     * @param y - y of the field
     * @returns Tile[]
     */
    private getAdjacent(x: number, y: number): Tile[]{
        const adjacent = [];
        //Matrix to find all neighbours of given field     x   y    x    y   x   y    x  y
        const neighbours: number[][]= [[-1, -1], [0, -1], [-1, 0], [1, 0], [-1, 1], [0, 1]]
        //field is in board
        if(y >= this.height || x >= this.width || x < 0 || y < 0){
            throw new Error("Out of Bounds")
        }
        //pushes all fields != null, which are in board into neighbours
        for(let i=0; i<adjacent.length; i++){
               if(x + neighbours[i][0] < this.width && x + neighbours[i][0] < 0 &&
                   y + neighbours[i][1] < this.height && y + neighbours[i][1] > 0 &&
                   this.board[y+neighbours[i][1]][x+neighbours[i][0]] != null){
                        adjacent.push(this.board[y+neighbours[i][1]][x+neighbours[i][0]])
               }
        }
        return adjacent;
    }

    /**
     * Can a Tile can be placed on this position?
     * @param x - x of the desired position
     * @param y - y of the desired position
     * @returns Boolean - true: Placement is legal. false: placement is not legal
     */
    public legalPlacement(x: number, y: number): boolean{
        if(y >= this.height || x >= this.width || x < 0 || y < 0){
            return false;
        }
        if(this.getField(x, y) != null){
            return false;
        }
        return this.getAdjacent(x, y).length > 0;
    }

    /**
     * This is a Monster. Not a god, A MONSTER
     * I chack for points and change stuff every turn, because I want to implement a bugfix later, which removes a bug/food and all/some adjacent tiles
     *
     * @param activePlayer - Number of the active Player. playerOne: 1; playerTwo: 2.
     */
    public updateCurrentScore(activePlayer: number): void{
        if(!(activePlayer === 1 || activePlayer === 2)){
            throw new Error("Illegal player number")
        }
        let scoreTempOne: number = 0
        let scoreTempTwo: number = 0
        //durch alle Felder durchgehen
        for(let y: number = 0; y < this.height; y++){
            for(let x: number = 0; x < this.width; x++){
                //board[y][x]
                //                              only bugs have a lvl and can score points
                if(this.board[y][x] != null && this.board[y][x].getHasLvl()){
                    const needs: number[] = this.board[y][x].getNeeds();
                    const adj: Tile[] = this.getAdjacent(x, y);
                    const addedHas: number[] = [0, 0, 0, 0];
                    for(let i: number = 0; i < adj.length; i++){
                        const temp: number[] = adj[i].getHas();
                        for(let i: number = 0; i < temp.length; i++){
                            addedHas[i] = addedHas[i] + temp[i];
                        }
                    }
                    if(addedHas[0] >= needs[0] && addedHas[1] >= needs[1] && addedHas[2] >= needs[2] && addedHas[3] >= needs[3]){
                        this.board[y][x].setFulfilled(activePlayer, true);
                    }
                    else {
                        this.board[y][x].setFulfilled(-1, false);
                    }
                    if(this.board[y][x].getIsFulfilled()){
                        if(this.board[y][x].getFulfilledBy() === 1){
                            scoreTempOne += this.board[y][x].getLvl();
                        }
                        else if(this.board[y][x]){
                            scoreTempTwo += this.board[y][x].getLvl();
                        }
                        else {
                            throw new Error("A bug is fulfilled but no-one has fulfilled it? this must be a bug")
                        }
                    }
                }
            }
        }
        this.scorePlayerOne = scoreTempOne;
        this.scorePlayerTwo = scoreTempTwo;
    }

    /**
     * Get the score of playerOne
     * @returns number
     */
    public getScorePlayerOne(): number{
        return this.scorePlayerOne;
    }

    /**
     * Get the score of playerTwo
     * @returns number
     */
    public getScorePlayerTwo(): number{
        return this.scorePlayerTwo;
    }

}