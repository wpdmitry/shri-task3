import {BaseComponent} from "../../framework/BaseComponent";

export class Person extends BaseComponent {

    constructor({login, floor, avatar}) {
        super();
        this.login = login;
        this.floor = floor;
        this.avatar = avatar;
    }

    template() {
        return `
            <div class="person">
                <img class="person__avatar person__avatar_small" src="${this.avatar}" alt="">
                <div class="person__name person__name_small">${this.login}</div>
                ${this.floor || 0 ? `<div class="person__floor">${this.floor} этаж</div>` : ''}
                
            </div>
        `
    }

    onRender() {}

    upgrade() {}
}