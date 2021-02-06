import React, { useEffect, useState } from 'react';
import {DateTime} from "luxon";

export default function EventRow({id, flagged, location, stamp, onFlagChange}) {
    const flagClass = flagged ? "bi-flag-fill" : "bi-flag";
    const date = DateTime.fromISO(stamp).toLocaleString(DateTime.DATE_MED_WITH_WEEKDAY);
    const shortDate = DateTime.fromISO(stamp).toLocaleString(DateTime.DATE_SHORT);
    const time = DateTime.fromISO(stamp).toLocaleString(DateTime.TIME_WITH_SECONDS);
    const setFlagApi = useFlagApi(id);

    return (
        <tr>
            <td>
                <i  style={{cursor: "pointer"}}
                    className={flagClass}
                    onClick={() => {
                        setFlagApi(!flagged);
                        onFlagChange(!flagged, id);
                    }}>
                </i>
            </td>
            <td className="d-none d-md-block">{date}</td>
            <td className="d-md-none">{shortDate}</td>
            <td>{time}</td>
            <td>{location}</td>
        </tr>
    );
}

const useFlagApi = (initialId) => {
    const [flagged, setFlagged] = useState(null);
    const id = useState(initialId)[0];

    useEffect(() => {
        if (flagged === null) return;

        fetch(`https://dmarquardt-modas.azurewebsites.net/api/event/${id}`,
            {
                method: "PATCH",
                headers: {
                    'content-type': 'application/json'
                },
                mode: "cors",
                body: JSON.stringify([{
                    "op": "replace",
                    "path": "Flagged",
                    "value": flagged
                }])
            }); // TODO: revert state on error
    }, [flagged, id]);

    return setFlagged;
}