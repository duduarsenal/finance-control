import React, { ReactNode} from "react";

export interface UserProps{
    username: string
    usertoken: string
}

export interface AuthContextType {
    userData?: UserProps;
    setUserData?: React.Dispatch<React.SetStateAction<UserProps>>;
}

export interface AuthProviderProps {
    children: ReactNode;
}
export interface UserContextType {
    userData: UserProps;
}

export interface UserProviderProps {
    children: ReactNode;
}

export interface IsErrorProps {
    error?: ReactNode
}

export interface LoginProps {
    username: string
    password: string
}

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement>{
    label: string
    icon?: JSX.Element
    setState: React.Dispatch<React.SetStateAction<string>>
}
export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement>{
    icon?: JSX.Element
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    handleButton: (e?: any) => void;
}

export interface LoadingProps {
    isTrue?: boolean;
    className?: string;
    message?: string;
}

export interface SelectProps{
    icon?: JSX.Element
    label: string
    options: {label: string, value: string | number}[]
    value: {label: string, value: string | number} | null
    setValue: React.Dispatch<React.SetStateAction<{label: string, value: string | number} | null>>
}