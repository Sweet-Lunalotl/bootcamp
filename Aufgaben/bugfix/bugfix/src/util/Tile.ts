export abstract class Tile{
    protected name: string = "0";
    protected needsOrange: number = 0;
    protected needsBlue: number = 0;
    protected needsPink: number = 0;
    protected needsLevel: number = 0;
    protected isOrange: number = 0;
    protected isBlue: number = 0;
    protected isPink: number = 0;
    protected isLevel: number = 0;
    protected fulfilled: boolean = false;
    protected fulfilledBy: number = -1;
    protected isBugFix: boolean = false;

    //Orange: stress
    //Blue: sloppy
    //Pink: scope creep / lost

    /**
     * Gives you the needs of any given tile as an Array with 4 elements
     * @returns Array - Array with 4 elements
     */
    public getNeeds(): number[]{
        const needs: number[] = [];
        needs.push(this.needsOrange);
        needs.push(this.needsBlue);
        needs.push(this.needsPink);
        needs.push(this.needsLevel);
        return needs;
    }

    /**
     * Gives you what attributes a tile of any given tile has as an Array with 4 elements
     * @returns Array - Array with 4 elements
     */
    public getHas(): number[]{
        const has: number[] = [];
        has.push(this.isOrange);
        has.push(this.isBlue);
        has.push(this.isPink);
        if(this.fulfilled){
            has.push(this.isLevel);
        }
        else {
            has.push(0)
        }
        return has;
    }

    /**
     * Returns if a tile has a level. If it is true, the tile is a bug; if it is false, the tile is food.
     * @returns boolean
     */
    public getHasLvl(): boolean{
        return this.isLevel > 0;
    }

    /**
     * Returns the level of a tile. Used for figuring out how many point a tile is worth.
     * @returns number
     */
    public getLvl(): number{
        return this.isLevel;
    }

    /**
     * Sets if a bug has all it's needs fulfilled and who it was fulfilled by.
     * @param fulfilledBy - Can be -1 for no-one, 1 for playerOne and 2 for playerTwo.
     * @param fulfilled - Boolean that stores if the needs of a bug are fulfilled.
     */
    public setFulfilled(fulfilledBy: number, fulfilled: boolean): void{
        if(!this.getHasLvl()){
            throw new Error("cannot setFulfilled() for food")
        }
        if(!(fulfilledBy >= -1 || fulfilledBy >= 2)){
            throw new Error("Invalid number for fulfilledBy")
        }
        this.fulfilled = fulfilled;
        this.fulfilledBy = fulfilledBy;
    }

    /**
     * Checks if the needs of a tile bug are fulfilled.
     * @returns boolean
     */
    public getIsFulfilled(): boolean{
        return this.fulfilled
    }

    /**
     * Gives you the player number of the player who fulfilled the bug and therefore gets the points for it
     * @returns number
     */
    public getFulfilledBy(): number{
        return this.fulfilledBy;
    }
}

/*
ideas for the colours could mean:

scope creep:


sloppy:
rushing code
no playtesting
no optimization
no QA/tests

stress:
overtime
tired
all-nighter
weekend-work
sleeping in office

has all colours: CRUNCH!!!
 */