import { ReactNode, createContext, useContext, useEffect, useState } from "react";
import { getCookie, setCookie, removeCookie } from "../utils/cookie";
import { getUserInfo } from "../modules/users/service/user";
import { User } from "../modules/users/types/type";
import PageLoading from "../components/loading/loading";

interface AuthContextProps {
    children: ReactNode;
}

interface AuthContextValue {
    isLoggedIn: boolean;
    user: null | User;
    login: (token: string) => void;
    logout: () => void;
}
const AuthContext = createContext<AuthContextValue | undefined>(undefined);

export const AuthProvider: React.FC<AuthContextProps> = ({ children }) => {
    const [loading, setLoading] = useState(false);
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [user, setUser] = useState<User | null>(null);
    useEffect(() => {
        setLoading(true);
        const token = getCookie('ACCESS_TOKEN');
        if (token) {
            setIsLoggedIn(true);
            getUserInfo()
                .then((res: any) => {
                    if (res.success == true) {
                        setUser(res.data);
                    }
                })
                .catch(() => {
                    setIsLoggedIn(false);
                    setUser(null);
                })
                .finally(() => setLoading(false))
        }
        else {
            setIsLoggedIn(false);
            setUser(null);
            setLoading(false);
        }
    }, [isLoggedIn]);

    const login = (access_token: string) => {
        if (access_token) {
            setCookie('ACCESS_TOKEN', access_token, { expires: 1 });
            setIsLoggedIn(true);
        }
    };

    const logout = () => {
        removeCookie('ACCESS_TOKEN');
        setIsLoggedIn(false);
    };

    return (
        <AuthContext.Provider value={{ isLoggedIn, user, login, logout }}>
            {children}
            <PageLoading loading={loading} />
        </AuthContext.Provider >
    );
};

export const useAuth = (): AuthContextValue => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};
