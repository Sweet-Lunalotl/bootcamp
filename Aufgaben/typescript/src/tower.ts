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
   * @param stack - The number of stacks the tower should be solved for
   * @return true - The top disc of fromTower can be moved to ToTower
   * @return false - The top disc of fromTower is bigger than the topDisc of toTower
   * @private
   */
  private moveIsLegal(fromTower: number, toTower: number): boolean{
    if(fromTower > 2 || toTower > 2 || fromTower < 0 || toTower < 0){
      throw new Error("moveIsLegal: fromTower or toTower have an invalid value")
    }
    //check if the tower a disc should be moved from isn't empty
    if(towers.sumOfTower(fromTower) === 0){
      throw new Error("moveIsLegal: No disc at adressed tower");
    }
    //the top disc of both the to and the from-Tower
    //find to disc of toTower and fromTower
    const topFrom: number = this.findTopDisc(fromTower);
    let topTo: number = this.findTopDisc(toTower);


    if(fromTower === toTower){
      return false;
    }

    if(topFrom === topTo-1){
      return true;
    }

    //one could argue that this would belong in a different method called move is smart or something
    if(topTo > topFrom && topFrom % 2 != topTo % 2){
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
    if(this.findTopDisc(toTower) === 0){
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
    //Inedx is the lowest index
    return this.discs-1;
  }



  private sumOfTower(tower: number): number{
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
  private solve(): void{
    let sumOfSolvedDiscs: number = 0;
    let numberofSolvedDiscs: number = 0;
    const end: number = 2;
    let buffer: number;
    let start: number;
    while(this.sumOfTower(0) + this.sumOfTower(1) != 0){
      //define which role each tower plays
      if(this.sumOfTower(0) === 0){
        buffer = 0;
        start = 1;
      }
      else if(this.sumOfTower(1) === 0){
        buffer = 1;
        start = 0;
      }
      else{
        throw new Error("solve: How TF did we get here?!")
      }
      //first step is different depending on the stack size
      //move disc one to deignated tower
      if((this.discs - numberofSolvedDiscs) % 2 === 0){
        this.saveMove(start, end);
      }
      else{
        this.saveMove(start, buffer);
      }

      console.log("after moving 1:", this.towers);

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

      while (this.sumOfTower(start) != 0){
        topDiscs.push(this.findTopDisc(0);
        topDiscs.push(this.findTopDisc(1));
        topDiscs.push(this.findTopDisc(2));
        //decide the priorities of the tries
        //there is probably a way to code this cleaner
        let maxDisc: number = 0;
        for(let i: number = 0; i < 3; i++){
          if(topDiscs[i] >= maxDisc){
            maxDisc = topDiscs[i];
            first = i;
          }
        }
        maxDisc = 0;
        for(let i: number = 0; i < 3; i++){
          if(i != first && topDiscs[i] >= maxDisc){
            maxDisc = topDiscs[i];
            second = i;
          }
        }
        maxDisc = 0;
        for(let i: number = 0; i < 3; i++){
          if(i != first && i != second && topDiscs[i] >= maxDisc){
            maxDisc = topDiscs[i];
            third = i;
          }
        }
        console.log("first:", first);
        console.log("second:", second);
        console.log("third:", third);
        if(first === second || second === third || first === third){
          throw new Error("solve: For the love of god, get your prios straight")
        }

        /*
        an dieser Stellen sollen dann alle drei Prioritäten auf alle drei tower geprüft werden und das schnellste
        verschieben soll gemacht werden. Bitte erst prüfen ob es auf die Endposition kann
        */
        /*
        for each priority (highest to lowest) it is checked if the preferred move is legal, the disc is moved and
        the while loop starts again
         */

        //this is gonna get messy, I'm sure I can make it cleaner later

        if(this.moveIsLegal(first, end)){
          this.saveMove(first, end);
        }
        else if(this.moveIsLegal(first, buffer)){
          this.saveMove(first, buffer);
        }
        else if(this.moveIsLegal(first, start)){
          this.saveMove(first, start)
        }
        else if(this.moveIsLegal(second, end)){
          this.saveMove(second, end)
        }
        else if(this.moveIsLegal(second, buffer)){
          this.saveMove(second, buffer)
        }
        else if(this.moveIsLegal(second, start)){
          this.saveMove(second, start);
        }
        else if(this.moveIsLegal(third, end)){
          this.saveMove(third, end);
        }
        else if(this.moveIsLegal(third, buffer)){
          this.saveMove(third, buffer);
        }
        else if(this.moveIsLegal(third, start)){
          this.saveMove(third, start);
        }
        console.log("after moving highest possible priority:", this.towers);

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

      sumOfSolvedDiscs = this.sumOfTower(2);
      numberofSolvedDiscs+=1;


    }

  }

  private findTopDisc(tower: number): number{
    return this.towers[tower][this.findIndexOfTopDisc(tower)];
  }



  /**
   * Tries to do a safe move. If it is not a safe move, it will do nothing. If it is a safe Move it will move the disc
   *
   * @param fromTower - The tower of which a disc shall be moved
   * @param toTower - The tower to which the disc shall be moved
   * @private
   */
  private saveMove(fromTower: number, toTower: number): void{
    if(fromTower === toTower){
      console.log("from:", fromTower, "to:", toTower, "are the same")
      return;
    }
    if(this.moveIsLegal(fromTower, toTower)){
      this.moveDisc(fromTower, toTower);
      return;
    }
    console.log("from:", fromTower, "to:", toTower, "is not a safe move.")
    return;
  }


  /**
   * if this function is in the code, it's still a wip because this is for debugging
   */
  public justHere(): void{
    this.buidInitalTowers();
    console.log(this.towers)
    console.log(this.sumOfTower(0, 2))

  }


  public run(): void{
    this.buidInitalTowers();
    console.log(this.towers)
    this.solve();
    console.log("finishd!", this.towers);
  }


}

const towers = new tower(3);
//towers.justHere();
towers.run();

/*
A new Bug hunt has begun!!!

(]]]){ <- This is Herbert.
Herbert can not exist. There are a couple of Errors that I wrote which shall never be reached.
But SOMEHOW the Error "solve: How TF did we get here?!" was thrown.
I'm happy I wrote this error, I'm displeased that I reached it...
Solution: The Number of disc is 3 while the biggest index is 0. That could have been obvious

(]]]){ <- This is Artemis
She brought me another Error that should have been unreachable. "solve: For the love of god, get your prios straight"
So apparently two of my prios are the same...
Solution: when the variable maxDiscs is defined within in the for loop, it is 0 with each iteration... Moved it outside
Furthermore changed < to <= because sometimes 0 is the max Disc

([[[){ <- This is Nimmersatt.
Nimmersatt is eating my discs. I suspect the move function is faulty.
Solution: If it is assumed that when the topDisc is discs-1 the topDisc must be 0 and can be overwritten, Nimmersatt
has no choice but eat them all up!

([[[){ <- This is Nami.
Nami hates rules and stacks the discs however she likes.
I mixed up "<" and ">" /again/. No wonder that Nami thinks she is doing everything according to the rules

(]]]){ <- This is Apple-pie
Apple-pie has a wonderful error for me: "moveIsLegal: fromTower or toTower have an invalid value".
Another one of those errors that should be not reachable. It's the same Tower.
I forgot that I coded it that this is something that occurs regularly

(]]]){ <- This is Ms. Friday
Ms. Friday yearns the weekend and decided that [ [ 0, 0, 1 ], [ 0, 0, 2 ], [ 0, 0, 3 ] ] is solved and exited the code.
Solution: When I defined stack initally as disc-1, I should also have changed the for loop in run to stack>=0

(]]]){ <- This is Stack
When I introduced StacK I knew it was going to bite my back. And they did! Little Traitor!!!!
At this point I have to rewrite a lot of code... The Problem is, that as soon as I go into the second iteration,
the disc in the most bottom layer are all disregarded and not moveable. This is good for the first disc in their final
position, but bad for the discs at the other towers...

*/