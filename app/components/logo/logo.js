import {BaseComponent} from "../../framework/BaseComponent";

export class Logo extends BaseComponent {

    template() {
        return `
            <img class="logo" src="image/svg/logo.svg">
            `
    }
}