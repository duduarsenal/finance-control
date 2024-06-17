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
    label?: string
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
    className?: string
    transparent?: boolean
    colors?: boolean
    theme?: string
}

export interface DashboardProps{
    type: string
    content: ContentTableProps[]
}

interface ContentTableProps{
    data: string
    descricao: string
    categoria: string
    parcelas: number
    valor: number
}

export interface ModalCategoriaProps{
    setModalCategoria: React.Dispatch<React.SetStateAction<boolean>>
    categorias: CategoriaProps[] | null
    setCategorias: React.Dispatch<React.SetStateAction<CategoriaProps[] | null>>
    saveCategorias: () => void
}

export interface CategoriaProps{
    label: string
    value: string
    cor: GenericProps | null
    emoji: GenericProps | null
}

export interface GenericProps{
    label: string
    value: string | number
}

export interface ModalAddCampoProps{
    type: string
    setModalAddCampo: (value: boolean) => void
}

export interface TextAreaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement>{
    className?: string
    value: string
    setValue: (value: string) => void
}

export interface DateFieldProps{
    date: string | null
    setDate: (value: string) => void 
    style?: React.CSSProperties
}