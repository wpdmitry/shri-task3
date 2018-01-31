import {BaseComponent} from "../../framework/BaseComponent";
import {Status} from "../status/status";
import {Input} from "../input/input";
import {DateSelection} from "../date-selection/date-selection";
import {helpers} from "../../helpers/helpers";
import {SelectMembers} from "../select-members/select-members";
import {
    BREAK_PROMISES, CHANGE_MEMBERS,
    CLOSE_MEMBERS, CONTINUE_PROMISES, GET_MEMBERS, OPEN_MEMBERS, SELECT_DATE, SELECT_MEMBERS, SELECT_TIME_END,
    SELECT_TIME_START,
    SELECT_TITLE
} from "../../events";
import {Talks} from "../talks/talks";
import {removeEvent} from "../../api/removeEvent";
import {validation} from "../../helpers/validation";

export class Meeting extends BaseComponent {

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
        `
    }

    onRender() {
        this.createStatus();
        this.createTitle();
        this.createDateSelection();
        this.createInputMembers();
        this.createSelectMembers();
        this.createTalks();

        this.domElement.on(OPEN_MEMBERS, () => this.selectMembers.showChooseMembers());
        this.domElement.on(CLOSE_MEMBERS, () => this.selectMembers.hideChooseMembers());
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
            const removeEvent = this.domElement.on(SELECT_DATE, e => {
                removeEvent();
                resolve();
            });
        });

        const promiseTimeStart = new Promise(resolve => {
            const removeEvent = this.domElement.on(SELECT_TIME_START, e => {
                removeEvent();
                resolve();
            });
        });

        const promiseTimeEnd = new Promise(resolve => {
            const removeEvent = this.domElement.on(SELECT_TIME_END, e => {
                removeEvent();
                resolve();
            });
        });

        const promiseMembers = new Promise(resolve => {
            const removeEvent = this.domElement.on(SELECT_MEMBERS, e => {
                removeEvent();
                resolve();
            });
        });

        const breakPromise = new Promise((resolve, reject) => {
            let removeEvent1, removeEvent2;

            removeEvent1 = this.domElement.on(BREAK_PROMISES, () => {
                removeEvent1();
                removeEvent2();
                reject('stop');
            });

            removeEvent2 = this.domElement.on(CONTINUE_PROMISES, () => {
                removeEvent1();
                removeEvent2();
                resolve();
            });
        });

        return [
            promiseDate,
            promiseTimeStart,
            promiseTimeEnd,
            promiseMembers,
            breakPromise,
        ]
    }

    stopPromises() {
        this.triggerEvent(BREAK_PROMISES);
    }

    runPromises() {
        Promise.race(this.createPromises())
            .then(() => {
                const data = this.getDataForRecommendation();
                if (!data) {
                    this.runPromises();
                    throw new Error('not validation');
                }
                return this.model.dataProcessing(...data);
            })
            .then(result => {
                this.runPromises();
                this.showRecommendationTalks(result);
            })
            .catch((err) => {})
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

        if (validation.date(date) && validation.time(timeStart)
            && validation.time(timeEnd) && membersId.length > 0) {

            const dateStart = helpers.glueDateAndTime(date, timeStart);
            const dateEnd = helpers.glueDateAndTime(date, timeEnd);

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
        this.status = new Status();
        this.status.renderTo(this.statusElement);
        this.addToListUpgrade(this.status);
    }

    createTitle() {
        this.inputTitle = new Input({
            title: 'Тема',
            placeholder: 'О чем будете говорить?',
            mod: 'text',
            eventsName: [SELECT_TITLE],
            addClass: ['js-title']
        });

        this.inputTitle.renderTo(this.titleElement);
        this.addToListUpgrade(this.inputTitle);
    }

    createDateSelection() {
        this.dateSelection = new DateSelection();
        this.dateSelection.renderTo(this.dateElement);
        this.addToListUpgrade(this.dateSelection);
    }

    createInputMembers() {
        this.inputMembers = new Input({
            title: 'Участники',
            placeholder: 'Например, Тор Одинович',
            mod: 'text',
            eventsName: [OPEN_MEMBERS, GET_MEMBERS],
        });

        this.inputMembers.renderTo(this.inputMembersElement);
        this.addToListUpgrade(this.inputMembers);
    }

    createSelectMembers() {
        this.selectMembers = new SelectMembers();
        this.selectMembers.renderTo(this.selectMembersElement);
        this.addToListUpgrade(this.selectMembers);
    }

    createTalks() {
        this.talks = new Talks();
        this.talks.renderTo(this.talksElement);
        this.addToListUpgrade(this.talks);
    }

    showStatus() {
        if (!this.status) this.createStatus();

        if (!this.detail) {
            this.status.setText('Новая встреча');
        } else if ('title' in this.detail){
            this.status.setText('Редактирование встречи');
        } else {
            this.status.setText('Новая встреча');
        }
    }

    showTitle() {
        if (!this.title) this.createTitle();

        if (!this.detail) {
            this.inputTitle.setValue('');
        } else if ('title' in this.detail){
            this.inputTitle.setValue(this.detail['title']);
        } else {
            this.inputTitle.setValue('');
        }
    }

    showDateSelection() {
        if (!this.dateSelection) this.createDateSelection();

        if (!this.detail) {
            this.dateSelection.setValue(helpers.getDateString(this.model.getAppDateUTC()),
                '', '');

        } else if ('timeStart' in this.detail){
            this.dateSelection.setValue(
                helpers.getDateString(this.model.getAppDateUTC()),
                this.detail['timeStart'],
                this.detail['timeEnd']
            );

        } else {
            this.dateSelection.setValue(helpers.getDateString(this.model.getAppDateUTC()),
                '', '');
        }
    };

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

            } else if ('usersId' in this.detail){
                this.selectMembers.setChosenMembers(dataUsers, this.detail['usersId']);

            } else {
                this.selectMembers.setChosenMembers(dataUsers, []);
            }
        })
    }

    showTalks() {
        if (!this.talks) this.createTalks();

        if (!this.detail) {
            this.talks.setText('Рекомендованные переговорки');
            this.talks.removeRooms();

        } else if ('roomId' in this.detail){
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
                    timeEnd,
                })
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
}