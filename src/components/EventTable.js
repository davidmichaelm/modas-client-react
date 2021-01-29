import Table from 'react-bootstrap/Table';
import Spinner from 'react-bootstrap/Spinner';
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
                {props.events.length > 0 &&
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
            {props.events.length === 0 &&
            <div className="py-5 text-center">
                <Spinner animation="border" role="status">
                    <span className="sr-only">Loading...</span>
                </Spinner>
            </div>
            }
        </div>
    );
}

export default EventTable;
