import "bootstrap-icons/font/bootstrap-icons.css";

function EventFlag(props) {
    if (props.flagged) {
        return <i className="bi-flag-fill"></i>;
    } else {
        return <i className="bi-flag"></i>;
    }
}

export default EventFlag;
