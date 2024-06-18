import { ModalAddCampoProps, NotifyProps } from "@typings";
import { Button, DateField, Input, Select, TextArea } from "@components";
import { useState } from "react";
import { useOutletContext } from "react-router-dom";

export function ModalAddCampo({ type, setModalAddCampo }: ModalAddCampoProps) {

    const [data, setData] = useState<string>("")
    const [categoria, setCategoria] = useState<{label: string, value: string | number} | null>(null)
    const [parcelas, setParcelas] = useState<string>("")
    const [descricao, setDescricao] = useState<string>("")

    const {setOpenNotify, setNotify} = useOutletContext<{ setOpenNotify: (b: boolean) => void, setNotify: (values: NotifyProps) => void }>()

    function handleSaveCampo() {
        const obj = {
            type,
            data,
            categoria,
            parcelas,
            descricao
        }
        
        setModalAddCampo(false)

        setOpenNotify(true)
        setNotify({
                type: 'sucess', 
                message: `${type === "gastos" ? "Gasto" : "Ganho"} adicionado com sucesso.`
        })
        
        return console.log(obj)
    }

    return (
        <div className="fixed top-0 left-0 bg-[#00000080] w-screen h-screen z-[20] flex items-center justify-center">
            <div className="w-[550px] min-h-[400px] h-max gap-2 bg-brand-black p-6 flex flex-col items-center justify-evenly">
                <div className="grid w-full grid-cols-6 gap-2 h-max">
                    {/* DATE FIELD */}
                    <div className="col-span-2 pb-6 h-max">
                        <p>Data</p>
                        <DateField
                            date={data}
                            setDate={setData}
                            style={{
                                backgroundColor: "white", 
                                color: "#000000"
                            }}
                        />
                    </div>
    
                    {/* SELECT CATEGORIA */}
                    <div className='col-span-3 pb-6 h-max'>
                        <p>Categoria</p>
                        <Select
                            className='my-0'
                            theme="light"
                            label='Selecione uma categoria'
                            value={categoria}
                            setValue={setCategoria}
                            options={[{ label: "Categoria 1", value: "categ1" }]}
                            transparent={false}
                        />
                    </div>
    
                    {/* PARCELAS */}
                    <div className="col-span-1 pb-6 h-max">
                        <p>Parcelas</p>
                        <Input 
                            setState={setParcelas}
                            value={parcelas}
                            placeholder="0"
                            className="text-[16px]"
                            type="number"
                            maxLength={2}
                        />
                    </div>
                </div>
                
                <div className="w-full h-max">
                    <p>Descrição</p>
                    <TextArea 
                        setValue={setDescricao}
                        value={descricao}
                        placeholder="Escreva uma breve descrição sobre o campo"
                    />
                </div>

                <div className="grid w-full grid-cols-2 gap-4 my-6">
                    <div className="col-span-1">
                        <Button
                            handleButton={() => setModalAddCampo(false)}
                            value="Cancelar"
                            className="w-full my-0 font-semibold bg-brand-red text-[18px] text-brand-black outline-0 hover:bg-brand-red hover:scale-[1.04]"
                        />
                    </div>
                    <div className="col-span-1">
                        <Button
                            handleButton={() => {
                                if(!data || !categoria || !parcelas){
                                    return console.log('preencha todos os campos')
                                }
                                
                                handleSaveCampo()
                            }}
                            value="Salvar"
                            className="w-full my-0 font-semibold bg-brand-green text-[18px] text-brand-black outline-0 hover:bg-brand-green hover:scale-[1.04]"
                        />
                    </div>
                </div>
            </div>
        </div>
    )
}