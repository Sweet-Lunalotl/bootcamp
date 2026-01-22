export abstract class Tile{
    protected name: string;
    protected needsOrange: number;
    protected needsBlue: number;
    protected needsPink: number;
    protected needsLevel: number;
    protected isOrange: number;
    protected isBlue: number;
    protected isPink: number;
    protected isLevel: number;
    protected fufilled: boolean = false;
    protected fufilledBy: number = -1;

    //Orange: stress
    //Blue: sloppy
    //Pink: scope creep / lost

    public getNeeds(): number[]{
        const needs: number[] = [];
        needs.push(this.needsOrange);
        needs.push(this.needsBlue);
        needs.push(this.needsPink);
        needs.push(this.needsLevel);
        return needs;
    }

    public getHas(): number[]{
        const has: number[] = [];
        has.push(this.isOrange);
        has.push(this.isBlue);
        has.push(this.isPink);
        if(this.fufilled){
            has.push(this.isLevel);
        }
        else {
            has.push(0)
        }
        return has;
    }

}

/*
ideas for the colours could mean:

scope creeep:


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