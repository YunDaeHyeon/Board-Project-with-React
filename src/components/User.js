import "./User_style.css"
import PropTypes from 'prop-types';

function User({userNo, userId, userName, userRole}){
    return(
        <div className="profile_container">
            <article className="profile">
                <img 
                    className="profile_img"
                    src={require("../images/user.png")}
                    alt="프로필 이미지"
                    />
                <p>{userName}</p>
                <p>{userId}</p>
                <p>{userRole}</p>
            </article>
        </div>
    );
}

// prop type 검사를 위한 'prop-types' 패키지 사용
// npm install prop-types
User.propTypes={
    userNo: PropTypes.number.isRequired,
    userId: PropTypes.string.isRequired,
    userName: PropTypes.string.isRequired,
    userRole: PropTypes.string.isRequired
};

export default User;