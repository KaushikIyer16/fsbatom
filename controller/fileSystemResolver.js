'use babel';

import {fileMap}                    from '../controller/FileMap';

export function print(printString) {
  console.log(printString);
}

export class FileSystemResolver{
  parseString:null;

  constructor(parseString){
    this.parseString = parseString;
    // print(this.parseString+" is the directory to be parsed");
    this.main(parseString);
  }

  containsMinus(argument){
    return (
      argument[0] === '-' ?
      true   :
      false
    );
  }

  isDirectory(argument){
    if(argument[1] === 'd' && argument[0] === '-'){
      return true;
    }else{
      return false;
    }

  }

  isValidExtension(argument){
    if (fileMap[argument] === undefined) {
      return false;
    } else {
      return true;
    }
  }

  isMultipleExtension(argument){

    let reg = /-[a-zA-Z0-9]*/g;
    let extensionCount=0,match = reg.exec(argument);

    while(match !== null){
      extensionCount++;
      if(extensionCount >1){
        return true;
      }
    }

    return false;

  }

  isDrillDown(argument){
    if (argument[0] == '/') {
      return true;
    } else {
      return false;
    }
  }

  isRollUp(argument){
    if (argument[0] == '^') {
      return true;
    } else {
      return false;
    }
  }

  containsFormat(argument){
    let length = 0;
    while(length < argument.length){
      if (argument[length] == '.') {
        return true;
      }
      length++;
    }
    return false;
  }


  getExtensionFromArgument(argument){
    return fileMap[argument];
  }

  getMultipleExtensionFromArgument(argument){
    let reg = /-[a-zA-z0-9]*/g;
    let match = reg.exec(argument),returnedFormat = '';

    while(match !== null){
      if (fileMap[match] !== undefined) {
        returnedFormat += fileMap[match[0]];
        match = reg.exec(argument);
      }

    }

    return returnedFormat;
  }

  RollUpDirectory(currentDirectory){
    let reg = /\/[a-zA-Z0-9]*?/g;

    let match = reg.exec(currentDirectory);
    return currentDirectory.substr(0,currentDirectory.indexOf(match[0])+1);


  }
  /*This is the function that will be called to initiate the parsing of the input string to
  the directory structure*/
  main(parseString){
    let argv = parseString.split(' ');
    print(argv);

    let currentDirectory = "",
        currentFormat    = "";

    if (argv.length > 0) {

      for (let i = 0; i < argv.length; i++) {

        if (this.containsMinus(argv[i])) {
          if(this.isDirectory(argv[i])){
            currentFormat = "";
          }
          // now i will have to check for multiple extensions
          else if(this.isMultipleExtension(argv[i])){
            currentFormat += this.getMultipleExtensionFromArgument(argv[i]);
          }
          else{
            currentFormat += this.getExtensionFromArgument(argv[i]);
          }
          print("the current format is "+currentFormat);
        }else if(this.isDrillDown(argv[i])){
          // in tree branch over here
          continue;
        }else if(this.isRollUp(argv[i])){
          // in the tree now we have to go one level up
          currentFormat = "";
          currentDirectory = this.RollUpDirectory(currentDirectory);
          continue;
        }else if(currentFormat === "" && !this.containsFormat(argv[i]) ){
          currentDirectory += argv[i]+"/";
          print("--"+currentDirectory+"\n");
        }else{
          // here i need to add nodes to the tree and create a complete tree
          print("---"+currentDirectory+argv[i]+currentFormat+"---\n");

        }

      }
    } else {
      print("\nEMPTY FILE STRUCTURE GIVEN TO FSB\n");
      // here i will add a notification to say that an empty structure is given
    }

  }

}
