import React, { ReactNode} from "react";

export interface UserProps{
    username: string
    usertoken: string
}

export interface AuthContextType {
    userData: UserProps | null;
    setUserData?: React.Dispatch<React.SetStateAction<UserProps | null>>;
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
    handleButton: (event: React.MouseEvent<HTMLButtonElement>) => void;
}

export interface LoadingProps {
    isTrue?: boolean;
    className?: string;
    message?: string;
}

export interface SelectProps{
    icon?: JSX.Element
    label?: string
    optionDefault: string
    options?: GenericProps[]
    optionsCategorias?: CategoriaProps[]
    value: CategoriaProps | null
    setValue: React.Dispatch<React.SetStateAction<GenericProps | CategoriaProps | null>>
    className?: string
    transparent?: boolean
    colors?: boolean
    theme?: string
    categorias?: boolean
    required?: boolean
    direction?: string
    clearable?: boolean
}

export interface DashboardProps{
    saveCampo: (campo: CamposProps) => void
    handleEditCampo: (campo: CamposProps) => void
    removeCampo: (id: CamposProps) => Promise<void>
    type: string
    campos: CamposProps[]
    categorias: CategoriaProps[]
    setTotal: (n: number) => void
}

export interface CamposProps{
    id: string
    type: string
    data: string
    month: number
    descricao: string
    categoria: CategoriaProps
    parcelas: number
    valor: number
    dtadd: string
}

export interface ModalCategoriaProps{
    setModalCategoria: React.Dispatch<React.SetStateAction<boolean>>
    categorias: CategoriaProps[]
    saveCategorias: (values: CategoriaProps[]) => void
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
    saveCampo: (campo: CamposProps) => void
    handleEditCampo: (campo: CamposProps) => void
    categorias: CategoriaProps[]
    editCampo: CamposProps
}

export interface TextAreaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement>{
    label?: string
    className?: string
    value: string
    setValue: (value: string) => void
}

export interface DateFieldProps{
    label?: string
    date: string | null
    setDate: (value: string) => void 
    style?: React.CSSProperties
    required?: boolean
    setOpenDate?: (b: boolean) => void
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
    className?: string
}

export interface ConfirmActionProps{
    label: string
    option1: string
    option2: string
    action1: () => void
    action2: () => void
}

export interface OutletContextProps{
    addNotification: (type: string, message: string) => void
    setIsPageHeader: (value: string | null) => void
    setIsLoading: (value: boolean) => void
}