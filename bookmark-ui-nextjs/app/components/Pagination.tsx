import React from 'react'
import { BookmarksResponse } from '../types/bookmark'
import Link from 'next/link';

interface PaginationProps {
    bookmarks: BookmarksResponse;
    query?: string // 선택적 프로퍼티 있어도 되도 없어도 됨
}

const Pagination = ({ bookmarks, query }: PaginationProps) => {
    const path = "/bookmarks";
    const firstPage = { pathname: path, query: { page: 1 } }
    const previousPage = { pathname: path, query: { page: bookmarks.currentPage - 1 } }
    const nextPage = { pathname: path, query: { page: bookmarks.currentPage + 1 } }
    const lastPage = { pathname: path, query: { page: bookmarks.totalPages } }
    return (
        <div>
            <nav aria-label="Page navigation">
                <ul style={{ display: 'flex', justifyContent: 'space-between', padding: 0, listStyle: 'none' }} className="pagination">
                    <li className={"page-item" + (bookmarks.hasPrevious ? "" : "disabled")}>
                        <Link className="page-link" href={previousPage}>Previous</Link>
                    </li>
                    <li className={"page-item" + (bookmarks.hasNext ? "" : "disabled")}>
                        <Link className="page-link" href={lastPage}>Next</Link>
                    </li>
                </ul>
            </nav>
        </div>
    )
}

export default Pagination
