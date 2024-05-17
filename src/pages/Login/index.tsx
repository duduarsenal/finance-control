import { useEffect, useState } from "react";
import { UseSession } from "@context";
import { useNavigate } from "react-router-dom";
import { verifyLogin } from "@hooks";
import { Button, Input } from "@components";

export function Login() {

    const navigate = useNavigate();
    const [username, setUsername] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const { userData } = UseSession();

    useEffect(() => {
        if (userData?.usertoken) {
            navigate("/")
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [userData])

    function handleLogin(e: Event) {
        e.preventDefault();

        console.log(verifyLogin({ username, password }));
    }

    return (
        <div className="flex items-center justify-center h-full select-none">
            <form className="flex flex-col gap-4 h-80 w-96">
                <h2 className="mx-auto text-[30px] font-[500]">Dudu Finance</h2>
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