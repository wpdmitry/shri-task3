import {ajax} from "./ajax";

export function removeEvent(eventId, callback) {

    const qs = `
             mutation {
              removeEvent(id: ${eventId}) {
                    id
                }
              }
    `;

    ajax({
        method: 'POST',
        url: `/graphql?query=${qs}`,
        callback: dataChecking,
    });

    function dataChecking(err, data) {
        if (err) {
            console.log(err, 'on remove event');
            return;
        }

        callback(data);
    }
}
