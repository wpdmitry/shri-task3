import {Logo} from "../logo/logo";
import {Base} from "../base/base";
import {Button} from "../button/button";
import {CREATE__MEETING} from "../../events";

export class Header extends Base {

    constructor({button}) {
        super();
        this.button = button;
    }

    render() {
        return `<header class="header">
                    <div class="header__logo"></div>
                    <div class="header__button"></div>
                </header>
                `
    }

    onRender() {
        this.showLogo();
        this.button ? this.showButton() : this.hideButton();

        this.buttonElement.on('click', () => this.handleCreateMeeting());
    }

    handleCreateMeeting() {
        this.triggerEvent(CREATE__MEETING);
    }

    showLogo() {
        const logo = new Logo();
        logo.renderTo(this.logoElement);
    }

    showButton() {
        const button = new Button({
            btnText: 'Создать встречу',
            modBtn: ['create'],
            modBtnText: ['white'],
        });
        button.renderTo(this.buttonElement);
    }

    hideButton() {
        this.buttonElement.hide();
    }

    get logoElement() {
        return this.getElements('header__logo');
    }

    get buttonElement() {
        return this.getElements('header__button');
    }
}