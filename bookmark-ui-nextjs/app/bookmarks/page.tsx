import React from 'react'
import { fetchBookmarks } from '../serivces/api/fetchBookmarks'
import BookmarkProps from '../components/BookmarkProps';
import Pagination from '../components/Pagination';
import SearchForm from '../components/SearchForm';

const Home = async({searchParams}: {searchParams: Promise<{page?: string, query ?: string}>}) => {


  const {page, query} = await searchParams;
  const pageNumber = page ? parseInt(page, 10): 1;
  const queryString = query ? String(query) : "";
  const bookmarks = await fetchBookmarks(pageNumber, queryString);// 서버사이트 데이터 페칭

  return (
    <>
      <h2>Welcomd to Bookmark</h2>
      <SearchForm />
      <Pagination bookmarks={bookmarks} query={queryString}/>
      <ul style={{paddingLeft: 0}}>
        <BookmarkProps bookmarks={bookmarks} />
      </ul>
    </>
  )
}

export default Home