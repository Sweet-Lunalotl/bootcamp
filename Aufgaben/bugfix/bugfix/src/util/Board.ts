import {Tile} from './Tile.ts'

export class Board{
    private width: number;
    private heigth: number;
    private board: Tile[][];

    /**
     * Constructor for a Board. Fills the board with a given width(x) and height(y) with null
     * @param width - width of the board (x)
     * @param height - height of the board(y)
     */
    constructor(width: number, height: number) {
        this.width = width;
        this.heigth = height;
        this.board = Array.from({ length: height }, () => Array(width).fill(null));
    }

    public getWidth(): number{
        return this.width;
    }

    public getHeigth(): number{
        return this.heigth;
    }

    public getBoard(){
        return this.board;
    }

    public getField(x: number, y: number){
        return this.board[y][x];
    }

    public setField(x: number, y: number, value){
        this.board[y][x] = value;
    }

    /**
     *
     * @param x - x of the field
     * @param y - y of the field
     * @returns Array - filled with the Objects of the neightboring fields
     */
    public getAdjacent(x: number, y: number){
        const adjacent = [];
        //Matrix to find all neighbours of given field     x   y    x    y   x   y    x  y
        const neighbours: number[][]= [[-1, -1], [0, -1], [-1, 0], [1, 0], [-1, 1], [0, 1]]
        //field is in board
        if(y >= this.heigth || x >= this.width || x < 0 || y < 0){
            throw new Error("Out of Bounds")
        }
        //pushes all fields != null, which are in board into neighbours
        for(let i=0; i<adjacent.length; i++){
               if(x + neighbours[i][0] < this.width && x + neighbours[i][0] < 0 &&
                   y + neighbours[i][1] < this.heigth && y + neighbours[i][1] > 0 &&
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
        if(y >= this.heigth || x >= this.width || x < 0 || y < 0){
            return false;
        }
        if(this.getField(x, y) != null){
            return false;
        }
        return this.getAdjacent(x, y).length > 0;
    }




}