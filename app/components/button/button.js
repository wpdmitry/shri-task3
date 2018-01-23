import {Base} from "../base/base";

export class Button extends Base {

    constructor({btnText, modBtn = [], modBtnText = []}) {
        super();
        this.btnText = btnText;
        this.modBtn = modBtn;
        this.modBtnText = modBtnText;
    }

    render() {
        this.modBtn = this.modBtn.map((item) => {
            return `button_${item}`;
        });

        this.modBtnText = this.modBtnText.map((item) => {
            return `button__text_${item}`;
        });

        return `
            <button class="button ${this.modBtn.join(' ')}">
                <span class="button__text ${this.modBtnText.join(' ')}">${this.btnText}</span>
            </button>
        `
    }
}