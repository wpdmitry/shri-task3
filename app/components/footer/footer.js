import {BaseComponent} from "../../framework/BaseComponent";
import {Button} from "../button/button";
import {BREAK_PROMISES, CREATE_EVENT, DELETE_EVENT, MAIN_PAGE} from "../../events";

export class Footer extends BaseComponent {

    constructor() {
        super();
    }

    template() {
        return `
            <footer class="footer">
                <div class="footer__button footer__button_cancel"></div>
                <div class="footer__button footer__button_delete"></div>
                <div class="footer__button footer__button_save"></div>
                <div class="footer__button footer__button_create"></div>   
            </footer>
        `
    }

    onRender() {
        this.showForCreate();
        this.showForEdit();

        this.buttonCancelElement.on('click', () => this.handleCancel());
        this.buttonDeleteElement.on('click', () => this.handleDelete());
        this.buttonCreateElement.on('click', () => this.handleCreate());
    }

    upgrade() {
        this.setButtons();
    }

    setDetail(detail) {
        this.detail = detail;
        this.upgrade();
    }

    handleCancel() {
        this.triggerEvent(MAIN_PAGE);
    }

    handleDelete() {
        this.triggerEvent(DELETE_EVENT);
    }

    handleCreate() {
        this.triggerEvent(CREATE_EVENT);
    }

    showForCreate() {

        this.buttonCreate = new Button({
            btnText: 'Создать встречу',
            modBtn: 'create',
            modBtnText: ['white', 'bold'],
        });

        this.buttonCancel = new Button({
            btnText: 'Отмена',
            modBtn: 'cancel',
            modBtnText: ['black', 'bold'],
        });

        this.buttonCreate.renderTo(this.buttonCreateElement);
        this.buttonCancel.renderTo(this.buttonCancelElement);
    }

    showForEdit() {

        this.buttonCancel = new Button({
            btnText: 'Отмена',
            modBtn: ['cancel'],
            modBtnText: ['black', 'bold'],
        });

        this.buttonDelete = new Button({
            btnText: 'Удалить встречу',
            modBtn: ['delete'],
            modBtnText: ['black', 'bold']
        });

        this.buttonSave = new Button({
            btnText: 'Сохранить',
            modBtn: ['save'],
            modBtnText: ['white', 'bold'],
        });

        this.buttonCancel.renderTo(this.buttonCancelElement);
        this.buttonDelete.renderTo(this.buttonDeleteElement);
        this.buttonSave.renderTo(this.buttonSaveElement);
    }

    setButtons() {
        this.buttonCancelElement.show();

        if (!this.detail) {
            this.buttonDeleteElement.hide();
            this.buttonSaveElement.hide();

            this.buttonCreateElement.show();
            this.buttonCreate.setDisabled();
        } else if('usersId' in this.detail) {
            this.buttonCreateElement.hide();

            this.buttonDeleteElement.show();
            this.buttonSaveElement.show();
        } else {
            this.buttonDeleteElement.hide();
            this.buttonSaveElement.hide();

            this.buttonCreateElement.show();
            this.setDisabledButtonCreate();
        }
    }

    setActiveButtonCreate() {
        this.buttonCreate.setActive();
    }

    setDisabledButtonCreate() {
        this.buttonCreate.setDisabled();
    }

    get buttonCancelElement() {
        return this.getElement('.footer__button_cancel');
    }

    get buttonCreateElement() {
        return this.getElement('.footer__button_create');
    }

    get buttonDeleteElement() {
        return this.getElement('.footer__button_delete');
    }

    get buttonSaveElement() {
        return this.getElement('.footer__button_save');
    }

}