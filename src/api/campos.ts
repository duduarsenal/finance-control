import { CamposProps } from "@typings";

async function saveCampos(campos: CamposProps[]){
    localStorage.setItem("campos", JSON.stringify(campos))
}

async function getCampos(): Promise<CamposProps[]>{

    const campos = localStorage.getItem("campos")

    if(campos){
        return JSON.parse(campos) 
    }
    
    return []
}

export { saveCampos, getCampos }