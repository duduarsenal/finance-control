import { getCampos, getCategorias, saveCampos, saveCategorias } from '@api';
import { Button, DashboardTable, ModalCategoria, Select } from "@components";
import { CamposProps, CategoriaProps, GenericProps } from "@typings";
import { Icons, months } from "@utils";
import { useEffect, useState } from "react";
import { useOutletContext } from "react-router-dom";

export function Dashboard(){
    const [monthSelected, setMonthSelected] = useState<GenericProps | null>(null)
    const [modalCategoria, setModalCategoria] = useState<boolean>(false)

    const [categorias, setCategorias] = useState<CategoriaProps[]>([])
    const [campos, setCampos] = useState<CamposProps[]>([])

    const {addNotification, setIsPageHeader, setIsLoading} = useOutletContext<{addNotification: (type: string, message: string) => void, setIsPageHeader: (value: string | null) => void, setIsLoading: (value: boolean) => void}>()

    async function saveCategoria(values: CategoriaProps[]){
        
        // SALVE LISTA DE CATEGORIAS NO LOCALSTORAGE
        await saveCategorias(values)
        // SALVA NOVA LISTA DE CATEGORIAS NO STATE
        setCategorias(await getCategorias())

        setModalCategoria(false)
        addNotification("sucess", "Categorias atualizas com sucesso.")
    }

    async function saveCampo(value: CamposProps){

        // SALVA LISTA DE CAMPOS NO LOCALSTORAGE
        await saveCampos([...await getCampos(), value])
        // SALVA NOVA LISTA DE CAMPOS NO STATE
        setCampos(await getCampos())

        addNotification("sucess", `${value.type === "gastos" ? "Gasto" : "Ganho"} adicionado com sucesso.`)
    }

    async function handleStates(){
        setCategorias(await getCategorias())
        setCampos(await getCampos())

        setIsLoading(false)
    }

    // Busca os dados no LOCALSTORAGE AO CARREGAR A PAGE
    useEffect(() => {
        handleStates()
        setIsPageHeader(window.location.pathname)
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])
    
    return (
        <main className='px-2 overflow-y-hidden h-max'>
            <div className="flex justify-between w-full py-8 h-max">
                <div className="w-56">
                    <Select 
                        optionDefault="Selecione um mês" 
                        options={months} 
                        value={monthSelected as CategoriaProps} 
                        setValue={setMonthSelected} 
                        icon={<Icons.FaCalendarCheck className="text-brand-white" />}
                        transparent={false}
                    /> 
                </div>
                <Button 
                    handleButton={() => setModalCategoria(true)} 
                    value="Adicionar Categoria"
                    className="px-4 my-0 w-max"
                    icon={<Icons.FiPlusCircle className="text-[24px] text-brand-green" />}
                />
            </div>

            {/* DASHBOARD/TABLE DE GASTOS */}
            <DashboardTable 
                type="gastos" 
                campos={campos?.filter((campo) => campo.type === "gastos") || []} 
                saveCampo={saveCampo}
                categorias={categorias}
            />

            {/* DASHBOARD/TABLE DE GANHOS */}
            <DashboardTable 
                type="ganhos" 
                campos={campos?.filter((campo) => campo.type === "ganhos") || []}
                saveCampo={saveCampo}
                categorias={categorias}
            />

            {/* MODAL PARA ADICIONAR CATEGORIA */}
            {modalCategoria && 
            <ModalCategoria 
                setModalCategoria={setModalCategoria}
                categorias={categorias || []} 
                saveCategorias={saveCategoria}
            />}
        </main>
    )
}