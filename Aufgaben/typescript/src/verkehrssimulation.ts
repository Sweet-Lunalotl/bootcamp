/*
console.log("\x1b[32m Output with green text \x1b[0m");
console.log("\x1b[35m Output with magenta text \x1b[0m");
console.log("\x1b[31m Output with red text \x1b[0m");
 ┐ └ ┘ ┌ ┴ ┬ ┤ ├ ─ ┼ │
*/

//Diese Funktion soll die Straße in der Konsole ausgeben, sodass sie so aussieht, wie in der Aufgabenstellung
function showStreet(street: string[][]): void{
  for(let y: number = 0; y < street.length; y++){
    for(let x: number = 0;  x < street[y].length; x++){
      process.stdout.write(street[y][x]);
    }
    process.stdout.write("\n");
  }
}

// Diese Klasse definiert ein Auto, das auf einer Straße fährt. Zum Konstruieren benötigt es eine Startkoordinate "x", eine Startkoordinate "y", eine Ausgangsrotation "rotation" und eine Startgeschwindigkeit "speed"
// Öffentliche Methoden: getX(), getY(), getRotation(), getSpeed() und drive() um das Auto einen Schritt fahren zu lassen
class car{
    private x: number;
    private y: number;
    private rotation: number;
    private speed: number;

    public constructor(x: number, y:number, rotation: number, speed: number) {
        this.x = x;
        this.y = y;
        this.rotation = rotation;
        this.speed = speed;
    }

    public getX(): number{
      return this.x;
    }

    public getY(): number{
      return this.y;
    }

    // 0: North, 1: East....
    public getRotation(): number{
      return this.rotation;
    }

    public getSpeed(): number{
      return this.speed;
    }

    public drive(){
      //accelerate
      this.speed = this.accelerate(this.x, this.y, this.rotation, this.speed);
      //turn
      this.rotation = this.turn(this.x, this.y, this.rotation);
      //change coordinates
      switch (this.rotation){
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
          throw new Error("Rotation can't be anything but 0, 1, 2, 3 in method drive");
      }
    }

    private setRotation(rotation: number, add: number): number{
      rotation = rotation + add;
      switch (rotation){
        case 0:
        case 1:
        case 2:
        case 3:
          break;
        case 4:
          rotation = 0;
          break;
        case 5:
          rotation = 1
          break;
        case 6:
          rotation = 2;
          break;
        case 7:
          rotation = 3;
          break;
        case -4:
          rotation = 0;
          break;
        case -3:
          rotation = 1
          break;
        case -2:
          rotation = 2;
          break;
        case -1:
          rotation = 3;
          break;
        default:
          console.log(rotation);
          throw new Error("Rotation not possible");
      }
      return rotation;
    }

    private accelerate(x: number, y: number, rotation: number, speed: number): number{
      const xRound: number = Math.round(x);
      const yRound: number = Math.round(y);
      const streetTopology: string = street[yRound][xRound];

      if((streetTopology === "├" && rotation == 3) || (streetTopology === "┤" && rotation == 1) || (streetTopology === "┬" && rotation == 0)
        || (streetTopology === "┴" && rotation == 2) || ((streetTopology === "┌") && (rotation == 3 || rotation == 0))
        || ((streetTopology == "┐") && (rotation == 1 || rotation == 0)) || ((streetTopology==="└") && (rotation == 2 || rotation == 3))
        || (streetTopology==="┘") && (rotation == 1 || rotation == 2)){
        speed = this.speedDown(speed);
      }
      else{
        speed = this.speedUp(speed);
      }
      return speed;

    }

    private speedUp (speed: number): number{
      if (speed+0.2 <= 1){
        speed+=0.2
      }
      return speed;
    }

    private speedDown (speed: number){
      if ((speed/2) < 0.1 ){
        speed = 0.1;
      }
      else{
        speed = speed/2;
      }
      return speed;
    }

    private turn (x: number, y: number, rotation: number): number{
      const xRound: number = Math.round(x);
      const yRound: number = Math.round(y);
      const streetTopology: string = street[yRound][xRound];
      if(streetTopology === "─" || streetTopology === "┼" || streetTopology === "│" || ((streetTopology === "┤" || streetTopology === "├") && rotation%2 === 0) || ((streetTopology === "┴" || streetTopology === "┬") && (rotation%2==1)))  {
        return rotation;
      }
      else if( streetTopology === "┐"){
        if (rotation === 0) {
          rotation = this.setRotation(rotation, -1);
        }
        else if (rotation === 1) {
          rotation = this.setRotation(rotation, 1);
        }
      }
      else if(streetTopology === "└"){
        if (rotation === 2 ) {
          rotation = this.setRotation(rotation, -1);
        }
        else if (rotation === 3) {
          rotation = this.setRotation(rotation, 1);
        }
      }
      else if(streetTopology === "┌"){
        if (rotation === 0) {
          rotation = this.setRotation(rotation, 1);
        }
        else if (rotation === 3) {
          rotation = this.setRotation(rotation, -1);
        }
      }
      else if(streetTopology === "┘"){
        if (rotation === 1) {
          rotation = this.setRotation(rotation, -1);
        }
        else if (rotation === 2) {
          rotation = this.setRotation(rotation, 1);
        }
      }
      else if(streetTopology === "┴"){
        if (rotation === 2) {
          rotation = this.setRotation(rotation, 1);
        }
      }
      else if(streetTopology === "┬"){
        if (rotation === 0) {
          rotation = this.setRotation(rotation, 1);
        }
      }
      else if(streetTopology === "┤"){
        if (rotation === 1) {
          rotation = this.setRotation(rotation, 1);
        }
      }
      else if(streetTopology === "├"){
        if (rotation === 3) {
          rotation = this.setRotation(rotation, 1);
        }
      }
      else{
        console.log(streetTopology);
        throw new Error("Invalid: No street in driving direction")
      }
      return rotation;
    }


}

//prüft ob die übergebenen Koordinaten unter Berücksichtigung des letzten Schritts, sich überlappt haben
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
        console.log("Collision at x:", x1, "y:", y1)
        return false;
      }
    }
  }
  else if(y1 === y2){
    for (let i: number = 0; i < speedi; i++){
      if(x1 == (x2-(i/10))){
        console.log("Collision at x:", x1, "y:", y1)
        return false;
      }
    }
  }
  return true;
}

//Gibt die Koordinaten, Rotation und Geschwindigkeit des jeweiligen Durchgangs aus
function logCars (): void{
  console.log("durchgang:", l);
  console.log("car1:")
  console.log("X:", car1.getX().toFixed(1));
  console.log("Y:", car1.getY().toFixed(1));
  console.log("Speed:",car1.getSpeed().toFixed(1));
  console.log("Rotation:",car1.getRotation());
  console.log("car2:")
  console.log("X:", car2.getX().toFixed(1));
  console.log("Y:", car2.getY().toFixed(1));
  console.log("Speed:",car2.getSpeed().toFixed(1));
  console.log("Rotation:",car2.getRotation());
  console.log("");
}

//                  y x
const street: string[][] = [["┌", "─", "─", "┬", "─", "┐"], ["│", " ", " ", "└", "┬", "┘"], ["└", "─", "─", "─", "┘" , " "]];
const car1 = new car(3, 2, 3, 0);
const car2 = new car(3, 2, 1, 0);
let l: number = 0;

do{
  car1.drive();
  car2.drive();
  l++;
  logCars();
} while ((noCollision(car1.getX(), car1.getY(), car1.getSpeed(), car2.getX(), car2.getY(), car2.getSpeed())));

//Im Folgenden ein kleiner Bug-log. Weil 1.: aus Fehlern lernt man und 2.: das beweist, dass ich den Code geschrieben habe

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