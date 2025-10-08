/**
 * Builds the start configuration of the towers.
 *
 * @param discs - number of discs that should be sorted
 * @param towers - starting array that should be initialized as var towers: number[][] = [[1], [0], [0]]; beforehand
 */
function buildTowers(discs: number, towers: number[][]): number[][]{
    for(let itower: number = 0; itower < 3; itower++){
        for(let discName: number = 2; discName <= discs; discName++){
            if (itower === 0){
                towers[itower].push(discName);
            }
            else{
                towers[itower].push(0);
            }
        }
    }


// y bezeichnet die drei Stäbe, x 0 die unterste Scheibe und towers[y][towers[y].length-1] die oberste Scheibe
//                  y  x      y0  y1  y2
//var towers: number[][] = [[], [], []];
    var towers: number[][] = [[1], [0], [0]];
    const discs: number = 3;
    towers = buildTowers(discs, towers);
    return towers;
}

