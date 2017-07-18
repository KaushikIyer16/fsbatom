'use babel';

import FileTemplate        from 'FileTemplate';
import mkdirp              from 'mkdirp';
import touch               from 'touch';
import resolveDirectory    from 'FileSystemResolver';

export class FilesystemCreator {

  fileList:null;
  openFileList:null;
  directoryList:null;

  constructor(fileList,openFileList,directoryList) {
    this.fileList = fileList;
    this.openFileList = openFileList;
    this.directoryList = directoryList;
  }

  generateFileSystem(){
    return this.createDirectoryRecursive() && this.createFileRecursive();

  }

  createDirectoryRecursive(){
    for (directory of directoryList) {
      
    }
  }

  createDirectory(dirPath){
    let directory = new Directory(dirPath);
    // if (!directory.existsSync()) {
    //   directory.create();
    // }else{
    //   print("this directory already exists");
    // }
    try {
      if (!directory.existsSync()) {
        mkdirp.sync(dirPath);

      }else{
        atom.notifications.addError(dirPath+" already exists");

      }
    } catch (err) {
      if (err.code !== 'ENOENT') {
          print("directory already exists");
          atom.notifications.addWarning(dirPath+" already exists");
      }
    }
  }

  createFile(filePath){
    // let file = new File(dirPath);
    // if (!file.existsSync()) {
    //   file.create();
    // } else {
    //   print("this file already exists");
    // }
    let file = new File(filePath);
    let directoryLoc = resolveDirectory(filePath);
    let directory = new Directory(directoryLoc);
    try {
      if (!directory.existsSync()) {
        atom.notifications.addError(directoryLoc+" does not exists");

      }else{
        if (!file.existsSync()) {
          touch.sync(filePath);

        }else{
          atom.notifications.addError(filePath+" already exists");

        }
      }
    } catch (err) {
      if (err.code !== 'ENOENT') {
          print("directory already exists");
          atom.notifications.addWarning(directoryLoc+" already exists");
      }
    }
}
