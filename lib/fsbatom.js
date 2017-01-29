'use babel';

import FsbatomView                  from './fsbatom-view';
import { CompositeDisposable,File } from 'atom';
import {print,FileSystemResolver}   from '../controller/FileSystemResolver';


export default {

  fsbatomView: null,
  modalPanel: null,
  subscriptions: null,
  parentObj: null,
  outsideListener: null,
  enterListener: null,
  fileSystemResolver:null,


  activate(state) {
    this.fsbatomView = new FsbatomView(state.fsbatomViewState);

    parentObj = this;
    // this.modalPanel = atom.workspace.addModalPanel({
    //   item: this.fsbatomView.getElement(),
    //   visible: false
    // });

    this.addSubciptions();

    enterListener = (event) => {
      if (event.keyCode === 13) {
        print("enter was clicked");
        this.initFileSystemResolver('.path-input');
        parentObj.hideModal();
      }
    };

    outsideListener = (event) => {
      // print("listener is being clicked");
      document.querySelector('.path-input').addEventListener('keydown',enterListener);
      if (event.target.closest(".fsbatom-modal") === null && parentObj.modalPanel !== null) {

        this.initFileSystemResolver('.path-input');
        parentObj.hideModal();

      }
    };

    document.documentElement.addEventListener( 'click',outsideListener);


  },

  deactivate() {
    this.modalPanel.destroy();
    this.subscriptions.dispose();
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
    }else{
      document.getElementById('fsbatom-modal').style.display = 'block';
    }
    return (
      this.modalPanel.isVisible() ?
      this.modalPanel.hide() :
      this.modalPanel.show()
    );
  },

  knsi(){
    print("knsi is being called");

    // let editor;
    // if (editor = atom.workspace.getActiveTextEditor()) {
    //   let selection = editor.getSelectedText();
    //   editor.insertText('knsi rules');
    // }

    // console.log(atom.workspace.getModalPanels());
  },

  hideModal(){
    document.querySelector('.path-input').removeEventListener('keydown',enterListener);
    this.modalPanel.destroy();
    this.modalPanel = null;

    document.documentElement.removeEventListener('click', outsideListener);

  },

  addSubciptions(){
    // Events subscribed to in atom's system can be easily cleaned up with a CompositeDisposable
    this.subscriptions = new CompositeDisposable();

    // Register commands that work with the package
    this.subscriptions.add(atom.commands.add('atom-workspace', {
      'fsbatom:toggleModal': () => this.toggleModal(),
      'fsbatom:knsi': () => this.knsi(),
      'fsbatom:hideModal': () => this.hideModal()
    }));
  },

  initFileSystemResolver(dom){
    let pathInput = document.querySelector(dom);
    let pathEditor = pathInput.getModel();
    this.fileSystemResolver = new FileSystemResolver(pathEditor.getText());
  }

};
