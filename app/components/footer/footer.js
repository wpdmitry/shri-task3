import {Base} from "../base/base";
import {Button} from "../button/button";
import {AutoBind} from "../autobind/autobind";
import {createEvent} from "../../api/createEvent";
import {removeEvent} from "../../api/removeEvent";
import {CONFIRMED_DELETE, SHOW_MAIN, UNCONFIRMED_DELETE} from "../../events";
import {Notification} from "../notification/notification";

export class Footer extends Base {

    constructor({edit}) {
        super();
        this.edit = edit;
    }

    render() {
        return `
            <footer class="footer">
                ${this.edit ? 
                    `<div class="footer__notification"></div>
                     <div class="footer__bg"></div>
                     `
                    :
                    ''
                }
                
                <div class="footer__button footer__button_cancel"></div>
                ${this.edit ?
                    `<div class="footer__button footer__button_delete"></div>
                     <div class="footer__button footer__button_save"></div>` 
                        :
                    `<div class="footer__button footer__button_create"></div>`
                }   
            </footer>
        `
    }

    onRender() {
        this.edit ? this.showForEdit() : this.showForCreate();
        this.edit ? this.drawDeleteNotification() : null;

        this.domElement.on(CONFIRMED_DELETE, () => this.handleDelete());
        this.domElement.on(UNCONFIRMED_DELETE, () => this.handleUnconfirmed());
    }

    showForCreate() {
        const buttonCreate = new Button({
            btnText: 'Создать встречу',
            modBtn: ['create'],
            modBtnText: ['white', 'bold'],
        });

        const buttonCancel = new Button({
            btnText: 'Отмена',
            modBtn: ['cancel'],
            modBtnText: ['black', 'bold'],
        });

        buttonCreate.renderTo(this.buttonCreateElement);
        buttonCancel.renderTo(this.buttonCancelElement);

        this.buttonCancelElement.on('click', () => this.handleCancel());
        this.buttonCreateElement.on('click', () => this.handleCreate());
    }

    showForEdit() {
        const buttonSave = new Button({
            btnText: 'Сохранить',
            modBtn: ['save'],
            modBtnText: ['white', 'bold'],
        });

        const buttonCancel = new Button({
            btnText: 'Отмена',
            modBtn: ['cancel'],
            modBtnText: ['black', 'bold'],
        });

        const buttonDelete = new Button({
            btnText: 'Удалить встречу',
            modBtn: ['delete'],
            modBtnText: ['black', 'bold']
        });

        this.buttonCancelElement.on('click', () => this.handleCancel());
        this.buttonDeleteElement.on('click', () => this.handleConfirmed());

        buttonCancel.renderTo(this.buttonCancelElement);
        buttonDelete.renderTo(this.buttonDeleteElement);
        buttonSave.renderTo(this.buttonSaveElement);
    }

    drawDeleteNotification() {
        const notification = new Notification();
        notification.renderTo(this.notificationElement);
    }

    handleCreate() {
        const autobind = new AutoBind();

        const inputTitle = autobind.getVariable('inputTitle')[0].el.value,
            inputDate = autobind.getVariable('inputDate')[0].el.value,
            inputTimeStart = autobind.getVariable('inputTimeStart')[0].el.value,
            inputTimeEnd = autobind.getVariable('inputTimeEnd')[0].el.value,
            usersId = autobind.getVariable('member').map(item => {
                return item.el.getAttribute(item.props[0]);
            }),
            room = autobind.getVariable('chosenTalk')[0].el.props[0];

        createEvent({
            title: inputTitle,
            date: inputDate,
            timeStart: inputTimeStart,
            timeEnd: inputTimeEnd,
            users: usersId,
            room: room,
            callback: console.log,
        });
    }

    handleCancel() {
        this.triggerEvent(SHOW_MAIN);
    }

    handleConfirmed() {
        this.notificationElement.show();
        this.bgElement.show();
    }

    handleUnconfirmed() {
        this.notificationElement.hide();
        this.bgElement.hide();
    }

    handleDelete() {
        this.notificationElement.hide();
        this.bgElement.hide();

        const autobind = new AutoBind();
        const meetingEl = autobind.getVariable('eventId')[0];
        const eventId = meetingEl.el.getAttribute(meetingEl.props[0]);

        removeEvent({
            eventId,
            callback: console.log,
        });

        this.triggerEvent(SHOW_MAIN);
    }

    get buttonCancelElement() {
        return this.getElements('footer__button_cancel');
    }

    get buttonCreateElement() {
        return this.getElements('footer__button_create');
    }

    get buttonDeleteElement() {
        return this.getElements('footer__button_delete');
    }

    get buttonSaveElement() {
        return this.getElements('footer__button_save');
    }

    get notificationElement() {
        return this.getElements('footer__notification');
    }

    get bgElement() {
        return this.getElements('footer__bg');
    }

}