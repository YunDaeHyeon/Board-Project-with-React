import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import "./BoardListPiece_style.css"

/*
    board.board_date.replace('T', ' ').substring(0,19)
    해당 의미는 express에서 DATETIME format을 YYYY-MM-DDTHH:mm:ss.sssZ 형식으로 불러온다.
    YYYY-MM-DD HH:mm:ss 형식으로 변경하기 위해 replace, substring을 이용한다.
*/

function BoardListPiece({boardNo, boardImage, boardTitle, boardWriter, boardDate, boardViews}){
    let date = new Date(boardDate); // ISO -> Object
    date.setHours(date.getHours() + 9) // Object -> '시간' KCT + 9
    boardDate = date.toISOString().replace('T', ' ').substring(0, 16); // T, 000Z => KR
    let date1 = boardDate.substring(0, 11);
    let date2 = boardDate.substring(11, 16);
    console.log(boardImage);
    return(
        <tr>
            <td>{boardNo}</td>
            <td className='boardImage_container'>
                <img 
                    className='boardImage_box'
                    src={ // boardImage가 존재하면 경로 지정, 없으면 empty_image (빈 사진) 반환
                        boardImage !== null ? require(`../../../src/server/uploads/${boardImage}`) : 
                        require('../../images/empty_image.png')
                    }
                    alt="img"
                    />
            </td>
            <td><Link to={`/board/details/${boardNo}`}>{boardTitle}</Link></td>
            <td>{boardWriter}</td>
            <td>
                <p>{date1}</p>
                <p>{date2}</p> 
            </td>
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