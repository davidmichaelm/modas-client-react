import Pagination from "react-bootstrap/Pagination";

function PageControls(props) {
    const pagingInfo = props.pagingInfo;
    const onFirstPage = pagingInfo.previousPage === pagingInfo.currentPage;
    const onLastPage = pagingInfo.currentPage === pagingInfo.totalPages;

    function handleClick(e) {
        const page = e.target.getAttribute("data-page");
        if (!page) return;

        props.onPageChange(page);
    }

    return (
        <div className="d-flex p-2 flex-row align-items-center bg-dark text-light" id="page-controls">
            <Pagination className="mx-auto">
                <Pagination.First
                    onClick={handleClick}
                    data-page={1}
                    disabled={onFirstPage}
                />

                <Pagination.Prev
                    onClick={handleClick}
                    data-page={pagingInfo.previousPage}
                    disabled={onFirstPage}
                />

                {!onFirstPage &&
                    <Pagination.Item
                        onClick={handleClick}
                        data-page={pagingInfo.previousPage}
                    >
                        {pagingInfo.previousPage}
                    </Pagination.Item>
                }

                <Pagination.Item active>{pagingInfo.currentPage}</Pagination.Item>

                {!onLastPage &&
                    <Pagination.Item
                        onClick={handleClick}
                        data-page={pagingInfo.nextPage}
                    >
                        {pagingInfo.nextPage}
                    </Pagination.Item>
                }

                <Pagination.Next
                    onClick={handleClick}
                    data-page={pagingInfo.nextPage}
                    disabled={onLastPage}
                />

                <Pagination.Last
                    onClick={handleClick}
                    data-page={pagingInfo.totalPages}
                    disabled={onLastPage}
                />
            </Pagination>
        </div>
    );
}

export default PageControls;
