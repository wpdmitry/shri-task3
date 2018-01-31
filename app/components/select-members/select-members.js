import {BaseComponent} from "../../framework/BaseComponent";
import {Person} from "../person/person";
import {CHANGE_MEMBERS, CLOSE_MEMBERS, SELECT_MEMBERS} from "../../events";
import {helpers} from "../../helpers/helpers";

export class SelectMembers extends BaseComponent {

    constructor() {
        super();
    }

    template() {
        return ` 
            <div class="select-members">
                <div class="select-members__choose"></div>
                <div class="select-members__chosen"> </div>
            </div>
        `
    }

    onRender() {
        this.domElement.on('click', e => this.handleChooseMember(e));
    }

    upgrade() {}

    showChooseMembers() {
        this.chooseElement.show();
    }

    hideChooseMembers() {
        if (helpers.elementIsHidden(this.chooseElement)) return;

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
        })  ;

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

            const person = new Person({
                login,
                floor,
                avatar,
            });

            const memberElement = this.createElement('div',
                ['select-members__member'],
                {'data-member-choose': id},
            );

            person.renderTo(memberElement);
            this.chooseElement.appendChild(memberElement);

            const memberChosenElement = this.createElement('div',
                ['select-members__member-chosen'],
                {'data-member-chosen': id},
            );


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

                this.triggerEvent(SELECT_MEMBERS);
            }
        });

        this.closeElement.forEach(el => {
            if (el.contains(e.target) || el === e.target) {
                const memberChosenElement = el.parentNode;
                memberChosenElement.classList.remove('select-members__member-chosen_chosen');

                const memberId = memberChosenElement.dataset.memberChosen;
                const memberElement = this.getMemberElementById(memberId);
                memberElement.classList.remove('select-members__member_chosen');

                this.triggerEvent(SELECT_MEMBERS);
            }
        });
    }

    createCloseElement() {
        const div = document.createElement('div');
        div.classList.add('select-members__close');

        const img = this.createElement(
            'img',
            ['select-members__close-img'],
            {
                'src': 'image/svg/close.svg',
                'alt': 'close',
            }
        );

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
        return this.getElement(`[data-member-chosen="${id}"]`)
    }

    getMemberElementById(id) {
        return this.getElement(`[data-member-choose="${id}"]`)
    }
}