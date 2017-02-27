'use babel';

import FsbatomView                  from './fsbatom-view';
import { CompositeDisposable,File,
          BufferedProcess}          from 'atom';
import {print,FileSystemResolver,
        resolveDirectory}           from '../controller/FileSystemResolver';


export default {

  fsbatomView: null,
  modalPanel: null,
  subscriptions: null,
  editorSubscriptions: null,
  parentObj: null,
  outsideListener: null,
  enterListener: null,
  backspaceListener: null,
  keydownListener: null,
  fileSystemResolver: null,
  copyCommand: null,


  activate(state) {
    this.fsbatomView = new FsbatomView(state.fsbatomViewState);
    this.fileSystemResolver = new FileSystemResolver();
    parentObj = this;

    this.addSubciptions();

    enterListener = (event) => {
      if (event.keyCode === 13) {
        this.initFileSystemResolver('.path-input');
        this.fileSystemResolver.main();
        parentObj.hideModal();
      }
    };

    keydownListener = (event) => {
      if ((event.ctrlKey || event.metaKey) && event.which === 86) {
        clearTimeout(keydownListener);
        clearTimeout(backspaceListener);
        setTimeout(() => {
          this.initFileSystemResolver('.path-input');
          this.fileSystemResolver.mainTemplate();
        },750);
      }
      if(event.which === 32){
        clearTimeout(keydownListener);
        clearTimeout(backspaceListener);
        setTimeout(() => {
          this.initFileSystemResolver('.path-input');
          this.fileSystemResolver.mainTemplate();
        },750);
      }
    };

    backspaceListener = (event) => {

      clearTimeout(backspaceListener);
      if (event.which === 8 || event.which === 190) {

        setTimeout(() => {
          this.initFileSystemResolver('.path-input');
          this.fileSystemResolver.mainTemplate();
        },1000);
      }
    };

    mouseWheelListener = (event) => {
      print("listener is listening");
      var ul = document.querySelector('.list-group');
      if (event.wheelDeltaY >= 0 && ul.offsetHeight > 550 ) {
        // this means the list has to scroll up
        ul.style.marginTop = -event.wheelDeltaY/600*550+"px";
      } else {
        ul.style.marginTop = event.wheelDeltaY/600*550+"px";
      }
    };

    outsideListener = (event) => {

      document.querySelector('.path-input').addEventListener('keydown', enterListener);
      document.querySelector('.path-input').addEventListener('keyup', backspaceListener);
      // document.querySelector('.list-group').addEventListener('wheel',mouseWheelListener);
      document.querySelector('.path-input').addEventListener('keydown',keydownListener);
      if (event.target.closest(".fsbatom-modal") === null && parentObj.modalPanel !== null) {

        // this.initFileSystemResolver('.path-input');
        // 1. show how the structure would look like 2. create the files 3. add notifications
        parentObj.hideModal();

      }
    };

    document.documentElement.addEventListener( 'click',outsideListener);


  },

  deactivate() {
    this.modalPanel.destroy();
    this.subscriptions.dispose();
    this.editorSubscriptions.dispose();
    this.fsbatomView.destroy();
  },

  serialize() {
    return {
      fsbatomViewState: this.fsbatomView.serialize()
    };
  },

  toggleModal() {
    if (this.modalPanel === null) {
      this.modalPanel = atom.workspace.addModalPanel({
        item: this.fsbatomView.getElement(),
        visible: false
      });

      document.documentElement.addEventListener( 'click',outsideListener);
      this.setDefaultRoot();
    }else{
      document.getElementById('fsbatom-modal').style.display = 'block';
    }
    return (
      this.modalPanel.isVisible() ?
      this.modalPanel.hide() :
      this.modalPanel.show()
    );
  },

  hideModal(){
    document.querySelector('.path-input').removeEventListener('keydown',enterListener);
    document.querySelector('.path-input').removeEventListener('keyup',backspaceListener);
    // document.querySelector('.list-group').removeEventListener('wheel',mouseWheelListener);
    document.querySelector('.path-input').removeEventListener('keydown',keydownListener);
    this.modalPanel.destroy();
    this.modalPanel = null;

    document.documentElement.removeEventListener('click', outsideListener);

  },

  addSubciptions(){
    // Events subscribed to in atom's system can be easily cleaned up with a CompositeDisposable
    this.subscriptions = new CompositeDisposable();
    // this.editorSubscriptions = document.querySelector('.path-input').getModel().observeTextEditors(
    //   (editor) => {
    //     const editorSubscriptions = new CompositeDisposable();
    //     editorSubscriptions.add(editor.onDidOpen(
    //       () => {print("the modal was opened");}
    //     ));
    //
    //     editor.onDidDestroy(() => {
    //     editorSubscriptions.dispose();
    //   });
    //   }
    // );

    // Register commands that work with the package
    this.subscriptions.add(atom.commands.add('atom-workspace', {
      'fsbatom:toggleModal': () => this.toggleModal(),
      'fsbatom:hideModal': () => this.hideModal()
    }));
  },

  initFileSystemResolver(dom){
    let pathInput = document.querySelector(dom);
    let pathEditor = pathInput.getModel();
    this.fileSystemResolver.setParseString(pathEditor.getText());
  },

  setDefaultRoot(){
    let rootInputText = document.querySelector('.root-input-block').getModel();
    let currFileDirectory = atom.workspace.getActiveTextEditor().getPath();
    if (currFileDirectory == null || currFileDirectory == "") {
      rootInputText.setText("");
    }else{
      rootInputText.setText(resolveDirectory(currFileDirectory));
    }

  }

};
