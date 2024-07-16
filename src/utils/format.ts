import { CamposProps } from "@typings"
import { v4 as uuidv4 } from "uuid";

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

export async function preencherParcelas(campos?: CamposProps[], campo?: CamposProps): Promise<CamposProps[]> {
    if (campos?.length) {
      return campos?.reduce((acc: CamposProps[], campo) => {
        if (campo.parcelas.total > 1) {
          for (let i = 0; i < campo.parcelas.total; i++) {
            const [year, month, day] = campo.data.split("-");
            let newMonth = Number(month) + i;
            let newYear = Number(year);
        
            // Se o mês ultrapassar 12, ajustar o ano e o mês
            if (newMonth > 12) {
                newYear += Math.floor((newMonth - 1) / 12);
                newMonth = ((newMonth - 1) % 12) + 1;
            }
        
            const dataComParcela = `${newYear}-${newMonth.toString().padStart(2, '0')}-${day}`;

            acc.push({
              ...campo,
              data: dataComParcela,
              month: campo.month + i,
              parcelas: {
                total: campo.parcelas.total,
                atual: i + 1
              }
            })
          }
        } else {
          acc.push(campo)
        }

        return acc
      }, [])
    }

    if (campo) {
      const camposComParcela: CamposProps[] = [];
      for (let i = 0; i < campo?.parcelas?.total; i++) {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const [year, _, day] = campo.data.split("-");
        let newMonth = Number(campo.month) + i;
        let newYear = Number(year);
    
        // Se o mês ultrapassar 12, ajustar o ano e o mês
        if (newMonth > 12) {
            newYear += Math.floor((newMonth - 1) / 12);
            newMonth = ((newMonth - 1) % 12) + 1;
        }
    
        const dataComParcela = `${newYear}-${newMonth.toString().padStart(2, '0')}-${day}`;

        camposComParcela.push({
          ...campo,
          id: uuidv4(),
          originalId: campo.originalId,
          data: dataComParcela,
          month: campo.month + i,
          parcelas: {
            total: campo.parcelas.total ?? 1,
            atual: i + 1
          }
        })
      }
      return camposComParcela
    }

    return []
  }

export function arredondar(numero: number, casasDecimais: number) {
  const fator = Math.pow(10, casasDecimais);
  return Math.round(numero * fator) / fator;
}