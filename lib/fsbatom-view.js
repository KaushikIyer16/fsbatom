'use babel';

export default class FsbatomView {

  constructor(serializedState) {
    // Create root element
    this.element = document.createElement('div');
    this.element.classList.add('fsbatom');
    this.element.appendChild(this.content());
    // Create message element
    // const message = document.createElement('div');
    // message.textContent = 'Enter the command string';
    // message.classList.add('message');
    //
    // let inputText = document.createElement('div');
    // inputText.classList = 'text';
    // inputText.textContent = 'the command string';
    //
    // this.element.appendChild(message);
    // this.element.appendChild(inputText);

  }

  // Returns an object that can be retrieved when package is activated
  serialize() {}

  // Tear down any state and detach
  destroy() {
    this.element.remove();
  }

  getElement() {

    return this.element;
  }

content(){
    let div = document.createElement('div');
    div.innerHTML = `
            <div class="fsbatom-modal" id="fsbatom-modal">
                <p class="info-message icon icon-plus">
                    Enter the path for the file to be created.
                </p>
                <div class="path-input-container">
                    <atom-text-editor class="path-input" mini></atom-text-editor>
                </div>
                <div class="root-path-input-container">
                    <div class="root-input-text">Root: </div>
                    <atom-text-editor class="root-path-input root-input-block" mini></atom-text-editor>
                </div>
                <ul class="fsb-list-group">
                    <li class="list-item parent-directory">
                        <span class="icon icon-file">...</span>
                    </li>
                </ul>
            </div>
        `;
        return div;
  }
  dom(html) {
    let div = document.createElement('div');
    div.innerHTML = html;
    return div;
}

}
