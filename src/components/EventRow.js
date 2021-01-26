import React from 'react';

function EventRow(props) {
    return (
        <tr>
            <td>{props.flagged}</td>
            <td>{props.date}</td>
            <td>{props.time}</td>
            <td>{props.location}</td>
        </tr>
    );
}

export default EventRow;