import React from "react";

function PageHeader(props) {
    return (
        <header className="d-flex p-2 px-xl-0 align-items-center container-xl p-0">
            <h2 className="ml-1 ml-lg-0 mb-0">
                <span className="d-none d-md-inline">Moving Object Detection Alert System</span>
                <span className="d-inline d-md-none">MODAS</span>
            </h2>

            {props.children}
        </header>
    );
}

export default PageHeader;