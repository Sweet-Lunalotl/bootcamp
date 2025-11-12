

/**
 * Builds the start configuration of the towers.
 *
 * @param discs - number of discs that should be sorted
 * @param towers - starting array that should be initialized as var towers: number[][] = [[1], [0], [0]]; beforehand
 */ /*
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
  return towers;
}

/**
 * Safely increases the number of the tower by one. if the last tower (2) is increased by one, it wraps back to the first tower (0)
 *
 * @param tower - tower you want to increase by one
 */ /*
function towerPlusOne(tower: number): number{
  tower+=1;
  switch (tower){
    case 0:
    case 1:
    case 2:
      break;
    case 3:
      tower = 0;
      break;
  }
  return tower;
}



/*
 * This function moves the discs to the right until they're sorted by first moving disc 1 and then checking of any other disc can be moved.
 *
 * @param towers - array filled with discs
 */
/*
function sortDiscs(towers: number[][]): number[][] {
  const towerHeight: number = towers[0].length - 1;
  let towerOfOne: number = 0;
  let posOfOne: number = 0;
  let logs: number = 0;
  //repeat while there are still discs on tower 0 or tower 1
  while (towers[0][towerHeight] + towers[1][towerHeight] != 0 && logs < 10) {
    //move 1 one position to the right
    towers[towerOfOne][posOfOne] = 0;
    towerOfOne = towerPlusOne(towerOfOne);
    for (let iSpot: number = 0; iSpot <= towerHeight; iSpot++) {
      if (towers[towerOfOne][iSpot] > 0) {
        towers[towerOfOne][iSpot - 1] = 1;
        posOfOne = iSpot - 1;
        break;
      } else if (iSpot >= towerHeight) {
        towers[towerOfOne][iSpot] = 1;
        posOfOne = iSpot;
      }
    }
    console.log(towers);
    logs++;
  }
  return towers;
}
*/

/*


function sortDiscs(towers: number[][]): number[][]{
  const towerHeight: number = towers[0].length - 1;
  let towerOfOne: number = 0;
  let posOfOne: number = 0;
  let logs: number = 0;
  //repeat while there are still discs on tower 0 or tower 1
  while (towers[0][towerHeight] + towers[1][towerHeight] != 0 && logs < 100){
    //move 1 one position to the right
    towers[towerOfOne][posOfOne] = 0;
    towerOfOne = towerPlusOne(towerOfOne);
    for (let iSpot: number = 0; iSpot <= towerHeight; iSpot++){
      if(towers[towerOfOne][iSpot] > 0){
        towers[towerOfOne][iSpot-1] = 1;
        posOfOne = iSpot-1;
        break;
      }
      else if(iSpot >= towerHeight){
        towers[towerOfOne][iSpot] = 1;
        posOfOne = iSpot;
      }
    }
    //check if one of the other discs on top of the other towers can be moved
    for(let iTower: number = 0; iTower < 3; iTower++){
      for(let jSpot: number = 1; jSpot <= towerHeight; jSpot++){
        if(towers[iTower][jSpot] > 1){
          for (let neighborSpot: number = 0; neighborSpot <= towerHeight; neighborSpot++){
            //if the current disc can be stacked on the neighboring tower on a bigger disc this will do it
            if(towers[towerPlusOne(iTower)][neighborSpot] > 0 && towers[towerPlusOne(iTower)][neighborSpot] > towers[iTower][jSpot]){
              towers[towerPlusOne(iTower)][neighborSpot-1] = towers[iTower][jSpot];
              towers[iTower][jSpot] = 0;
              console.log(towers, "?");
              break;
            }
            //If there is a smaller number it will stop this for
            else if(towers[towerPlusOne(iTower)][neighborSpot] > 0){
              break;
            }
            else if(neighborSpot === towerHeight && towers[towerPlusOne(iTower)][neighborSpot] === 0){
              towers[towerPlusOne(iTower)][neighborSpot] = towers[iTower][jSpot];
              towers[iTower][jSpot] = 0;
              console.log(towers, "!");
            }
          }
        }
      }
    }
    console.log("\x1b[100m", towers, "\x1b[49m");
    console.log(" ");
    logs++
  }
  return towers;
}



// y bezeichnet die drei Stäbe, x 0 die unterste Scheibe und towers[y][towers[y].length-1] die oberste Scheibe
//                  y  x      y0  y1  y2
//var towers: number[][] = [[], [], []];
var towers: number[][] = [[1], [0], [0]];
const discs: number = 3;
towers = buildTowers(discs, towers);
towers = sortDiscs(towers);
//console.log(towers[0].indexOf(1))

//[ [ 1, 2, 3 ], [ 0, 0, 0 ], [ 0, 0, 0 ] ]

*/