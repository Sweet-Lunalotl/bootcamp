import {Tile} from './Tile.ts'
import {TileFood} from './TileFood.ts'
import {TileBug} from './TileBug.ts'
import {DrawPile} from './DrawPile.ts'

export class Player{
    private name: string;
    private playerNumber: number;
    private inventory: Tile[] = [];
    private hasTurn: boolean = false;

    constructor(name: string, playerNumber: number) {
        this.name = name;
        this.playerNumber = playerNumber;
    }

    public addToInventory(tiles: Tile[]): void{
        this.inventory.push(tiles);
    }

    public getInventory(): Tile[]{
        return this.inventory;
    }

    public getPlayerNumber(): number{
        return this.playerNumber;
    }

    public getFromInventory(index: number): Tile{
        if(index > this.inventory.length -1){
            throw new Error("No Tile at index")
        }
        const temp: Tile[] = this.inventory.slice(index);
        return temp.pop();
    }

    public setChangeTurn(): void{
        this.hasTurn = !this.hasTurn;
    }

    public getHasTurn(): boolean{
        return this.hasTurn;
    }
}