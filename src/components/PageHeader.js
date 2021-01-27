import React from "react";

function PageHeader(props) {
    return (
        <header className="d-flex align-items-center">
            <h2 className="p-2 mb-0">
                Modas
            </h2>
            <div className="ml-auto mb-0 p-2 h4">
                <i className="bi bi-gear-fill"></i>
            </div>
        </header>
    )
}

export default PageHeader;