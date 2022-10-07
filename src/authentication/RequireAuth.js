import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from './auth';

// 라우터 래핑용 컴포넌트
// 로그인 하지 않은 사용자의 접근을 막는다.
const RequireAuth = ({children}) => {
    const auth = useAuth();
    // 'user'키의 세션은 오브젝트에서 String으로 변환하였으므로 꺼낼 때 String에서 Object로 변환
    const session = JSON.parse(sessionStorage.getItem('user')); 

    // state, session 모두 없다면
    if(Object.keys(auth.user).length === 0 && !session){
        alert('로그인을 해주세요!');
        return <Navigate to="/login"/>;
    }else if(Object.keys(auth.user).length !== 0 && !session){ // state는 존재하는데 session은 존재하지 않으면
        alert('로그인을 해주세요!');
        auth.logout(); // state 제거
        return <Navigate to="/login"/>;
    }else if(Object.keys(auth.user).length === 0 && session){ // session은 존재하는데 state는 존재하지 않으면
        return children;
    }else if(Object.keys(auth.user).length !== 0 && session){ // session, state 모두 존재하면
        return children;
    }
}

export default RequireAuth;