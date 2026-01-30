import {Tile} from './Tile.ts'
//TODO Typen ärgern mich, wenn ich tiles.pop machen möchte

export class Player{
    private readonly name: string;
    private readonly playerNumber: number;
    private inventory: Tile[] = [];
    private hasTurn: boolean = false;

    /**
     * Constructor for Player
     * @param name - Name of the player
     * @param playerNumber - Number of the player. This is either 1 for playerOne or 2 for playerTwo
     */
    constructor(name: string, playerNumber: number) {
        this.name = name;
        this.playerNumber = playerNumber;
    }

    /**
     * Adds tiles to inventory. Deletes passed on Array.
     * @param tiles - Tiles that should be added
     */
    public addToInventoryDeletesPassedOn(tiles: Tile[]): void{
        for(let i: number= 0; i < tiles.length; i++){
            const currentTile: Tile | undefined = tiles.pop()
            if (currentTile) {
                this.inventory.push(currentTile);
            }
        }
    }

    /**
     * Returns number of the player. 1 for playerOne and 2 for playerTwo.
     * @returns number
     */
    public getPlayerNumber(): number{
        return this.playerNumber;
    }

    /**
     * Returns name of the player
     * @returns string
     */
    public getPlayerName(): string{
        return this.name;
    }

    /**
     * Removes and returns one tile from player inventory and returns it.
     * @param index - Index of the tile that should be removed and returned
     * @returns Tile
     */
    public getAndRemoveFromInventory(index: number): Tile{
        if(index > this.inventory.length -1){
            throw new Error("No Tile at index")
        }
        const temp: Tile[] = this.inventory.slice(index);
        const currentTile: Tile | undefined = temp.pop()
        if (currentTile) {
            return currentTile;
        }
        else {
            throw new Error("whyyyyy?")
        }
    }

    /**
     * Inverts the hasTurn variable of player
     */
    public setChangeTurn(): void{
        this.hasTurn = !this.hasTurn;
    }

    /**
     * Returns if it is the players turn at the moment.
     * @returns boolean
     */
    public getHasTurn(): boolean{
        return this.hasTurn;
    }
}