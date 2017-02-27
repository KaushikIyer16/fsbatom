'use babel';

import {print}                  from './FileSystemResolver';
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
  // let directory = new Directory(filePath);
  // if (!directory.existsSync()) {
  //   directory.create();
  // }else{
  //   print("this directory already exists");
  // }
  try {
      mkdirp.sync(dirPath);
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
  touch.sync(filePath);
}
