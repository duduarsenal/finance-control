/* eslint-disable @typescript-eslint/no-explicit-any */

async function validadeLogin(usuario: string, senha: string){
    const baseUrl = `${import.meta.env.VITE_API_URL}/auth`;
    const data = { usuario, senha: btoa(String.fromCharCode(...new TextEncoder().encode(senha))) }

    const result = await fetch(`${baseUrl}/login`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    })

    if(result.status != 200) {
        console.error(await result.json())
        return null
    }

    const responseApi = await result.json()
    
    return responseApi
}

async function refreshToken(token: string) {
    try {
        const baseUrl = `${import.meta.env.VITE_API_URL}/auth`;
        
        const result = await fetch(`${baseUrl}/refresh`, {
            method: 'POST',
            headers: {
                'Authorization': token
            }
        })
        
        if(result.status != 200) throw new Error(await result.json())

        const responseApi = JSON.parse(await result.json())
        return responseApi
        
    } catch (error: any) {
        console.error("Erro ao atualizar token", error)
        throw new Error(error)
    }

}

async function registerUser(usuario: string, senha: string): Promise<boolean>{
    const baseUrl = `${import.meta.env.VITE_API_URL}/user`
    const data = { usuario, senha: btoa(String.fromCharCode(...new TextEncoder().encode(senha))) }

    const result = await fetch(`${baseUrl}/register`, {
        method: 'POST',
        headers: {
            'content-type': 'application/json'
        },
        body: JSON.stringify(data)
    })

    if(result.status != 200) {
        console.error(await result.json())
        throw new Error(await result.json());
        
    }

    return true
}

async function logout(): Promise<void>{
    localStorage.removeItem("user")
    localStorage.removeItem("token")
}

export { 
    refreshToken, 
    validadeLogin, 
    logout, 
    registerUser 
}