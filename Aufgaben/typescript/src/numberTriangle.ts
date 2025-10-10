/**
 * Creates a 2-dimensional array that is a number triangle
 *
 * @param layers - number of layers of the number triangle starting at 1
 * @returns Two dimensional array with the specified number of layers
 */
function createTriangle(layers: number): number[][]{
  const triangle: number[][] = [[1]];
  for(let layer: number = 1; layer < layers; layer++){
    triangle.push([1]);
    for(let stone: number = 1; stone < triangle[layer-1].length; stone++){
      triangle[layer].push(triangle[layer-1][stone-1] + triangle[layer-1][stone]);
    }
    triangle[layer].push(1);
  }
  return triangle;
}

/**
 * Writes the specified layer into a new array and returns that array
 *
 * @param layer - Layer of triangle starting at 1
 * @param triangleArray - Two dimensional array that was created with createTriangle()
 * @returns Array with the specified layer of the triangle
 */
function triangleLayer(layer: number, triangleArray: number[][]): number[]{
  return triangleArray[layer-=1];
}

const layers: number = 4;
const triangle: number[][] = createTriangle(layers);
console.log(triangleLayer(layers, triangle));