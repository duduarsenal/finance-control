import { ReactNode } from "react";

export interface UserProps{
    username: string
    usertoken: string
}

export interface AuthContextType {
    userData: UserProps;
    setUserData: React.Dispatch<React.SetStateAction<UserProps>>;
}

export interface AuthProviderProps {
    children: ReactNode;
}

export interface IsErrorProps {
    error?: ReactNode
}

export interface LoginProps {
    username: string
    password: string
}
