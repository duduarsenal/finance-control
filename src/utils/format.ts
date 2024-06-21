export function currencyFormatPT(value?: string | number, maxDigits: number = 2){
    if(value){
        return Number(value).toLocaleString("pt-br", {
            style: "currency",
            currency: "BRL",
            maximumFractionDigits: maxDigits
        })
    }

    return ""
}

export function dateFormatPT(data?: string){
    if(data){
        return new Date(data).toLocaleDateString("pt-BR", { day: "2-digit", month: "long", year: "numeric" })
    }

    return "-"
}