import {Base} from "../base/base";
import {CONFIRMED_DELETE, UNCONFIRMED_DELETE} from "../../events";

export class Notification extends Base {

    constructor() {
        super();
    }

    render() {
        return `
                <div class="notification">
                    <img class="notification__emoji" src="image/svg/emoji1.svg" alt="">
                    <div class="notification__status">Встреча будет <br> удалена безвозвратно</div>
                    <div class="notification__buttons">
                        <div class="notification__button notification__button_cancel">
                            <button class="button button_cancel">
                                <span class="button__text button__text_black button__text_increase button__text_bold">Отмена</span>
                            </button>
                        </div>
                        <div class="notification__button notification__button_delete">
                            <button class="button button_cancel">
                                <span class="button__text button__text_black button__text_increase button__text_bold">Удалить</span>
                            </button>
                        </div>
                    </div>
                </div>

            `
    }

    onRender() {
        this.cancelElement.on('click', () => this.handleCancel());
        this.deleteElement.on('click', () => this.handleDelete());
    }

    handleCancel() {
        this.triggerEvent(UNCONFIRMED_DELETE);
    }

    handleDelete() {
        this.triggerEvent(CONFIRMED_DELETE);
    }

    get cancelElement() {
        return this.getElements('notification__button_cancel');
    }

    get deleteElement() {
        return this.getElements('notification__button_delete');
    }
}