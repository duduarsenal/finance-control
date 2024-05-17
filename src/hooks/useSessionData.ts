import { LoginProps, UserProps } from "@typings";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export function useSessionData(){
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const [userData, setUserData] = useState<UserProps>({username: '', usertoken: ''});
        const navigate = useNavigate();

        async function handleSession() {
            const data = await authToken();
    
            if(!data){
                navigate('/login');
                return;
            }
            setUserData({username: '', usertoken: ''})
            return;
        }
    
        useEffect(() => {
            handleSession();
        }, [])
    
        useEffect(() => {
            if(userData?.usertoken){
                localStorage.setItem('token', userData.usertoken)
            }
        }, [userData])

        return { userData, setUserData }
}

export async function verifyLogin({username, password}: LoginProps): Promise<UserProps | null> {

    //Criar requisição para verificar login
    if(username && password){
        return {username: "dudu", usertoken: "tokenzinhogrande"};
    }
    return null
}

export async function authToken(): Promise<null>{
    return null;
}