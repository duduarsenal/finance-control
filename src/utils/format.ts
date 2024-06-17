// eslint-disable-next-line @typescript-eslint/no-unused-vars
export function dateFormatPT(date: string){

}

export function currencyFormatPT(value: string | number){
    const formatedValue = Number(value).toLocaleString("pt-br", {
        style: "currency",
        currency: "BRL",
        maximumFractionDigits: 2
    })

    if(formatedValue) return formatedValue

    return ""
}