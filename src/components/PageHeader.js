import React from "react";

function PageHeader(props) {
    return (
        <header className="d-flex p-2 px-xl-0 align-items-center container-xl p-0">
            <h2 className="ml-1 ml-lg-0 mb-0">
                <span className="d-none d-md-inline">Moving Object Detection Alert System</span>
                <span className="d-inline d-md-none">MODAS</span>
            </h2>

            <div className="ml-auto mb-0 mr-2" style={{cursor: "pointer"}}>
                <button className="link-button text-white">
                    <i className="bi bi-box-arrow-in-right"></i> Sign In
                </button>
            </div>
            {props.children}
        </header>
    );
}

export default PageHeader;