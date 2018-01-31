import {helpers} from "./helpers";

export const validation = {

    title(value) {
        return value.length > 0;
    },

    date(value) {
        const regExp = /(\d{1,2}) ([а-я]+), (\d{4})/;

        return regExp.test(value);
    },

    time(value) {
        if (value.length !== 5) return;

        const flag1 = helpers.differenceTimeInMinutes(value, '8:00') >= 0;
        const flag2 = helpers.differenceTimeInMinutes('23:00', value) >= 0;

        return flag1 && flag2;
    },
};