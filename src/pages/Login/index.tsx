import { validadeLogin, registerUser } from "@api";
import { Login, Register } from "@components";
import { useSessionData } from "@hooks";
import { OutletContextProps, UserProps } from "@typings";
import { FormEvent, useEffect, useState } from "react";
import { useNavigate, useOutletContext } from "react-router-dom";

export function LoginRegister() {

    const navigate = useNavigate();
    const [username, setUsername] = useState<string>("");
    const [repassword, setRepassword] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [pageType, setPageType] = useState<"login" | "register">("login")
    const { userData, setUserData } = useSessionData();
    const { addNotification,setIsPageHeader, setIsLoading } = useOutletContext<OutletContextProps>();

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

    async function handleLogin(e: FormEvent<HTMLFormElement>) {
        e.preventDefault();

        if(!username || !password){
            return addNotification("danger", "Preencha todos os campos")
        }

        const canLogin = await validadeLogin(username, password)
        if(canLogin){
            // Criar estrutura de token/login
            setUserData(canLogin as UserProps)
            localStorage.setItem("user", JSON.stringify(canLogin))
            navigate("/")
        } else {
            addNotification("danger", "Usuario ou senha inválidos.")
        }
    }

    async function handleRegister(e: FormEvent<HTMLFormElement>) {
        e.preventDefault();

        if(!username || !password || !repassword) return addNotification("danger", "Preencha todos os campos")
        if((password !== repassword)) return addNotification("warning", "As senhas nao coincidem")

        if(await registerUser(username, password)){
            const canLogin = await validadeLogin(username, password)
            if(!canLogin) navigate("/")
 
            setUserData(canLogin as UserProps)
            localStorage.setItem("user", JSON.stringify(canLogin))

            addNotification("sucess", "Registro realizado com sucesso")
            navigate("/")
        } else {
            addNotification("danger", "Usuario ja registrado")
        }
    }

    function handleForgetPassword() {
        addNotification("warning", "Problema é seu, burro!")
    }

    return (
        <>
            {pageType === "login" && 
            <Login 
                username={username} 
                setUsername={setUsername} 
                password={password} 
                setPassword={setPassword} 
                handleLogin={handleLogin}
                setPageType={setPageType}
                handleForgetPassword={handleForgetPassword}
            />}

            {pageType === "register" &&
            <Register 
                username={username} 
                setUsername={setUsername}
                repassword={repassword}
                setRepassword={setRepassword}
                password={password} 
                setPassword={setPassword} 
                handleRegister={handleRegister}
                setPageType={setPageType}
            />}
        </>
    )
}