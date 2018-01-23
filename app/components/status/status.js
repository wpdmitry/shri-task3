import {Base} from "../base/base";
import {SHOW_MAIN} from "../../events";

export class Status extends Base {

    constructor(text) {
        super();
        this.text = text;
    }

    render() {
        return `
            <div class="status">
                <div class="status__text">${this.text}</div>
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
        this.triggerEvent(SHOW_MAIN);
    }

    get closeElement() {
        return this.getElements('status__close');
    }
}