import {helpers} from "../helpers/helpers";

export class Router {

    constructor() {
        this._routes = [];

        window.onpopstate = (e) => this.go({path: location.pathname, addInHistory: false});
    }

    register(path, method) {
        this._routes.push({[path]: method});
    }

    go({path, addInHistory = true, state = {}, detail = null}) {
        const foundRouter = this._routes.find(router => path in router);

        if (helpers.isUndefined(foundRouter)) {
            this.go({path: '/'});
        } else {
            foundRouter[path](detail);
            addInHistory ? history.pushState(state, '', path) : null;
        }
    }

    back() {
    }
}