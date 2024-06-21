import { Button, DashboardTable, Select, ModalCategoria } from "@components";
import { CategoriaProps, ContentTableProps, GenericProps } from "@typings";
import { Icons, months } from "@utils";
import { useState } from "react";
import { useOutletContext } from "react-router-dom";

export function Dashboard(){
    const [monthSelected, setMonthSelected] = useState<GenericProps | null>(null)
    const [modalCategoria, setModalCategoria] = useState<boolean>(false);
    const [tempCategorias, setTempCategorias] = useState<CategoriaProps[] | null>(null);
    const [content, ] = useState<ContentTableProps[] | null>(null)

    const {addNotification} = useOutletContext<{addNotification: (type: string, message: string) => void}>()

    function handleSaveCategorias(){
        
        setModalCategoria(false)
        addNotification("sucess", "Categorias atualizas com sucesso.")
        console.log('categorias', tempCategorias)
    }

    function handleSaveCampo(value: ContentTableProps){
        console.log(value)
    }
    
    return (
        <main>
            <div className="flex justify-between w-full py-8 h-max">
                <div className="w-56">
                    <Select 
                        label="Selecione um mês" 
                        options={months} 
                        value={monthSelected} 
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
                content={content?.filter((value) => value.type == "gastos") || []} 
                handleSaveCampo={handleSaveCampo}
            />

            {/* DASHBOARD/TABLE DE GANHOS */}
            <DashboardTable 
                type="ganhos" 
                content={content?.filter((value) => value.type == "ganhos") || []}
                handleSaveCampo={handleSaveCampo}
            />

            {/* MODAL PARA ADICIONAR CATEGORIA */}
            {modalCategoria && 
            <ModalCategoria 
                setModalCategoria={setModalCategoria}
                categorias={tempCategorias} 
                setCategorias={setTempCategorias} 
                saveCategorias={handleSaveCategorias}
            />}
        </main>
    )
}