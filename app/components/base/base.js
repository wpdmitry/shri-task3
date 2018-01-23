export class Base {
    constructor() {
        HTMLElement.prototype.hide = this.hide;
        HTMLElement.prototype.show = this.show;
        HTMLElement.prototype.toggle = this.toggle;
        HTMLElement.prototype.on = this.on;
        Object.prototype.myHasOwnProperty = this.hasProperty;
    }

    update() {
        this.renderTo(this.domElement.parentNode);
    }

    renderTo(element) {
        element.innerHTML = this.render();
        this.domElement = element.children[0];

        setTimeout(() => this.hasProperty('onRender') ? this.onRender() : null, 0);
    }

    getElements(className) {
        let foundElements = this.domElement.getElementsByClassName(className);
        foundElements = Array.from(foundElements);
        return foundElements.length > 1 ? foundElements : foundElements[0];
    }

    on(eventName, callback) {
        this.addEventListener(eventName, callback);
        return () => this.removeEventListener(eventName, callback);
    }

    createElement(tagName, className = null, props = null) {
        const el = document.createElement(tagName);

        if (className) {
            className.forEach(name => {
                el.classList.add(name);
            })
        }

        if (props) {
            Object.keys(props).forEach(key => {
                el.setAttribute(key, props[key]);
            })
        }

        return el;
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

    hasProperty(prop) {
        return this.__proto__.hasOwnProperty(prop) ? true : false;
    }

    triggerEvent(eventName, detail = {}) {
        this.domElement.dispatchEvent(new CustomEvent(eventName, {
            bubbles: true,
            detail: detail
        }));
    }

    deviceCheck() {
        return document.documentElement.offsetWidth < 1280 ? 'touch' : 'desktop';
    }
}