'use babel';

import {fileMap}                    from '../controller/FileMap';
import {fileSpan,directorySpan,li,
        clearList,addChildToParent,
        computeMargin,createFile,
        createDirectory}              from './DomElements';


export function print(printString) {
  console.log(printString);
}

export function resolveDirectory(filePath){
  return filePath.substring(0,filePath.lastIndexOf('/')+1);
}

export class FileSystemResolver{
  parseString:null;

  constructor(){

    // print(this.parseString+" is the directory to be parsed");
    // this.main(parseString);
  }
  setParseString(parseString){
    this.parseString = parseString;
  }
  containsMinus(argument){
    return (
      argument[0] === '-' ?
      true   :
      false
    );
  }

  containsTilde(argument){
    return(argument[0] === '~' ? true : false);
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
      match = reg.exec(argument);
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

  getCustomExtension(argument){
    return argument.replace('-','.');
  }

  getExtensionFromArgument(argument){
    if (fileMap[argument] !== undefined) {
      return fileMap[argument];
    }else{
      return this.getCustomExtension(argument);
    }
  }

  getMultipleExtensionFromArgument(argument){
    let reg = /-[a-zA-z0-9]*/g;
    let match = reg.exec(argument),returnedFormat = '';

    while(match !== null){
      returnedFormat +=this.getExtensionFromArgument(match[0]);
      match = reg.exec(argument);

    }

    return returnedFormat;
  }

  getRoothPathFromModal(){
    return document.querySelector('.root-input-block').getModel().getText();
  }

  RollUpDirectory(currentDirectory){
    let reg = /\/[a-zA-Z0-9]*\/?/g;
    currentDirectory = currentDirectory.substr(0,currentDirectory.length-1);
    return currentDirectory.substr(0,currentDirectory.lastIndexOf('/')+1);

  }
  /*This is the function that will be called to initiate the parsing of the input string to
  the directory structure*/
  main(){
    let argv = this.parseString.trim().split(' ');
    let directoryList = new Array();
    let fileList = new Array();
    let openFileList = new Array();
    let currentDirectory = "",
        currentFormat    = "",
        rootPath         = this.getRoothPathFromModal();

    if (argv.length > 0 && argv[0] !== '') {

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
            currentFormat = this.getExtensionFromArgument(argv[i]);
          }

        }else if(this.isDrillDown(argv[i])){
          // in tree branch over here
          currentFormat = "";
          continue;
        }else if(this.isRollUp(argv[i])){
          // in the tree now we have to go one level up
          currentFormat = "";
          currentDirectory = this.RollUpDirectory(currentDirectory);
          continue;
        }else if(currentFormat === "" && !this.containsFormat(argv[i]) ){
          if (i>0 && (this.isDrillDown(argv[i-1]) || this.isRollUp(argv[i-1]) || this.isDirectory(argv[i-1])) ) {
            currentDirectory += argv[i]+"/";
          } else {
            currentDirectory = this.RollUpDirectory(currentDirectory);
            currentDirectory += argv[i]+"/";
          }

          // print("--"+rootPath+currentDirectory+"\n");
          // new Directory("/Users/kaushiknsiyer/DD1").create();
          directoryList.push(rootPath+currentDirectory);

        }else{
          // here i need to add nodes to the tree and create a complete tree
          // print("---"+rootPath+currentDirectory+argv[i]+currentFormat+"---\n");
          try {
            // createFile(rootPath+currentDirectory+argv[i]+currentFormat);
            if (this.containsTilde(argv[i])) {
              openFileList.push(currentDirectory+argv[i]+currentFormat);
              fileList.push(rootPath+currentDirectory+argv[i].substring(1)+currentFormat);
            }
            else{
              fileList.push(rootPath+currentDirectory+argv[i]+currentFormat);
            }

          } catch (e) {
            print("error creating the file");
          }

        }

      }
      let allValidFiles = true; // change this to false when you finish the package

      for (let i = 0; i < directoryList.length; i++) {
        createDirectory(directoryList[i]);
      }
      for (let i = 0; i < fileList.length; i++) {
        createFile(fileList[i]);
      }

      for (var i = 0; i < openFileList.length; i++) {
        atom.workspace.open(openFileList[i].substring(1));
      }
      if (allValidFiles) {
        atom.notifications.addSuccess("\nFolders/Files Successfully Created\n");
      } else {
        atom.notifications.addError("\nSome/All Files/Directories are invalid\n");
      }

    } else {
      // print("\nEMPTY FILE STRUCTURE GIVEN TO FSB\n");
      // here i will add a notification to say that an empty structure is given

      atom.notifications.addWarning("\nEMPTY FILE STRUCTURE GIVEN TO FSB\n");
    }

  }

  mainTemplate(){
    let argv = this.parseString.trim().split(' ');
    let baseMargin = 'calc(2% + ';
    let addedMargin = 0;
    clearList('.fsb-list-group');

    let currentDirectory = "",
        currentFormat    = "";

    if (argv.length > 0 && argv[0] !== '') {

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
            currentFormat = this.getExtensionFromArgument(argv[i]);
          }

        }else if(this.isDrillDown(argv[i])){
          // in tree branch over here
          currentFormat = "";
          addedMargin += 10;
          currentDirectory += argv[i]+"/";
          // ~~ addChildToParent('.list-group',li(true,currentDirectory,computeMargin(baseMargin,addedMargin)));
          continue;
        }else if(this.isRollUp(argv[i])){
          // in the tree now we have to go one level up
          currentFormat = "";
          currentDirectory = this.RollUpDirectory(currentDirectory);
          addedMargin -= 10;
          continue;
        }else if(currentFormat === "" && !this.containsFormat(argv[i]) ){

          if (this.containsTilde(argv[i])) {
            addChildToParent('.fsb-list-group',li(true,argv[i].substring(1),computeMargin(baseMargin,addedMargin)));
          }
          else{
            addChildToParent('.fsb-list-group',li(true,argv[i],computeMargin(baseMargin,addedMargin)));
          }
          // print("--"+currentDirectory+"\n");
        }else{
          // here i need to add nodes to the tree and create a complete tree
          if (this.containsTilde(argv[i])) {
            addChildToParent('.fsb-list-group',li(false,(argv[i]+currentFormat).substring(1),computeMargin(baseMargin,addedMargin)));
          }
          else{
            addChildToParent('.fsb-list-group',li(false,argv[i]+currentFormat,computeMargin(baseMargin,addedMargin)));
          }

          // print("---"+currentDirectory+argv[i]+currentFormat+"---\n");

        }

      }
      addChildToParent('.fsb-list-group',li(false,'...',computeMargin(baseMargin,0)));

    } else {
      // print("\nEMPTY FILE STRUCTURE GIVEN TO FSB\n");
      // here i will add a notification to say that an empty structure is given
      clearList('.fsb-list-group');

      addChildToParent('.fsb-list-group',li(false,'...',computeMargin(baseMargin,0)));
    }
  }

}
