import { SetStateAction, useEffect, useState } from "react";
import { Button, Input, LogoMark } from "@components";
import { useNavigate, useOutletContext } from "react-router-dom";
import { useSessionData } from "@hooks";

export function Login() {

    const navigate = useNavigate();
    const [username, setUsername] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const { userData } = useSessionData();
    const [setIsPageHeader, setIsLoading]: [React.Dispatch<SetStateAction<string>>, React.Dispatch<SetStateAction<boolean>>] = useOutletContext();

    useEffect(() => {
        if (userData?.usertoken) {
            navigate("/")
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [userData])

    useEffect(() => {
        setIsLoading(true)
        setIsPageHeader(window.location.pathname)

        setTimeout(() => {
            setIsLoading(false)
        }, 500)
    }, [])

    function handleLogin(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
    }

    return (
        <div className="flex items-center justify-center h-full select-none">
            <form className="flex flex-col gap-4 min-h-80 w-96">
                <LogoMark />
                <Input
                    label="Username"
                    type="text"
                    value={username}
                    setState={setUsername}
                />
                <Input
                    label="Senha"
                    type="password"
                    value={password}
                    setState={setPassword}
                />
                <Button
                    value="Entrar"
                    handleButton={(e) => handleLogin(e)}
                />
            </form>
        </div>
    )
}