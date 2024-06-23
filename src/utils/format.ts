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
        // Adiciona +3 horas por conta do fuso horario UTC+3 (Brasil/São Paulo)
        const tempData = (new Date(new Date(data).setHours(new Date(data).getHours() + 3))).toLocaleDateString("pt-BR", { day: "2-digit", month: "long", year: "numeric" })

        let formatedData = tempData.split(" ")
        formatedData[2] = (tempData.split(" ")[2].slice(0, 1).toUpperCase() + tempData.split(" ")[2].slice(1,))

        // Retorna a data formatada: '23 de Junho de 2024'
        return formatedData.join(" ")
    }

    return "-"
}