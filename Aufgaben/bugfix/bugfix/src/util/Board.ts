import {Tile} from './Tile.ts'

export class Board{
    private readonly width: number;
    private readonly height: number;
    private board: any[][];
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
     * Fill a specific field with a tile. When it's a BugFix the BugFix overwrites a TileBug and gets the has properties
     * of Bug, so it can delete in the updateScore method TileFoods the deleted bug needed
     * @param x - X coordinate
     * @param y - y coordinate
     * @param tile - Tile Object
     */
    public setField(x: number, y: number, tile: Tile): void{
        if(x < this.width && y < this.height && x >= 0 && y >= 0){
            //some weird stuff
            if(tile.getIsBugFix()){
                //looks complicated but I just write the properties o the bug tile into the BugFix tile
                tile.setBugFixDeletes(this.board[y][x].getNeeds());
                this.board[y][x]=tile;
            }
            this.board[y][x] = tile;
        }
        else{
            throw new Error("Out of bounds")
        }
    }

    /**
     * Returns an Array with all the neighboring Tiles as copies.
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
     * @param tile - The Tile that should be placed.
     * @returns Boolean - true: Placement is legal. false: placement is not legal
     */
    public legalPlacement(x: number, y: number, tile: Tile): boolean{
        //if it is out of bounds it is nor allowed
        if(y >= this.height || x >= this.width || x < 0 || y < 0){
            return false;
        }
        //when the tile is either bug or food this is the part
        if(!tile.getIsBugFix()){
            if(this.getField(x, y) != null){
                return false;
            }
            return this.getAdjacent(x, y).length > 0;
        }
        else if (tile.getIsBugFix()){
            return this.getField(x, y).getHasLvl();
        }
        return false;
    }

    /**
     * This is a Monster. Not a god, A MONSTER
     * I check for points and change stuff every turn, because I want to implement a bugfix later, which removes a bug/food and all/some adjacent tiles
     *
     * @param activePlayer - Number of the active Player. playerOne: 1; playerTwo: 2.
     */
    public updateCurrentScore(activePlayer: number): void{
        if(!(activePlayer === 1 || activePlayer === 2)){
            throw new Error("Illegal player number")
        }
        let scoreTempOne: number = 0
        let scoreTempTwo: number = 0
        //durch alle Felder durchgehen und BugFix abhandeln
        //Matrix to find all neighbours of given field     x   y    x    y   x   y    x  y
        const neighbours: number[][]= [[-1, -1], [0, -1], [-1, 0], [1, 0], [-1, 1], [0, 1]]
        //this looks terrifying, but all it does is iterating through the board, checking if the BugFix has properties
        // it shares with neighbors, and therefore should be removed. After that the BugFix itself gets removes
        for(let y: number = 0; y < this.height; y++) {
            for (let x: number = 0; x < this.width; x++) {
                if(this.board[y][x].getIsBugFix()){
                    for(let j: number = 0; j < 6; j++){
                        if(x + neighbours[j][0] < this.width && x + neighbours[j][0] < 0 &&
                            y + neighbours[j][1] < this.height && y + neighbours[j][1] > 0 && this.board[y+neighbours[j][1]][x+neighbours[j][0]] != null){
                                const neighborHas: number[] = this.board[y+neighbours[j][1]][x+neighbours[j][0]].getHas();
                                const BugFixNeeds: number[] = this.board[y][x].getNeeds()
                                let remove: boolean = false;
                                for(let i: number = 0; i < 4; i++){
                                    if(BugFixNeeds[i] === neighborHas[i]){
                                        remove = true;
                                    }
                                }
                                if(remove){
                                    this.board[y+neighbours[j][1]][x+neighbours[j][0]] = null;
                                }
                        }
                    }
                    this.board[y][x] = null;
                }
            }
        }
        //durch alle Felder durchgehen und Punkte zählen
        for(let y: number = 0; y < this.height; y++){
            for(let x: number = 0; x < this.width; x++){
                //board[y][x]
                //                              only bugs have a lvl and can score points
                if(this.board[y][x] != null && this.board[y][x].getHasLvl() && !this.board[y][x].getIsBugFix()){
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