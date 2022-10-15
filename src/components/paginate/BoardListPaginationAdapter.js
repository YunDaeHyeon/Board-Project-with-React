import React from 'react';
import BoardListPiece from '../board/BoardListPiece';

const BoardListPaginationAdapter = ({board}) =>{
    return(
        <>
            {
                board.map((element) => (
                    <BoardListPiece
                        key={element.board_no}
                        boardNo={element.board_no}
                        boardTitle={element.board_title}
                        boardImage={element.board_image}
                        boardWriter={element.board_writer}
                        boardDate={element.board_date}
                        boardViews={element.board_views}/>
                ))
            }
        </>
    )
}

export default BoardListPaginationAdapter;