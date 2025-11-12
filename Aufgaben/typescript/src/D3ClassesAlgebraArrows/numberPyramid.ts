/**
 * Creates and returns a number pyramid in a 3-dimensional array
 *
 * @param levels - height of the number pyramid
 * @returns 3-dimensional array filled with a number pyramid
 */
function buildPyramid(levels: number): number[][][]{
  const pyramid: number[][][] = [[[1]]];
  for(let seam: number = 1; seam <= levels; seam++){
    pyramid.push([]);
    for(let innerLayers: number = 0; innerLayers <= seam; innerLayers++){
      pyramid[seam].push([]);
      for(let stone: number = 0; stone <= seam; stone++){
        let addNumber: number = 0;
        addNumber = addNumber + (pyramid[seam-1]?.[innerLayers-1]?.[stone-1] ?? 0);
        addNumber = addNumber + (pyramid[seam-1]?.[innerLayers-1]?.[stone] ?? 0);
        addNumber = addNumber + (pyramid[seam-1]?.[innerLayers]?.[stone-1] ?? 0);
        addNumber = addNumber + (pyramid[seam-1]?.[innerLayers]?.[stone] ?? 0);
        pyramid[seam][innerLayers].push(addNumber);
      }
    }
  }
  return pyramid;
}

/**
 * Returns a Layer of the number pyramid
 *
 * @param layer - The layer of the number Pyramid that should be returned
 * @param pyramidArray - 3-dimensional array containing a number pyramid made with buildPyramid()
 * @returns A Layer of the number pyramid
 */
function pyramidLayer(layer: number, pyramidArray: number[][][]): number[][]{
  return pyramidArray[layer-=1];
}




const pyramidHeight: number = 4;
const numberPyramid: number[][][] = buildPyramid(pyramidHeight);
console.log(pyramidLayer(pyramidHeight, numberPyramid));