import { encode } from "js-base64"

async function validadeLogin(user: string, password: string){
    const userAdmin = "admin"
    const passwordAdmin = import.meta.env.VITE_PASSWORD_BASE64

    if(user === userAdmin && encode(password) === passwordAdmin){
        return true
    }
    
    return false
}

export { validadeLogin }