import { CategoriaProps } from "@typings";

async function saveCategorias(categorias: CategoriaProps[]){
    localStorage.setItem("categorias", JSON.stringify(categorias))
}

async function getCategorias(): Promise<CategoriaProps[]>{

    const categorias = localStorage.getItem("categorias")

    if(categorias){
        return JSON.parse(categorias) 
    }
    
    return []
}

export { saveCategorias, getCategorias }