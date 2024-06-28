import { getCampos, getCategorias, saveCampos, saveCategorias } from '@api';
import { Button, DashboardTable, ModalCategoria, Select } from "@components";
import { CamposProps, CategoriaProps, GenericProps, OutletContextProps } from "@typings";
import { Icons, cn, currencyFormatPT, months } from "@utils";
import { useEffect, useState } from "react";
import { useOutletContext } from "react-router-dom";

export function Dashboard(){
    const [monthSelected, setMonthSelected] = useState<GenericProps | null>(null)
    const [modalCategoria, setModalCategoria] = useState<boolean>(false)

    const [categorias, setCategorias] = useState<CategoriaProps[]>([])
    const [campos, setCampos] = useState<CamposProps[]>([])

    const [totalGastos, setTotalGastos] = useState<number>(0)
    const [totalGanhos, setTotalGanhos] = useState<number>(0)

    const [saldoTotal, setSaldoTotal] = useState<number>(0)

    const {addNotification, setIsPageHeader, setIsLoading} = useOutletContext<OutletContextProps>()

    async function saveCategoria(values: CategoriaProps[]){
        
        // SALVE LISTA DE CATEGORIAS NO LOCALSTORAGE
        await saveCategorias(values)
        // SALVA NOVA LISTA DE CATEGORIAS NO STATE
        setCategorias(await getCategorias())

        setModalCategoria(false)
        addNotification("sucess", "Categorias atualizas com sucesso.")
    }

    async function saveCampo(campo: CamposProps){

        // SALVA LISTA DE CAMPOS NO LOCALSTORAGE
        await saveCampos([...await getCampos(), campo])
        // SALVA NOVA LISTA DE CAMPOS NO STATE
        setCampos(await getCampos())

        addNotification("sucess", `${campo.type === "gastos" ? "Gasto" : "Ganho"} adicionado com sucesso.`)
    }

    async function editCampo(campo: CamposProps){

        const newFields = (await getCampos()).map((c) => {
            if(c.id === campo.id) c = {...campo}
            return c
        })
        
        await saveCampos(newFields)

        setCampos(await getCampos())

        addNotification("sucess", `${campo.type === "gastos" ? "Gasto" : "Ganho"} editado com sucesso.`)
    }

    async function removeCampo(campo: CamposProps) {
        await saveCampos([...(await getCampos()).filter((c) => c.id !== campo.id)])

        setCampos(await getCampos())

        addNotification("sucess", `${campo.type === "gastos" ? "Gasto" : "Ganho"} removido com sucesso.`)
    }

    async function handleStates(){
        setCategorias(await getCategorias())
        setCampos(
            (monthSelected 
            ? (await getCampos()).filter((campo) => campo.month == monthSelected?.value) 
            : await getCampos())
            .sort((a, b) => new Date(a.dtadd).getTime() - new Date(b.dtadd).getTime())
        )

        setIsLoading(false)
    }

    // Busca os dados no LOCALSTORAGE AO CARREGAR A PAGE
    useEffect(() => {
        handleStates()
        setIsPageHeader(window.location.pathname)
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    useEffect(() => {
        handleStates()
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [monthSelected])

    useEffect(() => {
        setSaldoTotal(totalGanhos - totalGastos)
    }, [totalGanhos, totalGastos]) 
    
    return (
        <main className='px-2 overflow-y-hidden h-max'>
            <div className="flex justify-between w-full py-8 h-max">
                <div className='flex items-center gap-6'>
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
                    <h4 className="text-brand-white-gray text-[18px]">
                        Saldo: {" "}
                        <span className={cn("text-brand-white-gray", 
                            { 
                                "text-brand-red": saldoTotal < 0,
                                "text-brand-green": saldoTotal > 0
                            }
                            )}
                        >
                            {currencyFormatPT(saldoTotal.toString()) || " R$ 0,00"}
                        </span>
                    </h4>
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
                handleEditCampo={editCampo}
                removeCampo={removeCampo}
                categorias={categorias}
                setTotal={setTotalGastos}
            />

            {/* DASHBOARD/TABLE DE GANHOS */}
            <DashboardTable 
                type="ganhos" 
                campos={campos?.filter((campo) => campo.type === "ganhos") || []}
                saveCampo={saveCampo}
                handleEditCampo={editCampo}
                removeCampo={removeCampo}
                categorias={categorias}
                setTotal={setTotalGanhos}
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