import { run } from 'node:test';

class tower{
  private towers: number[][] = [[1], [0], [0]];
  private discs: number;

  /**
   * Creates new Towers
   *
   * @param discs - amount of disc for the first tower
   */
  public constructor(discs: number) {
    this.discs = discs;
  }

  /**
   * Builds the initial tower configuration with n-discs
   *
   * @returns A two Dimensional array filled with n numbers in each dimension
   * @private
   */
  private buidInitalTowers(): void{
    for(let itower: number = 0; itower < 3; itower++){
      for(let discName: number = 2; discName <= this.discs; discName++){
        if (itower === 0){
          this.towers[itower].push(discName);
        }
        else{
          this.towers[itower].push(0);
        }
      }
    }
  }

  /**
   *
   * @param fromTower - The tower of which the top disc should be moved. Valid values are 0, 1, 2
   * @param toTower - The tower to which the disc should be moved. Valid values are 0, 1, 2
   * @return true - The top disc of fromTower can be moved to ToTower
   * @return false - The top disc of fromTower is bigger than the topDisc of toTower
   * @private
   */
  private moveIsLegal(fromTower: number, toTower: number, stack: number): boolean{
    if(fromTower === toTower || fromTower > 2 || toTower > 2 || fromTower < 0 || toTower < 0){
      throw new Error("Function moveIsLegal: fromTower or toTower have an invalid value")
    }
    //check if the tower a disc should be moved from isn't empty
    if(towers.sumOfTowerWhole(fromTower) === 0){
      throw new Error("Function moveIsLegal: No disc at adressed tower");
    }
    //the top disc of both the to and the from-Tower
    //find to disc of toTower and fromTower
    const topFrom: number = this.findTopDisc(fromTower);
    let topTo: number = this.findTopDisc(toTower);

    if(this.findIndexOfTopDisc(fromTower) > stack){
      throw new Error("moveIsLegal: somehow your fromTower isn't within what should be solved")
    }
    else if(this.findIndexOfTopDisc(toTower) > stack){
      topTo = 0;
    }

    //one could argue that this would belong in a different method called move is smart or something
    if(topTo < topFrom && topFrom % 2 != topTo % 2){
      return true;
    }
    else if(topTo === 0){
      return true
    }
    else{
      return false;
    }


  }

  /**
   * Moves the top disc of fromTower to the highest possible index of toTower
   *
   * @param fromTower - From which Tower a disc gets removed
   * @param toTower - Destination of removed disc
   * @private
   */
  private moveDisc(fromTower: number, toTower: number): void{
    if(this.findIndexOfTopDisc(toTower) === this.discs-1){
      this.towers[toTower][this.findIndexOfTopDisc(toTower)] = this.findTopDisc(fromTower);
    }
    else{
      this.towers[toTower][this.findIndexOfTopDisc(toTower)-1] = this.findTopDisc(fromTower);
    }
    this.towers[fromTower][this.findIndexOfTopDisc(fromTower)] = 0;
  }

  /**
   * Finds the index of top disc
   *
   * @param tower - The tower to which the top disc should be found. Valid values are 0, 1, 2
   * @returns Index of the top disc. If it returns n where n = discs-1 then there is no disc at that tower
   * @private
   */
  private findIndexOfTopDisc(tower: number): number{
    for(let discIndex: number = 0; discIndex < this.discs; discIndex++){
      if(this.towers[tower][discIndex] != 0){
        return discIndex;
      }
    }
    return this.discs-1;
  }

  /**
   * Calculates the sum of all discs at the specified tower
   *
   * @param tower - The tower of which the sum will be calculated. Valid values are 0, 1, 2
   * @param checkedLayers
   * @returns The sum of all discs at the tower
   * @private
   */
  private sumOfTower(tower: number, checkedLayers: number): number{
    let sum: number = 0;
    for(let i: number = 0; i <= checkedLayers; i++){
      sum = sum + this.towers[tower][i];
    }
    return sum;
  }

  private sumOfTowerWhole(tower: number): number{
    let sum: number = 0;
    this.towers[tower].forEach((value: number) => {sum = sum + value});
    return sum;
  }

  /**
   * Solve the problem towers of Hanoi for the specified amount of discs
   *
   * @param stack - Amount of disc the problem should be solved for
   * @private
   */
  private solve(stack: number): void{
    //define which role each tower plays
    const end: number = 2;
    let buffer: number;
    let start: number;
    if(this.sumOfTower(0, stack) === 0){
      buffer = 0;
      start = 1;
    }
    else if(this.sumOfTower(1, stack) === 0){
      buffer = 1;
      start = 0;
    }
    else{
      throw new Error("solve: How TF did we get here?!")
    }
    //first step is different depending on the stack size
    //move disc one to deignated tower
    if(stack % 2 === 0){
      this.saveMove(start, end, stack);
    }
    else{
      this.saveMove(start, buffer, stack);
    }

    console.log(this.towers);

    //alles
    //stack-1 Scheiben müssen im Buffer gestapelt werden um scheibe = stack von Start zu end zu schieben. Dann vorbei

    //1. Scheibe 1 bewegen (done!!!)

    // 2 bis 4 so lange machen bis sumTower(start) === 0 -> exit
    //2. gröchste oben liegende Disc verschieben
    //3. zweit gröchste oben liegende Disc verschieben
    //4. dritt gröchste oben liegende Disc verschieben

    //verschiebe Regeln:
      // a: verschiebe auf kleine disc die einen anderen Modulo wert als die zu verschiebende Disk hat
      // b: verschiebe auf leeren Turm
      // c: nicht verschieben

    let first: number = 0;
    let second: number = 0;
    let third: number = 0;
    const topDiscs: number[] = [];

    while (this.sumOfTower(start, stack) != 0){
      topDiscs.push(this.findTopDiscStack(0, stack));
      topDiscs.push(this.findTopDiscStack(1, stack));
      topDiscs.push(this.findTopDiscStack(2, stack));

      //decide the priorities of the tries
      //there is probably a way to code this cleaner
      for(let i: number = 0; i < 3; i++){
        let maxDisc: number = 0;
        if(topDiscs[i] > maxDisc){
          maxDisc = topDiscs[i];
          first = i;
        }
      }
      for(let i: number = 0; i < 3; i++){
        let maxDisc: number = 0;
        if(i != first && topDiscs[i] > maxDisc){
          maxDisc = topDiscs[i];
          second = i;
        }
      }
      for(let i: number = 0; i < 3; i++){
        let maxDisc: number = 0;
        if(i != first && i != second && topDiscs[i] > maxDisc){
          maxDisc = topDiscs[i];
          third = i;
        }
      }
      if(first === second || second === third || first === third){
        throw new Error("solve: For the love of god, get your prios straight")
      }


      //an dieser Stellen sollen dann alle drei Prioritäten auf alle drei tower geprüft werden und das schnellste verschieben soll gemacht werden. Bitte erst prüfen ob es auf die Endposition kann

      //for each priority (highest to lowest) it is checked if the preferred move is legal, the disc is moved and the while loop starts again
      //this is gonna get messy, I'm sure I can make it cleaner later

      if(this.moveIsLegal(first, end, stack)){
        this.saveMove(first, end, stack);
      }
      else if(this.moveIsLegal(first, buffer, stack)){
        this.saveMove(first, buffer, stack);
      }
      else if(this.moveIsLegal(first, start, stack)){
        this.saveMove(first, start, stack)
      }
      else if(this.moveIsLegal(second, end, stack)){
        this.saveMove(second, end, stack)
      }
      else if(this.moveIsLegal(second, buffer, stack)){
        this.saveMove(second, buffer, stack)
      }
      else if(this.moveIsLegal(second, start, stack)){
        this.saveMove(second, start, stack);
      }
      else if(this.moveIsLegal(third, end, stack)){
        this.saveMove(third, end, stack);
      }
      else if(this.moveIsLegal(third, buffer, stack)){
        this.saveMove(third, buffer, stack);
      }
      else if(this.moveIsLegal(third, start, stack)){
        this.saveMove(third, start, stack);
      }
      console.log(this.towers);

        /*
        in a perfect world, that would be my code, but if one of them is sucessful, the others should not be tried
        //try the first tower
        this.saveMove(first, end, stack);
        this.saveMove(first, buffer, stack);
        this.saveMove(first, start, stack);
        //try the second tower
        this.saveMove(second, end, stack);
        this.saveMove(second, buffer, stack);
        this.saveMove(second, start, stack);
        //try the third tower
        this.saveMove(third, end, stack);
        this.saveMove(third, buffer, stack);
        this.saveMove(third, start, stack);
        */


    }


  }

  private findTopDisc(tower: number): number{
    return this.towers[tower][this.findIndexOfTopDisc(tower)];
  }

  private findTopDiscStack(tower: number, stack: number): number{
    if(this.findIndexOfTopDisc(tower) <= stack){
      return this.findTopDisc(tower);
    }
    else{
      return 0;
    }
  }

  /**
   * finds the tower of the specified number if that number is the topDisc
   *
   * @param number - The number you are looking for
   * @returns - The Tower of which the number is the top
   * @private
   */
  private findNumberTower(number: number): number{
    if(number === this.towers[0][this.findIndexOfTopDisc(0)]){
      return 0;
    }
    else if(number === this.towers[1][this.findIndexOfTopDisc(1)]){
      return 1;
    }
    else if(number === this.towers[2][this.findIndexOfTopDisc(2)]){
      return 2;
    }
    else{
      throw new Error("findNumberTower: Dude, the number is not on the top, your code does not work")
    }
  }


  /**
   * Tries to do a safe move. If it is not a safe move, it will do nothing. If it is a safe Move it will move the disc
   *
   * @param fromTower - The tower of which a disc shall be moved
   * @param toTower - The tower to which the disc shall be moved
   * @param stack - The amount of Layers for which is checked if the move is legal (yes, I'm playing a dangerous game here hehehehe)
   * @private
   */
  private saveMove(fromTower: number, toTower: number, stack: number): void{
    if(fromTower === toTower){
      console.log("from:", fromTower, "to:", toTower, "are the same")
      return;
    }
    if(this.moveIsLegal(fromTower, toTower, stack)){
      this.moveDisc(fromTower, toTower);
    }
    console.log("from:", fromTower, "to:", toTower, "with a stack of:", stack, "is not a safe move.")
    return;
  }


  /**
   * if this function is in the code, it's still a wip because this is for debugging
   */
  public justHere(): void{
    towers.buidInitalTowers();
    console.log(towers)
  }


  public run(): void{
    towers.buidInitalTowers();
    for(let stack = this.discs; stack > 0; stack--){
      towers.solve(stack);
    }
  }

}

const towers = new tower(3);
towers.run();


// a new Bug hunt has begun!!!
// (]]]){ -> This is Herbert. Herbert can not exist. There are a couple of Errors that I wrote which shall never be reached. But SOMEHOW the Error "solve: How TF did we get here?!" was thrown. I'm happy I wrote this error, I'm displeased that I reached it...
