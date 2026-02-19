"use client";
//클라이언트 컴포넌트에서 비동기 작업을 직접적으로 수행할 수는 없지만, 
//useEffect 또는 이벤트 핸들러에서 async/await를 사용할 수 있습니다. useState, useEffect, useRouter 등 브라우저 전용 훅 사용 가능

import { useRouter } from 'next/navigation';
import { useState } from 'react';

const SearchForm = ()=>{
    const router = useRouter();
    const [query,setQuery] = useState("");

// event: React.FormEvent<HTMLFormElement> 는 타입스크립트의 form요소의 이벤트 타입
// event: React.SyntheticEvent 는 모든 타입을 포함하는 상위 이벤트 타입 
    const handleSearch = async (e: React.SyntheticEvent) => {
        e.preventDefault();
        if(query === "") {
            router.push(`/bookmarks`)
            return;
        }
        router.push(`/bookmarks?page=1&query=${query}`) //서버 콤포넌트에서 사용 불가
    };

    return (
        <div className="pb-4">
            <form className="d-flex" role="search" onSubmit={handleSearch}>
                <input className="form-control me-2" type="search" placeholder="Search" value={query} onChange={e => setQuery(e.target.value)}/>
                <button className="btn btn-outline-success" type="submit">Search</button>
            </form>
        </div>
    )
}
export default SearchForm;