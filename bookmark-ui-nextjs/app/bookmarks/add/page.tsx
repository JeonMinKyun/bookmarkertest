'use client'
import { saveBookmark } from '@/app/serivces/api/fetchBookmarks';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react'

export default function AddBookmark() {

  const [title, setTitle] = useState("");
  const [url, setUrl] = useState("");
  const [message, setMessage] = useState<string | null>(null);

  const router = useRouter();

  /*
   js에서는 any 타입이지만 typescript는 타입이 있어야 하기 때문에
   form에 관련된 이벤트를 구체적으로 추리 하기 위해서 event를 받는다
   submit, reset, input(input 요소 값의 입력), change(input, select, textarea 값이 변경 될 때)
  */
  const handleSubmit = (e: React.SyntheticEvent<HTMLFormElement>) => {
    e.preventDefault();
    // 서버 호출 등 처리

    if (!url) {
      alert("url을 입력해 주세요")
      return;
    }
    const payload = {
      title,
      url
    }

    try {
      saveBookmark(payload)
        .then(response => {
          console.log("SaveBookmark response", response);
          setTitle("");
          setUrl("");
          // 저장 성공 메시지
          setMessage("새로운 Bookmark를 저장하였습니다");

          // ✅ 메시지를 1초 보여준 후 이동
          setTimeout(() => {
            router.push('/bookmarks');
          }, 1000);
        })
        .catch(error => {
          // 오류 메시지를 setMessage에 저장
          setMessage(error.message || "새로운 Bookmark를 저장에 실패하였습니다");
        });
    } catch (error) {
      // Promise가 reject된 경우
      setMessage("새로운 Bookmark를 저장에 실패하였습니다");
    }
  };

  return (
    <div>
      {message && <div className="alert alert-primary" role="alert">{message}</div>}
      <form onSubmit={e => handleSubmit(e)}>
        <fieldset>
          <legend>새로운 Bookmark 등록</legend>
          <div className="mb-3">
            <label htmlFor="title" className="form-label">제목</label>
            <input type="text" id="title" className="form-control" placeholder="title" value={title} onChange={e => setTitle(e.target.value)} />
          </div>
          <div className="mb-3">
            <label htmlFor="url" className="form-label">제목</label>
            <input type="text" id="url" className="form-control" placeholder="url" value={url} onChange={e => setUrl(e.target.value)} />
          </div>
          <div className="d-grid gap-2 col-6 mx-auto">
            <button type="submit" className="btn btn-primary">Submit</button>
          </div>
        </fieldset>
      </form>
    </div>
  )
}
