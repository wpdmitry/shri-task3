export class AutoBind {

    constructor() {
        this.binded = [...document.querySelectorAll('[data-bind]')]
            .map((el) => {
                let res = {
                    el: el,
                    props: [],
                    variables: [],
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