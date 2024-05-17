import { createContext, useContext} from "react";
import { AuthContextType, AuthProviderProps } from "@typings";
import { useSessionData } from "@hooks";

const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider({ children }: AuthProviderProps){

    const { userData, setUserData } = useSessionData()

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