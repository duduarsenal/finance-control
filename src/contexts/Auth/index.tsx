import { createContext, useContext, useEffect, useState} from "react";
import { AuthContextType, AuthProviderProps, LoginProps, UserProps } from "@typings";
import { useNavigate } from "react-router-dom";

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: AuthProviderProps){

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const [userData, setUserData] = useState<any>();
    const navigate = useNavigate();

    async function AuthToken(): Promise<null>{
        return null;
    }

    async function handleSession() {
        const data = await AuthToken();

        if(data){
            navigate('/login');
            return;
        }
        setUserData(data)
        return;
    }

    useEffect(() => {
        handleSession();
    }, [])

    useEffect(() => {
        if(userData?.usertoken){
            localStorage.setItem('token', userData.usertoken)
        }
    }, [userData])

    return (
        <AuthContext.Provider value={{userData, setUserData}}>
            {children}
        </AuthContext.Provider>
    )
    
}

export function UseSession(): AuthContextType {
    const context = useContext(AuthContext);

    if (!context) {
        throw new Error('useSession deve ser usado dentro de um AuthProvider');
    }

    return context;
}

export async function VerifyLogin({username, password}: LoginProps): Promise<UserProps | null> {

    if(username && password){
        return {username: "dudu", usertoken: "tokenzinhogrande"};
    }
    return null
}