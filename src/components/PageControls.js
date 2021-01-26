import Button from "react-bootstrap/Button";

function PageControls(props) {
    const pagingInfo = props.pagingInfo;
    return (
        <div className="d-flex p-2 flex-row align-items-center bg-dark text-light" id="page-controls">
            <div className="mr-auto">
                <Button className="m-1">First</Button>
                <Button className="m-1">Prev</Button>
            </div>
            <div>
                {pagingInfo.rangeStart}-{pagingInfo.rangeEnd} of {pagingInfo.totalItems}
            </div>
            <div className="ml-auto">
                <Button className="m-1">Next</Button>
                <Button className="m-1">Last</Button>
            </div>
        </div>
    );
}

export default PageControls;
