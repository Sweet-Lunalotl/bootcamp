import {Tile} from './Tile.ts'

export class TileBug extends Tile{

    /**
     * Contructor for the bug tile
     * @param name - Name of the bug, preferably with a number at the end of the string to make them unique
     * @param needsOrange - Amount of orange neighbors bug needs to be fulfilled
     * @param needsBlue - Amount of blue neighbors bug needs to be fulfilled
     * @param needsPink - Amount of pink neighbors bug needs to be fulfilled
     * @param needsLevel - minimum level of neighboring fulfilled bug, this bug needs to be fulfilled
     * @param isLevel - level of the bug
     */
    constructor(name: string, needsOrange: number, needsBlue: number, needsPink: number, needsLevel: number, isLevel: number) {
        super();
        this.name = name;
        this.needsOrange = needsOrange;
        this.needsBlue = needsBlue;
        this.needsPink = needsPink;
        this.needsLevel = needsLevel;
        this.isOrange = 0;
        this.isBlue = 0;
        this.isPink = 0;
        this.isLevel = isLevel;
    }
}