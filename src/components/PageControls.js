import Pagination from "react-bootstrap/Pagination";

function PageControls(props) {
    const pagingInfo = props.pagingInfo;
    const onFirstPage = pagingInfo.previousPage === pagingInfo.currentPage;
    const onLastPage = pagingInfo.currentPage === pagingInfo.totalPages;

    function handleClick(page) {
        props.onPageChange(page);
    }

    return (
        <div className="d-flex p-2 flex-row align-items-center bg-dark text-light" id="page-controls">
            <Pagination className="mx-auto align-self-center">
                <Pagination.First
                    onClick={() => handleClick(1)}
                    disabled={onFirstPage}
                />

                <Pagination.Prev
                    onClick={() => handleClick(pagingInfo.previousPage)}
                    disabled={onFirstPage}
                />

                {!onFirstPage &&
                    <Pagination.Item
                        onClick={() => handleClick(pagingInfo.previousPage)}
                    >
                        {pagingInfo.previousPage}
                    </Pagination.Item>
                }

                <Pagination.Item active>{pagingInfo.currentPage}</Pagination.Item>

                {!onLastPage &&
                    <Pagination.Item
                        onClick={() => handleClick(pagingInfo.nextPage)}
                    >
                        {pagingInfo.nextPage}
                    </Pagination.Item>
                }

                <Pagination.Next
                    onClick={() => handleClick(pagingInfo.nextPage)}
                    disabled={onLastPage}
                />

                <Pagination.Last
                    onClick={() => handleClick(pagingInfo.totalPages)}
                    disabled={onLastPage}
                />
            </Pagination>
        </div>
    );
}

export default PageControls;
