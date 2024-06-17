import { ModalAddCampoProps } from "@typings";
import { Button, DateField, Input, Select, TextArea } from "@components";
import { useState } from "react";

export function ModalAddCampo({ type, setModalAddCampo }: ModalAddCampoProps) {

    const [dtCampo, setDtCampo] = useState<string>("")
    const [categoriaSelected, setCategoriaSelected] = useState<{label: string, value: string | number} | null>(null)
    const [parcelas, setParcelas] = useState<string>("")
    const [descricao, setDescricao] = useState<string>("")

    function handleSaveCampo() {
        return console.log('salvar campo de ' + type)
    }

    return (
        <div className="fixed top-0 left-0 bg-[#00000080] w-screen h-screen z-[20] flex items-center justify-center">
            <div className="w-[550px] min-h-[400px] h-max gap-2 bg-brand-black p-6 flex flex-col items-center justify-evenly">
                <div className="grid w-full grid-cols-6 gap-2 h-max">
                    {/* DATE FIELD */}
                    <div className="col-span-2 pb-6 h-max">
                        <p>Data</p>
                        <DateField
                            date={dtCampo}
                            setDate={setDtCampo}
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
                            value={categoriaSelected}
                            setValue={setCategoriaSelected}
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
                            className="w-full my-0 font-medium bg-brand-red text-[18px] text-brand-black outline-0 hover:bg-brand-red hover:scale-[1.04]"
                        />
                    </div>
                    <div className="col-span-1">
                        <Button
                            handleButton={handleSaveCampo}
                            value="Salvar"
                            className="w-full my-0 font-medium bg-brand-green text-[18px] text-brand-black outline-0 hover:bg-brand-green hover:scale-[1.04]"
                        />
                    </div>
                </div>
            </div>
        </div>
    )
}