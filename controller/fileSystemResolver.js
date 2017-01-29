'use babel';

import {fileMap}                    from '../controller/FileMap';

export function print(printString) {
  console.log(printString);
}

export class FileSystemResolver{
  parseString:null;

  constructor(parseString){
    this.parseString = parseString;
    print(this.parseString+" is the directory to be parsed");
    print(fileMap['-p']);
  }

}
