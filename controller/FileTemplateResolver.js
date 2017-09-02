'use babel';

import {FileTemplate}        from './FileTemplate';
import {print}               from './FileSystemResolver';

function isMultipleExtension(fileName) {
  let reg = /\.[a-zA-Z0-9]*/g;
  let extensionCount=0,match = reg.exec(fileName);

  while(match !== null){
    extensionCount++;
    if(extensionCount >1){
      return true;
    }
    match = reg.exec(fileName);
  }

  return false;
}

function fileExtensionExtractor(fileName) {
  if (isMultipleExtension(fileName)) {
    return "*";
  } else {
    return fileName.split(".")[1];
  }
}

export function FileTemplateInjector(fileObject) {
  
  fileObject.writeSync(FileTemplate[fileExtensionExtractor(fileObject.getBaseName())]);

}
