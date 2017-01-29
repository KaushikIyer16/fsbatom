'use babel';

import FsbatomView from './fsbatom-view';
import { CompositeDisposable,File } from 'atom';
import {print,fileSystemResolver} from '../controller/fileSystemResolver';

export default {

  fsbatomView: null,
  modalPanel: null,
  subscriptions: null,
  parentObj: null,
  outsideListener: null,



  activate(state) {
    this.fsbatomView = new FsbatomView(state.fsbatomViewState);
    parentObj = this;
    // this.modalPanel = atom.workspace.addModalPanel({
    //   item: this.fsbatomView.getElement(),
    //   visible: false
    // });

    this.addSubciptions();

    outsideListener = function(event) {
      console.log("click is being listened to");


      if (event.target.closest(".fsbatom-modal") === null && parentObj.modalPanel !== null) {

        let pathInput = document.querySelector('.path-input');
        let pathEditor = pathInput.getModel();
        console.log(pathEditor.getText());
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
    console.log("knsi is called");
    // let editor;
    // if (editor = atom.workspace.getActiveTextEditor()) {
    //   let selection = editor.getSelectedText();
    //   editor.insertText('knsi rules');
    // }

    // console.log(atom.workspace.getModalPanels());
  },

  hideModal(){
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
  }

};
