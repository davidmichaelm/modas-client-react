import Pagination from "react-bootstrap/Pagination";

function PageControls(props) {
    if (!props.pagingInfo.currentPage) return null;

    const pagingInfo = props.pagingInfo;
    const onFirstPage = pagingInfo.previousPage === pagingInfo.currentPage;
    const onLastPage = pagingInfo.currentPage === pagingInfo.totalPages;

    function handleClick(page) {
        props.onPageChange(page);
    }

    return (
        <div className="p-2 bg-dark text-light align-items-center" id="page-controls">
            <Pagination className="my-auto" id="pagination">
                <Pagination.First
                    onClick={() => handleClick(1)}
                    disabled={onFirstPage}
                />

                <Pagination.Prev
                    onClick={() => handleClick(pagingInfo.previousPage)}
                    disabled={onFirstPage}
                />

                {pagingInfo.previousPage !== 1 &&
                    <Pagination.Ellipsis disabled />
                }

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

                {pagingInfo.nextPage !== pagingInfo.totalPages &&
                    <Pagination.Ellipsis disabled />
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
