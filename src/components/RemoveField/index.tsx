import { Button, Checkbox } from '@components'
import { RemoveFieldProps } from "@typings";
import { currencyFormatPT } from "@utils";
import { useState } from "react";

export function RemoveField({ field, actionCancel, actionDelete }: RemoveFieldProps){
    const [ordenarParcelas, setOrdenarParcelas] = useState<boolean>(false);
    const labelCampo = field?.categoria?.label?.slice(0, 10) + " - " + field?.descricao?.slice(0, 15);
    
    return (
        <div className="fixed top-0 left-0 w-screen h-screen bg-[#11111190] flex items-center justify-center z-[999]">
            <div className="bg-brand-background px-1 w-[410px] h-[185px] rounded-lg outline outline-solid outline-[1px] outline-brand-border py-2 flex flex-col items-center justify-center gap-5">
                <div className='flex flex-col items-center justify-center w-full gap-2'>
                    <p className='w-full text-center'>
                        Deseja realmente excluir o campo 
                            <br /><span className='font-bold'> {labelCampo} </span><br />
                        no valor total de {currencyFormatPT(field?.valor?.parcela)}?
                    </p>
                    {(field?.parcelas.total > 1 || true) && 
                        <div title="Reordenar os meses das parcelas, iniciando pela mais recente/atual">
                            <Checkbox
                                check={ordenarParcelas}
                                setCheck={() => setOrdenarParcelas(!ordenarParcelas)}
                                label="Reordenar Parcelas"
                                className='scale-[0.95]'
                            />
                        </div>
                    }
                </div>
                <div className="flex items-center justify-around w-full">
                    <Button 
                        value="Cancelar"
                        handleButton={actionCancel} 
                        className="my-0 bg-brand-background w-[125px] px-2 rounded-sm py-1 text-[18px] outline outline-[1px] outline-brand-border hover:scale-[1.03] transition-all"
                    />
                    <Button 
                        value="Excluir"
                        handleButton={() => {
                            actionDelete(field, ordenarParcelas ? 2 : 1)
                            actionCancel();
                        }} 
                        className="my-0 bg-brand-text hover:bg-brand-text w-[125px] py-1 rounded-sm text-[18px] text-brand-background hover:scale-[1.03] transition-all"
                    />
                </div>
            </div>
        </div>
    )
}