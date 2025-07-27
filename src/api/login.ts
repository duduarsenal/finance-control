/* eslint-disable @typescript-eslint/no-explicit-any */

async function validadeLogin(usuario: string, senha: string){
    const baseUrl = `${import.meta.env.VITE_PASSWORD_BASE64}/auth`;
    const data = { usuario, senha }

    const result = await fetch(`${baseUrl}/login`, {
        method: 'POST',
        body: JSON.stringify(data)
    })

    if(result.status != 200) {
        console.error(await result.json())
        return null
    }

    const responseApi = JSON.parse(await result.json())
    
    return responseApi
}

async function refreshToken(token: string) {
    try {
        const baseUrl = `${import.meta.env.VITE_PASSWORD_BASE64}/auth`;
        
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

async function logout(): Promise<void>{
    localStorage.removeItem("user")
    localStorage.removeItem("token")
}

export { refreshToken, validadeLogin, logout }