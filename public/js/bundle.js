/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 9);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return BaseComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__helpers_helpers__ = __webpack_require__(1);


let BaseComponent = class BaseComponent {

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
        if (!__WEBPACK_IMPORTED_MODULE_0__helpers_helpers__["a" /* helpers */].isUndefined(this.upgrade)) {
            this.upgrade();
        }

        this.listForUpgrade.forEach(item => {
            item.deepUpgrade();
        });
    }

    renderTo(el) {
        el.innerHTML = this.template();
        this.domElement = el.children[0];

        // const observer = new MutationObserver((mutation) => console.log(mutation));
        // const config = {childList: true, subtree: true};
        // observer.observe(this.domElement, config);

        if (!__WEBPACK_IMPORTED_MODULE_0__helpers_helpers__["a" /* helpers */].isUndefined(this.onRender)) {
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
            detail
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
            });
        }

        return div;
    }

};

/***/ }),
/* 1 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
const helpers = {
    isUndefined(obj) {
        return obj === undefined;
    },

    getDateUTC(offset = 0, date = null) {
        let _date = date ? new Date(date) : new Date();
        _date.setTime(_date.getTime() + _date.getTimezoneOffset() * 60 * 1000 + offset);
        return _date;
    },

    getOffsetDateUTC(offset) {
        return this.getDateUTC(offset);
    },

    stateDateString(date) {
        const state = this.stateDate(date);

        let str1 = date.toLocaleString('ru', { day: 'numeric', month: 'short' }).slice(0, -1) + ' &middot ';

        if (state === 0) {
            return str1 + 'Сегодня';
        } else if (state === 1) {
            return str1 + 'Завтра';
        } else if (state === -1) {
            return str1 + 'Вчера';
        }

        str1 = date.toLocaleString('ru', { day: 'numeric', month: 'long' }) + ' &middot ';
        const str2 = date.toLocaleString('ru', { weekday: 'short' });
        return str1 + str2;
    },

    stateDate(date1, date2 = this.getDateUTC()) {
        let _date1 = new Date(date1.getTime()),
            _date2 = new Date(date2.getTime());

        _date1.setHours(12);_date2.setHours(12);
        _date1.setMinutes(0);_date2.setMinutes(0);
        _date1.setSeconds(0);_date2.setSeconds(0);
        _date1.setMilliseconds(0);_date2.setMilliseconds(0);

        const diff = _date1 - _date2;

        if (diff === 0) {
            return 0;
        } else if (diff === 24 * 60 * 60 * 1000) {
            return 1;
        } else if (diff === -24 * 60 * 60 * 1000) {
            return -1;
        } else if (diff > 0) {
            return '>';
        } else {
            return '<';
        }
    },

    getTimeFormatHHMM(date) {
        let hours = date.getHours();
        let minutes = date.getMinutes();

        hours = hours < 10 ? '0' + hours : hours;
        minutes = minutes < 10 ? '0' + minutes : minutes;

        return `${hours}:${minutes}`;
    },

    getTimeFromFormatHHMM(time) {
        const [hours, minutes] = time.split(':');
        return {
            hours: +hours,
            minutes: +minutes
        };
    },

    glueDateAndTime(strDate, time) {
        const { number, month, year } = this.getYMNFromString(strDate);
        const { hours, minutes } = this.getTimeFromFormatHHMM(time);

        return new Date(year, month, number, hours, minutes);
    },

    deviceCheck() {
        return document.documentElement.offsetWidth < 1280 ? 'touch' : 'desktop';
    },

    differenceTimeInMinutes(time1, time2) {
        const [hours1, minutes1] = time1.split(':'),
              [hours2, minutes2] = time2.split(':');

        const diffHours = +hours1 - +hours2;
        const diffMinutes = +minutes1 - +minutes2;

        return diffHours * 60 + diffMinutes;
    },

    getDateString(date) {
        const day = date.getDate();
        const month = this.getNormNameMonth(date.toLocaleString('ru', { month: 'long' }));
        const year = date.getFullYear();

        return `${day} ${month}, ${year}`;
    },

    getDateString2(date) {
        const day = date.getDate();
        const month = this.getNormNameMonth(date.toLocaleString('ru', { month: 'long' }));

        return `${day} ${month}`;
    },

    glueTwoDateForString(date1, date2) {
        console.log(date1, date2);
        const ny = this.getDateString2(date1);
        const timeStart = this.getTimeFormatHHMM(date1);
        const timeEnd = this.getTimeFormatHHMM(date2);

        return `${ny}, ${timeStart} — ${timeEnd}`;
    },

    getYMNFromString(strDate) {
        const reg = /(\d{1,2}) ([а-я]+), (\d{4})/;
        const result = strDate.match(reg);

        return {
            number: result[1],
            month: this.getNumberMonth(result[2]),
            year: result[3]
        };
    },

    elementIsHidden(el) {
        const flag1 = getComputedStyle(el).display === 'none';
        const flag2 = el.style.display === 'none';

        return flag1 || flag2;
    },

    getNormNameMonth(name) {

        const monthName = {
            'январь': 'января',
            'февраль': 'февраля',
            'март': 'марта',
            'апрель': 'апреля',
            'май': 'мая',
            'июнь': 'июня',
            'июль': 'июля',
            'август': 'августа',
            'сентябрь': 'сентября',
            'октябрь': 'октября',
            'ноябрь': 'ноября',
            'декабрь': 'декабря'
        };

        return monthName[name];
    },

    getNumberMonth(name) {

        const monthToNumber = {
            'января': 0,
            'февраля': 1,
            'марта': 2,
            'апреля': 3,
            'мая': 4,
            'июня': 5,
            'июля': 6,
            'августа': 7,
            'сентября': 8,
            'октября': 9,
            'ноября': 10,
            'декабря': 11
        };

        return monthToNumber[name];
    },

    getDateToISOString(date) {
        const offset = new Date().getTimezoneOffset() * 60 * 1000;

        date.setTime(date.getTime() - offset);
        return date.toISOString();
    }
};
/* harmony export (immutable) */ __webpack_exports__["a"] = helpers;


/***/ }),
/* 2 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
const MEETING_PAGE = 'MEETING_PAGE',
      MAIN_PAGE = 'MAIN_PAGE',
      CHANGE_DATE = 'CHANGE_DATE',
      OPEN_MEMBERS = 'OPEN_MEMBERS',
      CLOSE_MEMBERS = 'CLOSE_MEMBERS',
      DELETE_EVENT = 'DELETE_EVENT',
      CREATE_EVENT = 'CREATE_EVENT',
      CONFIRMED = 'CONFIRMED',
      UNCONFIRMED = 'UNCONFIRMED',
      SCROLL_X = 'SCROLL_X',
      SELECT_TITLE = 'SELECT_TITLE',
      SELECT_DATE = 'SELECT_DATE',
      SELECT_TIME_START = 'SELECT_TIME_START',
      SELECT_TIME_END = 'SELECT_TIME_END',
      SELECT_MEMBERS = 'SELECT_MEMBERS',
      SELECT_TALK = 'SELECT_TALK',
      UNSELECTED = 'UNSELECTED',
      CONTINUE_PROMISES = 'CONTINUE_PROMISES',
      BREAK_PROMISES = 'BREAK_PROMISES',
      BREAK_PROMISES_ON_MAIN = 'BREAK_PROMISES_ON_MAIN',
      SEND_DATA = 'SEND_DATA',
      GET_MEMBERS = 'GET_MEMBERS',
      CHANGE_MEMBERS = 'CHANGE_MEMBERS',
      OK = 'OK';
/* harmony export (immutable) */ __webpack_exports__["k"] = MEETING_PAGE;

/* harmony export (immutable) */ __webpack_exports__["j"] = MAIN_PAGE;

/* harmony export (immutable) */ __webpack_exports__["c"] = CHANGE_DATE;

/* harmony export (immutable) */ __webpack_exports__["m"] = OPEN_MEMBERS;

/* harmony export (immutable) */ __webpack_exports__["d"] = CLOSE_MEMBERS;

/* harmony export (immutable) */ __webpack_exports__["h"] = DELETE_EVENT;

/* harmony export (immutable) */ __webpack_exports__["g"] = CREATE_EVENT;

/* harmony export (immutable) */ __webpack_exports__["e"] = CONFIRMED;

/* harmony export (immutable) */ __webpack_exports__["t"] = UNCONFIRMED;

/* unused harmony export SCROLL_X */

/* harmony export (immutable) */ __webpack_exports__["s"] = SELECT_TITLE;

/* harmony export (immutable) */ __webpack_exports__["n"] = SELECT_DATE;

/* harmony export (immutable) */ __webpack_exports__["r"] = SELECT_TIME_START;

/* harmony export (immutable) */ __webpack_exports__["q"] = SELECT_TIME_END;

/* harmony export (immutable) */ __webpack_exports__["o"] = SELECT_MEMBERS;

/* harmony export (immutable) */ __webpack_exports__["p"] = SELECT_TALK;

/* unused harmony export UNSELECTED */

/* harmony export (immutable) */ __webpack_exports__["f"] = CONTINUE_PROMISES;

/* harmony export (immutable) */ __webpack_exports__["a"] = BREAK_PROMISES;

/* harmony export (immutable) */ __webpack_exports__["b"] = BREAK_PROMISES_ON_MAIN;

/* unused harmony export SEND_DATA */

/* harmony export (immutable) */ __webpack_exports__["i"] = GET_MEMBERS;

/* unused harmony export CHANGE_MEMBERS */

/* harmony export (immutable) */ __webpack_exports__["l"] = OK;


/***/ }),
/* 3 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["a"] = ajax;
function ajax({ method, url, data = null, callback }) {

    const xhr = new XMLHttpRequest();
    xhr.open(method, url, true);

    xhr.onreadystatechange = () => {
        if (xhr.readyState !== 4) return;

        if (xhr.status !== 200) {
            let err = `$[{xhr.status}] ${xhr.statusText}`;
            callback(err, null);
        } else {
            let jsonData = JSON.parse(xhr.responseText);
            callback(null, jsonData);
        }
    };

    xhr.send(data);
}

/***/ }),
/* 4 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return Button; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__framework_BaseComponent__ = __webpack_require__(0);


let Button = class Button extends __WEBPACK_IMPORTED_MODULE_0__framework_BaseComponent__["a" /* BaseComponent */] {

    constructor({ btnText, modBtn, modBtnText = [] }) {
        super();
        this.btnText = btnText;
        this.modBtn = modBtn;
        this.modBtnText = modBtnText;
    }

    template() {
        const modBtn = `button_${this.modBtn}`;

        const modBtnText = this.modBtnText.map(item => {
            return `button__text_${item}`;
        });

        return `
            <button class="button ${modBtn}">
                <span class="button__text ${modBtnText.join(' ')}">${this.btnText}</span>
            </button>
        `;
    }

    onRender() {}

    upgrade() {}

    setDisabled() {
        this.domElement.classList.remove('button_create');

        this.domElement.classList.add('button_disabled');
        this.textElement.classList.add('button__text_disabled');
    }

    setActive() {
        this.domElement.classList.add('button_create');

        this.domElement.classList.remove('button_disabled');
        this.textElement.classList.remove('button__text_disabled');
    }

    setAllow() {
        this.domElement.classList.remove('button_disabled');
        this.textElement.classList.remove('button__text_disabled');

        this.domElement.classList.add('button_create');
    }

    get textElement() {
        return this.getElement('.button__text');
    }
};

/***/ }),
/* 5 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__helpers__ = __webpack_require__(1);


const validation = {

    title(value) {
        return value.length > 0;
    },

    date(value) {
        const regExp = /(\d{1,2}) ([а-я]+), (\d{4})/;

        return regExp.test(value);
    },

    time(value) {
        if (value.length !== 5) return;

        const flag1 = __WEBPACK_IMPORTED_MODULE_0__helpers__["a" /* helpers */].differenceTimeInMinutes(value, '8:00') >= 0;
        const flag2 = __WEBPACK_IMPORTED_MODULE_0__helpers__["a" /* helpers */].differenceTimeInMinutes('23:00', value) >= 0;

        return flag1 && flag2;
    }
};
/* harmony export (immutable) */ __webpack_exports__["a"] = validation;


/***/ }),
/* 6 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return Person; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__framework_BaseComponent__ = __webpack_require__(0);


let Person = class Person extends __WEBPACK_IMPORTED_MODULE_0__framework_BaseComponent__["a" /* BaseComponent */] {

    constructor({ login, floor, avatar }) {
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
        `;
    }

    onRender() {}

    upgrade() {}
};

/***/ }),
/* 7 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return Input; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__framework_BaseComponent__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__events__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__helpers_validation__ = __webpack_require__(5);




let Input = class Input extends __WEBPACK_IMPORTED_MODULE_0__framework_BaseComponent__["a" /* BaseComponent */] {

    constructor({ title, placeholder, maxLength = 100, mod, eventsName, addClass = [] }) {
        super();
        this.title = title;
        this.placeholder = placeholder;
        this.maxLength = maxLength;
        this.mod = mod;
        this.eventsName = eventsName;
        this.arrow = false;
        this.addClass = addClass;
    }

    template() {
        return `
            <div class="input">
                <label for="title" class="input__label">${this.title}</label>
                <div class="input__wrapper"> 
                    <input 
                        type="text" 
                        class="input__input input__input_${this.mod} ${this.addClass.join(' ')}" 
                        placeholder="${this.placeholder}"
                        maxlength="${this.maxLength}"
                    >
                </div>
            </div> 
        `;
    }

    onRender() {
        switch (this.mod) {
            case 'text':
                this.drawReset();break;
            case 'date':
                this.drawCalendar();break;
            case 'time':
                {
                    this.inputElement.on('input', e => this.validationTime(e));
                    break;
                }
        }

        this.handleDropDownMembers();
        this.inputElement.on('blur', () => this.handleSendData());
    }

    upgrade() {}

    handleDropDownMembers() {
        if (this.eventsName) {
            if (this.eventsName.indexOf(__WEBPACK_IMPORTED_MODULE_1__events__["m" /* OPEN_MEMBERS */]) !== -1) {
                this.drawArrow();
                this.inputElement.on('focus', () => this.handleOpenMembers());
                this.arrowElement.on('click', () => this.handleCloseMembers());
            }
        }
    }

    handleSendData() {
        const value = this.inputElement.value;

        if (this.eventsName) {
            if (this.eventsName.indexOf(__WEBPACK_IMPORTED_MODULE_1__events__["s" /* SELECT_TITLE */]) !== -1) this.triggerEvent(__WEBPACK_IMPORTED_MODULE_1__events__["s" /* SELECT_TITLE */], { value });

            if (this.eventsName.indexOf(__WEBPACK_IMPORTED_MODULE_1__events__["n" /* SELECT_DATE */]) !== -1) this.triggerEvent(__WEBPACK_IMPORTED_MODULE_1__events__["n" /* SELECT_DATE */], { value });

            if (this.eventsName.indexOf(__WEBPACK_IMPORTED_MODULE_1__events__["r" /* SELECT_TIME_START */]) !== -1) this.triggerEvent(__WEBPACK_IMPORTED_MODULE_1__events__["r" /* SELECT_TIME_START */], { value });

            if (this.eventsName.indexOf(__WEBPACK_IMPORTED_MODULE_1__events__["q" /* SELECT_TIME_END */]) !== -1) this.triggerEvent(__WEBPACK_IMPORTED_MODULE_1__events__["q" /* SELECT_TIME_END */], { value });
        }
    }

    handleOpenMembers() {
        this.triggerEvent(__WEBPACK_IMPORTED_MODULE_1__events__["m" /* OPEN_MEMBERS */]);
        this.resetElement.hide();
        this.showArrow();
        this.arrow = true;
    }

    handleCloseMembers() {
        this.triggerEvent(__WEBPACK_IMPORTED_MODULE_1__events__["d" /* CLOSE_MEMBERS */]);
        this.hideArrow();
        this.arrow = false;

        if (this.inputElement.value.length > 0) {
            this.resetElement.show();
        }
    }

    setValue(value) {

        if (this.mod === 'text') {
            this.inputTextElement.value = value;
            if (value) {
                this.resetElement.show();
            } else {
                this.resetElement.hide();
            }
        } else if (this.mod === 'date') {
            this.inputDatetElement.value = value;
            this.triggerEvent(__WEBPACK_IMPORTED_MODULE_1__events__["n" /* SELECT_DATE */], { value });
        } else if (this.mod === 'time') {
            this.inputTimeElement.value = value;
        }
    }

    drawReset() {
        const resetElement = this.createElement('div', ['input__reset']);
        const imgElement = this.createElement('img', ['input__img', 'input__img_scale'], {
            'src': 'image/svg/close.svg',
            'alt': 'reset'
        });

        resetElement.appendChild(imgElement);
        this.wrapperElement.appendChild(resetElement);

        this.resetElement.on('click', () => this.handleReset());
        this.inputElement.on('input', e => this.showReset(e));
    }

    showReset(e) {
        if (e.target.value.length > 0) {
            this.resetElement.show();
            this.arrow ? this.hideArrow() : null;
        } else {
            this.resetElement.hide();
            this.arrow ? this.showArrow() : null;
        }
    }

    handleReset() {
        this.inputElement.value = '';
        this.resetElement.hide();
        this.arrow ? this.showArrow() : null;

        this.triggerInput();
    }

    drawCalendar() {
        const calendarElement = this.createElement('div', ['input__calendar']);
        const imgElement = this.createElement('img', ['input__img'], {
            'src': 'image/svg/calendar.svg',
            'alt': 'calendar'
        });

        calendarElement.appendChild(imgElement);
        this.wrapperElement.appendChild(calendarElement);
    }

    drawArrow() {
        const arrowElement = this.createElement('div', ['input__arrow']);
        const imgElement = this.createElement('img', ['input__img', 'input__img_scale'], {
            'src': 'image/svg/arrow.svg',
            'alt': 'arrow'
        });

        arrowElement.appendChild(imgElement);
        this.wrapperElement.appendChild(arrowElement);
    }

    showArrow() {
        this.arrowElement.show();
    }

    hideArrow() {
        this.arrowElement.hide();
    }

    validationTime(e) {
        let value = this.inputElement.value;
        let lastChar = value.slice(-1);

        if (Number.isInteger(+lastChar)) {
            if (value.length === 2) {
                this.inputElement.value += ':';
            }
        } else {
            this.inputElement.value = value.slice(0, -1);
        }
    }

    triggerInput() {
        const event = new Event('blur');
        this.inputElement.dispatchEvent(event);
    }

    get inputElement() {
        return this.getElement('.input__input');
    }

    get inputTextElement() {
        return this.getElement('.input__input_text');
    }

    get inputDatetElement() {
        return this.getElement('.input__input_date');
    }

    get inputTimeElement() {
        return this.getElement('.input__input_time');
    }

    get arrowElement() {
        return this.getElement('.input__arrow');
    }

    get resetElement() {
        return this.getElement('.input__reset');
    }

    get calendarElement() {
        return this.getElement('.input__calendar');
    }

    get wrapperElement() {
        return this.getElement('.input__wrapper');
    }

};

/***/ }),
/* 8 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["a"] = removeEvent;
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__ajax__ = __webpack_require__(3);


function removeEvent(eventId, callback) {

    const qs = `
             mutation {
              removeEvent(id: ${eventId}) {
                    id
                }
              }
    `;

    Object(__WEBPACK_IMPORTED_MODULE_0__ajax__["a" /* ajax */])({
        method: 'POST',
        url: `/graphql?query=${qs}`,
        callback: dataChecking
    });

    function dataChecking(err, data) {
        if (err) {
            console.log(err, 'on remove event');
            return;
        }

        callback(data);
    }
}

/***/ }),
/* 9 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__components_app_app__ = __webpack_require__(10);


const app = new __WEBPACK_IMPORTED_MODULE_0__components_app_app__["a" /* App */]();
app.renderTo(document.getElementById('root'));

/***/ }),
/* 10 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return App; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__framework_BaseComponent__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__header_header__ = __webpack_require__(11);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__main_main__ = __webpack_require__(13);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__meeting_meeting__ = __webpack_require__(20);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__footer_footer__ = __webpack_require__(25);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__events__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__framework_Router__ = __webpack_require__(26);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__model_model__ = __webpack_require__(27);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__notification_notification__ = __webpack_require__(33);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__helpers_validation__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__helpers_helpers__ = __webpack_require__(1);












let App = class App extends __WEBPACK_IMPORTED_MODULE_0__framework_BaseComponent__["a" /* BaseComponent */] {

    constructor() {
        super();
        this.model = new __WEBPACK_IMPORTED_MODULE_7__model_model__["a" /* Model */]();

        this.router = new __WEBPACK_IMPORTED_MODULE_6__framework_Router__["a" /* Router */]();
        this.router.register('/', this.showMainPage.bind(this));
        this.router.register('/meeting', this.showMeetingPage.bind(this));
    }

    template() {
        return `
            <div class="app"> 
                <div class="app__header"></div>   
                <div class="app__main"></div>  
                <div class="app__meeting"></div>
                <div class="app__footer"></div> 
                <div class="app__notification">
                    <div class="app__notification-create"></div>
                    <div class="app__notification-delete"></div>
                </div> 
            </div> 
        `;
    }

    onRender() {
        this.router.go({ path: '/', addInHistory: false });

        this.domElement.on(__WEBPACK_IMPORTED_MODULE_5__events__["k" /* MEETING_PAGE */], e => {
            this.detail = e.detail;
            this.router.go({ path: '/meeting' });
        });

        this.domElement.on(__WEBPACK_IMPORTED_MODULE_5__events__["j" /* MAIN_PAGE */], () => {
            this.router.go({ path: '/' });
            this.deepUpgrade();
            this.stopPromises();
            this.runPromises();
        });

        this.domElement.on(__WEBPACK_IMPORTED_MODULE_5__events__["h" /* DELETE_EVENT */], () => this.showNotificationDelete());
        this.domElement.on(__WEBPACK_IMPORTED_MODULE_5__events__["g" /* CREATE_EVENT */], () => {
            this.router.go({ path: '/' });
            this.deepUpgrade();
            this.stopPromises();
            this.runPromises();
            this.showNotificationCreate();
        });

        this.runPromises();
    }

    upgrade() {}

    createHeader() {
        this.header = new __WEBPACK_IMPORTED_MODULE_1__header_header__["a" /* Header */]();
        this.header.renderTo(this.headerElement);
        this.addToListUpgrade(this.header);
    }

    createMain() {
        this.main = new __WEBPACK_IMPORTED_MODULE_2__main_main__["a" /* Main */](this.model);
        this.main.renderTo(this.mainElement);
        this.addToListUpgrade(this.main);
    }

    createMeeting() {
        this.meeting = new __WEBPACK_IMPORTED_MODULE_3__meeting_meeting__["a" /* Meeting */](this.model);
        this.meeting.renderTo(this.meetingElement);
        this.addToListUpgrade(this.meeting);
    }

    createFooter() {
        this.footer = new __WEBPACK_IMPORTED_MODULE_4__footer_footer__["a" /* Footer */]();
        this.footer.renderTo(this.footerElement);
        this.addToListUpgrade(this.footer);
    }

    createNotificationCreate() {
        this.notificationCreate = new __WEBPACK_IMPORTED_MODULE_8__notification_notification__["a" /* Notification */]({ type: 'create' });
        this.notificationCreate.renderTo(this.notificationCreateElement);
        this.addToListUpgrade(this.notificationCreate);

        this.domElement.on(__WEBPACK_IMPORTED_MODULE_5__events__["l" /* OK */], e => this.handleNotificationCreate(e));
    }

    createNotificationDelete() {
        this.notificationDelete = new __WEBPACK_IMPORTED_MODULE_8__notification_notification__["a" /* Notification */]({ type: 'delete' });
        this.notificationDelete.renderTo(this.notificationDeleteElement);
        this.addToListUpgrade(this.notificationDelete);

        this.domElement.on(__WEBPACK_IMPORTED_MODULE_5__events__["e" /* CONFIRMED */], e => this.handleNotificationDelete(e));
        this.domElement.on(__WEBPACK_IMPORTED_MODULE_5__events__["t" /* UNCONFIRMED */], e => this.handleNotificationDelete(e));
    }

    showMainPage() {
        if (!this.header) this.createHeader();
        if (!this.main) this.createMain();

        this.meetingElement.hide();
        this.footerElement.hide();

        this.header.showButton();
        this.mainElement.show();
    }

    showMeetingPage() {
        if (!this.meeting) this.createMeeting();
        if (!this.footer) this.createFooter();

        this.mainElement.hide();
        this.header.hideButton();

        this.meeting.setDetail(this.detail);
        this.meetingElement.show();
        this.footer.setDetail(this.detail);
        this.footerElement.show();
    }

    showNotificationCreate() {
        if (!this.notificationCreate) this.createNotificationCreate();

        this.notificationCreate.setDateTime(this.strDate);
        this.notificationCreate.setLocation(this.strLocation);
        this.notificationDeleteElement.hide();
        this.notificationCreateElement.show();
        this.notificationElement.classList.add('app__notification_active');

        this.model.createNewEvent({
            title: this.title,
            dateStart: this.dateStart,
            dateEnd: this.dateEnd,
            membersId: this.membersId,
            roomId: this.roomId,
            callback: console.log
        });
    }

    showNotificationDelete() {
        if (!this.notificationDelete) this.createNotificationDelete();

        this.notificationCreateElement.hide();
        this.notificationDeleteElement.show();
        this.notificationElement.classList.add('app__notification_active');
    }

    hideNotificationDelete() {
        this.notificationDeleteElement.hide();
        this.notificationElement.classList.remove('app__notification_active');
    }

    hideNotificationCreate() {
        this.notificationCreateElement.hide();
        this.notificationElement.classList.remove('app__notification_active');
    }

    handleNotificationCreate(e) {
        this.hideNotificationCreate();
        this.deepUpgrade();
    }

    handleNotificationDelete(e) {
        const eventId = this.detail['eventId'];

        switch (e.type) {
            case __WEBPACK_IMPORTED_MODULE_5__events__["e" /* CONFIRMED */]:
                {
                    this.model.deleteEvent(eventId, console.log);
                    this.deepUpgrade();
                    this.router.go({ path: '/' });
                    break;
                }
            case __WEBPACK_IMPORTED_MODULE_5__events__["t" /* UNCONFIRMED */]:
                break;
        }

        this.hideNotificationDelete();
    }

    createPromises() {

        const promiseTitle = new Promise(resolve => {
            const removeEvent = this.domElement.on(__WEBPACK_IMPORTED_MODULE_5__events__["s" /* SELECT_TITLE */], e => {
                removeEvent();
                resolve();
            });
        });

        const promiseDate = new Promise(resolve => {
            const removeEvent = this.domElement.on(__WEBPACK_IMPORTED_MODULE_5__events__["n" /* SELECT_DATE */], e => {
                removeEvent();
                resolve();
            });
        });

        const promiseTimeStart = new Promise(resolve => {
            const removeEvent = this.domElement.on(__WEBPACK_IMPORTED_MODULE_5__events__["r" /* SELECT_TIME_START */], e => {
                removeEvent();
                resolve();
            });
        });

        const promiseTimeEnd = new Promise(resolve => {
            const removeEvent = this.domElement.on(__WEBPACK_IMPORTED_MODULE_5__events__["q" /* SELECT_TIME_END */], e => {
                removeEvent();
                resolve();
            });
        });

        const promiseMembers = new Promise(resolve => {
            const removeEvent = this.domElement.on(__WEBPACK_IMPORTED_MODULE_5__events__["o" /* SELECT_MEMBERS */], e => {
                removeEvent();
                resolve();
            });
        });

        const promiseTalk = new Promise(resolve => {
            const removeEvent = this.domElement.on(__WEBPACK_IMPORTED_MODULE_5__events__["p" /* SELECT_TALK */], e => {
                removeEvent();
                resolve();
            });
        });

        const breakPromise = new Promise((resolve, reject) => {
            let removeEvent1, removeEvent2;

            removeEvent1 = this.domElement.on(__WEBPACK_IMPORTED_MODULE_5__events__["b" /* BREAK_PROMISES_ON_MAIN */], () => {
                removeEvent1();
                removeEvent2();
                reject('stop');
            });

            removeEvent2 = this.domElement.on(__WEBPACK_IMPORTED_MODULE_5__events__["f" /* CONTINUE_PROMISES */], () => {
                removeEvent1();
                removeEvent2();
                resolve();
            });
        });

        return [promiseTitle, promiseDate, promiseTimeStart, promiseTimeEnd, promiseMembers, promiseTalk, breakPromise];
    }

    stopPromises() {
        this.triggerEvent(__WEBPACK_IMPORTED_MODULE_5__events__["b" /* BREAK_PROMISES_ON_MAIN */]);
    }

    runPromises() {

        Promise.race(this.createPromises()).then(() => {
            const flag1 = this.meeting.getDataForRecommendation();
            const flag2 = this.checkTitleAndTalks();

            if (!!flag1 && flag2) {
                this.footer.setActiveButtonCreate();
                this.dateStart = flag1[0];
                this.dateEnd = flag1[1];
                this.membersId = flag1[2];
                this.strDate = __WEBPACK_IMPORTED_MODULE_10__helpers_helpers__["a" /* helpers */].glueTwoDateForString(flag1[0], flag1[1]);
            } else {
                this.footer.setDisabledButtonCreate();
            }
            this.runPromises();
        }).catch(err => {});
    }

    checkTitleAndTalks() {
        const title = this.getElement('.js-title').value;
        let talk = this.getElement('.js-talk');
        if (talk) {
            const roomId = talk.dataset.roomId;
            this.roomId = roomId;
            this.title = title;
            this.model.getRoomById(roomId, room => {
                this.strLocation = `${room['title']} &middot; ${room['floor']} этаж`;
            });
        }

        return !!talk && __WEBPACK_IMPORTED_MODULE_9__helpers_validation__["a" /* validation */].title(title);
    }

    get headerElement() {
        return this.getElement('.app__header');
    }

    get mainElement() {
        return this.getElement('.app__main');
    }

    get meetingElement() {
        return this.getElement('.app__meeting');
    }

    get footerElement() {
        return this.getElement('.app__footer');
    }

    get notificationElement() {
        return this.getElement('.app__notification');
    }

    get notificationDeleteElement() {
        return this.getElement('.app__notification-delete');
    }

    get notificationCreateElement() {
        return this.getElement('.app__notification-create');
    }
};

/***/ }),
/* 11 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return Header; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__framework_BaseComponent__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__logo_logo__ = __webpack_require__(12);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__button_button__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__events__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__helpers_helpers__ = __webpack_require__(1);






let Header = class Header extends __WEBPACK_IMPORTED_MODULE_0__framework_BaseComponent__["a" /* BaseComponent */] {

    constructor() {
        super();
    }

    template() {
        return `<header class="header">
                    <div class="header__logo"></div>
                    <div class="header__button"></div>
                </header>
        `;
    }

    onRender() {
        this.showLogo();
        this.showButton();

        this.buttonElement.on('click', () => this.handleButton());
    }

    upgrade() {}

    createButton() {
        this.button = new __WEBPACK_IMPORTED_MODULE_2__button_button__["a" /* Button */]({
            modBtn: 'create',
            btnText: 'Создать встречу',
            modBtnText: ['white']
        });

        this.button.renderTo(this.buttonElement);
        this.addToListUpgrade(this.button);

        this.buttonElement.classList.remove('header__button_inactive');
    }

    createLogo() {
        this.logo = new __WEBPACK_IMPORTED_MODULE_1__logo_logo__["a" /* Logo */]();
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
        this.triggerEvent(__WEBPACK_IMPORTED_MODULE_3__events__["k" /* MEETING_PAGE */]);
    }

    get logoElement() {
        return this.getElement('.header__logo');
    }

    get buttonElement() {
        return this.getElement('.header__button');
    }
};

/***/ }),
/* 12 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return Logo; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__framework_BaseComponent__ = __webpack_require__(0);


let Logo = class Logo extends __WEBPACK_IMPORTED_MODULE_0__framework_BaseComponent__["a" /* BaseComponent */] {

    template() {
        return `
            <img class="logo" src="image/svg/logo.svg">
            `;
    }
};

/***/ }),
/* 13 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return Main; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__framework_BaseComponent__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__date_date__ = __webpack_require__(14);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__events__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__time_scale_time_scale__ = __webpack_require__(16);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__rooms_rooms__ = __webpack_require__(17);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__diagram_diagram__ = __webpack_require__(18);







let Main = class Main extends __WEBPACK_IMPORTED_MODULE_0__framework_BaseComponent__["a" /* BaseComponent */] {

    constructor(model) {
        super();
        this.model = model;
    }

    template() {
        return `
            <div class="main">
                <div class="main__date"></div>
                <div class="main__wrapper1 js-scrolling-x">
                    <div class="main__time-scale"></div>
                    <div class="main__wrapper2">
                        <div class="main__rooms"></div>
                        <div class="main__diagram"></div>
                    </div>
                </div>
            </div>
        `;
    }

    onRender() {
        this.showDate();
        this.showTimeScale();

        this.model.getRooms(dataRooms => {
            this.showRooms(dataRooms);
            this.showDiagram(dataRooms);
        });

        this.domElement.on(__WEBPACK_IMPORTED_MODULE_2__events__["c" /* CHANGE_DATE */], () => this.deepUpgrade());
    }

    upgrade() {
        this.setTimeScale();
    }

    createDate() {
        this.date = new __WEBPACK_IMPORTED_MODULE_1__date_date__["a" /* DateComponent */](this.model);
        this.date.renderTo(this.dateElement);
        this.addToListUpgrade(this.date);
    }

    createTimeScale() {
        this.timeScale = new __WEBPACK_IMPORTED_MODULE_3__time_scale_time_scale__["a" /* TimeScale */]({
            model: this.model,
            start: 8,
            end: 23
        });

        this.timeScale.renderTo(this.timeScaleElement);
        this.addToListUpgrade(this.timeScale);
    }

    createRooms() {
        this.rooms = new __WEBPACK_IMPORTED_MODULE_4__rooms_rooms__["a" /* Rooms */]();
        this.rooms.renderTo(this.roomsElement);
        this.addToListUpgrade(this.rooms);
    }

    createDiagram() {
        this.diagram = new __WEBPACK_IMPORTED_MODULE_5__diagram_diagram__["a" /* Diagram */](this.model);
        this.diagram.renderTo(this.diagramElement);
        this.addToListUpgrade(this.diagram);
    }

    showDate() {
        if (!this.date) this.createDate();
    }

    showTimeScale() {
        if (!this.timeScale) this.createTimeScale();
    }

    setTimeScale() {
        this.timeScale.upgrade();
    }

    showRooms(dataRooms) {
        if (!this.rooms) this.createRooms();

        this.rooms.setRooms(dataRooms);
    }

    showDiagram(dataRooms) {
        if (!this.diagram) this.createDiagram();

        this.diagram.setCoordTimeScale({
            coord: this.timeScale.getCoordLabel(),
            scaleOfOneMinute: this.timeScale.getScaleOfOneMinute()
        });

        this.diagram.setRooms(dataRooms);
    }

    get dateElement() {
        return this.getElement('.main__date');
    }

    get timeScaleElement() {
        return this.getElement('.main__time-scale');
    }

    get roomsElement() {
        return this.getElement('.main__rooms');
    }

    get diagramElement() {
        return this.getElement('.main__diagram');
    }

    get wrapper1Element() {
        return this.getElement('.main__wrapper1');
    }
};

/***/ }),
/* 14 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return DateComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__calendar_calendar__ = __webpack_require__(15);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__framework_BaseComponent__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__events__ = __webpack_require__(2);




let DateComponent = class DateComponent extends __WEBPACK_IMPORTED_MODULE_1__framework_BaseComponent__["a" /* BaseComponent */] {

    constructor(model) {
        super();
        this.model = model;
    }

    template() {
        return `  
            <div class="date"> 
                <div class="date__button" data-btn="-1">
                    <img src="image/svg/arrow2.svg" alt="" class="date__arrow">
                </div>
                <div class="date__text"></div> 
                <div class="date__button" data-btn="+1">
                    <img src="image/svg/arrow.svg" alt="" class="date__arrow">
                </div>
                <div class="date__calendar"></div>
            </div> 
        `;
    }

    onRender() {
        this.upgrade();

        this.textElement.on('click', () => this.handleCalendar());
        this.buttonElement.on('click', e => this.changeDate(e));
    }

    upgrade() {
        this.showDate();
        this.drawCalendar();
    }

    showDate() {
        this.textElement.innerHTML = this.model.getDateUTCToString();
    }

    drawCalendar() {
        this.calendar = new __WEBPACK_IMPORTED_MODULE_0__calendar_calendar__["a" /* Calendar */](this.model, 3).create();
        this.calendarElement.innerHTML = '';
        this.calendarElement.appendChild(this.calendar);
    }

    handleCalendar() {
        this.calendarElement.toggle();
        this.textElement.classList.toggle('date__text_active');
    }

    changeDate(e) {
        const btn = e.currentTarget;
        const where = +btn.dataset.btn;
        let currentDate = this.model.getAppDateUTC();
        this.model.setAppDateUTC(currentDate.setUTCDate(currentDate.getUTCDate() + where));
        this.triggerEvent(__WEBPACK_IMPORTED_MODULE_2__events__["c" /* CHANGE_DATE */]);
    }

    get calendarElement() {
        return this.getElement('.date__calendar');
    }

    get textElement() {
        return this.getElement('.date__text');
    }

    get buttonElement() {
        return this.getElement('.date__button');
    }
};

/***/ }),
/* 15 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return Calendar; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__helpers_helpers__ = __webpack_require__(1);


let Calendar = class Calendar {
    constructor(model, numberOfMonths, nextPack = 0) {
        this.model = model;
        this.numberOfMonths = numberOfMonths;
        this.nextPack = nextPack;

        Date.prototype.getNormDay = function () {
            return this.getDay() === 0 ? 7 : this.getDay();
        };

        String.prototype.toFirstUpperCase = function () {
            return this.charAt(0).toUpperCase() + this.substr(1);
        };
    }

    create() {
        // let startDay = helpers.getDateUTC();
        let startDay = this.model.getAppDateUTC();
        startDay.setMonth(startDay.getMonth() + this.nextPack * this.numberOfMonths);
        startDay.setDate(1);

        let year = startDay.getFullYear();
        let month = startDay.getMonth();

        let calendar = document.createElement('div');
        calendar.classList.add('calendar');

        for (let n = 1; n <= this.numberOfMonths; n++) {
            let calendarItem = document.createElement('div');
            calendarItem.classList.add('calendar__item');
            calendarItem.setAttribute('data-month', `${startDay.getMonth()}`);
            calendarItem.setAttribute('data-year', `${startDay.getFullYear()}`);

            let table = document.createElement('table');
            table.classList.add('calendar__table');

            let tableCaption = document.createElement('caption');
            tableCaption.classList.add('calendar__table-caption');
            tableCaption.innerHTML = startDay.toLocaleString('ru', { month: 'long', year: 'numeric' }).toFirstUpperCase();
            table.appendChild(tableCaption);

            let tableHead = document.createElement('thead');
            tableHead.classList.add('calendar__table-head');
            for (let dw of Calendar.getDayOfWeek().values()) {
                let td = document.createElement('td');
                dw === 'ВС' ? td.classList.add('calendar__table-data', 'calendar__table-data_free') : td.classList.add('calendar__table-data');
                td.innerHTML = dw.toLowerCase();
                tableHead.appendChild(td);
            }
            table.appendChild(tableHead);

            let tableBody = document.createElement('tbody');
            tableBody.classList.add('calendar__table-body');
            while (startDay.getMonth() === month) {
                let tr = document.createElement('tr');
                for (let i = 1; i <= 7; i++) {
                    let td = document.createElement('td');
                    td.classList.add('calendar__table-data');
                    td.setAttribute('data-day', `${startDay.getDate()}`);

                    if (startDay.getNormDay() === i && startDay.getMonth() === month) {
                        td.innerHTML = `${startDay.getDate()}`;
                        startDay.getNormDay() === 7 ? td.classList.add('calendar__table-data_free') : null;

                        if (__WEBPACK_IMPORTED_MODULE_0__helpers_helpers__["a" /* helpers */].stateDate(startDay) === '<') {
                            td.classList.add('calendar__table-data_inactive');
                        } else if (__WEBPACK_IMPORTED_MODULE_0__helpers_helpers__["a" /* helpers */].stateDate(startDay) === 0) {
                            td.classList.add('calendar__table-data_today');
                        } else {
                            td.classList.add('calendar__table-data_active');
                        }
                        startDay.setDate(startDay.getDate() + 1);
                    } else {
                        td.innerHTML = ' ';
                    }
                    tr.appendChild(td);
                }
                tableBody.appendChild(tr);
            }
            table.appendChild(tableBody);
            calendarItem.appendChild(table);
            calendar.appendChild(calendarItem);

            year = startDay.getFullYear();
            month = startDay.getMonth();
        }

        return calendar;
    }

    // chooseDay(e) {
    //     if (e.target.hasAttribute('data-month') && e.target.hasAttribute('data-day')) return;
    //
    //     const year = e.currentTarget.getAttribute('data-year');
    //     const month = e.currentTarget.getAttribute('data-month');
    //     const day = e.target.getAttribute('data-day');
    //
    //     this.currentDay.setFullYear(year);
    //     this.currentDay.setMonth(month);
    //     this.currentDay.setDate(day);
    //
    //     this.model.setDate(this.currentDay);
    //     this.triggerEvent(CHANGE_DATE);
    // }

    // chooseInputDay(e) {
    //     if (e.target.hasAttribute('data-month') && e.target.hasAttribute('data-day')) return;
    //
    //     const year = e.currentTarget.getAttribute('data-year');
    //     let month = e.currentTarget.getAttribute('data-month');
    //     const day = e.target.getAttribute('data-day');
    //
    //     const monthToNumber = {
    //         "января": 1,
    //         "февраля": 2,
    //         "марта": 3,
    //         "апреля": 4,
    //         "мая": 5,
    //         "июня": 6,
    //         "июля": 7,
    //         "августа": 8,
    //         "сентября": 9,
    //         "октября": 10,
    //         "ноября": 11,
    //         "декабря": 12.
    //     };
    //
    //     for (let key in monthToNumber) {
    //         if (monthToNumber[key] === +month + 1) {
    //             month = key;
    //         }
    //     }
    //
    //     this.triggerEvent(CHOOSE_DATE_ON_INPUT, {
    //         year,
    //         month,
    //         day,
    //     });
    // }

    static getDayOfWeek(n = -1) {
        const mapDays = new Map([[1, 'ПН'], [2, 'ВТ'], [3, 'СР'], [4, 'ЧТ'], [5, 'ПТ'], [6, 'СБ'], [7, 'ВС']]);
        if (n < 0) {
            return mapDays;
        }
        return mapDays.get(n);
    }
};

/***/ }),
/* 16 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return TimeScale; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__framework_BaseComponent__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__helpers_helpers__ = __webpack_require__(1);



let TimeScale = class TimeScale extends __WEBPACK_IMPORTED_MODULE_0__framework_BaseComponent__["a" /* BaseComponent */] {
    constructor({ model, start, end }) {
        super();
        this.model = model;
        this.start = start;
        this.end = end;
        this.timeLabel = [...this.generateTimeLabels(start, end)];
        this.scaleOfOneMinute = null;
    }

    template() {
        return `
            <div class="time-scale">
                <div class="time-scale__empty"></div>
                <div class="time-scale__labels"></div>
                <div class="time-scale__empty"></div>
            </div>
        `;
    }

    onRender() {
        this.upgrade();
    }

    upgrade() {
        this.showLabels();
        this.showCurrentLabel();
    }

    showLabels() {
        const state = __WEBPACK_IMPORTED_MODULE_1__helpers_helpers__["a" /* helpers */].stateDate(this.model.getAppDateUTC());

        this.labelsElement.innerHTML = this.timeLabel.reduce((previousValue, currentValue) => {
            let classInactive = '';

            if (state === 0) {
                classInactive = currentValue <= this.model.getCurrentDateUTC().getHours() ? 'time-scale__label_inactive' : '';
                setTimeout(() => this.showLabels(), 1000 * 60 * (60 - this.model.getCurrentDateUTC().getMinutes()));
            } else if (state === -1 || state === '<') {
                classInactive = 'time-scale__label_inactive';
            }

            return previousValue + `
                            <div class="time-scale__label ${classInactive}">
                                ${currentValue}
                            </div>`;
        }, '');
    }

    getCoordLabel() {
        let obj = Object.create(null);

        this.labelElement.forEach((item, index) => {
            if (!item.classList.contains('time-scale__label_current')) {
                obj[this.timeLabel[index]] = item.offsetLeft + 0.5 * item.offsetWidth;
            }
        });
        return obj;
    }

    getScaleOfOneMinute() {
        const coordLabel = this.getCoordLabel();
        return (coordLabel[this.end] - coordLabel[this.end - 1]) / 60;
    }

    showCurrentLabel() {
        if (__WEBPACK_IMPORTED_MODULE_1__helpers_helpers__["a" /* helpers */].stateDate(this.model.getAppDateUTC()) !== 0) return;

        const currentLabel = this.createElement('div', ['time-scale__label', 'time-scale__label_current']);

        currentLabel.hide();

        this.labelsElement.appendChild(currentLabel);
        setTimeout(moveCurrentLabel.bind(this), 0);
        this.timer ? clearTimeout(this.timer) : null;

        function moveCurrentLabel() {
            currentLabel.show();

            const currentDate = this.model.getCurrentDateUTC();

            const hours = currentDate.getHours();
            const minutes = currentDate.getMinutes();

            const indentLeft = this.getCoordLabel()[hours] - 0.5 * currentLabel.offsetWidth + minutes * this.getScaleOfOneMinute();
            currentLabel.style.left = indentLeft + 'px';
            currentLabel.innerHTML = __WEBPACK_IMPORTED_MODULE_1__helpers_helpers__["a" /* helpers */].getTimeFormatHHMM(currentDate);

            this.timer = setTimeout(() => moveCurrentLabel.call(this), 1000 * (60 - currentDate.getSeconds()));
        }
    }

    *generateTimeLabels(start, end) {
        for (let i = start; i <= end; i++) {
            yield i;
        }
    }

    get labelsElement() {
        return this.getElement('.time-scale__labels');
    }

    get labelElement() {
        return this.getElement('.time-scale__label');
    }

};

/***/ }),
/* 17 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return Rooms; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__framework_BaseComponent__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__helpers_helpers__ = __webpack_require__(1);



let Rooms = class Rooms extends __WEBPACK_IMPORTED_MODULE_0__framework_BaseComponent__["a" /* BaseComponent */] {

    constructor() {
        super();
    }

    template() {
        return `
            <div class="rooms"></div> 
        `;
    }

    onRender() {

        if (__WEBPACK_IMPORTED_MODULE_1__helpers_helpers__["a" /* helpers */].deviceCheck() === 'touch') {
            const wrapper1 = document.getElementsByClassName('js-scrolling-x')[0];
            wrapper1.addEventListener('scroll', e => this.scrolling(e));
        }
    }

    upgrade() {}

    setRooms(rooms) {
        let floorHtml = '';
        let roomsHtml = '';
        let currentFloor = rooms[0]['floor'];

        rooms.forEach(room => {
            const roomId = room['id'];
            const title = room['title'];
            const capacity = room['capacity'];
            const floor = room['floor'];

            if (floor !== currentFloor) {
                floorHtml += `
                    <div class="rooms__floor" data-floor="${currentFloor}">
                        <div class="rooms__floor-text">${currentFloor} ЭТАЖ</div>
                        ${roomsHtml}
                    </div>
                `;

                roomsHtml = '';
                currentFloor = floor;
            }

            roomsHtml += `
                <div class="rooms__room" data-room-id="${roomId}">
                    <div class="rooms__room-title">${title}</div>
                    <div class="rooms__room-capacity">до ${capacity} человек</div>
                </div>
            `;
        });

        floorHtml += `
                    <div class="rooms__floor">
                        <div class="rooms__floor-text">${currentFloor} ЭТАЖ</div>
                        ${roomsHtml}
                    </div>
                `;

        this.domElement.innerHTML = floorHtml;
    }

    scrolling(e) {
        const target = e.target;

        if (target.scrollLeft > this.domElement.offsetWidth) {
            this.toFixRoomsFloorText(target.scrollLeft);
            this.toFixRoomsRoomTitle(target.scrollLeft);
        } else {
            this.toFixRoomsFloorText(0);
            this.toFixRoomsRoomTitle(0);
        }
    }

    toFixRoomsFloorText(indent) {
        // if (this.floorTextElement.length === undefined) {
        //     this.floorTextElement.style.left = indent + 'px';
        // }

        Array.from(this.floorTextElement()).forEach(function (item) {
            item.style.left = indent + 'px';
        });
    }

    toFixRoomsRoomTitle(indent) {
        // let roomtitle = this.roomTitleElement();
        //
        // if (this.roomTitleElement.length === undefined) {
        //     roomtitle = [roomtitle];
        // }

        Array.from(this.roomTitleElement()).forEach(function (item) {
            item.style.left = indent + 'px';
            indent ? item.classList.add('rooms__room-title_scrolling') : item.classList.remove('rooms__room-title_scrolling');
        });
    }

    roomTitleElement() {
        return this.getElement('.rooms__room-title');
    }

    floorTextElement() {
        return this.getElement('.rooms__floor-text');
    }
};

/***/ }),
/* 18 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return Diagram; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__framework_BaseComponent__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__helpers_helpers__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__popup_popup__ = __webpack_require__(19);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__events__ = __webpack_require__(2);





let Diagram = class Diagram extends __WEBPACK_IMPORTED_MODULE_0__framework_BaseComponent__["a" /* BaseComponent */] {

    constructor(model) {
        super();
        this.model = model;
    }

    template() {
        return `
            <div class="diagram"></div>
            `;
    }

    onRender() {
        document.on('click', e => this.handlePopup(e));
        this.domElement.on('click', e => this.handleCreate(e));
    }

    upgrade() {
        this.showTimeItems();
        this.model.getEvents(dataEvents => this.showBusyMeetings(dataEvents));
    }

    setRooms(rooms) {
        let floorHtml = '';
        let roomsHtml = '';
        let currentFloor = rooms[0]['floor'];

        rooms.forEach(room => {
            const roomId = room['id'];
            const floor = room['floor'];

            if (floor !== currentFloor) {
                floorHtml += `
                    <div class="diagram__floor" data-floor="${currentFloor}">
                        ${roomsHtml}
                    </div>
                `;

                roomsHtml = '';
                currentFloor = floor;
            }

            roomsHtml += `
                <div class="diagram__room" data-room-id="${roomId}"></div>
            `;
        });

        floorHtml += `
                    <div class="diagram__floor">
                        ${roomsHtml}
                    </div>
                `;

        this.domElement.innerHTML = floorHtml;
        this.upgrade();
    }

    handlePopup(e) {
        let labelElements = this.labelElements;
        if (!labelElements) return;

        labelElements = labelElements.length ? labelElements : [labelElements];

        labelElements.forEach(label => {
            if (label === e.target) {
                label.classList.remove('diagram__label_active');
                if (__WEBPACK_IMPORTED_MODULE_1__helpers_helpers__["a" /* helpers */].deviceCheck() === 'touch') {
                    label.children[1].style.left = `-${label.getBoundingClientRect().left}px`;
                }
            } else if (label.parentNode === e.target || label.contains(e.target)) {
                label.classList.add('diagram__label_active');
                if (__WEBPACK_IMPORTED_MODULE_1__helpers_helpers__["a" /* helpers */].deviceCheck() === 'touch') {
                    label.children[1].style.left = `-${label.getBoundingClientRect().left}px`;
                }
            } else {
                label.classList.remove('diagram__label_active');
            }
        });
    }

    handleCreate(e) {
        let rooms = this.roomElements;
        if (!rooms) return;

        rooms = rooms.length ? rooms : [rooms];

        let timeItemFreeElements = this.timeItemFreeElements;
        if (!timeItemFreeElements) return;

        timeItemFreeElements = timeItemFreeElements.length ? timeItemFreeElements : [timeItemFreeElements];

        rooms.forEach(room => {
            if (room.contains(e.target) || room === e.target) {
                timeItemFreeElements.forEach(item => {
                    if (e.target === item) {
                        const roomId = room.dataset.roomId;
                        const timeStart = item.dataset.timeStart;
                        const timeEnd = item.dataset.timeEnd;

                        this.triggerEvent(__WEBPACK_IMPORTED_MODULE_3__events__["k" /* MEETING_PAGE */], {
                            roomId,
                            timeStart,
                            timeEnd
                        });
                    }
                });
            }
        });
    }

    showTimeItems() {
        const timeItemHtml = this.createTimeItemElement();

        this.roomElements.forEach(el => {
            el.innerHTML = timeItemHtml;
        });
    }

    showBusyMeetings(dataEvents) {

        dataEvents.forEach(event => {
            const roomId = event['room']['id'],
                  title = event['title'],
                  dateStart = __WEBPACK_IMPORTED_MODULE_1__helpers_helpers__["a" /* helpers */].getDateUTC(0, event['dateStart']),
                  dateEnd = __WEBPACK_IMPORTED_MODULE_1__helpers_helpers__["a" /* helpers */].getDateUTC(0, event['dateEnd']),
                  timeStart = __WEBPACK_IMPORTED_MODULE_1__helpers_helpers__["a" /* helpers */].getTimeFormatHHMM(dateStart),
                  timeEnd = __WEBPACK_IMPORTED_MODULE_1__helpers_helpers__["a" /* helpers */].getTimeFormatHHMM(dateEnd);

            let timeItemElements = this.getTimeItemElementInRoom(roomId, timeStart, timeEnd);

            const wL = __WEBPACK_IMPORTED_MODULE_1__helpers_helpers__["a" /* helpers */].differenceTimeInMinutes(timeStart, timeItemElements[0].dataset.timeStart);
            const wM = __WEBPACK_IMPORTED_MODULE_1__helpers_helpers__["a" /* helpers */].differenceTimeInMinutes(timeEnd, timeStart);
            const wR = __WEBPACK_IMPORTED_MODULE_1__helpers_helpers__["a" /* helpers */].differenceTimeInMinutes(timeItemElements[timeItemElements.length - 1].dataset.timeEnd, timeEnd);

            const elL = this.createElement('div', ['diagram__time-item', 'diagram__time-item_free'], {
                'style': `min-width: ${wL * this.scaleOfOneMinute}px`,
                'data-time-start': `${timeItemElements[0].dataset.timeStart}`,
                'data-time-end': `${timeStart}`
            });

            const elM = this.createElement('div', ['diagram__time-item', 'diagram__time-item_busy'], {
                'style': `min-width: ${wM * this.scaleOfOneMinute}px`,
                'data-time-start': `${timeStart}`,
                'data-time-end': `${timeEnd}`
            });

            this.addLabelElement(elM, event);

            const elR = this.createElement('div', ['diagram__time-item', 'diagram__time-item_free'], {
                'style': `min-width: ${wR * this.scaleOfOneMinute}px`,
                'data-time-start': `${timeEnd}`,
                'data-time-end': `${timeItemElements[timeItemElements.length - 1].dataset.timeEnd}`
            });

            timeItemElements[0].insertAdjacentElement('beforeBegin', elL);
            timeItemElements[0].insertAdjacentElement('beforeBegin', elM);
            timeItemElements[0].insertAdjacentElement('beforeBegin', elR);

            timeItemElements.forEach(item => {
                item.parentNode.removeChild(item);
            });
        });
    }

    setCoordTimeScale({ coord, scaleOfOneMinute }) {
        this.coordTimeLabels = {};
        Object.assign(this.coordTimeLabels, coord);
        this.scaleOfOneMinute = scaleOfOneMinute;
    }

    getTimeItemElementInRoom(id, timeStart, timeEnd) {
        const room = this.getRoomElement(id);
        let meetings = room.getElementsByClassName('diagram__time-item');

        meetings = Array.from(meetings).filter(item => {
            if (item.hasAttribute('data-time-start')) {
                const compare1 = __WEBPACK_IMPORTED_MODULE_1__helpers_helpers__["a" /* helpers */].differenceTimeInMinutes(timeStart, item.dataset.timeStart);
                const compare2 = __WEBPACK_IMPORTED_MODULE_1__helpers_helpers__["a" /* helpers */].differenceTimeInMinutes(item.dataset.timeEnd, timeEnd);

                const flag1 = compare1 >= 0 && compare1 < 60;
                const flag2 = compare2 >= 0 && compare2 < 60;
                const flag3 = compare1 < 0 && compare2 < 0;

                return flag1 || flag2 || flag3;
            } else {
                return false;
            }
        });

        return meetings;
    }

    getRoomElement(id) {
        const rooms = this.roomElements;
        return rooms.find(item => {
            return item.dataset.roomId === id;
        });
    }

    addLabelElement(el, event) {
        const labelElement = this.createElement('div', ['diagram__label']);
        const triangleElement = this.createElement('div', ['diagram__triangle']);
        const popupElement = this.createElement('div', ['diagram__popup']);

        labelElement.appendChild(triangleElement);
        labelElement.appendChild(popupElement);

        labelElement.on('click', () => {
            triangleElement.classList.add('diagram__label_active');
            popupElement.classList.add('diagram__label_active');
        });

        const popup = new __WEBPACK_IMPORTED_MODULE_2__popup_popup__["a" /* Popup */](event);
        popup.renderTo(popupElement);
        this.addToListUpgrade(popup);

        el.appendChild(labelElement);
    }

    createTimeItemElement() {
        let timeItemHtml = '';
        let currentWidth;

        const listCoordLabels = Object.keys(this.coordTimeLabels);
        listCoordLabels.forEach((key, index) => {
            if (index === 0) {
                currentWidth = this.coordTimeLabels[key];

                timeItemHtml += `
                    <div 
                        class="diagram__time-item" 
                        style="min-width: ${currentWidth}px">
                    </div>
                `;
            } else {
                currentWidth = this.coordTimeLabels[key] - this.coordTimeLabels[key - 1];

                timeItemHtml += `
                    <div 
                        class="diagram__time-item diagram__time-item_free" 
                        style="min-width: ${currentWidth}px"
                        data-time-start="${key - 1}:00"
                        data-time-end="${key}:00">
                    </div>
                `;
            }

            if (index === listCoordLabels.length - 1) {
                currentWidth = __WEBPACK_IMPORTED_MODULE_1__helpers_helpers__["a" /* helpers */].deviceCheck() === 'desktop' ? this.domElement.offsetWidth - this.coordTimeLabels[key] : 24.5;

                timeItemHtml += `
                    <div 
                        class="diagram__time-item" 
                        style="min-width: ${currentWidth}px">
                    </div>
                `;
            }
        });

        return timeItemHtml;
    }

    get labelElements() {
        return this.getElement('.diagram__label');
    }

    get roomElements() {
        return this.getElement('.diagram__room');
    }

    get timeItemFreeElements() {
        return this.getElement('.diagram__time-item_free');
    }
};

/***/ }),
/* 19 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return Popup; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__person_person__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__framework_BaseComponent__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__helpers_helpers__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__events__ = __webpack_require__(2);





let Popup = class Popup extends __WEBPACK_IMPORTED_MODULE_1__framework_BaseComponent__["a" /* BaseComponent */] {

    constructor({ id, title, room, users, dateStart, dateEnd }) {
        super();
        this.id = id;
        this.title = title;
        this.room = room;
        this.users = users;
        this.dateStart = __WEBPACK_IMPORTED_MODULE_2__helpers_helpers__["a" /* helpers */].getDateUTC(0, dateStart);
        this.dateEnd = __WEBPACK_IMPORTED_MODULE_2__helpers_helpers__["a" /* helpers */].getDateUTC(0, dateEnd);
    }

    template() {
        const countOthers = this.users.length - 1;
        const dayWithMonth = this.dateStart.toLocaleString('ru', { day: 'numeric', month: 'long' });

        this.day = this.dateStart.getDate();
        this.year = this.dateStart.getFullYear();

        this.timeStart = __WEBPACK_IMPORTED_MODULE_2__helpers_helpers__["a" /* helpers */].getTimeFormatHHMM(this.dateStart);
        this.timeEnd = __WEBPACK_IMPORTED_MODULE_2__helpers_helpers__["a" /* helpers */].getTimeFormatHHMM(this.dateEnd);

        return `
            <div class="popup">
                <div class="popup__edit">
                    <img class="popup__edit-img" src="image/svg/edit.svg" alt="edit">
                </div>
                <div class="popup__title">${this.title}</div>
                <div class="popup__description">
                    <span class="popup__date">${dayWithMonth}, </span>
                    <span class="popup__time">${this.timeStart} - ${this.timeEnd}</span>
                    <span class="popup__delimiter">·</span>
                    <span class="popup__room">${this.room['title']}</span>
                </div>
                <div class="popup__members">
                    <div class="popup__creator"></div>
                    <div class="popup__other">
                        и ${countOthers}
                        ${countOthers === 1 ? `участник` : `${countOthers > 1 && countOthers < 5 ? 'участника' : 'участников'}`}
                    </div>
                </div>
            </div>
        `;
    }

    onRender() {
        this.drawPerson(this.users[0]);

        this.editElement.on('click', () => this.handleEdit());
    }

    upgrade() {}

    drawPerson(user) {
        const login = user['login'],
              avatar = user['avatarUrl'];

        const person = new __WEBPACK_IMPORTED_MODULE_0__person_person__["a" /* Person */]({
            login: login,
            avatar: avatar
        });

        person.renderTo(this.creatorElement);
        this.addToListUpgrade(person);
    }

    handleEdit() {
        this.triggerEvent(__WEBPACK_IMPORTED_MODULE_3__events__["k" /* MEETING_PAGE */], {
            eventId: this.id,
            title: this.title,
            timeStart: this.timeStart,
            timeEnd: this.timeEnd,
            roomId: this.room['id'],
            usersId: this.users.map(user => user['id'])
        });
    }

    get creatorElement() {
        return this.getElement('.popup__creator');
    }

    get editElement() {
        return this.getElement('.popup__edit');
    }
};

/***/ }),
/* 20 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return Meeting; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__framework_BaseComponent__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__status_status__ = __webpack_require__(21);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__input_input__ = __webpack_require__(7);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__date_selection_date_selection__ = __webpack_require__(22);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__helpers_helpers__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__select_members_select_members__ = __webpack_require__(23);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__events__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__talks_talks__ = __webpack_require__(24);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__api_removeEvent__ = __webpack_require__(8);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__helpers_validation__ = __webpack_require__(5);











let Meeting = class Meeting extends __WEBPACK_IMPORTED_MODULE_0__framework_BaseComponent__["a" /* BaseComponent */] {

    constructor(model) {
        super();
        this.model = model;
    }

    template() {

        return `
            <div class="meeting">
                <div class="meeting__status"></div>
                <div class="meeting__title"></div>
                <div class="meeting__date"></div>
                <div class="meeting__members">
                    <div class="meeting__input-members"></div>
                    <div class="meeting__select-members"></div>
                </div>
                <div class="meeting__talks"></div>
            </div>
        `;
    }

    onRender() {
        this.createStatus();
        this.createTitle();
        this.createDateSelection();
        this.createInputMembers();
        this.createSelectMembers();
        this.createTalks();

        this.domElement.on(__WEBPACK_IMPORTED_MODULE_6__events__["m" /* OPEN_MEMBERS */], () => this.selectMembers.showChooseMembers());
        this.domElement.on(__WEBPACK_IMPORTED_MODULE_6__events__["d" /* CLOSE_MEMBERS */], () => this.selectMembers.hideChooseMembers());
        document.on('click', e => this.handleMembers(e));
    }

    upgrade() {
        this.stopPromises();
        this.runPromises();
        this.showStatus();
        this.showTitle();
        this.showDateSelection();
        this.showInputMembers();
        this.showSelectMembers();
        this.showTalks();
    }

    setDetail(detail) {
        this.detail = detail;
        this.upgrade();
    }

    createPromises() {

        const promiseDate = new Promise(resolve => {
            const removeEvent = this.domElement.on(__WEBPACK_IMPORTED_MODULE_6__events__["n" /* SELECT_DATE */], e => {
                removeEvent();
                resolve();
            });
        });

        const promiseTimeStart = new Promise(resolve => {
            const removeEvent = this.domElement.on(__WEBPACK_IMPORTED_MODULE_6__events__["r" /* SELECT_TIME_START */], e => {
                removeEvent();
                resolve();
            });
        });

        const promiseTimeEnd = new Promise(resolve => {
            const removeEvent = this.domElement.on(__WEBPACK_IMPORTED_MODULE_6__events__["q" /* SELECT_TIME_END */], e => {
                removeEvent();
                resolve();
            });
        });

        const promiseMembers = new Promise(resolve => {
            const removeEvent = this.domElement.on(__WEBPACK_IMPORTED_MODULE_6__events__["o" /* SELECT_MEMBERS */], e => {
                removeEvent();
                resolve();
            });
        });

        const breakPromise = new Promise((resolve, reject) => {
            let removeEvent1, removeEvent2;

            removeEvent1 = this.domElement.on(__WEBPACK_IMPORTED_MODULE_6__events__["a" /* BREAK_PROMISES */], () => {
                removeEvent1();
                removeEvent2();
                reject('stop');
            });

            removeEvent2 = this.domElement.on(__WEBPACK_IMPORTED_MODULE_6__events__["f" /* CONTINUE_PROMISES */], () => {
                removeEvent1();
                removeEvent2();
                resolve();
            });
        });

        return [promiseDate, promiseTimeStart, promiseTimeEnd, promiseMembers, breakPromise];
    }

    stopPromises() {
        this.triggerEvent(__WEBPACK_IMPORTED_MODULE_6__events__["a" /* BREAK_PROMISES */]);
    }

    runPromises() {
        Promise.race(this.createPromises()).then(() => {
            const data = this.getDataForRecommendation();
            if (!data) {
                this.runPromises();
                throw new Error('not validation');
            }
            return this.model.dataProcessing(...data);
        }).then(result => {
            this.runPromises();
            this.showRecommendationTalks(result);
        }).catch(err => {});
    }

    getDataForRecommendation() {
        const date = this.getElement('.js-date').value;
        const timeStart = this.getElement('.js-time-start').value;
        const timeEnd = this.getElement('.js-time-end').value;
        const membersId = this.selectMembers.getChosenMembers() || [];

        if (this.detail) {
            const currentMembers = this.detail.membersId || [];
            if (currentMembers.length !== membersId.length) {
                this.talks.removeRooms();
            }
        }

        if (__WEBPACK_IMPORTED_MODULE_9__helpers_validation__["a" /* validation */].date(date) && __WEBPACK_IMPORTED_MODULE_9__helpers_validation__["a" /* validation */].time(timeStart) && __WEBPACK_IMPORTED_MODULE_9__helpers_validation__["a" /* validation */].time(timeEnd) && membersId.length > 0) {

            const dateStart = __WEBPACK_IMPORTED_MODULE_4__helpers_helpers__["a" /* helpers */].glueDateAndTime(date, timeStart);
            const dateEnd = __WEBPACK_IMPORTED_MODULE_4__helpers_helpers__["a" /* helpers */].glueDateAndTime(date, timeEnd);

            return [dateStart, dateEnd, membersId];
        } else {
            return null;
        }
    }

    handleMembers(e) {
        if (!this.membersElement.contains(e.target)) {
            // this.selectMembers.hideChooseMembers();
            this.inputMembers.handleCloseMembers();
        }
    }

    createStatus() {
        this.status = new __WEBPACK_IMPORTED_MODULE_1__status_status__["a" /* Status */]();
        this.status.renderTo(this.statusElement);
        this.addToListUpgrade(this.status);
    }

    createTitle() {
        this.inputTitle = new __WEBPACK_IMPORTED_MODULE_2__input_input__["a" /* Input */]({
            title: 'Тема',
            placeholder: 'О чем будете говорить?',
            mod: 'text',
            eventsName: [__WEBPACK_IMPORTED_MODULE_6__events__["s" /* SELECT_TITLE */]],
            addClass: ['js-title']
        });

        this.inputTitle.renderTo(this.titleElement);
        this.addToListUpgrade(this.inputTitle);
    }

    createDateSelection() {
        this.dateSelection = new __WEBPACK_IMPORTED_MODULE_3__date_selection_date_selection__["a" /* DateSelection */]();
        this.dateSelection.renderTo(this.dateElement);
        this.addToListUpgrade(this.dateSelection);
    }

    createInputMembers() {
        this.inputMembers = new __WEBPACK_IMPORTED_MODULE_2__input_input__["a" /* Input */]({
            title: 'Участники',
            placeholder: 'Например, Тор Одинович',
            mod: 'text',
            eventsName: [__WEBPACK_IMPORTED_MODULE_6__events__["m" /* OPEN_MEMBERS */], __WEBPACK_IMPORTED_MODULE_6__events__["i" /* GET_MEMBERS */]]
        });

        this.inputMembers.renderTo(this.inputMembersElement);
        this.addToListUpgrade(this.inputMembers);
    }

    createSelectMembers() {
        this.selectMembers = new __WEBPACK_IMPORTED_MODULE_5__select_members_select_members__["a" /* SelectMembers */]();
        this.selectMembers.renderTo(this.selectMembersElement);
        this.addToListUpgrade(this.selectMembers);
    }

    createTalks() {
        this.talks = new __WEBPACK_IMPORTED_MODULE_7__talks_talks__["a" /* Talks */]();
        this.talks.renderTo(this.talksElement);
        this.addToListUpgrade(this.talks);
    }

    showStatus() {
        if (!this.status) this.createStatus();

        if (!this.detail) {
            this.status.setText('Новая встреча');
        } else if ('title' in this.detail) {
            this.status.setText('Редактирование встречи');
        } else {
            this.status.setText('Новая встреча');
        }
    }

    showTitle() {
        if (!this.title) this.createTitle();

        if (!this.detail) {
            this.inputTitle.setValue('');
        } else if ('title' in this.detail) {
            this.inputTitle.setValue(this.detail['title']);
        } else {
            this.inputTitle.setValue('');
        }
    }

    showDateSelection() {
        if (!this.dateSelection) this.createDateSelection();

        if (!this.detail) {
            this.dateSelection.setValue(__WEBPACK_IMPORTED_MODULE_4__helpers_helpers__["a" /* helpers */].getDateString(this.model.getAppDateUTC()), '', '');
        } else if ('timeStart' in this.detail) {
            this.dateSelection.setValue(__WEBPACK_IMPORTED_MODULE_4__helpers_helpers__["a" /* helpers */].getDateString(this.model.getAppDateUTC()), this.detail['timeStart'], this.detail['timeEnd']);
        } else {
            this.dateSelection.setValue(__WEBPACK_IMPORTED_MODULE_4__helpers_helpers__["a" /* helpers */].getDateString(this.model.getAppDateUTC()), '', '');
        }
    }

    showInputMembers() {
        if (!this.inputMembers) this.createInputMembers();

        this.inputMembers.hideArrow();
        this.inputMembers.setValue('');
    }

    showSelectMembers() {
        if (!this.selectMembers) this.createSelectMembers();

        this.selectMembers.hideChooseMembers();

        this.model.getUsers(dataUsers => {

            if (!this.detail) {
                this.selectMembers.setChosenMembers(dataUsers, []);
            } else if ('usersId' in this.detail) {
                this.selectMembers.setChosenMembers(dataUsers, this.detail['usersId']);
            } else {
                this.selectMembers.setChosenMembers(dataUsers, []);
            }
        });
    }

    showTalks() {
        if (!this.talks) this.createTalks();

        if (!this.detail) {
            this.talks.setText('Рекомендованные переговорки');
            this.talks.removeRooms();
        } else if ('roomId' in this.detail) {
            this.talks.removeRooms();

            const timeStart = this.detail['timeStart'];
            const timeEnd = this.detail['timeEnd'];
            const roomId = this.detail['roomId'];

            this.model.getRoomById(roomId, room => {
                this.talks.setRoom({
                    id: roomId,
                    title: room['title'],
                    floor: room['floor'],
                    timeStart,
                    timeEnd
                });
            });

            this.talks.setText('Ваша переговорка');
        } else {
            this.talks.setText('Рекомендованные переговорки');
            this.talks.removeRooms();
        }
    }

    showRecommendationTalks(rooms) {
        this.talks.removeRooms();
        this.talks.setRooms(rooms);
    }

    get statusElement() {
        return this.getElement('.meeting__status');
    }

    get titleElement() {
        return this.getElement('.meeting__title');
    }

    get dateElement() {
        return this.getElement('.meeting__date');
    }

    get membersElement() {
        return this.getElement('.meeting__members');
    }

    get inputMembersElement() {
        return this.getElement('.meeting__input-members');
    }

    get selectMembersElement() {
        return this.getElement('.meeting__select-members');
    }

    get talksElement() {
        return this.getElement('.meeting__talks');
    }
};

/***/ }),
/* 21 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return Status; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__framework_BaseComponent__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__events__ = __webpack_require__(2);



let Status = class Status extends __WEBPACK_IMPORTED_MODULE_0__framework_BaseComponent__["a" /* BaseComponent */] {

    constructor() {
        super();
    }

    template() {
        return `
            <div class="status">
                <div class="status__text"></div>
                <div class="status__close">
                    <img class="status__image" src="image/svg/close.svg" alt="">
                </div>
            </div> 
        `;
    }

    onRender() {
        this.closeElement.on('click', () => this.handleClose());
    }

    handleClose() {
        this.triggerEvent(__WEBPACK_IMPORTED_MODULE_1__events__["j" /* MAIN_PAGE */]);
    }

    setText(text) {
        this.textElement.textContent = text;
    }

    get closeElement() {
        return this.getElement('.status__close');
    }

    get textElement() {
        return this.getElement('.status__text');
    }
};

/***/ }),
/* 22 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return DateSelection; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__input_input__ = __webpack_require__(7);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__framework_BaseComponent__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__helpers_helpers__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__events__ = __webpack_require__(2);





let DateSelection = class DateSelection extends __WEBPACK_IMPORTED_MODULE_1__framework_BaseComponent__["a" /* BaseComponent */] {

    constructor() {
        super();
    }

    template() {
        return `
                <div class="date-selection">
                    <div class="date-selection__date"></div>
                    <div class="date-selection__time">
                        <div class="date-selection__time-start"></div>
                        <div class="date-selection__delimiter">—</div>
                        <div class="date-selection__time-end"></div>
                    </div>
                </div>
        `;
    }

    onRender() {
        this.createInputDate();
        this.createInputTime();
    }

    upgrade() {}

    createInputDate() {
        const title = __WEBPACK_IMPORTED_MODULE_2__helpers_helpers__["a" /* helpers */].deviceCheck() === 'touch' ? 'Дата и время' : 'Дата';

        this.inputDate = new __WEBPACK_IMPORTED_MODULE_0__input_input__["a" /* Input */]({
            title,
            placeholder: '14 декабря, 2017',
            mod: 'date',
            eventsName: [__WEBPACK_IMPORTED_MODULE_3__events__["n" /* SELECT_DATE */]],
            addClass: ['js-date']
        });

        this.inputDate.renderTo(this.dateElement);
        this.addToListUpgrade(this.inputDate);
    }

    createInputTime() {
        const title = __WEBPACK_IMPORTED_MODULE_2__helpers_helpers__["a" /* helpers */].deviceCheck() === 'touch' ? ['', ''] : ['Начало', 'Конец'];

        this.inputTimeStart = new __WEBPACK_IMPORTED_MODULE_0__input_input__["a" /* Input */]({
            title: title[0],
            placeholder: '12:00',
            maxLength: 5,
            mod: 'time',
            eventsName: [__WEBPACK_IMPORTED_MODULE_3__events__["r" /* SELECT_TIME_START */]],
            addClass: ['js-time-start']
        });

        this.inputTimeEnd = new __WEBPACK_IMPORTED_MODULE_0__input_input__["a" /* Input */]({
            title: title[1],
            placeholder: '13:00',
            maxLength: 5,
            mod: 'time',
            eventsName: [__WEBPACK_IMPORTED_MODULE_3__events__["q" /* SELECT_TIME_END */]],
            addClass: ['js-time-end']
        });

        this.inputTimeStart.renderTo(this.timeStartElement);
        this.inputTimeEnd.renderTo(this.timeEndElement);
    }

    setValue(date, timeStart, timeEnd) {
        this.inputDate.setValue(date);
        this.inputTimeStart.setValue(timeStart);
        this.inputTimeEnd.setValue(timeEnd);
    }

    get dateElement() {
        return this.getElement('.date-selection__date');
    }

    get timeStartElement() {
        return this.getElement('.date-selection__time-start');
    }

    get timeEndElement() {
        return this.getElement('.date-selection__time-end');
    }
};

/***/ }),
/* 23 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return SelectMembers; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__framework_BaseComponent__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__person_person__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__events__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__helpers_helpers__ = __webpack_require__(1);





let SelectMembers = class SelectMembers extends __WEBPACK_IMPORTED_MODULE_0__framework_BaseComponent__["a" /* BaseComponent */] {

    constructor() {
        super();
    }

    template() {
        return ` 
            <div class="select-members">
                <div class="select-members__choose"></div>
                <div class="select-members__chosen"> </div>
            </div>
        `;
    }

    onRender() {
        this.domElement.on('click', e => this.handleChooseMember(e));
    }

    upgrade() {}

    showChooseMembers() {
        this.chooseElement.show();
    }

    hideChooseMembers() {
        if (__WEBPACK_IMPORTED_MODULE_3__helpers_helpers__["a" /* helpers */].elementIsHidden(this.chooseElement)) return;

        this.chooseElement.hide();
    }

    getChosenMembers() {
        let memberChosenElements = this.memberElement;
        if (!memberChosenElements) return;
        if (!memberChosenElements.length) {
            memberChosenElements = [memberChosenElements];
        }

        memberChosenElements = memberChosenElements.filter(member => {
            if (member.classList.contains('select-members__member_chosen')) {
                return true;
            }
        });

        const membersId = memberChosenElements.map(member => {
            return member.dataset.memberChoose;
        });

        return membersId;
    }

    setChosenMembers(AllUsers, membersId) {
        this.chooseElement.innerHTML = '';
        this.chosenElement.innerHTML = '';

        AllUsers.forEach(user => {
            const id = user['id'];
            const login = user['login'];
            const floor = user['homeFloor'];
            const avatar = user['avatarUrl'];

            const person = new __WEBPACK_IMPORTED_MODULE_1__person_person__["a" /* Person */]({
                login,
                floor,
                avatar
            });

            const memberElement = this.createElement('div', ['select-members__member'], { 'data-member-choose': id });

            person.renderTo(memberElement);
            this.chooseElement.appendChild(memberElement);

            const memberChosenElement = this.createElement('div', ['select-members__member-chosen'], { 'data-member-chosen': id });

            if (membersId.indexOf(id) !== -1) {
                memberElement.classList.add('select-members__member_chosen');
                memberChosenElement.classList.add('select-members__member-chosen_chosen');
            }

            person.renderTo(memberChosenElement);
            memberChosenElement.appendChild(this.createCloseElement());
            this.chosenElement.appendChild(memberChosenElement);
        });
    }

    handleChooseMember(e) {
        this.memberElement.forEach(member => {
            if (member.contains(e.target) || member === e.target) {
                const memberId = +member.dataset.memberChoose;
                member.classList.toggle('select-members__member_chosen');

                const memberChosenElement = this.getMemberChosenElementById(memberId);
                memberChosenElement.classList.toggle('select-members__member-chosen_chosen');

                this.triggerEvent(__WEBPACK_IMPORTED_MODULE_2__events__["o" /* SELECT_MEMBERS */]);
            }
        });

        this.closeElement.forEach(el => {
            if (el.contains(e.target) || el === e.target) {
                const memberChosenElement = el.parentNode;
                memberChosenElement.classList.remove('select-members__member-chosen_chosen');

                const memberId = memberChosenElement.dataset.memberChosen;
                const memberElement = this.getMemberElementById(memberId);
                memberElement.classList.remove('select-members__member_chosen');

                this.triggerEvent(__WEBPACK_IMPORTED_MODULE_2__events__["o" /* SELECT_MEMBERS */]);
            }
        });
    }

    createCloseElement() {
        const div = document.createElement('div');
        div.classList.add('select-members__close');

        const img = this.createElement('img', ['select-members__close-img'], {
            'src': 'image/svg/close.svg',
            'alt': 'close'
        });

        div.appendChild(img);
        return div;
    }

    get chooseElement() {
        return this.getElement('.select-members__choose');
    }

    get chosenElement() {
        return this.getElement('.select-members__chosen');
    }

    get memberElement() {
        return this.getElement('.select-members__member');
    }

    get memberChosenElement() {
        return this.getElement('.select-members__member-chosen');
    }

    get closeElement() {
        return this.getElement('.select-members__close');
    }

    getMemberChosenElementById(id) {
        return this.getElement(`[data-member-chosen="${id}"]`);
    }

    getMemberElementById(id) {
        return this.getElement(`[data-member-choose="${id}"]`);
    }
};

/***/ }),
/* 24 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return Talks; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__framework_BaseComponent__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__events__ = __webpack_require__(2);



let Talks = class Talks extends __WEBPACK_IMPORTED_MODULE_0__framework_BaseComponent__["a" /* BaseComponent */] {

    constructor() {
        super();
    }

    template() {
        return `
            <div class="talks">
                <div class="talks__title"></div>
            </div> 
        `;
    }

    onRender() {
        this.domElement.on('click', e => this.handleChooseTalk(e));
    }

    upgrade() {}

    handleChooseTalk(e) {
        let talksItem = this.itemElements;
        if (!talksItem) return;
        if (!talksItem.length) {
            talksItem = [talksItem];
        }

        talksItem.forEach(talk => {
            if (talk.contains(e.target) || talk === e.target) {
                talk.classList.add('talks__item_chosen', 'js-talk');

                const timeElement = talk.getElementsByClassName('talks__time')[0];
                timeElement.classList.add('talks__time_chosen');

                const locationElement = talk.getElementsByClassName('talks__location')[0];
                locationElement.classList.add('talks__location_chosen');

                const roomId = talk.dataset.roomId;

                this.triggerEvent(__WEBPACK_IMPORTED_MODULE_1__events__["p" /* SELECT_TALK */]);

                talksItem.forEach(t => {
                    if (t !== talk) {
                        t.classList.remove('talks__item_chosen', 'js-talk');

                        const timeElement = t.getElementsByClassName('talks__time')[0];
                        timeElement.classList.remove('talks__time_chosen');

                        const locationElement = t.getElementsByClassName('talks__location')[0];
                        locationElement.classList.remove('talks__location_chosen');
                    }
                });
            }
        });
    }

    setText(text) {
        this.titleElement.textContent = text;
    }

    setRoom({ id, title, floor, timeStart, timeEnd }) {

        const talks = this.createElement('div', ['talks__item', 'talks__item_chosen'], {
            'data-room-id': `${id}`
        });

        const talksTime = this.createElement('div', ['talks__time', 'talks__time_chosen'], {
            'data-time-start': `${timeStart}`,
            'data-time-end': `${timeEnd}`
        });
        talksTime.textContent = `${timeStart}—${timeEnd}`;

        const talksLocation = this.createElement('div', ['talks__location', 'talks__location_chosen']);
        talksLocation.innerHTML = `${title} &middot; ${floor} этаж`;

        talks.appendChild(talksTime);
        talks.appendChild(talksLocation);

        this.domElement.appendChild(talks);
    }

    setRooms(rooms) {

        rooms.forEach(room => {
            const id = room['id'];
            const title = room['title'];
            const floor = room['floor'];
            const timeStart = room['timeStart'];
            const timeEnd = room['timeEnd'];

            const talks = this.createElement('div', ['talks__item'], {
                'data-room-id': `${id}`
            });

            const talksTime = this.createElement('div', ['talks__time'], {
                'data-time-start': `${timeStart}`,
                'data-time-end': `${timeEnd}`
            });
            talksTime.textContent = `${timeStart}—${timeEnd}`;

            const talksLocation = this.createElement('div', ['talks__location']);
            talksLocation.innerHTML = `${title} &middot; ${floor} этаж`;

            talks.appendChild(talksTime);
            talks.appendChild(talksLocation);

            this.domElement.appendChild(talks);
        });
    }

    removeRooms() {
        let itemElement = this.itemElements;

        if (!itemElement) return;

        if (!itemElement.length) {
            itemElement = [itemElement];
        }

        itemElement.forEach(item => {
            item.parentNode.removeChild(item);
        });
    }

    get titleElement() {
        return this.getElement('.talks__title');
    }

    get itemElements() {
        return this.getElement('.talks__item');
    }

    get timeElement() {
        return this.getElement('.talks__time');
    }

    get locationElement() {
        return this.getElement('.talks__location');
    }

    get chosenElement() {
        return this.getElement('.talks__item_chosen');
    }
};

/***/ }),
/* 25 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return Footer; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__framework_BaseComponent__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__button_button__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__events__ = __webpack_require__(2);




let Footer = class Footer extends __WEBPACK_IMPORTED_MODULE_0__framework_BaseComponent__["a" /* BaseComponent */] {

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
        `;
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
        this.triggerEvent(__WEBPACK_IMPORTED_MODULE_2__events__["j" /* MAIN_PAGE */]);
    }

    handleDelete() {
        this.triggerEvent(__WEBPACK_IMPORTED_MODULE_2__events__["h" /* DELETE_EVENT */]);
    }

    handleCreate() {
        this.triggerEvent(__WEBPACK_IMPORTED_MODULE_2__events__["g" /* CREATE_EVENT */]);
    }

    showForCreate() {

        this.buttonCreate = new __WEBPACK_IMPORTED_MODULE_1__button_button__["a" /* Button */]({
            btnText: 'Создать встречу',
            modBtn: 'create',
            modBtnText: ['white', 'bold']
        });

        this.buttonCancel = new __WEBPACK_IMPORTED_MODULE_1__button_button__["a" /* Button */]({
            btnText: 'Отмена',
            modBtn: 'cancel',
            modBtnText: ['black', 'bold']
        });

        this.buttonCreate.renderTo(this.buttonCreateElement);
        this.buttonCancel.renderTo(this.buttonCancelElement);
    }

    showForEdit() {

        this.buttonCancel = new __WEBPACK_IMPORTED_MODULE_1__button_button__["a" /* Button */]({
            btnText: 'Отмена',
            modBtn: ['cancel'],
            modBtnText: ['black', 'bold']
        });

        this.buttonDelete = new __WEBPACK_IMPORTED_MODULE_1__button_button__["a" /* Button */]({
            btnText: 'Удалить встречу',
            modBtn: ['delete'],
            modBtnText: ['black', 'bold']
        });

        this.buttonSave = new __WEBPACK_IMPORTED_MODULE_1__button_button__["a" /* Button */]({
            btnText: 'Сохранить',
            modBtn: ['save'],
            modBtnText: ['white', 'bold']
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
        } else if ('usersId' in this.detail) {
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

};

/***/ }),
/* 26 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return Router; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__helpers_helpers__ = __webpack_require__(1);


let Router = class Router {

    constructor() {
        this._routes = [];

        window.onpopstate = e => this.go({ path: location.pathname, addInHistory: false });
    }

    register(path, method) {
        this._routes.push({ [path]: method });
    }

    go({ path, addInHistory = true, state = {}, detail = null }) {
        const foundRouter = this._routes.find(router => path in router);

        if (__WEBPACK_IMPORTED_MODULE_0__helpers_helpers__["a" /* helpers */].isUndefined(foundRouter)) {
            this.go({ path: '/' });
        } else {
            foundRouter[path](detail);
            addInHistory ? history.pushState(state, '', path) : null;
        }
    }

    back() {}
};

/***/ }),
/* 27 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return Model; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__api_loadRooms__ = __webpack_require__(28);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__api_loadEvents__ = __webpack_require__(29);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__helpers_helpers__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__api_loadUsers__ = __webpack_require__(30);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__api_removeEvent__ = __webpack_require__(8);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__helpers_getRecommendationTalks__ = __webpack_require__(31);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__api_createEvent__ = __webpack_require__(32);








let Model = class Model {

    constructor() {
        this._offset = 0;
        this._rooms = null;
        this._events = null;
        this._users = null;
    }

    getAppDateUTC() {
        return __WEBPACK_IMPORTED_MODULE_2__helpers_helpers__["a" /* helpers */].getOffsetDateUTC(this._offset);
    }

    setAppDateUTC(date) {
        this._offset = date - this.getCurrentDateUTC();
    }

    getCurrentDateUTC() {
        return __WEBPACK_IMPORTED_MODULE_2__helpers_helpers__["a" /* helpers */].getDateUTC();
    }

    getDateUTCToString() {
        return __WEBPACK_IMPORTED_MODULE_2__helpers_helpers__["a" /* helpers */].stateDateString(this.getAppDateUTC());
    }

    getRooms(callback) {
        if (this._rooms) {
            console.log('rooms from cache');
            callback(this._rooms);
        } else {
            Object(__WEBPACK_IMPORTED_MODULE_0__api_loadRooms__["a" /* loadRooms */])(dataRooms => {
                this._rooms = dataRooms.slice();
                callback(dataRooms);
            });
        }

        // setInterval(() => {
        //     loadRooms(dataRooms => {
        //         if (dataRooms.length !== this._rooms) {
        //             this._rooms = dataRooms.slice();
        //
        //             callback(dataRooms);
        //         }
        //     })
        // }, 60000);
    }

    getRoomById(id, callback) {
        this.getRooms(rooms => {
            const room = rooms.find(item => {
                return item['id'] === id;
            });

            callback(room);
        });
    }

    getUsers(callback) {
        Object(__WEBPACK_IMPORTED_MODULE_3__api_loadUsers__["a" /* loadUsers */])(users => callback(users));
    }

    getEvents(callback, date = this.getAppDateUTC()) {
        // if (this._events) {
        //     console.log('events from cache');
        //     callback(this.selectEvents(this._events));
        // }
        Object(__WEBPACK_IMPORTED_MODULE_1__api_loadEvents__["a" /* loadEvents */])(events => callback(this.selectEvents(events, date)));
    }

    selectEvents(events, date) {
        let _events = events.slice();

        return _events.filter(event => {
            const dateStart = __WEBPACK_IMPORTED_MODULE_2__helpers_helpers__["a" /* helpers */].getDateUTC(0, event['dateStart']);
            const dateEnd = __WEBPACK_IMPORTED_MODULE_2__helpers_helpers__["a" /* helpers */].getDateUTC(0, event['dateEnd']);

            const flag1 = __WEBPACK_IMPORTED_MODULE_2__helpers_helpers__["a" /* helpers */].stateDate(dateStart, date) === 0;
            const flag2 = __WEBPACK_IMPORTED_MODULE_2__helpers_helpers__["a" /* helpers */].stateDate(dateEnd, date) === 0;
            const flag3 = dateEnd > dateStart;

            return flag1 && flag2 && flag3;
        });
    }

    deleteEvent(id, callback) {
        Object(__WEBPACK_IMPORTED_MODULE_4__api_removeEvent__["a" /* removeEvent */])(id, res => callback(res));
    }

    createNewEvent({ title, dateStart, dateEnd, membersId, roomId, callback }) {
        Object(__WEBPACK_IMPORTED_MODULE_6__api_createEvent__["a" /* createEvent */])({
            title,
            dateStart,
            dateEnd,
            membersId,
            roomId,
            callback
        });
    }

    dataProcessing(dateStart, dateEnd, membersId) {
        const data = {
            date: {
                dateStart,
                dateEnd
            },
            membersId,
            db: {}
        };

        return new Promise(resolve => {
            this.getEvents(events => {
                data.db.events = events;
                resolve(data);
            }, data.date.dateStart);
        }).then(data => {
            return new Promise(resolve => {
                this.getRooms(rooms => {
                    data.db.rooms = rooms;
                    resolve(data);
                });
            });
        }).then(data => {
            return new Promise(resolve => {
                this.getUsers(users => {
                    data.db.users = users;
                    resolve(data);
                });
            });
        }).then(data => {
            return Object(__WEBPACK_IMPORTED_MODULE_5__helpers_getRecommendationTalks__["a" /* getRecommendationTalks */])(data);
        });
    }
};

/***/ }),
/* 28 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["a"] = loadRooms;
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__ajax__ = __webpack_require__(3);


function loadRooms(callback) {

    const qs = `query {rooms {id title capacity floor}}`;

    Object(__WEBPACK_IMPORTED_MODULE_0__ajax__["a" /* ajax */])({
        method: 'GET',
        url: `/graphql?query=${qs}`,
        callback: dataChecking
    });

    function dataChecking(err, data) {
        if (err) {
            console.log(err, 'on load rooms');
            return;
        }

        let rooms = data['data']['rooms'];
        sortByFloor(rooms);
        callback(rooms);
    }

    function sortByFloor(rooms) {
        rooms.sort((room1, room2) => {
            return room2['floor'] - room1['floor'];
        });
    }
}

/***/ }),
/* 29 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["a"] = loadEvents;
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__ajax__ = __webpack_require__(3);


function loadEvents(callback) {

    const qs = `
        {
             events {
                id
                title
                dateStart	
                dateEnd
                users {
                  id
                  login
                  homeFloor
                  avatarUrl
                }
                room {
                  id
                  floor
                  title
                }
              }
        }
    `;

    Object(__WEBPACK_IMPORTED_MODULE_0__ajax__["a" /* ajax */])({
        method: 'GET',
        url: `/graphql?query=${qs}`,
        callback: dataChecking
    });

    function dataChecking(err, data) {
        if (err) {
            console.log(err, 'on load events');
            return;
        }

        callback(data['data']['events']);
    }
}

/***/ }),
/* 30 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["a"] = loadUsers;
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__ajax__ = __webpack_require__(3);


function loadUsers(callback) {

    const qs = `
        {
            users {
                id
                login
                homeFloor
                avatarUrl
            }
        }
    `;

    Object(__WEBPACK_IMPORTED_MODULE_0__ajax__["a" /* ajax */])({
        method: 'GET',
        url: `/graphql?query=${qs}`,
        callback: dataChecking
    });

    function dataChecking(err, data) {
        if (err) {
            console.log(err, 'on load users');
            return;
        }

        callback(data['data']['users']);
    }
}

/***/ }),
/* 31 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["a"] = getRecommendationTalks;
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__helpers__ = __webpack_require__(1);


function getRecommendationTalks({ date, membersId, db }) {
    const dateStart = date.dateStart;
    const dateEnd = date.dateEnd;
    const rooms = db.rooms;
    const events = db.events;
    const users = db.users;

    const busyRooms = events.filter(event => {
        const eventDateStart = +__WEBPACK_IMPORTED_MODULE_0__helpers__["a" /* helpers */].getDateUTC(0, event['dateStart']);
        const eventsDateEnd = +__WEBPACK_IMPORTED_MODULE_0__helpers__["a" /* helpers */].getDateUTC(0, event['dateEnd']);

        const flag1 = +dateStart >= eventDateStart && +dateStart <= eventsDateEnd;
        const flag2 = +dateEnd >= eventDateStart && +dateEnd <= eventsDateEnd;

        return flag1 || flag2;
    }).map(event => {
        return event['room']['id'];
    });

    let freeRooms = rooms.filter(room => {
        const roomId = room['id'];
        const flag1 = busyRooms.indexOf(roomId) === -1;
        const flag2 = +room['capacity'] >= membersId.length;

        return flag1 && flag2;
    });

    freeRooms.sort((room1, room2) => {
        const room1Floor = +room1['floor'];
        const room2Floor = +room2['floor'];

        let total1Floor = 0;
        let total2Floor = 0;

        membersId.forEach(memberId => {

            const user = users.find(user => {
                return user['id'] == memberId;
            });

            const memberFloor = +user['homeFloor'];

            total1Floor += Math.abs(memberFloor - room1Floor);
            total2Floor += Math.abs(memberFloor - room2Floor);
        });

        return total1Floor - total2Floor;
    });

    return freeRooms.map(room => {
        return {
            id: room['id'],
            title: room['title'],
            floor: room['floor'],
            timeStart: __WEBPACK_IMPORTED_MODULE_0__helpers__["a" /* helpers */].getTimeFormatHHMM(dateStart),
            timeEnd: __WEBPACK_IMPORTED_MODULE_0__helpers__["a" /* helpers */].getTimeFormatHHMM(dateEnd)
        };
    });
}

/***/ }),
/* 32 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["a"] = createEvent;
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__ajax__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__helpers_helpers__ = __webpack_require__(1);



function createEvent({ title, dateStart, dateEnd, membersId, roomId, callback }) {

    const dateStartStr = __WEBPACK_IMPORTED_MODULE_1__helpers_helpers__["a" /* helpers */].getDateToISOString(dateStart);
    const dateEndStr = __WEBPACK_IMPORTED_MODULE_1__helpers_helpers__["a" /* helpers */].getDateToISOString(dateEnd);

    const qs = `
             mutation {
              createEvent(
                input: {
                  title: "${title}",
                  dateStart: "${dateStartStr}",
                  dateEnd: "${dateEndStr}",
                },
                    usersIds: [${membersId.join(',')}],
                    roomId: "${+roomId}",
              ) {
                    id
                }
              }
    `;

    Object(__WEBPACK_IMPORTED_MODULE_0__ajax__["a" /* ajax */])({
        method: 'POST',
        url: `/graphql?query=${qs}`,
        callback: checkingData
    });

    function checkingData(err, data) {
        if (err) {
            console.log(err, 'on create events');
            return;
        }

        callback(data);
    }
}

/***/ }),
/* 33 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return Notification; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__framework_BaseComponent__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__events__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__button_button__ = __webpack_require__(4);




let Notification = class Notification extends __WEBPACK_IMPORTED_MODULE_0__framework_BaseComponent__["a" /* BaseComponent */] {

    constructor({ type }) {
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

            `;
    }

    onRender() {
        switch (this.type) {
            case 'create':
                this.createNoteCreate();break;
            case 'delete':
                this.createNoteDelete();break;
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

        const buttonCreate = new __WEBPACK_IMPORTED_MODULE_2__button_button__["a" /* Button */]({
            modBtn: 'create',
            btnText: 'Хорошо',
            modBtnText: ['white', 'bold']
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

        const buttonCancel = new __WEBPACK_IMPORTED_MODULE_2__button_button__["a" /* Button */]({
            modBtn: 'cancel',
            btnText: 'Отмена',
            modBtnText: ['black', 'bold']
        });
        buttonCancel.renderTo(this.buttonCancelElement);

        const buttonDelete = new __WEBPACK_IMPORTED_MODULE_2__button_button__["a" /* Button */]({
            modBtn: 'delete',
            btnText: 'Удалить',
            modBtnText: ['black', 'bold']
        });
        buttonDelete.renderTo(this.buttonDeleteElement);

        this.infoElement.hide();
        this.buttonCreateElement.hide();

        this.buttonsElement.classList.remove('notification__buttons_unactive');
    }

    handleCancel() {
        this.triggerEvent(__WEBPACK_IMPORTED_MODULE_1__events__["t" /* UNCONFIRMED */]);
    }

    handleDelete() {
        this.triggerEvent(__WEBPACK_IMPORTED_MODULE_1__events__["e" /* CONFIRMED */]);
    }

    handleCreate() {
        this.triggerEvent(__WEBPACK_IMPORTED_MODULE_1__events__["l" /* OK */]);
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
        return this.getElement('.notification__button_create');
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
};

/***/ })
/******/ ]);