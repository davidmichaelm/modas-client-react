import React from 'react';
import EventFlag from './EventFlag';

function EventRow(props) {
    return (
        <tr>
            <td><EventFlag flagged={props.flagged} /></td>
            <td>{props.date}</td>
            <td>{props.time}</td>
            <td>{props.location}</td>
        </tr>
    );
}

export default EventRow;
