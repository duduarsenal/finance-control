export function currencyFormatPT(value?: string | number) {
    if(value){
        let sanitizeValue = value.toString().replace(/\D-/g, "")
        
        if(!Number(sanitizeValue)) return ""

        if(sanitizeValue.length === 1) sanitizeValue = "000" + sanitizeValue
        else if(sanitizeValue[0] === '0' && sanitizeValue[1] === '0' && sanitizeValue.length > 3) 
        {
            sanitizeValue = sanitizeValue.slice(1,)
        }
        else if(sanitizeValue.length === 3) sanitizeValue = "0" + sanitizeValue
        else if(sanitizeValue[0] === "0" && sanitizeValue.length > 4) {
            for(let i = 0; i < sanitizeValue.length; i++){
                if(sanitizeValue[0] === "0") sanitizeValue = sanitizeValue.slice(1,)
            }
        }
        
        let integerPart = sanitizeValue.slice(0, -2);
        const decimalPart = sanitizeValue?.slice(-2);

        if (integerPart.length > 3) {
            integerPart = integerPart.replace(/\B(?=(\d{3})+(?!\d))/g, '.');
        }
        
        const formattedValue = `${integerPart},${decimalPart}`;
        return "R$ " + formattedValue;
    }

    return ""
}

export function dateFormatPT(data?: string){
    if(data){
        // Adiciona +3 horas por conta do fuso horario UTC+3 (Brasil/São Paulo)
        const tempData = (new Date(new Date(data).setHours(new Date(data).getHours() + 3))).toLocaleDateString("pt-BR", { day: "2-digit", month: "long", year: "numeric" })

        const formatedData = tempData.split(" ")
        formatedData[2] = (tempData.split(" ")[2].slice(0, 1).toUpperCase() + tempData.split(" ")[2].slice(1,))

        // Retorna a data formatada: '23 de Junho de 2024'
        return formatedData.join(" ")
    }

    return "-"
}