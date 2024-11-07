import { Button, Input, LogoMark } from "@components";
import { Dispatch, FormEvent, SetStateAction } from "react";
import { LoginSvg } from '@assets'

interface LoginProps {
    username: string
    setUsername: Dispatch<SetStateAction<string>>
    password: string
    setPassword: Dispatch<SetStateAction<string>>
    handleLogin: (e: FormEvent<HTMLFormElement>) => void
    handleForgetPassword: () => void
    setPageType: (value: "login" | "register") => void
}

export function Login({username, setUsername, password, setPassword, handleLogin, handleForgetPassword, setPageType}: LoginProps){
    return (
    <div className="flex items-center justify-center gap-6">
        <form className="flex flex-col items-center justify-center gap-4 min-h-80 w-max bg-brand-background px-10 h-[450px] rounded-md shadow-xl animate-slide-out z-10">
            <div className="-mt-5">
                <LogoMark />
            </div>
            <Input
                required={true}
                label="Username"
                type="text"
                value={username}
                setState={setUsername}
                className="w-80 h-7 text-base"
            />
            <Input
                required={true}
                label="Senha"
                type="password"
                value={password}
                setState={setPassword}
                className="w-80 h-7 text-base"
            />
            <div className="flex flex-col">
                <Button
                    value="Entrar"
                    handleButton={(e) => handleLogin(e as unknown as FormEvent<HTMLFormElement>)}
                    className="w-80 outline-0 bg-brand-hover hover:bg-brand-gray m-0"
                />
                <div className="flex items-center justify-between">
                    <span className="hover:underline cursor-pointer" onClick={() => { 
                        setPageType("register")
                        setUsername("")
                        setPassword("") 
                    }}>
                        Registre-se
                    </span>
                    <span className="hover:underline cursor-pointer" onClick={handleForgetPassword}>
                        Esqueceu sua senha
                    </span>
                </div>
            </div>
        </form>
        {/* SVG IMAGE */}
        <img 
            src={LoginSvg} 
            alt="Imagem de um rapaz usando um laptop sentando em cima de alguns livros" 
            className="w-[450px] drop-shadow-xl"
        />
    </div>
    )
}