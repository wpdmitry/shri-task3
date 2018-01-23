import {Base} from "../base/base";
import {Status} from "../status/status";
import {Input} from "../input/input";
import {DateSelection} from "../date-selection/date-selection";
import {SelectMembers} from "../select-members/select-members";
import {Talks} from "../talks/talks";

export class Meeting extends Base {

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
        `
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
            title = '', timeStart = '',
            timeEnd = '', date = '',
            talkText = 'Рекомендованные переговорки',
            room = '';

        this.show(statusText, title, date, timeStart, timeEnd, room, talkText);
    }

    show(statusText, title, date, timeStart, timeEnd, room, talkText) {

        const status = new Status(statusText),

            inputTitle = new Input({
                model: this.model,
                title: 'Тема',
                placeholder: 'О чем будете говорить?',
                value: title,
                bindCreate: 'inputTitle',
            }),

            dateSelection = new DateSelection({
                model: this.model,
                date,
                timeStart,
                timeEnd,
            }),

            inputMembers = new Input({
                model: this.model,
                title: 'Участники',
                placeholder: 'Например, Тор Одинович',
                arrow: true,
                bindDropDown: 'dropDownList',
            }),

            selectMembers = new SelectMembers({
                model: this.model,
                editData: this.editData,
                bindDropDown: 'dropDownList',
            }),

            talks = new Talks({
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