// this js file will consist a majority of the core api's that are reuired to compile the given
// command string to the given directory format


export function print(printString) {
  console.log(printString);
}

export default class fileSystemResolver{
  let parseString = "";

  constructor(parseString){
    this.parseString = parseString;
    print(this.parseString);
  }

}
