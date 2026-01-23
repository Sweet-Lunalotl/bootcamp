import {Tile} from './Tile.ts'
import {TileFood} from './TileFood.ts'
import {TileBug} from './TileBug.ts'

export class DrawPile{
    private cardsAmount: number;
    private percentageBugs: number;
    private sortedPile: Tile[];
    private shuffeledPile: Tile[];

    /**
     * Constructor of the class DrawPile
     * @param cardsAmount - Numbers of cards that should be in the DrawPile
     * @param percentageBugs - Percentage of Bug Tiles in the DrawPile. As decimal number
     */
    constructor(cardsAmount: number, percentageBugs: number) {
        this.cardsAmount = cardsAmount;
        this.percentageBugs = percentageBugs;
        this.sortedPile = [];
        this.shuffeledPile = [];
    }

    private getRandomInt(min: number, max: number): number {
        min = Math.ceil(min);
        max = Math.floor(max);
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    /**
     * Fills the DrawPile with Tiles
     */
    public fillDrawPile(): void{
        const bugAmount: number = Math.round(this.cardsAmount * this.percentageBugs);
        const foodAmount: number = this.cardsAmount - (bugAmount+1);
        const foodFullSets: number  = Math.trunc(foodAmount/3);
        const foodRest: number = foodAmount - (3*foodAmount);
        const lvl3bug: number = Math.round(0.05 * bugAmount);
        const lvl2bug:number = Math.round(0.25 * bugAmount);
        const lvl1bugs: number = bugAmount - (lvl2bug + lvl3bug);
        const lvl1fullSets: number = Math.trunc(lvl1bugs/3);
        const lvl1rest: number =  lvl1bugs - (3*lvl1fullSets);

        //fill the list with lvl1 bugs (could maybe write this into a method later)
        for(let i: number = 0; i < lvl1fullSets; i++){
            this.sortedPile.push(new TileBug("water walking " + i, 1, 0, 0, 0, 1))
            this.sortedPile.push(new TileBug("infinity jump " + i, 0, 1, 0, 0, 1))
            this.sortedPile.push(new TileBug("out of bounds " + i, 0, 0, 1, 0, 1))
        }
        let randomNumber: number = 0
        for(let i: number = 0; i < lvl1rest; i++){
            randomNumber = this.getRandomInt(1, 3);
            switch (randomNumber){
                case 1:
                    this.sortedPile.push(new TileBug("water walking " + i+lvl1fullSets, 1, 0, 0, 0, 1))
                    break;
                case 2:
                    this.sortedPile.push(new TileBug("infinity jump " + i+lvl1fullSets, 0, 1, 0, 0, 1))
                    break;
                case 3:
                    this.sortedPile.push(new TileBug("out of bounds " + i+lvl1fullSets, 0, 0, 1, 0, 1))
                    break;
                default:
                    throw new Error("faulty random Number");
            }
        }
        //fill the list with lvl2 bugs
        for(let i: number = 0; i < lvl2bug; i++){
            randomNumber = this.getRandomInt(1, 3);
            switch (randomNumber){
                case 1:
                    this.sortedPile.push(new TileBug("genAi went rouge " + i, 1, 0, 1, 0, 2))
                    break;
                case 2:
                    this.sortedPile.push(new TileBug("clipping " + i, 0, 1, 1, 0, 2))
                    break;
                case 3:
                    this.sortedPile.push(new TileBug("falling through the world " + i, 2, 0, 0, 1, 2))
                    break;
                default:
                    throw new Error("faulty random Number");
            }
        }
        //fill the list with lvl3 bugs
        for(let i: number = 0; i < lvl3bug; i++){
            randomNumber = this.getRandomInt(1, 3);
            switch (randomNumber){
                case 1:
                case 2:
                case 3:
                    this.sortedPile.push(new TileBug("game crash " + i, 1, 1, 1, 1, 2))
                    break;
                default:
                    throw new Error("faulty random Number");
            }
        }

        //foodTiles yay
        this.sortedPile.push(new TileFood("crunch", 1, 1, 1))

        for(let i: number = 0; i < foodFullSets; i++){
            this.sortedPile.push(new TileFood("stress " + i, 1, 0, 0))
            this.sortedPile.push(new TileFood("slop " + i, 0, 1, 0))
            this.sortedPile.push(new TileFood("lost " + i, 0, 0, 1))
        }
        for(let i: number = 0; i<foodRest; i++){
            randomNumber = this.getRandomInt(1, 3);
            switch (randomNumber){
                case 1:
                    this.sortedPile.push(new TileFood("stress " + i, 1, 0, 0))
                    break;
                case 2:
                    this.sortedPile.push(new TileFood("slop " + i, 0, 1, 0))
                    break;
                case 3:
                    this.sortedPile.push(new TileFood("lost " + i, 0, 0, 1))
                    break;
                default:
                    throw new Error("faulty random Number");
            }
        }
    }

    public shuffelDrawPile(): void{
        const temp: Tile[] = this.sortedPile.slice();
    }

    /**
     * Get all the tiles that are part of the game. Useful to give the player an overview of what tiles they can draw
     * @returns Array - Filled with all the tiles that are part of the game
     */
    public getSortedDrawPile(): Tile[]{
        return this.sortedPile;
    }

    public getRandomDrawPile(): Tile[]{
        return;
    }

/*
    public drawPileIsEmpty(): boolean{
        return somepile.length > 0;
    }
}
*/

