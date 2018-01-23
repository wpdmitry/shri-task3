import {ajax} from "./ajax";

export function removeEvent({eventId, callback}) {

    const qs = `
             mutation {
              removeEvent(id: ${eventId}) {
                    id
                }
              }
    `;

    console.log(qs);

    ajax({
        method: 'POST',
        url: `/graphql?query=${qs}`,
        callback: transformData,
    });

    function transformData(err, data) {
        if (err) {
            console.log(err, 'on remove event');
            return;
        }

        callback(data);
    }
}
