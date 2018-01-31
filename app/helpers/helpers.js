export const helpers = {
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

            let str1 = date.toLocaleString('ru', {day: 'numeric', month: 'short'}).slice(0,-1) + ' &middot ';

            if (state  === 0) {
                return str1 + 'Сегодня';
            } else if (state === 1) {
                return str1 + 'Завтра';
            } else if (state === -1) {
                return str1 + 'Вчера';
            }

            str1 = date.toLocaleString('ru', {day: 'numeric', month: 'long'}) + ' &middot ';
            const str2 = date.toLocaleString('ru', {weekday: 'short'});
            return str1 + str2;

        },

        stateDate(date1, date2 = this.getDateUTC()) {
            let _date1 = new Date(date1.getTime()),
                _date2 = new Date(date2.getTime());

            _date1.setHours(12);       _date2.setHours(12);
            _date1.setMinutes(0);      _date2.setMinutes(0);
            _date1.setSeconds(0);      _date2.setSeconds(0);
            _date1.setMilliseconds(0); _date2.setMilliseconds(0);

            const diff = _date1 - _date2;

            if (diff === 0) {
                return 0;
            } else if (diff === 24*60*60*1000) {
                return 1;
            } else if (diff === -24*60*60*1000) {
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

            return `${hours}:${minutes}`
        },

        getTimeFromFormatHHMM(time) {
            const [hours, minutes] = time.split(':');
            return {
                hours: +hours,
                minutes: +minutes,
            }
        },

        glueDateAndTime(strDate, time) {
            const {number, month, year} = this.getYMNFromString(strDate);
            const {hours, minutes} = this.getTimeFromFormatHHMM(time);

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
            const month = this.getNormNameMonth(date.toLocaleString('ru', {month: 'long'}));
            const year = date.getFullYear();

            return `${day} ${month}, ${year}`
        },

        getDateString2(date) {
            const day = date.getDate();
            const month = this.getNormNameMonth(date.toLocaleString('ru', {month: 'long'}));

            return `${day} ${month}`
        },

        glueTwoDateForString(date1, date2) {
            console.log(date1, date2);
            const ny = this.getDateString2(date1);
            const timeStart = this.getTimeFormatHHMM(date1);
            const timeEnd = this.getTimeFormatHHMM(date2);

            return `${ny}, ${timeStart} — ${timeEnd}`
        },

        getYMNFromString(strDate) {
            const reg = /(\d{1,2}) ([а-я]+), (\d{4})/;
            const result = strDate.match(reg);

            return {
                number: result[1],
                month: this.getNumberMonth(result[2]),
                year: result[3],
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
                'декабрь': 'декабря',
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
                'декабря': 11,
            };

            return monthToNumber[name];
        },

        getDateToISOString(date) {
            const offset = new Date().getTimezoneOffset() * 60 * 1000;

            date.setTime(date.getTime() - offset);
            return date.toISOString();
        }
    };