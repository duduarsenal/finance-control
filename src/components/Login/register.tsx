import { RegisterSvg } from '@assets';
import { Dispatch, FormEvent, SetStateAction } from "react";
import { Button } from "../Button";
import { Input } from "../Input";
import { LogoMark } from "../LogoMark";

interface RegisterProps{
    username: string
    setUsername: Dispatch<SetStateAction<string>>
    repassword: string
    setRepassword: Dispatch<SetStateAction<string>>
    password: string
    setPassword: Dispatch<SetStateAction<string>>
    handleRegister: (e: FormEvent<HTMLFormElement>) => void
    setPageType: (value: "login" | "register") => void
}

export function Register({username, setUsername, password, setPassword, repassword, setRepassword, handleRegister, setPageType}: RegisterProps){
    return (
        <div className="flex items-center justify-center flex-row-reverse gap-6">
            <form className="flex flex-col items-center justify-center gap-4 min-h-80 w-max bg-brand-background px-10 h-[450px] rounded-md shadow-xl animate-slide-in z-10">
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
                <Input
                    required={true}
                    label="Confirmar Senha"
                    type="password"
                    value={repassword}
                    setState={setRepassword}
                    className="w-80 h-7 text-base"
                />
                <div className="flex flex-col">
                    <Button
                        value="Registrar"
                        handleButton={(e) => handleRegister(e as unknown as FormEvent<HTMLFormElement>)}
                        className="w-80 outline-0 bg-brand-hover hover:bg-brand-gray m-0"
                        />
                    <div className="flex items-center justify-between">
                        <span className="hover:underline cursor-pointer" onClick={() => {
                            setPageType("login")
                            setUsername("")
                            setPassword("")
                            setRepassword("")
                        }}>
                            Entrar
                        </span>
                    </div>
                </div>
            </form>
            <div>
                {/* SVG IMAGE */}
                <img src={RegisterSvg} className="w-[425px] drop-shadow-xl"/>
            </div>
        </div>
    )
}