import React from 'react';
import EventFlag from './EventFlag';
import {DateTime} from "luxon";

function EventRow(props) {
    const flagged = props.flagged;
    const date = DateTime.fromISO(props.stamp).toLocaleString(DateTime.DATE_MED_WITH_WEEKDAY);
    const time = DateTime.fromISO(props.stamp).toLocaleString(DateTime.TIME_WITH_SECONDS);
    const location = props.location;

    return (
        <tr>
            <td><EventFlag flagged={flagged} /></td>
            <td>{date}</td>
            <td>{time}</td>
            <td>{location}</td>
        </tr>
    );
}

export default EventRow;
