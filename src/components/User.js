import "./User_style.css"

function User(){
    return(
        <div className="profile_container">
            <article className="profile">
                <img 
                    className="profile_img"
                    src={require("../images/user.png")}
                    alt="프로필 이미지"
                    />
                <p>사용자 이름</p>
                <p>사용자 아이디</p>
                <p>사용자 권한</p>
            </article>
        </div>
    );
}

export default User;