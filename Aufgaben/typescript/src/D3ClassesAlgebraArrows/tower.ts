class hanoiGame {
  private towers: number[][] = [[1], [0], [0]];
  private readonly discs: number;

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
  private buildInitialTowers(): void{
    for(let tower: number = 0; tower < 3; tower++){
      for(let discName: number = 2; discName <= this.discs; discName++){
        if (tower === 0){
          this.towers[tower].push(discName);
        }
        else{
          this.towers[tower].push(0);
        }
      }
    }
  }

  /**
   * Checks if move from a tower to a tower is legal and makes sense
   *
   * @param fromTower - The tower of which the top disc should be moved. Valid values are 0, 1, 2
   * @param toTower - The tower to which the disc should be moved. Valid values are 0, 1, 2
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
      throw new Error("moveIsLegal: No disc at addressed tower");
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
    if(topTo > topFrom && topFrom % 2 != topTo % 2){
      return true;
    }
    else return topTo === 0;
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
    //Index is the lowest index
    return this.discs-1;
  }

  /**
   * Calculates and returns the sum of all discs of a tower
   *
   * @param tower - The tower of which the sum of disc numbers should be found. Valid values are 0, 1, 2.
   * @retruns The value of all disc numbers of a specified tower added.
   * @private
   */
  private sumOfTower(tower: number): number{
    let sum: number = 0;
    this.towers[tower].forEach((value: number) => {sum = sum + value});
    return sum;
  }

  /**
   * Find and returns the top disc of specified tower.
   *
   * @param tower - The tower of which the top disc shall be returned
   * @private
   */
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
   * Solve the problem towers of Hanoi for the specified amount of discs
   *
   * @private
   */
  private solve(): void{
    let numberOfSolvedDiscs: number = 0;
    const end: number = 2;
    let buffer: number;
    let start: number;
    let moves: number = 0;
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
      //first step is different depending on the number of unsolved discs
      //move disc one to designated tower
      if((this.discs - numberOfSolvedDiscs) % 2 === 1){
        this.saveMove(start, end);
      }
      else{
        this.saveMove(start, buffer);
      }
      moves+=1
      this.printState(moves, numberOfSolvedDiscs);
      //reset variables
      const topDiscs: number[] = [];
      let oneAt: number = -1;
      let first: number = -1;
      let second: number = -1;

      while (this.sumOfTower(start) != 0){
        for(let tower = 0; tower < 3; tower++){
          topDiscs.push(this.findTopDisc(tower));
        }
        oneAt = this.findNumberTower(1);
        //move disc that is not 1
        let maxDisc: number = 0;
        for(let i: number = 0; i < 3; i++){
          if(topDiscs[i] >= maxDisc && topDiscs[i] != 1){
            maxDisc = topDiscs[i];
            first = i;
          }
        }
        maxDisc = 0;
        for(let i: number = 0; i < 3; i++){
          if(i != first && topDiscs[i] >= maxDisc && topDiscs[i] != 1){
            maxDisc = topDiscs[i];
            second = i;
          }
        }
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
        moves+=1
        this.printState(moves, numberOfSolvedDiscs);
        //clear array and variables
        first = -1;
        second = -1;
        topDiscs.length = 0;
        //move disc 1
        if(this.sumOfTower(start) != 0){
          if(this.moveIsLegal(oneAt, end)){
            this.saveMove(oneAt, end);
          }
          else if(this.moveIsLegal(oneAt, buffer)){
            this.saveMove(oneAt, buffer);
          }
          else if(this.moveIsLegal(oneAt, start)){
            this.saveMove(oneAt, start);
          }
          moves+=1
          this.printState(moves, numberOfSolvedDiscs);
        }
      }
      numberOfSolvedDiscs+=1;
      this.printState(moves, numberOfSolvedDiscs);
      if(numberOfSolvedDiscs > this.discs){
        throw new Error("solve: Mate, how did you solved more discs than there are?");
      }
    }
  }

  private printState(moves: number, solved: number): void{
    console.log("After move", moves, "there are", solved, "solved discs.");
    console.log(this.towers[0]);
    console.log(this.towers[1]);
    console.log(this.towers[2]);
    console.log("--------------------")
  }

  /**
   * Runs a tower of hanoi game, that solves itself
   */
  public run(): void{
    this.buildInitialTowers();
    console.log(this.towers)
    this.solve();
    console.log("~~~~~~~~~~~~~~~~~~~~")
    console.log("Finished!");
  }
}

const towers = new hanoiGame(6);
towers.run();

/*
A new Bug hunt has begun!!!

(]]]){ <- This is Herbert.
Herbert can not exist. There are a couple of Errors that I wrote which shall never be reached.
But SOMEHOW the Error "solve: How TF did we get here?!" was thrown.
I'm happy I wrote this error, I'm displeased that I reached it...
Solution: The Number of disc is 3 while the biggest index is 0. That could have been obvious

(]]]){ <- This is Artemis
She brought me another Error that should have been unreachable. "solve: For the love of god, get your priorities straight"
So apparently two of my priorities are the same...
Solution: when the variable maxDiscs is defined within in the for loop, it is 0 with each iteration... Moved it outside
Furthermore changed < to <= because sometimes 0 is the max Disc

([[[){ <- This is Nimmersatt.
Nimmersatt is eating my discs. I suspect the move function is faulty.
Solution: If it is assumed that when the topDisc is discs-1 the topDisc must be 0 and can be overwritten, Nimmersatt
has no choice but eat them all up!

([[[){ <- This is Nami.
Nami hates rules and stacks the discs however she likes.
I mixed up "<" and ">" /again/. No wonder that Nami thinks she is doing everything according to the rules

(]]]){ <- This is Apple-pie.
Apple-pie has a wonderful error for me: "moveIsLegal: fromTower or toTower have an invalid value".
Another one of those errors that should be not reachable. It's the same Tower.
I forgot that I coded it that this is something that occurs regularly

(]]]){ <- This is Ms. Friday
Ms. Friday yearns the weekend and decided that [ [ 0, 0, 1 ], [ 0, 0, 2 ], [ 0, 0, 3 ] ] is solved and exited the code.
Solution: When I defined stack initially as disc-1, I should also have changed the for loop in run to stack>=0

(]]]){ <- This is Stack
When I introduced Stack I knew it was going to bite my back. And they did! Little Traitor!!!!
At this point I have to rewrite a lot of code... The Problem is, that as soon as I go into the second iteration,
the disc in the most bottom layer are all disregarded and not moveable. This is good for the first disc in their final
position, but bad for the discs at the other towers...

(]]])[ <- This is Fridolin
He does not want the fun to end. So he moves the 3 from 0 to 1 and from 1 to 0 in an infinite loop of fun!!
Solution: Moved disc 1 to the wrong spot, due to a mix-up in even and uneven. Changed the Modulo

IT WORKS IT FINALLY WORKS!!!!! (for 3 discs only...)

(]]]){ <- This is Fridolins Sister
She likes playing, too! And keeps the fun going indefinitely. Because I allowed the program,
to move a disc between two positions forever...
Solution: While I saw some reoccurring patterns in the solution for the Towers on Paper
(odd numbers only on even numbers, move disc 1 to tower 2 when discs-numberOfSolvedDiscs % 2 == 1),
I did not notice, thar after a disc that isn't 1 is moved, 1 is always moved next,
which would prevent the infinity loop I have on my hands.
So we have three rules:
1st: Move disc 1 to tower 2 when discs-numberOfSolvedDiscs % 2 == 1
2nd: After the disc 1 is moved, the next move is always with a disc that isn't 1
3rf: Odd numbered discs only on even numbered discs
As soon as we implement 2nd, we can get rid of the ugly prioritising and everything should work well.
When these three rules are respected, then there should always just be one valid move left.
Now it works from 1-4 but not 5 or above

(]]]){ <- This is Ikosaeder
With 5 discs this friendly bug makes a wrong 21st move, that spirals into chaos.
I think it's to do with a "Solved" trigger that shows up too late. With 6 there is an error at 64, after 2 are solved
(but the solved trigger seems to be working). Something is definitely wrong with the solved variable and trigger.
But that's a problem for future Luna, present Luna is going to go home in a few.
Solution: Former Future Luna here. This fix was simple. The while loop checks if start tower is empty. But since two
moves are possible within that while loop, the second move was done, despite the condition of the while loop wasn't true
anymore. So I put the second move in the while loop into an if statement, so that it is skipped, when the condition of
the while loop is false

(]]]){ <- This is Annoying. Annoying is only 6 years old (a minor bug)
Starting at 4, all even numbers for disc are not solved with the lowest possible moves. The odd numbers are always
solved with n^2-1 moves (tested until n=17)
Now here is where it gets interesting:
For n [10,12,14,16]:
I looked at how many more moves my code makes beyond what would be the lowest possible amount of moves [30, 62, 126, 254].
The interesting part is, that this number increases by [32, 64, 128]. I'm sure there is some meaning behind it

*/
