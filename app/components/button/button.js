import {BaseComponent} from "../../framework/BaseComponent";

export class Button extends BaseComponent {

    constructor({btnText, modBtn, modBtnText = []}) {
        super();
        this.btnText = btnText;
        this.modBtn = modBtn;
        this.modBtnText = modBtnText;
    }

    template() {
        const modBtn = `button_${this.modBtn}`;

        const modBtnText = this.modBtnText.map((item) => {
            return `button__text_${item}`;
        });

        return `
            <button class="button ${modBtn}">
                <span class="button__text ${modBtnText.join(' ')}">${this.btnText}</span>
            </button>
        `
    }

    onRender() {}

    upgrade() {}

    setDisabled() {
        this.domElement.classList.remove('button_create');

        this.domElement.classList.add('button_disabled');
        this.textElement.classList.add('button__text_disabled');
    }

    setActive() {
        this.domElement.classList.add('button_create');

        this.domElement.classList.remove('button_disabled');
        this.textElement.classList.remove('button__text_disabled');
    }

    setAllow() {
        this.domElement.classList.remove('button_disabled');
        this.textElement.classList.remove('button__text_disabled');

        this.domElement.classList.add('button_create')
    }

    get textElement() {
        return this.getElement('.button__text');
    }
}