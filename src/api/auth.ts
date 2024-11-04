/* eslint-disable @typescript-eslint/no-explicit-any */
import { UserProps } from "@typings"
import { encode } from "js-base64"

async function validadeLogin(user: string, password: string): Promise<boolean | UserProps>{
    const users = localStorage.getItem("usuarios")
    if(!users) return false

    const userLogin = JSON.parse(users).find((u: any) => u.usuario === user)
    if(!userLogin) return false

    if(encode(password) === userLogin.password){
        return userLogin
    }
    
    return false
}

async function registerUser(user: string, password: string): Promise<boolean>{
    const users = localStorage.getItem("usuarios");
    if(users) {
        if(JSON.parse(users).some((u: any) => u.usuario === user)) return false

        localStorage.setItem("usuarios", JSON.stringify([...(JSON.parse(users)), { usuario: user, password: encode(password) }]))
    } else {
        localStorage.setItem("usuarios", JSON.stringify([{ usuario: user, password: encode(password) }]))
    }
    
    return true
}

async function logout(): Promise<void>{
    localStorage.removeItem("user")
    localStorage.removeItem("token")
}

export { validadeLogin, logout, registerUser }