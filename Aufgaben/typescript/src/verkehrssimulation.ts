// Diese Klasse definiert ein Auto, das auf einer Straße fährt. Zum Konstruieren benötigt es eine Startkoordinate "x", eine Startkoordinate "y", eine Ausgangsrotation "rotation" und eine Startgeschwindigkeit "speed"
// Öffentliche Methoden: getX(), getY(), getRotation(), getSpeed() und drive() um das Auto einen Schritt fahren zu lassen

/**
 * Class to construct and manipulate a car for the simulation. The number of cars constructed must be 2.
 *
 * @param x - Start position of car in x, where 0 is the leftmost column.
 * @param y - Start position of car in x, where 0 is the leftmost row.
 * @param rotation - Start rotation of car, where 0 is north, 1 is east, 2 is south and 3 is west.
 * @param speed - Start speed of car, where the minimum is 0.1 and the maximum is 1
 */
class car {
  private x: number;
  private y: number;
  private rotation: number;
  private speed: number;
  /**
   *Constructor for class car.
   *
   * @param x - Start position of car in x, where 0 is the leftmost column.
   * @param y - Start position of car in x, where 0 is the leftmost row.
   * @param rotation - Start rotation of car, where 0 is north, 1 is east, 2 is south and 3 is west.
   * @param speed - Start speed of car, where the minimum is 0.1 and the maximum is 1
   */
  public constructor(x: number, y: number, rotation: number, speed: number) {
    this.x = x;
    this.y = y;
    this.rotation = rotation;
    this.speed = speed;
  }

    /**
     * Get x of car.
     *
     * @returns x as number
     */
  public getX(): number {
    return this.x;
  }
    /**
     * Get y of car.
     *
     * @returns y as number
     */
  public getY(): number {
    return this.y;
  }
    /**
     * Get rotation of car.
     *
     * @returns rotation as number, where 0 is north, 1 is east, 2 is south and 3 is west.
     */
  public getRotation(): number {
    return this.rotation;
  }
    /**
     * Get speed of car.
     *
     * @returns speed as number, where the minimum is 0.1 and the maximum is 1.
     */
  public getSpeed(): number {
    return this.speed;
  }
    /**
     * Drives the car one iteration forward.
     */
  public drive() {
    this.speed = this.accelerate();
    this.rotation = this.turn();
    //change coordinates
    switch (this.rotation) {
      case 0:
        this.y = this.y - this.speed;
        this.x = Math.round(this.x);
        break;
      case 2:
        this.y = this.y + this.speed;
        this.x = Math.round(this.x);
        break;
      case 1:
        this.x = this.x + this.speed;
        this.y = Math.round(this.y);
        break;
      case 3:
        this.x = this.x - this.speed;
        this.y = Math.round(this.y);
        break;
      default:
        throw new Error(
          "Rotation can't be anything but 0, 1, 2, 3 in method drive",
        );
    }
  }

    /**
     * Gives back a new rotation, after adding the value of add.
     *
     * @param add - Number that will be added to rotation. Possible values of add: [-4, -3, ..., 3, 4]. Adding a positive number rotates the car clockwise, a negative number counter-clockwise.
     * @returns The new Rotation
     * @throws Error - Throw error when the value of add is smaller than -4 or greater than 4.
     * @private
     */
  private setRotation(add: number): number {
    this.rotation = this.rotation + add;
    switch (this.rotation) {
      case 0:
      case 1:
      case 2:
      case 3:
        break;
      case 4:
        this.rotation = 0;
        break;
      case 5:
        this.rotation = 1;
        break;
      case 6:
        this.rotation = 2;
        break;
      case 7:
        this.rotation = 3;
        break;
      case -4:
        this.rotation = 0;
        break;
      case -3:
        this.rotation = 1;
        break;
      case -2:
        this.rotation = 2;
        break;
      case -1:
        this.rotation = 3;
        break;
      default:
        console.log(this.rotation);
        throw new Error('Rotation not possible');
    }
    return this.rotation;
  }

    /**
     * Speeds the car up or down depending on the street topology.
     *
     * @returns New speed of the car.
     * @private
     */
  private accelerate(): number {
    const xRound: number = Math.round(this.x);
    const yRound: number = Math.round(this.y);
    const streetTopology: string = street[yRound][xRound];
    //this if catches all possible cases where a car drives into a curve and therefore has to speedDown()
    if (
      (streetTopology === '├' && this.rotation == 3) ||
      (streetTopology === '┤' && this.rotation == 1) ||
      (streetTopology === '┬' && this.rotation == 0) ||
      (streetTopology === '┴' && this.rotation == 2) ||
      (streetTopology === '┌' && (this.rotation == 3 || this.rotation == 0)) ||
      (streetTopology == '┐' && (this.rotation == 1 || this.rotation == 0)) ||
      (streetTopology === '└' && (this.rotation == 2 || this.rotation == 3)) ||
      (streetTopology === '┘' && (this.rotation == 1 || this.rotation == 2))
    ) {
      this.speed = this.speedDown();
    } else {
      this.speed = this.speedUp();
    }
    return this.speed;
  }
    /**
     * Speeds the car up to a maximum of 1 by adding 0.2 to the speed.
     *
     * @returns New speed of the car
     * @private
     */
  private speedUp(): number {
    if (this.speed + 0.2 <= 1) {
      this.speed += 0.2;
    } else if (this.speed + 0.2 >= 1) {
      this.speed = 1;
    }
    return this.speed;
  }
    /**
     * Speeds the car down to a minimum of 0.1 by cutting its speed in half.
     *
     * @returns New speed of the car
     * @private
     */
  private speedDown() {
    if (this.speed / 2 < 0.1) {
      this.speed = 0.1;
    } else {
      this.speed = this.speed / 2;
    }
    return this.speed;
  }
    /**
     * Decides in which direction the car has to turn in order to stay on the street.
     *
     * @returns New direction the car is facing.
     * @private
     */
  private turn(): number {
    const xRound: number = Math.round(this.x);
    const yRound: number = Math.round(this.y);
    const streetTopology: string = street[yRound][xRound];
    if (
      streetTopology === '─' ||
      streetTopology === '┼' ||
      streetTopology === '│' ||
      ((streetTopology === '┤' || streetTopology === '├') &&
        this.rotation % 2 === 0) ||
      ((streetTopology === '┴' || streetTopology === '┬') &&
        this.rotation % 2 == 1)
    ) {
      return this.rotation;
    } else if (streetTopology === '┐') {
      if (this.rotation === 0) {
        this.rotation = this.setRotation(-1);
      } else if (this.rotation === 1) {
        this.rotation = this.setRotation(1);
      }
    } else if (streetTopology === '└') {
      if (this.rotation === 2) {
        this.rotation = this.setRotation(-1);
      } else if (this.rotation === 3) {
        this.rotation = this.setRotation(1);
      }
    } else if (streetTopology === '┌') {
      if (this.rotation === 0) {
        this.rotation = this.setRotation(1);
      } else if (this.rotation === 3) {
        this.rotation = this.setRotation(-1);
      }
    } else if (streetTopology === '┘') {
      if (this.rotation === 1) {
        this.rotation = this.setRotation(-1);
      } else if (this.rotation === 2) {
        this.rotation = this.setRotation(1);
      }
    } else if (streetTopology === '┴') {
      if (this.rotation === 2) {
        this.rotation = this.setRotation(1);
      }
    } else if (streetTopology === '┬') {
      if (this.rotation === 0) {
        this.rotation = this.setRotation(1);
      }
    } else if (streetTopology === '┤') {
      if (this.rotation === 1) {
        this.rotation = this.setRotation(1);
      }
    } else if (streetTopology === '├') {
      if (this.rotation === 3) {
        this.rotation = this.setRotation(1);
      }
    } else {
      console.log(streetTopology);
      throw new Error('Invalid: No street in driving direction');
    }
    return this.rotation;
  }
}
/**
 * Checks if at any point during the past iteration the coordinates of both cars overlapped and therefor crashed. Returns true when there was no collision.
 *
 * @param x1 - x of car 1
 * @param y1 - y of car 1
 * @param speed1 - speed of car 1
 * @param x2 - x of car 2
 * @param y2 - y of car 2
 * @param speed2 - speed of car 2
 * @returns true when there was no collision and false when there was.
 */
function noCollision (x1: number, y1: number, speed1: number, x2: number, y2: number, speed2: number): boolean{
  x1 = Number(x1.toFixed(1));
  y1 = Number(y1.toFixed(1));
  x2 = Number(x2.toFixed(1));
  y2 = Number(y2.toFixed(1));
  let speedi: number = 0;
  if(speed1 > speed2){
    speedi = speed1*10;
  }
  else{
    speedi = speed2*10;
  }

  if(x1 === x2){
    for (let i: number = 0; i < speedi; i++){
      if(y1 == (y2-(i/10))){
        return false;
      }
    }
  }
  else if(y1 === y2){
    for (let i: number = 0; i < speedi; i++){
      if(x1 == (x2-(i/10))){
        return false;
      }
    }
  }
  return true;
}

/**
 * Prints the entirety of the street in the console. The green highlight marks the Position of car1, the magenta highlight marks the position of car2. Also prints all the values of car 1 and 2 and the current iteration.
 */
function showStreet(): void{
    console.log("iteration:", iteration);
    for(let y: number = 0; y < street.length; y++){
        for(let x: number = 0;  x < street[y].length; x++){

            if((y === Number(car1.getY().toFixed(0))) && (x === Number(car1.getX().toFixed(0))) && (y === Number(car2.getY().toFixed(0))) && (x === Number(car2.getX().toFixed(0)))){
                process.stdout.write("\x1b[101m" + street[y][x] + "\x1b[49m");
            }
            else if((y === Number(car2.getY().toFixed(0))) && (x === Number(car2.getX().toFixed(0)))){
                process.stdout.write("\x1b[105m" + street[y][x] + "\x1b[49m");
            }
            else if((y === Number(car1.getY().toFixed(0))) && (x === Number(car1.getX().toFixed(0)))){
                process.stdout.write("\x1b[102m" + street[y][x] + "\x1b[49m");
            }
            else{
                process.stdout.write(street[y][x]);
            }
        }
        process.stdout.write("\n");
    }
    console.log("car1, X:", car1.getX().toFixed(1), "Y:", car1.getY().toFixed(1), "Speed:", car1.getSpeed().toFixed(1), "Rotation:",String(car1.getRotation()));
    console.log("car2, X:", car2.getX().toFixed(1), "Y:", car2.getY().toFixed(1), "Speed:", car2.getSpeed().toFixed(1), "Rotation:",String(car2.getRotation()));
    console.log("");
}

/**
 * Waits until ms passed.
 *
 * @param ms - Amount of milliseconds this funktion will wait before returning.
 */
async function sleep(ms: number): Promise<void> {
    return new Promise((resolve) => setTimeout(resolve, ms));
}

/**
 * Runs the Simulation of the traffic until the two cars crash.
 */
async function runSimulation(): Promise<void> {
    do{
        car1.drive();
        car2.drive();
        iteration++;
        showStreet();
        await sleep(1000);
        if(noCollision(car1.getX(), car1.getY(), car1.getSpeed(), car2.getX(), car2.getY(), car2.getSpeed())){
            console.clear();
        }
    } while ((noCollision(car1.getX(), car1.getY(), car1.getSpeed(), car2.getX(), car2.getY(), car2.getSpeed())));
    console.log("Collision at x:", car1.getX().toFixed(0), "y:", car1.getY().toFixed(0));
}

//                  y x
//const street: string[][] = [["┌", "─", "─", "┬", "─", "┐"], ["│", " ", " ", "└", "┬", "┘"], ["└", "─", "─", "─", "┘" , " "]];
const street: string[][] = [[" ", " ", "┌", "─", "┬", "─", "┐"], ["┌", "─", "┴", "─", "┴", "┐", "│"], ["│", " ", "┌", "─", "┐", "└", "┤"], ["│", " ", "│", " ", "├", "─", "┤"], ["├", "─", "┼", "─", "┤", " ", "│",], ["│", " ", "│", " ", "├", "┬", "┘"], ["└", "┬", "┴", "─", "┼", "┘"], [" ", "└", "─",  "─", "┘"]]
const car1 = new car(3, 2, 3, 0);
const car2 = new car(3, 2, 1, 0);
let iteration: number = 0;

console.clear();
runSimulation();

/*
All my bugs that got evicted from the code and moved to this cozy new home <3

(]]){ <- Albert over here found himself a home, when I decided to start counting the rotation at 0 north and changed it everywhere except in the starting coordinates
(]]){ <- little Sophie made herself comfy, when I used the Methode changeRotation() without writing it's return value in the var
(]]){ <- Tom-Tom likes it when the code does not change rotation. Apparently is "if((streetTopology === "┐" || "└"){return true;} else {return false;}" always true, and instead you have to write "if((streetTopology === "┐" || streetTopology === "└"){return true;} else {return false;}"
(]]){ <- Quinn got me a gift!!! A little note that read: "Error: Rotation not possible". Because the Tom-Tom has the same issue with switch statement
(]]){ <- Phillip is a jolly little fellow! Jumping rapidly between rotations 1 and 0. Denn Luna dachte sie ist schlau und benutzt "%". Luna hat dadurch die Hälfe aller Fälle nicht beachtet. Dies hatte auch Auswirkungen auf "accelerate()". Ich weine :,(
(]]){ <- Look it's Quinn again! This time with an Error I thought they will never find: Invalid: No street in driving direction. But the console log says there is a stree?! This will be fun! ─ Despite this char: "│" being OBVIOUSLY part of the Street, I forgot to include it in ANY line of Code. Yes, you read right, there is not a single "│" in my entire code (except for the street array)
(]]){ <- This is Bob the Builder. He built the streets a tad too wide and the cars were able to pass each other. Nvm, they just went so fricking fast, that they quantum shifted right through each other! Let's fix the laws of physics!

Now the bugs can party together, because I gathered them all!!!
 */