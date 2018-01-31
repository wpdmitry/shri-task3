import {BaseComponent} from "../../framework/BaseComponent";
import {CONFIRMED, OK, UNCONFIRMED} from "../../events";
import {Button} from "../button/button";

export class Notification extends BaseComponent {

    constructor({type}) {
        super();
        this.type = type;
    }

    template() {
        return `
                <div class="notification">
                    <img class="notification__emoji" src="" alt="emogi">
                    <div class="notification__status"></div>
                    <div class="notification__info">
                        <div class="notification__datetime"></div>
                        <div class="notification__location"></div>    
                    </div>
                    <div class="notification__buttons">
                        <div class="notification__button notification__button_create"></div>
                        <div class="notification__button notification__button_cancel"></div>
                        <div class="notification__button notification__button_delete"></div>
                    </div>
                </div>

            `
    }

    onRender() {
        switch (this.type) {
            case 'create': this.createNoteCreate(); break;
            case 'delete': this.createNoteDelete(); break;
        }

        this.buttonCancelElement.on('click', () => this.handleCancel());
        this.buttonDeleteElement.on('click', () => this.handleDelete());
        this.buttonCreateElement.on('click', () => this.handleCreate());
    }

    createNoteCreate() {
        const img = this.emojiElement;
        img.setAttribute('src', 'image/svg/emoji2.svg');

        const status = this.statusElement;
        status.innerHTML = `Встреча создана`;

        const buttonCreate = new Button({
            modBtn: 'create',
            btnText: 'Хорошо',
            modBtnText: ['white', 'bold'],
        });
        buttonCreate.renderTo(this.buttonCreateElement);

        this.infoElement.show();
        this.buttonDeleteElement.hide();
        this.buttonCancelElement.hide();

        this.buttonsElement.classList.add('notification__buttons_unactive');
    }

    createNoteDelete() {
        const img = this.emojiElement;
        img.setAttribute('src', 'image/svg/emoji1.svg');

        const status = this.statusElement;
        status.innerHTML = `
            Встреча будет <br>
            удалена безвозвратно 
        `;

        const buttonCancel = new Button({
            modBtn: 'cancel',
            btnText: 'Отмена',
            modBtnText: ['black', 'bold'],
        });
        buttonCancel.renderTo(this.buttonCancelElement);

        const buttonDelete = new Button({
            modBtn: 'delete',
            btnText: 'Удалить',
            modBtnText: ['black', 'bold'],
        });
        buttonDelete.renderTo(this.buttonDeleteElement);

        this.infoElement.hide();
        this.buttonCreateElement.hide();

        this.buttonsElement.classList.remove('notification__buttons_unactive');
    }

    handleCancel() {
        this.triggerEvent(UNCONFIRMED);
    }

    handleDelete() {
        this.triggerEvent(CONFIRMED);
    }

    handleCreate() {
        this.triggerEvent(OK);
    }

    setDateTime(str) {
        console.log(str);
        this.datetimeElement.innerHTML = str;
    }

    setLocation(str) {
        console.log(str);
        this.locationElement.innerHTML = str;
    }

    get buttonCancelElement() {
        return this.getElement('.notification__button_cancel');
    }

    get buttonDeleteElement() {
        return this.getElement('.notification__button_delete');
    }

    get buttonCreateElement() {
        return this.getElement('.notification__button_create')
    }

    get emojiElement() {
        return this.getElement('.notification__emoji');
    }

    get statusElement() {
        return this.getElement('.notification__status');
    }

    get infoElement() {
        return this.getElement('.notification__info');
    }

    get datetimeElement() {
        return this.getElement('.notification__datetime');
    }

    get locationElement() {
        return this.getElement('.notification__location');
    }

    get buttonsElement() {
        return this.getElement('.notification__buttons');
    }
}