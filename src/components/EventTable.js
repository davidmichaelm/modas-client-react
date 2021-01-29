import Table from 'react-bootstrap/Table';
import EventRow from "./EventRow";
import React from "react";

function EventTable(props) {
    function handleFlagChange(flagged, id) {
        props.onFlagChange(flagged, id);
    }

    return (
        <div className="overflow-auto w-100" id="event-table">
            <Table striped variant="dark">
                <thead className="bg-primary sticky-top">
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
                                id={event.id}
                                flagged={event.flag}
                                location={event.loc}
                                stamp={event.stamp}
                                key={event.id}
                                onFlagChange={handleFlagChange}
                            />
                        );
                    })
                }
                </tbody>
            </Table>
        </div>
    );
}

export default EventTable;
