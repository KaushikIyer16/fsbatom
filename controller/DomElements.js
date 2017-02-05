'use babel';

import {print}  from './FileSystemResolver';

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
  while (domElement.firstChild) {
    domElement.removeChild(domElement.firstChild);
  }
}

export function addChildToParent(parentDom ,childElement){
  let parentDomElement = document.querySelector(parentDom);
  parentDomElement.appendChild(childElement);
}

export function computeMargin(baseMargin, addedMargin){
  return baseMargin+addedMargin+'px)';
}
