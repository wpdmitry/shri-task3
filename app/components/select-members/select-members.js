import {Base} from "../base/base";
import {loadUsers} from "../../api/loadUsers";
import {Person} from "../person/person";
import {AutoBind} from "../autobind/autobind";

export class SelectMembers extends Base {

    constructor({editData = null, bindDropDown = ''}) {
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
        `
    }

    onRender() {
        loadUsers(res => this.drawUsers(res));

        document.addEventListener('click', (e) => this.handleDropDownList(e));
    }

    handleDropDownList(e) {
        const autobind = new AutoBind();
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

            let person = new Person({
                login: login,
                floor: floor,
                avatar: avatar,
            });

            let memberElement = this.createElement('div',
                ['select-members__member'],
                {'data-member-choose': id},
                );
            person.renderTo(memberElement);
            this.chooseElement.appendChild(memberElement);


            let memberChosenElement = this.createElement('div',
                ['select-members__member-chosen'],
                {'data-member-chosen': id},
            );
            person.renderTo(memberChosenElement);
            memberChosenElement.appendChild(this.createCloseElement());
            this.chosenElement.appendChild(memberChosenElement);

            if (this.editData) {
                this.editData.users.forEach(user => {
                    if (user.id === id){
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