import Table from 'react-bootstrap/Table';
import EventRow from "./EventRow";
import React from "react";

class EventTable extends React.Component {

    render() {
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
                    <EventRow
                        flagged={"false"}
                        date={"today"}
                        time={"now"}
                        location={"thermostat"}
                    />
                </Table>
            </div>
        );
    }
}

export default EventTable;