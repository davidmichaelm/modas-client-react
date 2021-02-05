import React from 'react';
import {DateTime} from "luxon";

function EventRow(props) {
    const flagClass = props.flagged ? "bi-flag-fill" : "bi-flag";
    const date = DateTime.fromISO(props.stamp).toLocaleString(DateTime.DATE_MED_WITH_WEEKDAY);
    const shortDate = DateTime.fromISO(props.stamp).toLocaleString(DateTime.DATE_SHORT);
    const time = DateTime.fromISO(props.stamp).toLocaleString(DateTime.TIME_WITH_SECONDS);
    const location = props.location;

    function handleFlagClick() {
        props.onFlagChange(!props.flagged, props.id);
    }

    return (
        <tr>
            <td><i  style={{cursor: "pointer"}} className={flagClass} onClick={handleFlagClick}></i></td>
            <td className="d-none d-md-block">{date}</td>
            <td className="d-md-none">{shortDate}</td>
            <td>{time}</td>
            <td>{location}</td>
        </tr>
    );
}

export default EventRow;
