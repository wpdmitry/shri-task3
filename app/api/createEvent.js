import {ajax} from "./ajax";
import {helpers} from "../helpers/helpers";

export function createEvent({title, dateStart, dateEnd, membersId, roomId, callback}) {

    const dateStartStr = helpers.getDateToISOString(dateStart);
    const dateEndStr = helpers.getDateToISOString(dateEnd);

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

    ajax({
        method: 'POST',
        url: `/graphql?query=${qs}`,
        callback: checkingData,
    });

    function checkingData(err, data) {
        if (err) {
            console.log(err, 'on create events');
            return;
        }

        callback(data);
    }
}
