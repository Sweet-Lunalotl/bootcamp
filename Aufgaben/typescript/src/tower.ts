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
  private moveIsLegal(fromTower: number, toTower: number): boolean{
    if(fromTower === toTower || fromTower > 2 || toTower > 2 || fromTower < 0 || toTower < 0){
      throw new Error("Function moveIsLegal: fromTower or toTower have an invalid value")
    }
    //check if the tower a disc should be moved from isn't empty
    if(towers.sumOfTowerWhole(fromTower) === 0){
      throw new Error("Function moveIsLegal: No disc at adressed tower");
    }
    //the top disc of both the to and the from-Tower
    //find to disc of toTower and fromTower
    let topFrom: number = this.towers[fromTower][this.findIndexOfTopDisc(fromTower)];
    let topTo: number = this.towers[toTower][this.findIndexOfTopDisc(toTower)];
    return topTo < topFrom;
  }

  /**
   * Moves the top disc of fromTower to the highest possible index of toTower
   *
   * @param fromTower - From which Tower a disc gets removed
   * @param toTower - Destination of removed disc
   * @private
   */
  private moveDisc(fromTower: number, toTower: number): void{
    if(!this.moveIsLegal(fromTower, toTower)){
      throw new Error("moveDisc: Oi! You should check if your move is legal /before/ calling this function. You do love bugs, don't you?")
    }
    if(this.findIndexOfTopDisc(toTower) === this.discs-1){
      this.towers[toTower][this.findIndexOfTopDisc(toTower)] = this.towers[fromTower][this.findIndexOfTopDisc(fromTower)];
    }
    else{
      this.towers[toTower][this.findIndexOfTopDisc(toTower)-1] = this.towers[fromTower][this.findIndexOfTopDisc(fromTower)];
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
    if(stack % 2 === 0){
      this.saveMove(start, end);
    }
    else{
      this.saveMove(start, buffer);
    }

    //alles
    //stack-1 Scheiben müssen im Buffer gestapelt werden um scheibe = stack von Start zu end zu schieben. Dann vorbei

    //1. Scheibe 1 bewegen (done!!!)

    // 2 und 3 so lange machen bis sumTower(start) === 0 -> exit
    //2. gröchste oben liegende Disc verschieben
    //3. zweit gröchste oben liegende Disc verschieben
    //4. dritt gröchste oben liegende Disc verschieben

    //verschiebe Regeln:
      // a: verschiebe auf kleine disc die einen anderen Modulo wert als die zu verschiebende Disk hat
      // b: verschiebe auf leeren Turm
      // c: nicht verschieben


    while (this.sumOfTower(start, stack) != 0){
      //Hier sehen sie meinen moment der erkenntnis:
        //EINE GERADE KOMMT IM;MER AUF EINE UNGERADE, Ich glaube ich ahbe es gelöst!!!!!!!1



    }


  }

  private findTopDisc(tower: number): number{
    return this.towers[tower][this.findIndexOfTopDisc(tower)];
  }

  /**
   * finds the tower of the specified number if that number is the topDisc
   *
   * @param number - The number you are looking for
   * @ returns - The Tower of which the number is the top
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


  private moveToEmptyTower(fromTower: number, otherTowerA: number, otherTowerB: number, stack: number): void {
    if(this.sumOfTower(otherTowerA, stack) === 0){
      this.saveMove(fromTower, otherTowerA);
    }
    else if(this.sumOfTower(otherTowerB, stack) === 0){
      this.saveMove(fromTower, otherTowerA);
    }
    else{
      throw new Error("moveToEmptyTower: Somehow there is no empty Tower")
    }
  }


  private saveMove(fromTower: number, toTower: number): void{
    if(this.moveIsLegal(fromTower, toTower)){
      this.moveDisc(fromTower, toTower);
    }
    else{
      throw new Error("saveMove: This was not a save move")
    }
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
towers.justHere();



