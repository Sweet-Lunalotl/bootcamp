import {Tile} from './Tile.ts'

export class TileFood extends Tile{

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