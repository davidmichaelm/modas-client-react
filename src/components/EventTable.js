import Table from 'react-bootstrap/Table';
import Spinner from 'react-bootstrap/Spinner';
import EventRow from "./EventRow";
import React from "react";

function EventTable(props) {
    function handleFlagChange(flagged, id) {
        props.onFlagChange(flagged, id);
    }

    function handleSortChange(sortBy) {
        if (sortBy === props.sortBy) {
            props.onOrderChange(props.order === "asc" ? "desc" : "asc");
        } else {
            props.onSortChange(sortBy);
            props.onOrderChange("desc");
        }

    }

    const arrow = props.order === "asc" ? "bi bi-caret-up-fill" : "bi bi-caret-down-fill";

    return (
        <div className="overflow-auto container-xl p-0 position-relative" id="event-table">
            <Table striped variant="dark" className="w-lg-50">
                <thead className="bg-primary sticky-top">
                <tr>
                    <th>
                        <button className="link-button text-white font-weight-bold" onClick={() => handleSortChange("flag")}>
                            Flag
                            { props.sortBy === "flag" &&
                                <i className={arrow}></i>
                            }
                        </button>
                    </th>
                    <th>
                        <button className="link-button text-white font-weight-bold" onClick={() => handleSortChange("stamp")}>
                            Date
                            { props.sortBy === "stamp" &&
                                <i className={arrow}></i>
                            }
                        </button>
                    </th>
                    <th>Time</th>
                    <th>
                        <button className="link-button text-white font-weight-bold" onClick={() => handleSortChange("loc")}>
                            Location
                            { props.sortBy === "loc" &&
                                <i className={arrow}></i>
                            }
                        </button>
                    </th>
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
            {props.children}
        </div>
    );
}

export default EventTable;
