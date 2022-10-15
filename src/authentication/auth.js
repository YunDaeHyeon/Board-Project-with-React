
import { useState, createContext, useContext } from 'react';
const AuthContext = createContext(null);

// 권한 설정 컴포넌트(외부 접근 방지 모듈)
export const AuthProvider = ({children}) => {
    // 서버 IP 주소 설정
    const serverIP = "192.168.35.47";
    const [user, setUser] = useState({});

    // 로그인
    const login = (user) => {
        sessionStorage.setItem('user',JSON.stringify(user)); // object를 세션으로 저장하기 위해서는 String으로 변환하여 사용
        setUser(user);
    };

    // 로그아웃
    const logout = () => {
        setUser({});
    };

    return(
        <AuthContext.Provider value={{user, login, logout, serverIP}}>
            {children}
        </AuthContext.Provider>
    )
}

// useAuth 커스텀 훅 호출
export const useAuth = () => {
    return useContext(AuthContext);
}