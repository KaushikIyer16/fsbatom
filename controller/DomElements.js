'use babel';

import {print,resolveDirectory} from './FileSystemResolver';
import {File,Directory}         from 'atom';
import mkdirp                   from 'mkdirp';
import touch                    from 'touch';
export function directorySpan(directoryName){
  let span = document.createElement('span');
  span.classList = 'icon icon-file-directory';
  span.innerHTML = directoryName;
  return span
}

export function fileSpan(fileName) {
  let span = document.createElement('span');
  span.classList = 'icon icon-file';
  span.innerHTML = fileName;
  return span;
}

export function li(isDirectory,name,computedMargin){
  // if the value of isDirectory is true then retrun a directory li else return a file li
  let li = document.createElement('li');
  li.classList = 'list-item';
  li.style.marginLeft = computedMargin;
  if (isDirectory) {
    li.appendChild(directorySpan(name));
    return li;
  } else {
    li.appendChild(fileSpan(name));
    return li;
  }
}

export function clearList(dom){
  let domElement = document.querySelector(dom);
  if (domElement != null) {
    while (domElement.firstChild) {
      domElement.removeChild(domElement.firstChild);
    }
  }
}

export function addChildToParent(parentDom ,childElement){
  let parentDomElement = document.querySelector(parentDom);
  if (parentDomElement != null) {
    parentDomElement.appendChild(childElement);
  }

}

export function computeMargin(baseMargin, addedMargin){
  return baseMargin+addedMargin+'px)';
}

export function createDirectory(dirPath){
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

export function createFile(filePath){
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
      return null;
    }else{
      if (!file.existsSync()) {
        touch.sync(filePath);
        return file;
      }else{
        atom.notifications.addError(filePath+" already exists");
        return null;
      }
    }
  } catch (err) {
    if (err.code !== 'ENOENT') {
        print("directory already exists");
        atom.notifications.addWarning(directoryLoc+" already exists");
    }
    return null;
  }

}
