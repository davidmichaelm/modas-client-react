import Pagination from "react-bootstrap/Pagination";
import Form from "react-bootstrap/Form";

function PageControls(props) {
    const pagingInfo = props.pagingInfo;
    const onFirstPage = pagingInfo.previousPage === pagingInfo.currentPage;
    const onLastPage = pagingInfo.currentPage === pagingInfo.totalPages;

    function handleClick(page) {
        props.onPageChange(page);
    }

    function handleChange(e) {
        console.log(e.target.value)
        props.onItemsPerPageChange(e.target.value);
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

            <div className="ml-auto">
                <span className="pr-2 d-none d-md-inline">Items:</span>
                <Form.Control
                    as="select"
                    className="w-auto"
                    size="sm"
                    custom
                    defaultValue={20}
                    onChange={handleChange}
                >
                    <option value="10">10/page</option>
                    <option value="20">20/page</option>
                    <option value="30">30/page</option>
                    <option value="40">40/page</option>
                </Form.Control>
            </div>
        </div>
    );
}

export default PageControls;
