import Table from 'react-bootstrap/Table';
import EventRow from "./EventRow";
import React from "react";

function EventTable(props) {
    return (
        <div className="container-fluid overflow-auto w-100" id="event-table">
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
                                stamp={event.stamp}
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

export default EventTable;
