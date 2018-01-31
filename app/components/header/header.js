import {BaseComponent} from "../../framework/BaseComponent";
import {Logo} from "../logo/logo";
import {Button} from "../button/button";
import {MEETING_PAGE} from "../../events";
import {helpers} from "../../helpers/helpers";


export class Header extends BaseComponent {

    constructor() {
        super();
    }

    template() {
        return `<header class="header">
                    <div class="header__logo"></div>
                    <div class="header__button"></div>
                </header>
        `
    }

    onRender() {
        this.showLogo();
        this.showButton();

        this.buttonElement.on('click', () => this.handleButton());
    }

    upgrade() {}

    createButton() {
        this.button = new Button({
            modBtn: 'create',
            btnText: 'Создать встречу',
            modBtnText: ['white'],
        });

        this.button.renderTo(this.buttonElement);
        this.addToListUpgrade(this.button);

        this.buttonElement.classList.remove('header__button_inactive')
    }

    createLogo() {
        this.logo = new Logo();
        this.logo.renderTo(this.logoElement);
        this.addToListUpgrade(this.logo);
    }

    showButton() {
       if (!this.button) this.createButton();
        this.buttonElement.classList.remove('header__button_inactive');
    }

    showLogo() {
        if (!this.logo) this.createLogo();
    }

    hideButton() {
        this.buttonElement.classList.add('header__button_inactive');
    }

    handleButton() {
        this.triggerEvent(MEETING_PAGE);
    }

    get logoElement() {
        return this.getElement('.header__logo');
    }

    get buttonElement() {
        return this.getElement('.header__button');
    }
}
