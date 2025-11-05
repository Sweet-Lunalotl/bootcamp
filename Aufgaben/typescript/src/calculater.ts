//started with scribbles in my notebook

class calculation{
  private readonly inputTerm: string;

  /**
   * Constructs instance of calculation
   * @param term - The term as a string that should be solved
   */
  public constructor(term: string) {
    this.inputTerm = term;
  }

  public calculate(): number{
    let solution = 0;
    let term: string[] = this.parse()
    term = this.addParenthesis(term);
    solution = this.thisIsWhereTheMagicHappens(term);
    return solution;
  }

  /**
   * Takes a string of a term and writes it into an array in a way, that a number of multiple numerals (including ".")
   * stay together and operators are seperated. Does NOT support algebraic signs, yet.
   *
   * @returns String array with numbers and operator seperated
   * @private
   */
  private parse(): string[]{
    const chars: string[] = [];
    const numerals: string[] = [];
    let buffer: string = "";
    for(let pos = 0; pos < this.inputTerm.length; pos++){
      switch (this.inputTerm.charAt(pos)){
        case "1":
        case "2":
        case "3":
        case "4":
        case "5":
        case "6":
        case "7":
        case "8":
        case "9":
        case "0":
        case ".":
        case "+":
        case "-":
        case "*":
        case "/":
        case "^":
          chars.push(this.inputTerm.charAt(pos));
          break;
        case "(":
        case ")":
          //this looks weird but is necessary so parenthesis set by the user have a higher priority than those added
          // by the method addParenthesis()
          chars.push(this.inputTerm.charAt(pos));
          chars.push(this.inputTerm.charAt(pos));
          break;
        default:
          break;
      }
    }
    for(let pos: number = 0; pos < chars.length; pos++){
      switch (chars[pos]){
        case "+":
        case "-":
        case "*":
        case "/":
        case "^":
        case "(":
        case ")":
          if(buffer != ""){
            numerals.push(buffer);
          }
          numerals.push(chars[pos]);
          buffer = "";
          break;
        case "1":
        case "2":
        case "3":
        case "4":
        case "5":
        case "6":
        case "7":
        case "8":
        case "9":
        case "0":
        case ".":
          buffer = buffer + chars[pos];
          break;
      }
      if(pos === chars.length-1){
        if(buffer != ""){
          numerals.push(buffer);
        }
        buffer = "";
      }
    }
    return numerals;
  }

  //this might be a bit overkill, but it said we needed to implement the solving of the term ourselves
  private add(n1: string, n2: string): string{
    const result: number = Number(n1) + Number(n2);
    return result.toString();
  }

  private subtract(n1: string, n2: string): string{
    const result: number = Number(n1) - Number(n2);
    return result.toString();
  }

  private multiply(n1: string, n2: string): string{
    const result: number = Number(n1) * Number(n2);
    return result.toString();
  }

  private divide(n1: string, n2: string): string{
    const result: number = Number(n1) + Number(n2);
    return result.toString();
  }

  private power(n1: string, n2: string): string{
    const nn1: number = Number(n1);
    const nn2: number = Number(n2);
    let result: number = nn1;
    for(let i = 0; i < nn2; i++){
      result*=nn1;
    }
    return result.toString();
  }

  /**
   * To respect point before line calculation this method encapsulates all the summands of the given term in
   * parenthesise by adding ")" before +/- and "(" after +/-.
   * @param term - mathematical term.
   * @returns mathematical term with parenthesise
   * @private
   */
  private addParenthesis(term: string[]): string[]{
    for(let pos: number = 0; pos < term.length; pos++){
      if(pos === 0){
        term.splice(pos, 0, "(")
        pos++;
      }
      if(term[pos] === "+" || term[pos] === "-"){
        term.splice(pos, 0, ")")
        term.splice(pos+2, 0, "(")
        pos+=2;
      }
    }
    if(term[0] === ")"){
      term.shift();
    }
    //close the last parenthesis that was opened because of an operator
    term.push(")");
    //put the whole term in parenthesis so it can even calculate the last calculation of the term
    term.push(")");
    term.unshift("(")
    console.log(term);
    return term;
  }

  /**
   * Takes what is between two parenthesis, makes the calculation of that until only one number is left and returns that as a number
   * @param term - String array that already went through addParenthesis()
   * @returns Solution of the term
   * @private
   */
  private thisIsWhereTheMagicHappens(term: string[]): number{
    let counter: number = 0;
    let miniTerm: string[] = [];
    while(term.length > 1){
      let iOfPar1: number = -1;
      let iOfPar2: number = -1;
      miniTerm.length = 0;
      //find the current first little term that is in parentheses
      for(let pos: number = 0; pos < term.length; pos++){
        iOfPar1 = term.indexOf("(");
        iOfPar2 = term.indexOf(")");
        for(let i = iOfPar1+1; i < iOfPar2; i++){
          if(term[i] === "("){
            iOfPar1 = i;
          }
        }
      }
      //prepare miniTerm to calculate it
      miniTerm = term.splice(iOfPar1, iOfPar2+1-iOfPar1);
      miniTerm.pop();
      miniTerm.shift();
      //hand miniTerms off to calculation
      if(miniTerm.includes("^")){
        miniTerm.splice(miniTerm.indexOf("^")-1, 3, this.power(miniTerm[miniTerm.indexOf("^")-1], miniTerm[miniTerm.indexOf("^")+1]));
      }
      if(miniTerm.includes("*")){
        miniTerm.splice(miniTerm.indexOf("*")-1, 3, this.multiply(miniTerm[miniTerm.indexOf("*")-1], miniTerm[miniTerm.indexOf("*")+1]));
      }
      if(miniTerm.includes("/")){
        miniTerm.splice(miniTerm.indexOf("/")-1, 3, this.divide(miniTerm[miniTerm.indexOf("/")-1], miniTerm[miniTerm.indexOf("/")+1]));
      }
      if(miniTerm.includes("+")){
        miniTerm.splice(miniTerm.indexOf("+")-1, 3, this.add(miniTerm[miniTerm.indexOf("+")-1], miniTerm[miniTerm.indexOf("+")+1]));
      }
      if(miniTerm.includes("-")){
        miniTerm.splice(miniTerm.indexOf("-")-1, 3, this.subtract(miniTerm[miniTerm.indexOf("-")-1], miniTerm[miniTerm.indexOf("-")+1]));
      }
      //in case something went wrong
      counter++;
      if(counter > 10000){
        throw new Error("Dude, u alright?");
      }
      if(miniTerm.length > 1){
        throw new Error("The miniTerm should only be 1 long at this point")
      }
      //put the result of the miniTerm back in the big one
      term.splice(iOfPar1, 0, miniTerm[0])
      console.log(term);
      console.log("mini: ", miniTerm);
    }
    console.log(term);
    return Number(term[0]);
  }

  //end of class
}

const mew = new calculation("2+3*15");

console.log(mew.calculate());



/*
Another code another family of bugs to reunite

(]]]){ <- This is Friday5pm.
THis little guy makes my code do /nothing/. The addParentheses() function does not work. I even wrote down, that it is
too complicated...
So turns out if you want to add something to the first position of the array, you need say it should be at index 0.
Who would have thunken?! And added a parentheses at the end.

(]]]){ <- This is Wednesday10am.
Best buddy of Friday5pm. Because the code still does /nothing/. There is an infinity loop somewhere in
thisIsWhereTheMagicHappens(). Nor it throws me the "Dude, u alright?"-Error. So that's progress.
Now I know that the miniTerm[] is empty, so nothing is getting calculated. Now miniTerm contains stuff because I
mixed up iOfPar1 and iOfPar2 in the following: "miniTerm = term.splice(iOfPar1, iOfPar2+1-iOfPar1);"
I forgot to write the miniTerm back into the big one... Now it's fixed

It works now!!!!

 */