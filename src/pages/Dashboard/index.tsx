import { Button, DashboardTable, Select } from "@components";
import { useState } from "react";
import { FaCalendarCheck } from "react-icons/fa";
import { FiPlusCircle } from "react-icons/fi";

export function Dashboard(){
    const [monthSelected, setMonthSelected] = useState<{label: string, value: string | number} | null>(null)

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
    return (
        <main>
            <div className="flex justify-between w-full py-8 h-max">
                <Select 
                    label="Selecione um mês" 
                    options={months} value={monthSelected} 
                    setValue={setMonthSelected} 
                    icon={<FaCalendarCheck stroke="white" />}
                /> 
                <Button 
                    handleButton={() => console.log("add categoria")} 
                    value="Adicionar Categoria"
                    className="px-4 my-0 w-max"
                    icon={<FiPlusCircle className="text-[24px]" stroke="#00FF00
                    " />}
                />
            </div>
            <DashboardTable />
        </main>
    )
}