class tower{
  private towers: number[][] = [[1], [0], [0]];
  private discs: number;

  public constructor(discs: number) {
    this.discs = discs;
  }

  /**
   * Builds the initial tower configuration with n-discs
   *
   * @private
   * @returns A two Dimensional array filled with n numbers in each dimension
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
    let sumOfTower: number = 0;
    this.towers[fromTower].forEach((value: number) => {sumOfTower = sumOfTower + value});
    if( sumOfTower === 0){
      throw new Error("Function moveIsLegal: No disc at adressed tower");
    }
    //the top disc of both the to and the from-Tower
    let topFrom: number = 0;
    let topTo: number = 0;
    //find to disc of toTower and fromTower
    for(let discIndex: number = 0; discIndex < this.discs; discIndex++){
      if(topFrom === 0 && this.towers[fromTower][discIndex] != 0){
        topFrom = this.towers[fromTower][discIndex];
      }
      if(topTo === 0 && this.towers[toTower][discIndex] != 0){
        topFrom = this.towers[fromTower][discIndex];
      }
    }
    return topTo < topFrom;
  }

  //currently for debugging porpoises
  public run(): void{
    console.log(towers.buidInitalTowers());
    console.log(towers.moveIsLegal(1, 0))

  }

}



const towers = new tower(3);
towers.run();