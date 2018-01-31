import {helpers} from "../helpers/helpers";

export class BaseComponent {

    constructor() {
        HTMLElement.prototype.hide = this.hide;
        HTMLElement.prototype.show = this.show;
        HTMLElement.prototype.toggle = this.toggle;
        HTMLElement.prototype.on = this.on;
        document.on = this.on;
        Array.prototype.on = this.on;
        this.listForUpgrade = [];
    }

    addToListUpgrade(el) {
        this.listForUpgrade.push(el);
    }

    deepUpgrade() {
        if (!helpers.isUndefined(this.upgrade)) {
            this.upgrade();
        }

        this.listForUpgrade.forEach(item => {
            item.deepUpgrade();
        })
    }

    renderTo(el) {
        el.innerHTML = this.template();
        this.domElement = el.children[0];

        // const observer = new MutationObserver((mutation) => console.log(mutation));
        // const config = {childList: true, subtree: true};
        // observer.observe(this.domElement, config);

        if (!helpers.isUndefined(this.onRender)) {
            this.onRender();
        }
    }

    getElement(selector) {
        const foundItems = this.domElement.querySelectorAll(selector);
        return foundItems.length > 1 ? Array.from(foundItems) : foundItems[0];
    }

    hide() {
        this.style.display = 'none';
    }

    show() {
        this.style.display = 'block';
    }

    toggle() {
        let display = getComputedStyle(this).display === 'none' || this.style.display === 'none';
        this.style.display = display ? 'block' : 'none';
    }

    on(eventName, callback) {
        if (Array.isArray(this)) {
            this.forEach(el => el.on(eventName, callback));
            return;
        }

        this.addEventListener(eventName, callback);
        return () => this.removeEventListener(eventName, callback);
    }

    triggerEvent(nameEvent, detail) {
        const event = new CustomEvent(nameEvent, {
            bubbles: true,
            detail,
        });

        this.domElement.dispatchEvent(event);
    }

    createElement(tagName, className, props) {
        const div = document.createElement(tagName);

        if (className) {
            div.classList.add(...className);
        }

        if (props) {
            Object.keys(props).forEach(name => {
                div.setAttribute(name, props[name]);
            })
        }

        return div;
    }

}


