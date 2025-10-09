class tower{
  private towers: number[][] = [[1], [0], [0]];
  private discs: number;

  public constructor(discs: number) {
    this.discs = discs;
  }

  /**
   * Builds the initial tower configuration with n-discs
   *
   * @returns A two Dimensional array filled with n numbers in each dimension
   * @private
   */
  private buidInitalTowers(): number[][]{
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
    return this.towers;
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
    if(towers.sumOfTower(fromTower) === 0){
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

  private sumOfTower(tower: number): number{
    let sum: number = 0;
    this.towers[0].forEach((value: number) => {sum = sum + value});
    return sum;
  }

  private solve(stack: number): void{
    //define which role each tower plays
    const destination: number = 2;
    let buffer: number;
    let start: number;
    if(towers.sumOfTower(0) === 0){
      buffer = 0;
      start = 1;
    }
    else if(towers.sumOfTower(1) === 0){
      buffer = 1;
      start = 0;
    }
    else{
      throw new Error("solve: How TF did we get here?!")
    }



  }


  //currently for debugging porpoises
  public debugLOL(): void{
    console.log(towers.buidInitalTowers());
    console.log(towers.moveIsLegal(0, 1))
    towers.moveDisc(0, 2)
    console.log(towers)

    // solve for disc
    // solve for disc -1
    //solve for disc -2
  }


  public run(): void{
    for(let stack = this.discs; stack > 0; stack--){
      towers.solve(stack);
    }
  }
//end of class
}

const towers = new tower(3);
towers.run();