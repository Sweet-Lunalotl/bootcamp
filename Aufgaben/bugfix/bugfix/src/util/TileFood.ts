import {Tile} from './Tile.ts'

export class TileFood extends Tile{

    /**
     * Constructor for the food tile
     * @param name - Name of the food, preferably with a number at the end of the string to make them unique
     * @param isOrange - indicates if food is orange
     * @param isBlue - indicates if food is blue
     * @param isPink - indicates if food is pink
     */
    constructor(name: string, isOrange: number, isBlue: number, isPink: number) {
        super();
        this.name = name;
        this.needsOrange = 0;
        this.needsBlue = 0;
        this.needsPink = 0;
        this.needsLevel = 0
        this.isOrange = isOrange;
        this.isOrange = isBlue;
        this.isPink = isPink;
        this.isLevel = 0;
    }
}