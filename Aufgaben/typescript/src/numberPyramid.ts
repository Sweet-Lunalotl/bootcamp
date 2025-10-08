
//This would work if undefiend === 0
function buildPyramid(levels: number): number[][][]{
  const pyramid: number [][][] = [[[1]],[[1,1], [1,1]]];
  for(let level: number = 1; level < levels; level++){
    pyramid.push([[1]]);
    //[[1]],[[1,1], [1,1]], [1]
    for(let innerLayers: number = 0; innerLayers < pyramid[level-1].length+1; innerLayers++){
      for(let stone: number = 1; stone < pyramid[level-1][0].length; stone++){
        let addNumber: number = 0;
        try{
          addNumber = addNumber + pyramid[level-1][innerLayers-1][stone-1];
        }
        catch (error){}
        try{
          addNumber = addNumber + pyramid[level-1][innerLayers-1][stone];
        }
        catch (error){}
        try{
          addNumber = addNumber + pyramid[level-1][innerLayers][stone-1];
        }
        catch (error){}
        try{
          addNumber = addNumber + pyramid[level-1][innerLayers][stone];
        }
        catch (error){}




        //pyramid[level][innerLayers].push(pyramid[level-1][innerLayers-1][stone-1] + pyramid[level-1][innerLayers-1][stone] + pyramid[level-1][innerLayers][stone-1] + pyramid[level-1][innerLayers][stone]);
      }
    }
  }
  return pyramid;
}


const pyramides: number [][][] = [[[1]],[[1,1], [1,1]]];
const levels: number = 3;

console.log(buildPyramid(levels))

/*

pyramides[1][1].push(2)
pyramides[1].push([3])
pyramides.push([[3]])
console.log(pyramides)
console.log(pyramides[1])
console.log(pyramides[1][2].length)
console.log(pyramides[1].length)


 */