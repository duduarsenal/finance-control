function getToken(): string | null{
    return localStorage.getItem('token')
}

function getItem(key: string): string | null{
    return localStorage.getItem(key)
}

function setItem(key: string, valor: string): void{
    localStorage.setItem(key, valor)
    
    return
}

export { getToken, getItem, setItem }