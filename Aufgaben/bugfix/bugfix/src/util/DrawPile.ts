import {Tile} from './Tile.ts'
import {TileFood} from './TileFood.ts'
import {TileBug} from './TileBug.ts'

export class DrawPile{
    private cardsAmount: number;
    private percentageBugs: number;
    private pile: Tile[];

    //two bugs per
    constructor(cardsAmount: number, percentageBugs: number) {
        this.cardsAmount = cardsAmount;
        this.percentageBugs = percentageBugs;
        this.pile = [];
    }

    public fillDrawPile(){
        const bugAmount: number = Math.round(this.cardsAmount * this.percentageBugs);
        const foodAmount: number = this.cardsAmount - bugAmount;
        const lvl3bug: number = Math.round(0.05 * bugAmount);
        const lvl2bug:number = Math.round(0.25 * bugAmount);
        const lvl1bug: number = bugAmount - (lvl2bug + lvl3bug);
        const lvl1iteration: number = Math.trunc(lvl1bug/3);
        for(let i: number = 0; i < lvl1iteration; i++){
            this.pile.push(new TileBug("stress" + i, 1, 0, 0, 0, 1))
            this.pile.push(new TileBug("slop" + i, 0, 1, 0, 0, 1))
            this.pile.push(new TileBug("lost" + i, 0, 0, 1, 0, 1))
        }
        //MISSING A LOT
        //But getting there ^^
    }

}
const pile = new DrawPile(20, 0.75)
pile.fillDrawPile()
console.log(pile)