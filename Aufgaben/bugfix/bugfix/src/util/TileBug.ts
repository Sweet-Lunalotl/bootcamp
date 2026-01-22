import {Tile} from './Tile.ts'

export class TileBug extends Tile{

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