
import { useState, createContext, useContext } from 'react';

const AuthContext = createContext(null);

// 권한 설정 컴포넌트(외부 접근 방지 모듈)
export const AuthProvider = ({children}) => {
    const [user, setUser] = useState(null);

    // 로그인
    const login = (user) => {
        sessionStorage.setItem('user',user); // 세션 저장 { user }
        setUser(user);
    };

    // 로그아웃
    const logout = () => {
        setUser(null);
    };

    return(
        <AuthContext.Provider value={{user, login, logout}}>
            {children}
        </AuthContext.Provider>
    )
}

// useAuth 커스텀 훅 호출
export const useAuth = () => {
    return useContext(AuthContext);
}