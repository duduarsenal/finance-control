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