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
class Base {
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
            });
        }

        if (props) {
            Object.keys(props).forEach(key => {
                el.setAttribute(key, props[key]);
            });
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
/* harmony export (immutable) */ __webpack_exports__["a"] = Base;


/***/ }),
/* 1 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
const CREATE__MEETING = 'CREATE__MEETING',
      EDIT_MEETING = 'EDIT_MEETING',
      CHANGE_DATE = 'CHANGE_DATE',
      CHOOSE_DATE_ON_INPUT = 'CHOOSE_DATE_ON_INPUT',
      SHOW_MAIN = 'SHOW_MAIN',
      CONFIRMED_DELETE = 'CONFIRMED_DELETE',
      UNCONFIRMED_DELETE = 'UNCONFIRMED_DELETE';
/* harmony export (immutable) */ __webpack_exports__["d"] = CREATE__MEETING;

/* harmony export (immutable) */ __webpack_exports__["e"] = EDIT_MEETING;

/* harmony export (immutable) */ __webpack_exports__["a"] = CHANGE_DATE;

/* harmony export (immutable) */ __webpack_exports__["b"] = CHOOSE_DATE_ON_INPUT;

/* harmony export (immutable) */ __webpack_exports__["f"] = SHOW_MAIN;

/* harmony export (immutable) */ __webpack_exports__["c"] = CONFIRMED_DELETE;

/* harmony export (immutable) */ __webpack_exports__["g"] = UNCONFIRMED_DELETE;


/***/ }),
/* 2 */
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

    xhr.send();
}

/***/ }),
/* 3 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
class AutoBind {

    constructor() {
        this.binded = [...document.querySelectorAll('[data-bind]')].map(el => {
            let res = {
                el: el,
                props: [],
                variables: []
            };

            el.getAttribute('data-bind').split(',').forEach(item => {
                const prop = item.split(':')[0],
                      variable = item.split(':')[1];

                res.props.push(prop);
                res.variables.push(variable);
            });

            return res;
        });
    }

    getVariable(name, starterElement) {
        return this.binded.filter(item => {
            return item.variables.filter(varibale => {
                return varibale === name && item.el !== starterElement;
            }).length;
        });
    }

    setVariable(name, value, starterElement) {
        this.binded.forEach(item => {
            item.variables.forEach((variable, index) => {
                if (variable === name && item.el !== starterElement) {
                    item.el.setAttribute(item.props[index], value);
                }
            });
            // if (item.variable === name && item.el !== starterElement) {
            //     item.el.setAttribute(item.prop, value);
            // }
        });
    }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = AutoBind;


/***/ }),
/* 4 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__base_base__ = __webpack_require__(0);


class Button extends __WEBPACK_IMPORTED_MODULE_0__base_base__["a" /* Base */] {

    constructor({ btnText, modBtn = [], modBtnText = [] }) {
        super();
        this.btnText = btnText;
        this.modBtn = modBtn;
        this.modBtnText = modBtnText;
    }

    render() {
        this.modBtn = this.modBtn.map(item => {
            return `button_${item}`;
        });

        this.modBtnText = this.modBtnText.map(item => {
            return `button__text_${item}`;
        });

        return `
            <button class="button ${this.modBtn.join(' ')}">
                <span class="button__text ${this.modBtnText.join(' ')}">${this.btnText}</span>
            </button>
        `;
    }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = Button;


/***/ }),
/* 5 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__events__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__base_base__ = __webpack_require__(0);



class Calendar extends __WEBPACK_IMPORTED_MODULE_1__base_base__["a" /* Base */] {
    constructor(model, itInput = false, numberOfMonths, nextPack = 0) {
        super();
        this.model = model;
        this.itInput = itInput;
        this.currentDay = this.model.getCurrentDate();
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
        let startDay = new Date(this.currentDay.getFullYear(), this.currentDay.getMonth() + this.nextPack * this.numberOfMonths, 1, 23, 59, 59);
        let year = startDay.getFullYear();
        let month = startDay.getMonth();

        let calendar = document.createElement('div');
        this.domElement = calendar;
        calendar.classList.add('calendar');

        for (let n = 1; n <= this.numberOfMonths; n++) {
            let calendarItem = document.createElement('div');
            calendarItem.classList.add('calendar__item');
            calendarItem.setAttribute('data-month', `${startDay.getUTCMonth()}`);
            calendarItem.setAttribute('data-year', `${startDay.getUTCFullYear()}`);
            if (!this.itInput) {
                calendarItem.addEventListener('click', e => this.chooseDay(e));
            } else {
                calendarItem.addEventListener('click', e => this.chooseInputDay(e));
            }

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
                    td.setAttribute('data-day', `${startDay.getUTCDate()}`);

                    if (startDay.getNormDay() === i && startDay.getMonth() === month) {
                        td.innerHTML = startDay.getDate();
                        startDay.getNormDay() === 7 ? td.classList.add('calendar__table-data_free') : null;

                        if (startDay < this.currentDay) {
                            td.classList.add('calendar__table-data_inactive');
                        } else if (Calendar.sameDays(startDay, this.currentDay)) {
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

    chooseDay(e) {
        if (e.target.hasAttribute('data-month') && e.target.hasAttribute('data-day')) return;

        const year = e.currentTarget.getAttribute('data-year');
        const month = e.currentTarget.getAttribute('data-month');
        const day = e.target.getAttribute('data-day');

        this.currentDay.setFullYear(year);
        this.currentDay.setMonth(month);
        this.currentDay.setDate(day);

        this.model.setDate(this.currentDay);
        this.triggerEvent(__WEBPACK_IMPORTED_MODULE_0__events__["a" /* CHANGE_DATE */]);
    }

    chooseInputDay(e) {
        if (e.target.hasAttribute('data-month') && e.target.hasAttribute('data-day')) return;

        const year = e.currentTarget.getAttribute('data-year');
        let month = e.currentTarget.getAttribute('data-month');
        const day = e.target.getAttribute('data-day');

        const monthToNumber = {
            "января": 1,
            "февраля": 2,
            "марта": 3,
            "апреля": 4,
            "мая": 5,
            "июня": 6,
            "июля": 7,
            "августа": 8,
            "сентября": 9,
            "октября": 10,
            "ноября": 11,
            "декабря": 12.
        };

        for (let key in monthToNumber) {
            if (monthToNumber[key] === +month + 1) {
                month = key;
            }
        }

        this.triggerEvent(__WEBPACK_IMPORTED_MODULE_0__events__["b" /* CHOOSE_DATE_ON_INPUT */], {
            year,
            month,
            day
        });
    }

    static getDayOfWeek(n = -1) {
        const mapDays = new Map([[1, 'ПН'], [2, 'ВТ'], [3, 'СР'], [4, 'ЧТ'], [5, 'ПТ'], [6, 'СБ'], [7, 'ВС']]);
        if (n < 0) {
            return mapDays;
        }
        return mapDays.get(n);
    }

    static sameDays(date1, date2) {
        return date1 - date2 > 0 && date1 - date2 < 86400000;
    }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = Calendar;


/***/ }),
/* 6 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["a"] = loadRooms;
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__ajax__ = __webpack_require__(2);


function loadRooms(callback, transform = true) {

    const qs = `query {rooms {id title capacity floor}}`;

    Object(__WEBPACK_IMPORTED_MODULE_0__ajax__["a" /* ajax */])({
        method: 'GET',
        url: `/graphql?query=${qs}`,
        callback: transform ? transformRooms : callback
    });

    function transformRooms(err, data) {
        if (err) {
            console.log(err, 'on load rooms');
            return;
        }

        let rooms = data['data']['rooms'];
        rooms.sort((room1, room2) => {
            return room2['floor'] - room1['floor'];
        });

        let roomsOnFloors = new Map(),
            floor = -1;

        rooms.forEach(item => {
            if (item['floor'] !== floor) {
                floor = item['floor'];
                roomsOnFloors.set(floor, []);
            }

            roomsOnFloors.get(floor).push(item);
        });

        callback(roomsOnFloors);
    }
}

/***/ }),
/* 7 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__base_base__ = __webpack_require__(0);


class Person extends __WEBPACK_IMPORTED_MODULE_0__base_base__["a" /* Base */] {

    constructor({ login, floor, avatar }) {
        super();
        this.login = login;
        this.floor = floor;
        this.avatar = avatar;
    }

    render() {
        return `
            <div class="person">
                <img class="person__avatar person__avatar_small" src="${this.avatar}" alt="">
                <div class="person__name person__name_small">${this.login}</div>
                ${this.floor ? `<div class="person__floor">${this.floor} этаж</div>` : ''}
                
            </div>
        `;
    }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = Person;


/***/ }),
/* 8 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__base_base__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__autobind_autobind__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__calendar_calendar__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__events__ = __webpack_require__(1);





class Input extends __WEBPACK_IMPORTED_MODULE_0__base_base__["a" /* Base */] {

    constructor({ model, title, placeholder, calendar = false, arrow = false, time = false,
        value = '', bindDropDown = '', bindCreate = '' }) {
        super();
        this.model = model;
        this.title = title;
        this.placeholder = placeholder;
        this.calendar = calendar;
        this.arrow = arrow;
        this.value = value;
        this.bindDropDown = bindDropDown;
        this.bindCreate = bindCreate;
        this.time = time;
    }

    render() {
        const calendarHtml = `<div class="input__calendar">
                                <img class="input__img" src="image/svg/calendar.svg" alt="">
                              </div>
                             `;

        const arrowHtml = `<div class="input__arrow" data-bind="${this.bindDropDown ? `style:${this.bindDropDown}` : ''}">
                                <img class="input__img input__img_scale" src="image/svg/arrow.svg" alt="">
                              </div>
                             `;

        const resetHtml = `<div class="input__reset">
                                <img class="input__img input__img_scale" src="image/svg/close.svg" alt="">
                              </div>
                             `;

        return `
            <div class="input">
                <label for="title" class="input__label">${this.title}</label>
                <div class="input__wrapper">
                    <input 
                        type="text" 
                        class="input__text" 
                        id="title" 
                        value="${this.value}"  
                        ${this.time ? 'maxlength="5"' : ''} 
                        placeholder="${this.placeholder}"
                        data-bind="${this.bindDropDown ? `value:${this.bindDropDown},` : ''}${this.bindCreate ? `value:${this.bindCreate}` : ''}">
                        
                        ${this.calendar ? calendarHtml : this.time ? '' : resetHtml}
                        ${this.arrow ? arrowHtml : ''}
                </div>
            </div> 
        `;
    }

    onRender() {
        this.inputElement.on('focus', e => this.handleDropDownList(e));
        // this.inputElement.on('input', () => this.handleInput());
        // this.resetElement.on('click', () => this.handleReset())

        this.time ? this.inputElement.on('input', e => this.verificationTime(e)) : null;
        this.calendar ? this.inputElement.on('input', () => this.verificationDate()) : null;

        this.calendar ? this.drawCalendar() : null;
        this.calendar ? this.domElement.on(__WEBPACK_IMPORTED_MODULE_3__events__["b" /* CHOOSE_DATE_ON_INPUT */], e => this.chooseDate(e)) : null;
    }

    handleReset() {
        this.inputElement.value = '';
    }

    handleInput() {
        if (this.inputElement.value) {
            this.arrowElement.style.display = 'none';
            this.resetElement.style.display = 'block';
        } else {
            this.resetElement.style.display = 'none';
            this.arrowElement.style.display = 'block';
        }
    }

    chooseDate(e) {
        const { year, month, day } = e.detail;
        this.inputElement.value = `${day} ${month}, ${year}`;

        const event = new Event('change');
        this.inputElement.dispatchEvent(event);
    }

    drawCalendar() {
        let inputCalendar = this.calendarElement;
        let inputWrapper = inputCalendar.parentElement;
        let calendar = new __WEBPACK_IMPORTED_MODULE_2__calendar_calendar__["a" /* Calendar */](this.model, true, 1).create();

        let inputDropCalendar = this.createElement('div', ['input__drop-calendar']);

        inputDropCalendar.style.width = inputWrapper.offsetWidth + 'px';
        inputDropCalendar.style.height = inputWrapper.offsetWidth + 'px';

        inputDropCalendar.appendChild(calendar);
        inputWrapper.appendChild(inputDropCalendar);

        inputCalendar.addEventListener('click', function () {

            if (inputCalendar.classList.contains('input__calendar_openly')) {
                inputDropCalendar.classList.remove('input__drop-calendar_active');
                inputCalendar.classList.remove('input__calendar_openly');
            } else {
                inputDropCalendar.classList.add('input__drop-calendar_active');
                inputCalendar.classList.add('input__calendar_openly');
            }
        });

        document.addEventListener('click', e => {
            if (!(inputCalendar.contains(e.target) || inputDropCalendar.contains(e.target))) {
                inputDropCalendar.classList.remove('input__drop-calendar_active');
                inputCalendar.classList.remove('input__calendar_openly');
            }
        });
    }

    handleDropDownList(e) {
        const autobind = new __WEBPACK_IMPORTED_MODULE_1__autobind_autobind__["a" /* AutoBind */]();
        autobind.setVariable(this.bindDropDown, 'display:block', e.target);
    }

    verificationTime(e) {
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

    verificationDate() {}

    get inputElement() {
        return this.getElements('input__text');
    }

    get arrowElement() {
        return this.getElements('input__arrow');
    }

    get resetElement() {
        return this.getElements('input__reset');
    }

    get calendarElement() {
        return this.getElements('input__calendar');
    }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = Input;


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
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__base_base__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__header_header__ = __webpack_require__(11);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__main_main__ = __webpack_require__(13);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__meeting_meeting__ = __webpack_require__(19);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__footer_footer__ = __webpack_require__(25);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__events__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__model_model__ = __webpack_require__(29);








class App extends __WEBPACK_IMPORTED_MODULE_0__base_base__["a" /* Base */] {

    constructor() {
        super();
        this.model = new __WEBPACK_IMPORTED_MODULE_6__model_model__["a" /* Model */]();
    }

    render() {
        return `
            <div class="app">
                <div class="app__header"></div>
                <div class="app__main"></div>
                <div class="app__meeting"></div>
                <div class="app__footer"></div>
            </div> 
            `;
    }

    onRender() {
        this.showMain();

        this.domElement.on(__WEBPACK_IMPORTED_MODULE_5__events__["f" /* SHOW_MAIN */], () => this.showMain());
        this.domElement.on(__WEBPACK_IMPORTED_MODULE_5__events__["d" /* CREATE__MEETING */], () => this.showCreateMeeting());
        this.domElement.on(__WEBPACK_IMPORTED_MODULE_5__events__["e" /* EDIT_MEETING */], event => this.showEditMeeting(event));
    }

    showMain() {
        const header = new __WEBPACK_IMPORTED_MODULE_1__header_header__["a" /* Header */]({ button: true });
        const main = new __WEBPACK_IMPORTED_MODULE_2__main_main__["a" /* Main */](this.model);

        header.renderTo(this.headerElement);
        main.renderTo(this.mainElement);

        this.meetingElement.hide();
        this.footerElement.hide();

        this.headerElement.show();
        this.mainElement.show();
    }

    showCreateMeeting() {
        const header = new __WEBPACK_IMPORTED_MODULE_1__header_header__["a" /* Header */]({ button: false });
        const meeting = new __WEBPACK_IMPORTED_MODULE_3__meeting_meeting__["a" /* Meeting */](this.model, undefined);
        const footer = new __WEBPACK_IMPORTED_MODULE_4__footer_footer__["a" /* Footer */]({ edit: false });

        header.renderTo(this.headerElement);
        meeting.renderTo(this.meetingElement);
        footer.renderTo(this.footerElement);

        this.mainElement.hide();

        this.headerElement.show();
        this.meetingElement.show();
        this.footerElement.show();
    }

    showEditMeeting(event) {
        const editData = event.detail;

        const header = new __WEBPACK_IMPORTED_MODULE_1__header_header__["a" /* Header */]({ button: false });
        const meeting = new __WEBPACK_IMPORTED_MODULE_3__meeting_meeting__["a" /* Meeting */](this.model, editData || undefined);
        const footer = new __WEBPACK_IMPORTED_MODULE_4__footer_footer__["a" /* Footer */]({ edit: true });

        header.renderTo(this.headerElement);
        meeting.renderTo(this.meetingElement);
        footer.renderTo(this.footerElement);

        this.mainElement.hide();

        this.headerElement.show();
        this.meetingElement.show();
        this.footerElement.show();
    }

    get headerElement() {
        return this.getElements('app__header');
    }

    get mainElement() {
        return this.getElements('app__main');
    }

    get meetingElement() {
        return this.getElements('app__meeting');
    }

    get footerElement() {
        return this.getElements('app__footer');
    }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = App;


/***/ }),
/* 11 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__logo_logo__ = __webpack_require__(12);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__base_base__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__button_button__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__events__ = __webpack_require__(1);





class Header extends __WEBPACK_IMPORTED_MODULE_1__base_base__["a" /* Base */] {

    constructor({ button }) {
        super();
        this.button = button;
    }

    render() {
        return `<header class="header">
                    <div class="header__logo"></div>
                    <div class="header__button"></div>
                </header>
                `;
    }

    onRender() {
        this.showLogo();
        this.button ? this.showButton() : this.hideButton();

        this.buttonElement.on('click', () => this.handleCreateMeeting());
    }

    handleCreateMeeting() {
        this.triggerEvent(__WEBPACK_IMPORTED_MODULE_3__events__["d" /* CREATE__MEETING */]);
    }

    showLogo() {
        const logo = new __WEBPACK_IMPORTED_MODULE_0__logo_logo__["a" /* Logo */]();
        logo.renderTo(this.logoElement);
    }

    showButton() {
        const button = new __WEBPACK_IMPORTED_MODULE_2__button_button__["a" /* Button */]({
            btnText: 'Создать встречу',
            modBtn: ['create'],
            modBtnText: ['white']
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
/* harmony export (immutable) */ __webpack_exports__["a"] = Header;


/***/ }),
/* 12 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__base_base__ = __webpack_require__(0);


class Logo extends __WEBPACK_IMPORTED_MODULE_0__base_base__["a" /* Base */] {

    render() {
        return `
            <img class="logo" src="image/svg/logo.svg">
            `;
    }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = Logo;


/***/ }),
/* 13 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__date_date__ = __webpack_require__(14);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__base_base__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__time_scale_time_scale__ = __webpack_require__(15);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__rooms_rooms__ = __webpack_require__(16);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__diagram_diagram__ = __webpack_require__(17);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__events__ = __webpack_require__(1);







class Main extends __WEBPACK_IMPORTED_MODULE_1__base_base__["a" /* Base */] {

    constructor(model) {
        super();
        this.model = model;
    }

    render() {
        return `
            <div class="main">
                <div class="main__date"></div>
                <div class="main__wrapper1 js-scrolling">
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
        this.drawDate();
        const timeScale = this.drawTimeScale();
        this.drawRooms();
        setTimeout(() => this.drawDiagram(timeScale.coordLabel, timeScale.scaleOfOneMinute), 0);

        this.domElement.on(__WEBPACK_IMPORTED_MODULE_5__events__["a" /* CHANGE_DATE */], () => this.update());
    }

    drawDate() {
        const date = new __WEBPACK_IMPORTED_MODULE_0__date_date__["a" /* DateComponent */](this.model);
        date.renderTo(this.dateElement);
    }

    drawTimeScale() {
        const timeScale = new __WEBPACK_IMPORTED_MODULE_2__time_scale_time_scale__["a" /* TimeScale */](this.model);
        timeScale.renderTo(this.timeScaleElement);

        return timeScale;
    }

    drawRooms() {
        this.model.getRooms(dataRooms => {
            const rooms = new __WEBPACK_IMPORTED_MODULE_3__rooms_rooms__["a" /* Rooms */](dataRooms);
            rooms.renderTo(this.roomsElement);
        });
    }

    drawDiagram(...timeScale) {
        this.model.getRooms(dataRooms => {
            const diagram = new __WEBPACK_IMPORTED_MODULE_4__diagram_diagram__["a" /* Diagram */](dataRooms, this.model, timeScale);
            diagram.renderTo(this.diagramElement);
        });
    }

    get dateElement() {
        return this.getElements('main__date');
    }

    get timeScaleElement() {
        return this.getElements('main__time-scale');
    }

    get roomsElement() {
        return this.getElements('main__rooms');
    }

    get diagramElement() {
        return this.getElements('main__diagram');
    }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = Main;


/***/ }),
/* 14 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__base_base__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__calendar_calendar__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__events__ = __webpack_require__(1);




class DateComponent extends __WEBPACK_IMPORTED_MODULE_0__base_base__["a" /* Base */] {

    constructor(model) {
        super();
        this.model = model;
    }

    render() {
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
        this.drawDate();
        this.drawCalendar();

        this.textElement.on('click', () => this.handleCalendar());

        this.buttonElement.forEach(btn => {
            btn.addEventListener('click', e => this.changeDate(e));
        });
    }

    drawDate() {
        this.textElement.innerHTML = this.model.getDateToLocalString();
    }

    drawCalendar() {
        this.calendar = new __WEBPACK_IMPORTED_MODULE_1__calendar_calendar__["a" /* Calendar */](this.model, true, 3).create();
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
        let currentDate = this.model.getCurrentDate();
        this.model.setDate(new Date(currentDate.setDate(currentDate.getDate() + where)));
        this.triggerEvent(__WEBPACK_IMPORTED_MODULE_2__events__["a" /* CHANGE_DATE */]);
    }

    get calendarElement() {
        return this.getElements('date__calendar');
    }

    get textElement() {
        return this.getElements('date__text');
    }

    get buttonElement() {
        return this.getElements('date__button');
    }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = DateComponent;


/***/ }),
/* 15 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__base_base__ = __webpack_require__(0);


class TimeScale extends __WEBPACK_IMPORTED_MODULE_0__base_base__["a" /* Base */] {
    constructor(model) {
        super();
        this.model = model;
        this.startWorkDay = 8;
        this.endWorkDay = 23;
        this.timeLabel = [...this.generateTimeLabels(this.startWorkDay, this.endWorkDay)];
        this.coordLabel = Object.create(null);
        this.scaleOfOneMinute = null;
    }

    render() {
        return `
            <div class="time-scale">
                <div class="time-scale__empty"></div>
                <div class="time-scale__labels"></div>
                <div class="time-scale__empty"></div>
            </div>
        `;
    }

    onRender() {
        this.drawLabels();
        this.calculateScaleLabels();
        this.drawCurrentLabel();
    }

    drawLabels() {
        if (this.model.isToday()) {
            const currentDate = this.model.setDate(new Date());

            this.labelsElement.innerHTML = this.timeLabel.reduce((previousValue, currentValue) => {
                const classInactive = currentValue <= this.model.getCurrentDate().getHours() ? 'time-scale__label_inactive' : '';

                return previousValue + `
                                <div class="time-scale__label ${classInactive}">
                                    ${currentValue}
                                </div>`;
            }, '');

            setTimeout(() => this.drawLabels(), 1000 * 60 * (60 - currentDate.getMinutes()));
        } else this.labelsElement.innerHTML = this.timeLabel.reduce((previousValue, currentValue) => {
            return previousValue + `
                                <div class="time-scale__label time-scale__label_inactive">
                                    ${currentValue}
                                </div>`;
        }, '');
    }

    calculateScaleLabels() {
        this.labelElement.forEach((item, index) => {
            this.coordLabel[this.timeLabel[index]] = item.offsetLeft + 0.5 * item.offsetWidth;
        });
        this.scaleOfOneMinute = (this.coordLabel[this.endWorkDay] - this.coordLabel[this.endWorkDay - 1]) / 60;
    }

    drawCurrentLabel() {
        if (!this.model.isToday()) return;

        const currentLabel = this.createElement('div', ['time-scale__label', 'time-scale__label_current']);
        this.labelsElement.appendChild(currentLabel);
        moveCurrentLabel.call(this);

        function moveCurrentLabel() {
            const currentDate = this.model.setDate(new Date());

            const hours = currentDate.getHours();
            const minutes = currentDate.getMinutes();

            currentLabel.style.left = `${this.coordLabel[hours] - 0.5 * currentLabel.offsetWidth + minutes * this.scaleOfOneMinute}px`;
            currentLabel.innerHTML = this.model.getStringTime();

            setTimeout(() => moveCurrentLabel.call(this), 1000 * (60 - currentDate.getSeconds()));
        }
    }

    *generateTimeLabels(start, end) {
        for (let i = start; i <= end; i++) {
            yield i;
        }
    }

    get labelsElement() {
        return this.getElements('time-scale__labels');
    }

    get labelElement() {
        return this.getElements('time-scale__label');
    }

}
/* harmony export (immutable) */ __webpack_exports__["a"] = TimeScale;


/***/ }),
/* 16 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__base_base__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__api_loadRooms__ = __webpack_require__(6);



class Rooms extends __WEBPACK_IMPORTED_MODULE_0__base_base__["a" /* Base */] {

    constructor(rooms) {
        super();
        this.rooms = rooms;
    }

    render() {
        let roomsHtml = '';

        for (let item of this.rooms) {
            const floor = item[0],
                  rooms = item[1];

            roomsHtml += `
                <div class="rooms__floor">
                    <div class="rooms__floor-text">${floor} ЭТАЖ</div>
                    
                    ${rooms.reduce((prevVal, currentVal) => {
                const id = currentVal['id'],
                      title = currentVal['title'],
                      capacity = currentVal['capacity'];

                return prevVal + `
                           <div class="rooms__room" data-floor="${floor}" data-room="${id}">
                                <div class="rooms__room-title">
                                    ${title}
                                </div>
                                
                                <div class="rooms__room-capacity">
                                    до ${capacity} человек
                                </div>
                            </div>
                           `;
            }, '')}    
                </div>
                `;
        }

        return `
            <div class="rooms">
                ${roomsHtml}
            </div> 
        `;
    }

    onRender() {

        const wrapper1 = document.getElementsByClassName('js-scrolling')[0];
        wrapper1.addEventListener('scroll', e => this.scrolling(e));
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
        return this.getElements('rooms__room-title');
    }

    floorTextElement() {
        return this.getElements('rooms__floor-text');
    }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = Rooms;


/***/ }),
/* 17 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__base_base__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__popup_popup__ = __webpack_require__(18);



class Diagram extends __WEBPACK_IMPORTED_MODULE_0__base_base__["a" /* Base */] {

    constructor(rooms, model, timeScale) {
        super();
        this.rooms = rooms;
        this.model = model;
        this.coordTimeLabels = timeScale[0];
        this.scaleOfOneMinute = timeScale[1];
    }

    render() {
        const timeItemHtml = this.createTimeItemElement();
        let diagramHtml = '';
        for (let item of this.rooms) {
            const floor = item[0],
                  rooms = item[1];

            diagramHtml += `
                <div class="diagram__floor">
                
                    ${rooms.reduce((prevVal, currentVal) => {
                const id = currentVal['id'];

                return prevVal + `
                           <div class="diagram__room" data-floor="${floor}" data-room="${id}">
                                ${timeItemHtml}
                           </div>
                            `;
            }, '')}    
                </div>
                `;
        }

        return `
            <div class="diagram">
                ${diagramHtml}
            </div>
            `;
    }

    onRender() {
        this.model.getEvents(dataEvents => this.drawBusyMeetings(dataEvents));

        this.domElement.parentNode.addEventListener('click', e => this.handlePopup(e));
    }

    drawBusyMeetings(events) {

        events.forEach(event => {
            const roomId = event['room']['id'],
                  title = event['title'],
                  dateStart = new Date(event['dateStart']),
                  dateEnd = new Date(event['dateEnd']),
                  timeStart = this.getTime(dateStart),
                  timeEnd = this.getTime(dateEnd);

            if (dateEnd > dateStart) {
                let timeItemElements = this.getTimeItemElementInRoom(roomId, timeStart, timeEnd);

                const w0 = this.differenceTimeInMinutes(timeItemElements[0].dataset.timeStart, timeStart),
                      w = this.differenceTimeInMinutes(timeStart, timeEnd),
                      w1 = this.differenceTimeInMinutes(timeEnd, timeItemElements[timeItemElements.length - 1].dataset.timeEnd);

                const el0 = this.createElement('div', ['diagram__time-item'], {
                    'style': `min-width:${w0 * this.scaleOfOneMinute}px`
                });
                const el = this.createElement('div', ['diagram__time-item', 'diagram__time-item_busy'], {
                    'style': `min-width:${w * this.scaleOfOneMinute}px`,
                    'data-time-start': `${timeStart}`,
                    'data-time-end': `${timeEnd}`
                });

                this.addLabelElement(el, event);

                const el1 = this.createElement('div', ['diagram__time-item'], {
                    'style': `min-width:${w1 * this.scaleOfOneMinute}px`
                });

                timeItemElements[0].insertAdjacentElement('beforeBegin', el0);
                el0.insertAdjacentElement('beforeBegin', el);
                el.insertAdjacentElement('beforeBegin', el1);

                timeItemElements.forEach(item => {
                    item.parentNode.removeChild(item);
                });
            }
        });
    }

    getTimeItemElementInRoom(id, timeStart, timeEnd) {
        const room = this.getRoomElement(id);
        let meetings = room.getElementsByClassName('diagram__time-item');

        meetings = Array.from(meetings).filter(item => {
            if (item.hasAttribute('data-time-start')) {
                const compare1 = this.differenceTimeInMinutes(item.dataset.timeStart, timeStart),
                      compare2 = this.differenceTimeInMinutes(timeEnd, item.dataset.timeEnd);
                const flag1 = compare1 >= 0 && compare1 <= 60;
                const flag2 = compare2 >= 0 && compare2 <= 60;
                return flag1 || flag2;
            } else {
                return false;
            }
        });

        return meetings;
    }

    getRoomElement(id) {
        const rooms = this.getElements('diagram__room');
        return rooms.find(item => {
            return item.dataset.room === id;
        });
    }

    handlePopup(event) {
        let labelElements = this.labelElements;
        if (labelElements === undefined) return;

        if (labelElements.length === undefined) {
            labelElements = [labelElements];
        }

        labelElements.forEach(item => {
            let childes = item.children;

            if (item.contains(event.target) && childes.length > 0) {

                for (let i = 0, l = childes.length; i < l; i++) {
                    childes[i].classList.add('diagram__label_active');
                }
            } else if (childes.length > 0) {
                for (let i = 0, l = childes.length; i < l; i++) {
                    childes[i].classList.remove('diagram__label_active');
                }
            }
        });
    }

    addLabelElement(el, event) {
        const labelElement = this.createElement('div', ['diagram__label']),
              triangleElement = this.createElement('div', ['diagram__triangle']),
              popupElement = this.createElement('div', ['diagram__popup']);

        labelElement.appendChild(triangleElement);
        labelElement.appendChild(popupElement);

        labelElement.addEventListener('click', () => {
            triangleElement.classList.add('diagram__label_active');
            popupElement.classList.add('diagram__label_active');
        });

        const popup = new __WEBPACK_IMPORTED_MODULE_1__popup_popup__["a" /* Popup */](event);
        popup.renderTo(popupElement);

        el.appendChild(labelElement);
    }

    createTimeItemElement() {
        let timeItemHtml = '',
            prevCoordLabel = 0,
            widthFirstTimeItem = null;

        for (let key in this.coordTimeLabels) {
            const currentCoordLabel = this.coordTimeLabels[key],
                  currentWidth = currentCoordLabel - prevCoordLabel;

            if (!widthFirstTimeItem) {
                timeItemHtml += `<div class="diagram__time-item" style="min-width: ${currentWidth}px"></div>`;
                widthFirstTimeItem = currentWidth;
            } else {
                timeItemHtml += `<div 
                        class="diagram__time-item" 
                        style="min-width: ${currentWidth}px"
                        data-time-start="${parseInt(key) - 1}:00"
                        data-time-end="${key}:00">
                    </div>`;
            }

            prevCoordLabel = currentCoordLabel;
        }

        timeItemHtml += `<div class="diagram__time-item" style="min-width: ${widthFirstTimeItem}px"></div>`;

        return timeItemHtml;
    }

    getTime(date) {
        let hours = date.getUTCHours(),
            minutes = date.getUTCMinutes();

        hours = hours < 10 ? '0' + hours : hours;
        minutes = minutes < 10 ? '0' + minutes : minutes;

        return `${hours}:${minutes}`;
    }

    differenceTimeInMinutes(time1, time2) {
        const [hours1, minutes1] = time1.split(':'),
              [hours2, minutes2] = time2.split(':');

        const diffHours = parseInt(hours2) - parseInt(hours1);
        const diffMinutes = parseInt(minutes2) - parseInt(minutes1);

        return diffHours * 60 + diffMinutes;
    }

    get labelElements() {
        return this.getElements('diagram__label');
    }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = Diagram;


/***/ }),
/* 18 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__base_base__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__person_person__ = __webpack_require__(7);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__events__ = __webpack_require__(1);




class Popup extends __WEBPACK_IMPORTED_MODULE_0__base_base__["a" /* Base */] {

    constructor(event) {
        super();
        this.event = event;
    }

    render() {
        const dateStart = new Date(this.event['dateStart']),
              dateEnd = new Date(this.event['dateEnd']);

        this.id = this.event['id'];
        this.title = this.event['title'];
        this.room = this.event['room'];
        this.users = this.event['users'];
        this.countOthers = this.users.length - 1;
        this.day = dateStart.toLocaleString('ru', { day: 'numeric', month: 'long' });
        this.year = dateStart.getFullYear();
        this.timeStart = this.getTime(dateStart);
        this.timeEnd = this.getTime(dateEnd);

        return `
                <div class="popup">
                    <div class="popup__edit">
                        <img class="popup__edit-img" src="image/svg/edit.svg" alt="">
                    </div>
                    <div class="popup__title">${this.title}</div>
                    <div class="popup__description">
                        <span class="popup__date">${this.day}, </span>
                        <span class="popup__time">${this.timeStart} - ${this.timeEnd}</span>
                        <span class="popup__delimiter">·</span>
                        <span class="popup__room">${this.room['title']}</span>
                    </div>
                    <div class="popup__members">
                        <div class="popup__creator"></div>
                        <div class="popup__other">
                            и ${this.countOthers}
                            ${this.countOthers === 1 ? `участник` : `${this.countOthers > 1 && this.countOthers < 5 ? 'участника' : 'участников'}`}
                        </div>
                    </div>
                </div>

            `;
    }

    onRender() {
        this.drawPerson(this.event['users'][0]);

        this.editElement.on('click', () => this.handleEditMeeting());
    }

    drawPerson(user) {
        const login = user['login'],
              avatar = user['avatarUrl'];

        const person = new __WEBPACK_IMPORTED_MODULE_1__person_person__["a" /* Person */]({
            login: login,
            avatar: avatar
        });
        person.renderTo(this.creatorElement);
    }

    handleEditMeeting() {
        this.triggerEvent(__WEBPACK_IMPORTED_MODULE_2__events__["e" /* EDIT_MEETING */], {
            id: this.id,
            title: this.title,
            date: `${this.day}, ${this.year}`,
            timeStart: this.timeStart,
            timeEnd: this.timeEnd,
            room: this.room,
            users: this.users
        });
    }

    get creatorElement() {
        return this.getElements('popup__creator');
    }

    get editElement() {
        return this.getElements('popup__edit');
    }

    getTime(date) {
        let hours = date.getUTCHours(),
            minutes = date.getUTCMinutes();

        hours = hours < 10 ? '0' + hours : hours;
        minutes = minutes < 10 ? '0' + minutes : minutes;

        return `${hours}:${minutes}`;
    }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = Popup;


/***/ }),
/* 19 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__base_base__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__status_status__ = __webpack_require__(20);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__input_input__ = __webpack_require__(8);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__date_selection_date_selection__ = __webpack_require__(21);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__select_members_select_members__ = __webpack_require__(22);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__talks_talks__ = __webpack_require__(24);







class Meeting extends __WEBPACK_IMPORTED_MODULE_0__base_base__["a" /* Base */] {

    constructor(model, editData = null) {
        super();
        this.model = model;
        this.editData = editData;
    }

    render() {
        let eventId;
        if (this.editData) {
            eventId = this.editData.id || null;
        }

        return `
            <div class="meeting" ${eventId ? `data-event-id="${eventId}" data-bind="data-event-id:eventId"` : ''}>
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
        this.editData ? this.showForEdit() : this.showForCreate();
    }

    showForEdit() {
        const statusText = 'Редактирование встречи',
              title = this.editData.title,
              date = this.editData.date,
              timeStart = this.editData.timeStart,
              timeEnd = this.editData.timeEnd,
              talkText = 'Ваша переговорка',
              room = this.editData.room;

        this.show(statusText, title, date, timeStart, timeEnd, room, talkText);
    }

    showForCreate() {

        const statusText = 'Новая встреча',
              title = '',
              timeStart = '',
              timeEnd = '',
              date = '',
              talkText = 'Рекомендованные переговорки',
              room = '';

        this.show(statusText, title, date, timeStart, timeEnd, room, talkText);
    }

    show(statusText, title, date, timeStart, timeEnd, room, talkText) {

        const status = new __WEBPACK_IMPORTED_MODULE_1__status_status__["a" /* Status */](statusText),
              inputTitle = new __WEBPACK_IMPORTED_MODULE_2__input_input__["a" /* Input */]({
            model: this.model,
            title: 'Тема',
            placeholder: 'О чем будете говорить?',
            value: title,
            bindCreate: 'inputTitle'
        }),
              dateSelection = new __WEBPACK_IMPORTED_MODULE_3__date_selection_date_selection__["a" /* DateSelection */]({
            model: this.model,
            date,
            timeStart,
            timeEnd
        }),
              inputMembers = new __WEBPACK_IMPORTED_MODULE_2__input_input__["a" /* Input */]({
            model: this.model,
            title: 'Участники',
            placeholder: 'Например, Тор Одинович',
            arrow: true,
            bindDropDown: 'dropDownList'
        }),
              selectMembers = new __WEBPACK_IMPORTED_MODULE_4__select_members_select_members__["a" /* SelectMembers */]({
            model: this.model,
            editData: this.editData,
            bindDropDown: 'dropDownList'
        }),
              talks = new __WEBPACK_IMPORTED_MODULE_5__talks_talks__["a" /* Talks */]({
            model: this.model,
            talkText,
            timeStart,
            timeEnd,
            room,
            bindCreate: 'chosenTalk'
        });

        status.renderTo(this.statusElement);
        inputTitle.renderTo(this.titleElement);
        dateSelection.renderTo(this.dateElement);
        inputMembers.renderTo(this.inputMembersElement);
        selectMembers.renderTo(this.selectMembersElement);
        talks.renderTo(this.talksElement);
    }

    get statusElement() {
        return this.getElements('meeting__status');
    }

    get titleElement() {
        return this.getElements('meeting__title');
    }

    get dateElement() {
        return this.getElements('meeting__date');
    }

    get inputMembersElement() {
        return this.getElements('meeting__input-members');
    }

    get selectMembersElement() {
        return this.getElements('meeting__select-members');
    }

    get talksElement() {
        return this.getElements('meeting__talks');
    }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = Meeting;


/***/ }),
/* 20 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__base_base__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__events__ = __webpack_require__(1);



class Status extends __WEBPACK_IMPORTED_MODULE_0__base_base__["a" /* Base */] {

    constructor(text) {
        super();
        this.text = text;
    }

    render() {
        return `
            <div class="status">
                <div class="status__text">${this.text}</div>
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
        this.triggerEvent(__WEBPACK_IMPORTED_MODULE_1__events__["f" /* SHOW_MAIN */]);
    }

    get closeElement() {
        return this.getElements('status__close');
    }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = Status;


/***/ }),
/* 21 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__base_base__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__input_input__ = __webpack_require__(8);



class DateSelection extends __WEBPACK_IMPORTED_MODULE_0__base_base__["a" /* Base */] {

    constructor({ model, date, timeStart, timeEnd }) {
        super();
        this.model = model;
        this.date = date;
        this.timeStart = timeStart;
        this.timeEnd = timeEnd;
    }

    render() {
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
        let titleDate, titleTimeStart, titleTimeEnd;
        switch (this.deviceCheck()) {
            case 'desktop':
                {
                    titleDate = 'Дата';
                    titleTimeStart = 'Начало';
                    titleTimeEnd = 'Конец';
                    break;
                }

            case 'touch':
                {
                    titleDate = 'Дата и время';
                    titleTimeStart = '';
                    titleTimeEnd = '';
                    break;
                }
        }

        const inputDate = new __WEBPACK_IMPORTED_MODULE_1__input_input__["a" /* Input */]({
            model: this.model,
            title: titleDate,
            placeholder: '14 декабря, 2017',
            calendar: true,
            value: `${this.date}`,
            bindCreate: 'inputDate'
        }),
              inputTimeStart = new __WEBPACK_IMPORTED_MODULE_1__input_input__["a" /* Input */]({
            model: this.model,
            title: titleTimeStart,
            placeholder: '12:00',
            time: true,
            value: this.timeStart,
            bindCreate: 'inputTimeStart'
        }),
              inputTimeEnd = new __WEBPACK_IMPORTED_MODULE_1__input_input__["a" /* Input */]({
            model: this.model,
            title: titleTimeEnd,
            placeholder: '13:00',
            time: true,
            value: this.timeEnd,
            bindCreate: 'inputTimeEnd'
        });

        inputDate.renderTo(this.dateElement);
        inputTimeStart.renderTo(this.timeStartElement);
        inputTimeEnd.renderTo(this.timeEndElement);
    }

    get dateElement() {
        return this.getElements('date-selection__date');
    }

    get timeStartElement() {
        return this.getElements('date-selection__time-start');
    }

    get timeEndElement() {
        return this.getElements('date-selection__time-end');
    }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = DateSelection;


/***/ }),
/* 22 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__base_base__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__api_loadUsers__ = __webpack_require__(23);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__person_person__ = __webpack_require__(7);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__autobind_autobind__ = __webpack_require__(3);





class SelectMembers extends __WEBPACK_IMPORTED_MODULE_0__base_base__["a" /* Base */] {

    constructor({ editData = null, bindDropDown = '' }) {
        super();
        this.bindDropDown = bindDropDown;
        this.editData = editData;
    }

    render() {
        return ` 
            <div class="select-members">
                <div 
                    class="select-members__choose"
                    data-bind="${this.bindDropDown ? `style:${this.bindDropDown}` : ''}"
                ></div>
                <div class="select-members__chosen"> </div>
            </div>
        `;
    }

    onRender() {
        Object(__WEBPACK_IMPORTED_MODULE_1__api_loadUsers__["a" /* loadUsers */])(res => this.drawUsers(res));

        document.addEventListener('click', e => this.handleDropDownList(e));
    }

    handleDropDownList(e) {
        const autobind = new __WEBPACK_IMPORTED_MODULE_3__autobind_autobind__["a" /* AutoBind */]();
        const dropdown = autobind.getVariable(this.bindDropDown, this.chooseElement)[0];
        if (dropdown === undefined) return;

        const inputMember = dropdown.el;

        if (!(this.chooseElement.contains(e.target) || inputMember.contains(e.target))) {
            autobind.setVariable(this.bindDropDown, '', inputMember);
        }
    }

    drawUsers(users) {
        for (let user of users) {
            const id = user['id'],
                  login = user['login'],
                  floor = user['homeFloor'],
                  avatar = user['avatarUrl'];

            let person = new __WEBPACK_IMPORTED_MODULE_2__person_person__["a" /* Person */]({
                login: login,
                floor: floor,
                avatar: avatar
            });

            let memberElement = this.createElement('div', ['select-members__member'], { 'data-member-choose': id });
            person.renderTo(memberElement);
            this.chooseElement.appendChild(memberElement);

            let memberChosenElement = this.createElement('div', ['select-members__member-chosen'], { 'data-member-chosen': id });
            person.renderTo(memberChosenElement);
            memberChosenElement.appendChild(this.createCloseElement());
            this.chosenElement.appendChild(memberChosenElement);

            if (this.editData) {
                this.editData.users.forEach(user => {
                    if (user.id === id) {
                        memberElement.classList.add('select-members__member_chosen');
                        memberChosenElement.classList.add('select-members__member-chosen_chosen');
                        memberChosenElement.setAttribute('data-bind', 'data-member-chosen:member');
                    }
                });
            }

            memberElement.addEventListener('click', () => {
                memberElement.classList.toggle('select-members__member_chosen');
                memberChosenElement.classList.toggle('select-members__member-chosen_chosen');

                if (memberChosenElement.classList.contains('select-members__member-chosen_chosen')) {
                    memberChosenElement.setAttribute('data-bind', 'data-member-chosen:member');
                } else {
                    memberChosenElement.removeAttribute('data-bind');
                }
            });
        }
    }

    createCloseElement() {
        const div = document.createElement('div');
        div.classList.add('select-members__close');

        const img = document.createElement('img');
        img.classList.add('select-members__close-img');
        img.src = "image/svg/close.svg";
        img.alt = "close";

        div.appendChild(img);
        return div;
    }

    get chooseElement() {
        return this.getElements('select-members__choose');
    }

    get chosenElement() {
        return this.getElements('select-members__chosen');
    }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = SelectMembers;


/***/ }),
/* 23 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["a"] = loadUsers;
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__ajax__ = __webpack_require__(2);


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
        callback: transformData
    });

    function transformData(err, data) {
        if (err) {
            console.log(err, 'on load users');
            return;
        }

        callback(data['data']['users']);
    }
}

/***/ }),
/* 24 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__base_base__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__autobind_autobind__ = __webpack_require__(3);



class Talks extends __WEBPACK_IMPORTED_MODULE_0__base_base__["a" /* Base */] {

    constructor({ model, talkText, timeStart, timeEnd, room, bindCreate }) {
        super();
        this.model = model;
        this.talkText = talkText;
        this.timeStart = timeStart;
        this.timeEnd = timeEnd;
        this.room = room;
        this.bindCreate = bindCreate;
    }

    render() {
        const roomHtml = `<div 
                            class="talks__item talks__item_chosen" 
                            data-room="${this.room.id}"
                            ${this.bindCreate ? `[data-room]:${this.bindCreate}` : ''}>
                            <div class="talks__time talks__time_chosen">${this.timeStart}—${this.timeEnd}</div>
                            <div class="talks__location talks__location_chosen">${this.room.title} &middot; ${this.room.floor} этаж</div>
                          </div>`;

        return `
            <div class="talks">
                <div class="talks__title">${this.talkText}</div>
                ${this.room ? roomHtml : ''}
            </div> 
        `;
    }

    onRender() {
        this.searchTalks();
    }

    searchTalks() {
        const autobind = new __WEBPACK_IMPORTED_MODULE_1__autobind_autobind__["a" /* AutoBind */]();
        // usersId = autobind.getVariable('member').map(item => {
        //     return item.el.getAttribute(item.props[0]);
        // });


        const promiseInputDate = new Promise((resolve, reject) => {
            const inputDate = autobind.getVariable('inputDate')[0].el;
            inputDate.addEventListener('change', () => {
                resolve(inputDate.value);
            });
        });

        const promiseInputTimeStart = new Promise((resolve, reject) => {
            const inputTimeStart = autobind.getVariable('inputTimeStart')[0].el;
            inputTimeStart.addEventListener('change', () => {
                resolve(inputTimeStart.value);
            });
        });

        const promiseInputTimeEnd = new Promise((resolve, reject) => {
            const inputTimeEnd = autobind.getVariable('inputTimeEnd')[0].el;
            inputTimeEnd.addEventListener('change', () => {
                resolve(inputTimeEnd.value);
            });
        });

        Promise.all([promiseInputDate, promiseInputTimeStart, promiseInputTimeEnd]).then(res => {
            this.model.getRecommendation({
                date: res[0],
                timeStart: res[1],
                timeEnd: res[2],
                callback: this.drawTalks.bind(this)
            });
        });
    }

    drawTalks(freeRooms, timeStart, timeEnd) {
        const firstChild = this.domElement.children[0];
        this.domElement.innerHTML = '';
        this.domElement.appendChild(firstChild);

        freeRooms.forEach(room => {
            const itemElement = this.createElement('div', ['talks__item'], {
                'data-room': room.id
            });

            const timeElement = this.createElement('div', ['talks__time']);
            timeElement.innerHTML = `${timeStart}—${timeEnd}`;

            const locationElement = this.createElement('div', ['talks__location']);
            locationElement.innerHTML = `${room.title} &middot; ${room.floor} этаж`;

            itemElement.appendChild(timeElement);
            itemElement.appendChild(locationElement);

            this.domElement.appendChild(itemElement);
        });
    }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = Talks;


/***/ }),
/* 25 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__base_base__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__button_button__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__autobind_autobind__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__api_createEvent__ = __webpack_require__(26);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__api_removeEvent__ = __webpack_require__(27);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__events__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__notification_notification__ = __webpack_require__(28);








class Footer extends __WEBPACK_IMPORTED_MODULE_0__base_base__["a" /* Base */] {

    constructor({ edit }) {
        super();
        this.edit = edit;
    }

    render() {
        return `
            <footer class="footer">
                ${this.edit ? `<div class="footer__notification"></div>
                     <div class="footer__bg"></div>
                     ` : ''}
                
                <div class="footer__button footer__button_cancel"></div>
                ${this.edit ? `<div class="footer__button footer__button_delete"></div>
                     <div class="footer__button footer__button_save"></div>` : `<div class="footer__button footer__button_create"></div>`}   
            </footer>
        `;
    }

    onRender() {
        this.edit ? this.showForEdit() : this.showForCreate();
        this.edit ? this.drawDeleteNotification() : null;

        this.domElement.on(__WEBPACK_IMPORTED_MODULE_5__events__["c" /* CONFIRMED_DELETE */], () => this.handleDelete());
        this.domElement.on(__WEBPACK_IMPORTED_MODULE_5__events__["g" /* UNCONFIRMED_DELETE */], () => this.handleUnconfirmed());
    }

    showForCreate() {
        const buttonCreate = new __WEBPACK_IMPORTED_MODULE_1__button_button__["a" /* Button */]({
            btnText: 'Создать встречу',
            modBtn: ['create'],
            modBtnText: ['white', 'bold']
        });

        const buttonCancel = new __WEBPACK_IMPORTED_MODULE_1__button_button__["a" /* Button */]({
            btnText: 'Отмена',
            modBtn: ['cancel'],
            modBtnText: ['black', 'bold']
        });

        buttonCreate.renderTo(this.buttonCreateElement);
        buttonCancel.renderTo(this.buttonCancelElement);

        this.buttonCancelElement.on('click', () => this.handleCancel());
        this.buttonCreateElement.on('click', () => this.handleCreate());
    }

    showForEdit() {
        const buttonSave = new __WEBPACK_IMPORTED_MODULE_1__button_button__["a" /* Button */]({
            btnText: 'Сохранить',
            modBtn: ['save'],
            modBtnText: ['white', 'bold']
        });

        const buttonCancel = new __WEBPACK_IMPORTED_MODULE_1__button_button__["a" /* Button */]({
            btnText: 'Отмена',
            modBtn: ['cancel'],
            modBtnText: ['black', 'bold']
        });

        const buttonDelete = new __WEBPACK_IMPORTED_MODULE_1__button_button__["a" /* Button */]({
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
        const notification = new __WEBPACK_IMPORTED_MODULE_6__notification_notification__["a" /* Notification */]();
        notification.renderTo(this.notificationElement);
    }

    handleCreate() {
        const autobind = new __WEBPACK_IMPORTED_MODULE_2__autobind_autobind__["a" /* AutoBind */]();

        const inputTitle = autobind.getVariable('inputTitle')[0].el.value,
              inputDate = autobind.getVariable('inputDate')[0].el.value,
              inputTimeStart = autobind.getVariable('inputTimeStart')[0].el.value,
              inputTimeEnd = autobind.getVariable('inputTimeEnd')[0].el.value,
              usersId = autobind.getVariable('member').map(item => {
            return item.el.getAttribute(item.props[0]);
        }),
              room = autobind.getVariable('chosenTalk')[0].el.props[0];

        Object(__WEBPACK_IMPORTED_MODULE_3__api_createEvent__["a" /* createEvent */])({
            title: inputTitle,
            date: inputDate,
            timeStart: inputTimeStart,
            timeEnd: inputTimeEnd,
            users: usersId,
            room: room,
            callback: console.log
        });
    }

    handleCancel() {
        this.triggerEvent(__WEBPACK_IMPORTED_MODULE_5__events__["f" /* SHOW_MAIN */]);
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

        const autobind = new __WEBPACK_IMPORTED_MODULE_2__autobind_autobind__["a" /* AutoBind */]();
        const meetingEl = autobind.getVariable('eventId')[0];
        const eventId = meetingEl.el.getAttribute(meetingEl.props[0]);

        Object(__WEBPACK_IMPORTED_MODULE_4__api_removeEvent__["a" /* removeEvent */])({
            eventId,
            callback: console.log
        });

        this.triggerEvent(__WEBPACK_IMPORTED_MODULE_5__events__["f" /* SHOW_MAIN */]);
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
/* harmony export (immutable) */ __webpack_exports__["a"] = Footer;


/***/ }),
/* 26 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["a"] = createEvent;
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__ajax__ = __webpack_require__(2);


function createEvent({ title, date, timeStart, timeEnd, users, room, event, callback }) {

    const dateStart = parseDate(date, timeStart),
          dateEnd = parseDate(date, timeEnd);

    const qs = `
             mutation {
              createEvent(
                input: {
                  title: "${title}",
                  dateStart: "${dateStart}",
                  dateEnd: "${dateEnd}",
                },
                    usersIds: [${users.join(',')}],
                    roomId: "${room}",
              ) {
                    id
                }
              }
    `;

    console.log(qs);

    Object(__WEBPACK_IMPORTED_MODULE_0__ajax__["a" /* ajax */])({
        method: 'POST',
        url: `/graphql?query=${qs}`,
        callback: transformData
    });

    function transformData(err, data) {
        if (err) {
            console.log(err, 'on create events');
            return;
        }

        callback(data);
    }
}

function parseDate(date, time) {
    const monthToNumber = {
        "января": 0,
        "февраля": 1,
        "марта": 2,
        "апреля": 3,
        "мая": 4,
        "июня": 5,
        "июля": 6,
        "августа": 7,
        "сентября": 8,
        "октября": 9,
        "ноября": 10,
        "декабря": 11
    };

    let [number, month, year] = date.replace(',', '').split(' ');
    let [hours, minutes] = time.split(':');

    return new Date(parseInt(year), monthToNumber[month], parseInt(number), parseInt(hours), parseInt(minutes)).toISOString();
}

/***/ }),
/* 27 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["a"] = removeEvent;
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__ajax__ = __webpack_require__(2);


function removeEvent({ eventId, callback }) {

    const qs = `
             mutation {
              removeEvent(id: ${eventId}) {
                    id
                }
              }
    `;

    console.log(qs);

    Object(__WEBPACK_IMPORTED_MODULE_0__ajax__["a" /* ajax */])({
        method: 'POST',
        url: `/graphql?query=${qs}`,
        callback: transformData
    });

    function transformData(err, data) {
        if (err) {
            console.log(err, 'on remove event');
            return;
        }

        callback(data);
    }
}

/***/ }),
/* 28 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__base_base__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__events__ = __webpack_require__(1);



class Notification extends __WEBPACK_IMPORTED_MODULE_0__base_base__["a" /* Base */] {

    constructor() {
        super();
    }

    render() {
        return `
                <div class="notification">
                    <img class="notification__emoji" src="image/svg/emoji1.svg" alt="">
                    <div class="notification__status">Встреча будет <br> удалена безвозвратно</div>
                    <div class="notification__buttons">
                        <div class="notification__button notification__button_cancel">
                            <button class="button button_cancel">
                                <span class="button__text button__text_black button__text_increase button__text_bold">Отмена</span>
                            </button>
                        </div>
                        <div class="notification__button notification__button_delete">
                            <button class="button button_cancel">
                                <span class="button__text button__text_black button__text_increase button__text_bold">Удалить</span>
                            </button>
                        </div>
                    </div>
                </div>

            `;
    }

    onRender() {
        this.cancelElement.on('click', () => this.handleCancel());
        this.deleteElement.on('click', () => this.handleDelete());
    }

    handleCancel() {
        this.triggerEvent(__WEBPACK_IMPORTED_MODULE_1__events__["g" /* UNCONFIRMED_DELETE */]);
    }

    handleDelete() {
        this.triggerEvent(__WEBPACK_IMPORTED_MODULE_1__events__["c" /* CONFIRMED_DELETE */]);
    }

    get cancelElement() {
        return this.getElements('notification__button_cancel');
    }

    get deleteElement() {
        return this.getElements('notification__button_delete');
    }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = Notification;


/***/ }),
/* 29 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__api_loadRooms__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__api_loadEvents__ = __webpack_require__(30);



class Model {

    constructor() {
        this.event = Object.create(null);
        this._currentFrozenDate = new Date();
        this._currentDate = new Date();
        this._rooms = null;
        this._events = null;
    }

    getCurrentFrozenDate() {
        return this._currentFrozenDate;
    }

    getRooms(callback) {
        // if (this._rooms) return callback(this._rooms);

        Object(__WEBPACK_IMPORTED_MODULE_0__api_loadRooms__["a" /* loadRooms */])(data => {
            this._rooms = data;
            callback(data);
        });
    }

    getRecommendation({ countMember = null, date, timeStart, timeEnd, callback }) {
        const dateStart = this.parseDate(date, timeStart);
        const dateEnd = this.parseDate(date, timeEnd);

        Object(__WEBPACK_IMPORTED_MODULE_1__api_loadEvents__["a" /* loadEvents */])(data => {
            let busyRoomsId = data.filter(event => {
                const flag1 = dateStart >= event.dateStart && dateStart <= event.dateEnd;
                const flag2 = dateEnd <= event.dateEnd && dateEnd >= event.dateStart;

                return flag1 && flag2;
            }).map(event => {
                return event['room']['id'];
            });

            Object(__WEBPACK_IMPORTED_MODULE_0__api_loadRooms__["a" /* loadRooms */])((err, data) => {
                let freeRooms = data['data']['rooms'].filter(room => {
                    if (busyRoomsId.indexOf(room['id']) === -1) {
                        return true;
                    }
                });

                callback(freeRooms, timeStart, timeEnd);
            }, false);
        });
    }

    getEvents(callback) {
        // if (this._events) {
        //     events = this._events;
        // }

        Object(__WEBPACK_IMPORTED_MODULE_1__api_loadEvents__["a" /* loadEvents */])(data => {
            this._events = data;
            selectionDate.call(this, data);
        });

        function selectionDate(eventData) {

            eventData = eventData.filter(event => {
                const eventDate = new Date(event['dateStart']);

                const flag1 = eventDate.getUTCFullYear() === this.getCurrentDate().getFullYear();
                const flag2 = eventDate.getUTCMonth() === this.getCurrentDate().getMonth();
                const flag3 = eventDate.getUTCDate() === this.getCurrentDate().getDate();

                return flag1 && flag2 && flag3;
            });

            callback(eventData);
        }
    }

    isToday() {
        const flag1 = this.getCurrentDate().getFullYear() === this.getCurrentFrozenDate().getFullYear();
        const flag2 = this.getCurrentDate().getMonth() === this.getCurrentFrozenDate().getMonth();
        const flag3 = this.getCurrentDate().getDate() === this.getCurrentFrozenDate().getDate();

        return flag1 && flag2 && flag3;
    }

    getCurrentDate() {
        return this._currentDate;
    }

    setDate(date) {
        this._currentDate = date;
        return this.getCurrentDate();
    }

    getDateToLocalString() {
        return this.getCurrentDate().toLocaleString('ru', {
            day: 'numeric',
            month: 'short'
        });
    }

    getStringTime() {
        let hours = this.getCurrentDate().getHours();
        let minutes = this.getCurrentDate().getMinutes();

        hours = hours < 10 ? '0' + hours : hours;
        minutes = minutes < 10 ? '0' + minutes : minutes;

        return `${hours}:${minutes}`;
    }

    parseDate(date, time) {
        const monthToNumber = {
            "января": 0,
            "февраля": 1,
            "марта": 2,
            "апреля": 3,
            "мая": 4,
            "июня": 5,
            "июля": 6,
            "августа": 7,
            "сентября": 8,
            "октября": 9,
            "ноября": 10,
            "декабря": 11
        };

        let [number, month, year] = date.replace(',', '').split(' ');
        let [hours, minutes] = time.split(':');

        return new Date(+year, monthToNumber[month], +number, +hours + 3, +minutes).toISOString();
    }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = Model;


/***/ }),
/* 30 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["a"] = loadEvents;
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__ajax__ = __webpack_require__(2);


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
        callback: transformData
    });

    function transformData(err, data) {
        if (err) {
            console.log(err, 'on load events');
            return;
        }

        callback(data['data']['events']);
    }
}

/***/ })
/******/ ]);