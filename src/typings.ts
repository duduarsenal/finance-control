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
    handleButton: (e: React.FormEvent<HTMLFormElement>) => void;
}

export interface LoadingProps {
    isTrue?: boolean;
    className?: string;
    message?: string;
}

export interface SelectProps{
    icon?: JSX.Element
    label: string
    options?: GenericProps[]
    optionsCategorias?: CategoriaProps[]
    value: CategoriaProps | null
    setValue: React.Dispatch<React.SetStateAction<GenericProps | CategoriaProps | null>>
    className?: string
    transparent?: boolean
    colors?: boolean
    theme?: string
    categorias?: boolean
}

export interface DashboardProps{
    handleSaveCampo: (values: ContentTableProps) => void
    type: string
    content: ContentTableProps[]
    categorias: CategoriaProps[]
}

export interface ContentTableProps{
    type: string
    data: string
    descricao: string
    categoria: CategoriaProps
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
    handleSaveCampo: (value: ContentTableProps) => void
    categorias: CategoriaProps[]
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

export interface NotifyProps{
    open: boolean
    id: string
    className?: string
    type: string
    message: string
    removeNotify: (id: string) => void
}
export interface NotifyDataProps{
    open: boolean
    id: string
    type: string
    message: string
}

export interface NotifyManagerProps{
    notifications: NotifyDataProps[]
    removeNotification: (id: string) => void
}

export interface HeaderProps{
    className: string
}