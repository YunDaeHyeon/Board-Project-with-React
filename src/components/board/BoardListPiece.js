import PropTypes from 'prop-types';
import { useEffect } from 'react';
import "./BoardListPiece_style.css"
/*
    board.board_date.replace('T', ' ').substring(0,19)
    해당 의미는 express에서 DATETIME format을 YYYY-MM-DDTHH:mm:ss.sssZ 형식으로 불러온다.
    YYYY-MM-DD HH:mm:ss 형식으로 변경하기 위해 replace, substring을 이용한다.
*/

function BoardListPiece({boardNo, boardImage, boardTitle, boardWriter, boardDate, boardViews}){

    return(
        <tr>
            <td>{boardNo}</td>
            <td className='boardImage_container'>
                <img 
                    className='boardImage_box'
                    src={ // boardImage가 존재하면 경로 지정, 없으면 null 반환
                        boardImage ? require(`../../server/uploads/${boardImage}`) : null
                    }
                    />
            </td>
            <td>{boardTitle}</td>
            <td>{boardWriter}</td>
            <td>{boardDate.replace('T', ' ').substring(0,19)}</td>
            <td>{boardViews}</td>
        </tr>
    );
}

BoardListPiece.propTypes={
    boardNo : PropTypes.number.isRequired,
    boardTitle : PropTypes.string.isRequired,
    boardWriter : PropTypes.string.isRequired,
    boardDate : PropTypes.string.isRequired,
    boardViews : PropTypes.number.isRequired,
}

export default BoardListPiece;