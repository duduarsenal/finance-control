import { Button, DashboardTable, Select } from "@components";
import { CategoriaProps, GenericProps, NotifyProps } from "@typings";
import { useState } from "react";
import { FaCalendarCheck } from "react-icons/fa";
import { FiPlusCircle } from "react-icons/fi";
import { useOutletContext } from "react-router-dom";
import ModalCategoria from "src/components/ModalCategoria";

export function Dashboard(){
    const [monthSelected, setMonthSelected] = useState<GenericProps | null>(null)
    const [modalCategoria, setModalCategoria] = useState<boolean>(false);
    const [tempCategorias, setTempCategorias] = useState<CategoriaProps[] | null>(null);

    const months = [
        {label: "Janeiro", value: "jan"},
        {label: "Fevereiro", value: "fev"},
        {label: "Março", value: "mar"},
        {label: "Abril", value: "abr"},
        {label: "Maio", value: "mai"},
        {label: "Junho", value: "jun"},
        {label: "Julho", value: "jul"},
        {label: "Agosto", value: "ago"},
        {label: "Setembro", value: "set"},
        {label: "Outubro", value: "out"},
        {label: "Novembro", value: "nov"},
        {label: "Dezembro", value: "dez"}
    ]

    const content = [
        {
            data: '16/05/2024',
            descricao: 'Lorem lorem lorem lorem lorem lorem',
            categoria: 'Comida',
            parcelas: 5,
            valor: 20000
        },
        {
            data: '16/05/2024',
            descricao: 'Lorem lorem lorem lorem lorem lorem',
            categoria: 'Comida',
            parcelas: 5,
            valor: 20000
        },
        {
            data: '16/05/2024',
            descricao: 'Lorem lorem lorem lorem lorem lorem',
            categoria: 'Comida',
            parcelas: 5,
            valor: 20000
        },
        {
            data: '16/05/2024',
            descricao: 'Lorem lorem lorem lorem lorem lorem',
            categoria: 'Comida',
            parcelas: 5,
            valor: 20000
        },
        {
            data: '16/05/2024',
            descricao: 'Lorem lorem lorem lorem lorem lorem',
            categoria: 'Comida',
            parcelas: 5,
            valor: 20000
        },
        {
            data: '16/05/2024',
            descricao: 'Lorem lorem lorem lorem lorem lorem',
            categoria: 'Comida',
            parcelas: 5,
            valor: 20000
        },
        {
            data: '16/05/2024',
            descricao: 'Lorem lorem lorem lorem lorem lorem',
            categoria: 'Comida',
            parcelas: 5,
            valor: 20000
        },
        {
            data: '16/05/2024',
            descricao: 'Lorem lorem lorem lorem lorem lorem',
            categoria: 'Comida',
            parcelas: 5,
            valor: 20000
        },
        {
            data: '16/05/2024',
            descricao: 'Lorem lorem lorem lorem lorem lorem',
            categoria: 'Comida',
            parcelas: 5,
            valor: 20000
        },
        {
            data: '16/05/2024',
            descricao: 'Lorem lorem lorem lorem lorem lorem',
            categoria: 'Comida',
            parcelas: 5,
            valor: 20000
        },
        {
            data: '16/05/2024',
            descricao: 'Lorem lorem lorem lorem lorem lorem',
            categoria: 'Comida',
            parcelas: 5,
            valor: 20000
        }
    ]

    
    const {setOpenNotify, setNotify} = useOutletContext<{ setOpenNotify: (b: boolean) => void, setNotify: (values: NotifyProps) => void }>()

    function handleSaveCategorias(){
        
        setModalCategoria(false)
        setOpenNotify(true)
        setNotify({
                type: 'sucess', 
                message: "Categorias atualizas com sucesso."
        })
        
        console.log('categorias', tempCategorias)
    }
    
    return (
        <main>
            <div className="flex justify-between w-full py-8 h-max">
                <div className="w-56">
                    <Select 
                        label="Selecione um mês" 
                        options={months} value={monthSelected} 
                        setValue={setMonthSelected} 
                        icon={<FaCalendarCheck className="text-brand-white" />}
                        transparent={false}
                    /> 
                </div>
                <Button 
                    handleButton={() => setModalCategoria(true)} 
                    value="Adicionar Categoria"
                    className="px-4 my-0 w-max"
                    icon={<FiPlusCircle className="text-[24px] text-brand-green" />}
                />
            </div>

            {/* DASHBOARD/TABLE DE GASTOS */}
            <DashboardTable type="gastos" content={content} />

            {/* DASHBOARD/TABLE DE GANHOS */}
            <DashboardTable type="ganhos" content={content.slice(1, 5)} />

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