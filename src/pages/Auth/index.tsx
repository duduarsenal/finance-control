/* eslint-disable @typescript-eslint/no-explicit-any */
import { validadeLogin, registerUser } from "@api";
import { Loading, Login, Register } from "@components";
import { useSessionData } from "@hooks";
import { OutletContextProps } from "@typings";
import { FormEvent, useEffect, useState } from "react";
import { useNavigate, useOutletContext } from "react-router-dom";

export function AuthPage() {
    const { userData, handleUserData } = useSessionData();
    const { addNotification, setIsPageHeader, setIsLoading } = useOutletContext<OutletContextProps>();
    const navigate = useNavigate();

    const [username, setUsername] = useState<string>("");
    const [repassword, setRepassword] = useState<string>("");
    const [password, setPassword] = useState<string>("");

    const [pageType, setPageType] = useState<"login" | "register">("login")

    const [isFetchingLogin, setIsFetchingLogin] = useState<boolean>(false)
    const [isFetchingRegister, setIsFetchingRegister] = useState<boolean>(false)

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
    }, [])

    async function handleLogin(e: FormEvent<HTMLFormElement>) {
        e.preventDefault();
        setIsFetchingLogin(true)
        try {
            if(!username || !password) return addNotification("danger", "Preencha todos os campos")
            
            const canLogin = await validadeLogin(username, password)
            if(canLogin) handleUserData(canLogin)
            else addNotification("danger", "Usuario ou senha inválidos.")

        } catch (error: any) {
            console.error("Erro ao realizar login", error)
            addNotification("danger", error.data ? error.data : "Ocorreu um erro inesperado ao realizar login.")
        } finally {
            setIsFetchingLogin(false)
        }
    }

    async function handleRegister(e: FormEvent<HTMLFormElement>) {
        e.preventDefault();
        setIsFetchingRegister(true)
        try {
            if(!username || !password || !repassword) return addNotification("danger", "Preencha todos os campos")
            if((password !== repassword)) return addNotification("warning", "As senhas nao coincidem")
            
            await registerUser(username, password)
            addNotification("sucess", "Registro realizado com sucesso")

            const canLogin = await validadeLogin(username, password)
            if(canLogin) handleUserData(canLogin)
            else addNotification("danger", "Ocorreu um erro inesperado ao realizar login, tente novamente")
            
        } catch (error: any) {
            console.error("Erro ao realizar registro", error)
            addNotification("danger", error.data ? error.data : "Ocorreu um erro inesperado ao realizar registro.")
        } finally {
            setIsFetchingRegister(false)
        }
    }

    function handleForgetPassword() {
        addNotification("warning", "Problema é seu, burro!")
    }

    return (
        <>
            {isFetchingLogin && <Loading isTrue={isFetchingLogin || isFetchingRegister} blurMode />}
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