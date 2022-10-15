import React from 'react';
import "./Pagination_style.css";
/** 페이지네이션 핸들러 */

/* 
    prop : numberOfPage, totalPosts, paginate
*/
const Pagination = ({numberOfPage, totalPosts, paginate}) => {
    // 전체 페이지의 개수를 계산하기 위한 변수
    const pageNumbers = [];
    // 전체 게시글 개수를 페이지 당 포스트 개수로 나눈다.
    // 전체 게시글 수 : 12개, 화면 당 페이지 개수 6개 = 2
    for(let i = 1; i <= Math.ceil(totalPosts/numberOfPage);i++){
        pageNumbers.push(i);
    }
    return (
        <div className='pagination-container'>
            <nav>
                <ul className="pagination">
                    {
                        // pageNumbers의 개수만큼 map을 돌려 span 태그에 클릭 이벤트 지정
                        // !! paginate는 BoardList에서 받은 prop이며 startPage state를 변경시키는 함수이다.
                        pageNumbers.map((number) => (
                            <li key={number} className="page-item">
                                <span onClick={()=>paginate(number)} className="page-link">
                                    {number}
                                </span>
                            </li>
                        ))
                    }
                </ul>
            </nav>
        </div>
    )
}

export default Pagination;