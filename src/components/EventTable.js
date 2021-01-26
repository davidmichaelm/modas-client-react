import Table from 'react-bootstrap/Table';
import EventRow from "./EventRow";
import React from "react";
import { DateTime } from "luxon";

function EventTable(props) {
    return (
        <div className="App">
            <Table>
                <thead>
                <tr>
                    <th>Flag</th>
                    <th>Date</th>
                    <th>Time</th>
                    <th>Location</th>
                </tr>
                </thead>
                <tbody>
                {
                    props.events.map(event => {
                        return (
                            <EventRow
                                flagged={event.flag}
                                location={event.loc}
                                date={getDateStringFromTimestamp(event.stamp)}
                                time={getTimeStringFromTimestamp(event.stamp)}
                                key={event.id}
                            />
                        );
                    })
                }
                </tbody>
            </Table>
        </div>
    );
}

function getDateStringFromTimestamp(stamp) {
    return DateTime.fromISO(stamp).toLocaleString(DateTime.DATE_MED_WITH_WEEKDAY);
}

function getTimeStringFromTimestamp(stamp) {
    return DateTime.fromISO(stamp).toLocaleString(DateTime.TIME_WITH_SECONDS);
}

export default EventTable;
