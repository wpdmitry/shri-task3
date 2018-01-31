import {BaseComponent} from "../../framework/BaseComponent";
import {BREAK_PROMISES, MAIN_PAGE} from "../../events";

export class Status extends BaseComponent {

    constructor() {
        super();
    }

    template() {
        return `
            <div class="status">
                <div class="status__text"></div>
                <div class="status__close">
                    <img class="status__image" src="image/svg/close.svg" alt="">
                </div>
            </div> 
        `
    }

    onRender() {
        this.closeElement.on('click', () => this.handleClose());
    }

    handleClose() {
        this.triggerEvent(MAIN_PAGE);
    }

    setText(text) {
        this.textElement.textContent = text;
    }

    get closeElement() {
        return this.getElement('.status__close');
    }

    get textElement() {
        return this.getElement('.status__text');
    }
}