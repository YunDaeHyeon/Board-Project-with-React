import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from './auth';

// 라우터 래핑용 컴포넌트
// 로그인 하지 않은 사용자의 접근을 막는다.
const RequireAuth = ({children}) => {
    const auth = useAuth();
    const session = sessionStorage.getItem('user');

    // useAuth Hook
    // 만약, 사용자 state와 session 모두 존재하지 않으면 로그인 페이지 이동
    if(!auth.user && !session){
        alert('로그인이 필요합니다!');
        return <Navigate to="/login"/>;
    }else if(!auth.user && session){ // 만약, 사용자 state는 존재하지 않지만 session만 존재하면
        // console.log("Require Auth Log : 사용자 State는 존재하지 않지만 session은 존재합니다.");
        // console.log(`Require Auth Log : session : ${session}`);
        return children;
    }

    // 사용자 정보가 존재한다면 prop 반환
    return children;
}

export default RequireAuth;