import { validadeLogin } from "@api";
import { Button, Input, LogoMark } from "@components";
import { useSessionData } from "@hooks";
import { OutletContextProps } from "@typings";
import { FormEvent, useEffect, useState } from "react";
import { useNavigate, useOutletContext } from "react-router-dom";

export function Login() {

    const navigate = useNavigate();
    const [username, setUsername] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const { userData, handleUserData } = useSessionData();
    const {addNotification,setIsPageHeader, setIsLoading} = useOutletContext<OutletContextProps>();

    useEffect(() => {
        if (userData?.usertoken) {
            navigate("/")
        }
    }, [navigate, userData])

    useEffect(() => {
        setIsLoading(true)
        setIsPageHeader(window.location.pathname)

        setTimeout(() => {
            setIsLoading(false)
        }, 500)
    }, [setIsLoading, setIsPageHeader])

    async function handleLogin(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();

        if(!username || !password){
            return addNotification("danger", "Preencha todos os campos")
        }

        const validLogin = await validadeLogin(username, password)
        if(!validLogin){
            handleUserData(validLogin)
        } else {
            addNotification("danger", "Usuario ou senha inválidos.")
        }
    }

    return (
        <div className="flex items-center justify-center h-full select-none">
            <form className="flex flex-col gap-4 min-h-80 w-96">
                <LogoMark />
                <Input
                    required={true}
                    label="Username"
                    type="text"
                    value={username}
                    setState={setUsername}
                />
                <Input
                    required={true}
                    label="Senha"
                    type="password"
                    value={password}
                    setState={setPassword}
                />
                <Button
                    value="Entrar"
                    handleButton={(e) => handleLogin(e as unknown as FormEvent<HTMLFormElement>)}
                />
            </form>
        </div>
    )
}