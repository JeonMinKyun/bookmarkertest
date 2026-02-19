import React from 'react'
import { BookmarksResponse } from '../types/bookmark'
import Bookmark from './Bookmark';

interface BookmarkProps{
    bookmarks: BookmarksResponse;
}

const BookmarkProps = ({bookmarks}: BookmarkProps) => {
  return (
    <>
        {bookmarks.data.map(bookmark => 
        <Bookmark key={bookmark.id} bookmark={bookmark}/>
        )}
    </>
  )
}

export default BookmarkProps
