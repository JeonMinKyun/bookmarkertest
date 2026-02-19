import React from 'react'
import { BookmarksResponse } from '../../types/bookmark';
import axios from 'axios';

// const API_BASE_URL = 'http://host.docker.internal:8080';
const getApiUrl = () =>{
  const serverApiUrl = process.env.SERVER_SIDE_API_BASE_URL;   // 서버사이드 URL(도커로 배포된 서버사이트 호출시 사용)
  const clientApiUrl = process.env.NEXT_PUBLIC_CLIENT_SIDE_API_BASE_URL;   // 클라이언트 사이드 URL(브라우저에서 호출할 공개용 API)

  if(typeof window === 'undefined'){
    console.log("(❁´◡`❁) 서버사이드 실행 - 사용 URL : ",serverApiUrl);
    return serverApiUrl || clientApiUrl
  }

  console.log("(❁´◡`❁) 클라이언트 사이드 실행 - 사용 URL : ",clientApiUrl);
  return clientApiUrl;
}

export const fetchBookmarks = async(page:number, query?:string):Promise<BookmarksResponse> => {
  const resp = await axios.get<BookmarksResponse>(`${getApiUrl()}/api/bookmarks?page=${page}&query=${query}`)
    return resp.data;
}

export const saveBookmark = async(bookmark : {title:string, url:string}) =>{
  try{
    const res = await axios.post(`${getApiUrl()}/api/bookmarks`, bookmark);
    return res.data; // 성공시 응답 데이터 변환
  }catch(error){
    // 에러가 발생한 경우 에러 처리 메시지 처리
    console.log("Error Saving Bookmark :",error);
    throw new Error("북마크 저장에 실패하였습니다"); // 오류를 throw하여 호출자에게 전달
  }
}
  
