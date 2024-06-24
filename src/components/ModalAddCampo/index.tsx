import { CategoriaProps, ModalAddCampoProps } from "@typings";
import { Button, DateField, Input, Select, TextArea } from "@components";
import { useState } from "react";
import { useOutletContext } from "react-router-dom";

export function ModalAddCampo({ type, setModalAddCampo, saveCampo, categorias }: ModalAddCampoProps) {

    const [data, setData] = useState<string>("")
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const [categoria, setCategoria] = useState<any>()
    const [parcelas, setParcelas] = useState<string>("")
    const [descricao, setDescricao] = useState<string>("")
    const [valor, setValor] = useState<string>("")

    const {addNotification} = useOutletContext<{addNotification:  (type: string, message: string) => void}>()

    function handleSaveCampo() {
        if(!data || !descricao || !categoria || !valor){
            return addNotification("warning", "Preencha todos os campos")
        }

        const novoCampo = {
            type,
            data,
            descricao,
            categoria: categoria as CategoriaProps,
            parcelas: Number(parcelas) ?? 1,
            valor: Number(valor)
        }
        
        saveCampo(novoCampo)
        
        // RESET FIELDS
        setData("")
        setCategoria(null)
        setParcelas("")
        setDescricao("")
        setValor("")
        setModalAddCampo(false)
    }

    return (
        <div className="fixed top-0 left-0 bg-[#00000080] w-screen h-screen z-[20] flex items-center justify-center">
            <div className="w-[550px] min-h-[400px] h-max gap-2 bg-brand-black p-6 flex flex-col items-center justify-evenly">
                <div className="grid w-full grid-cols-4 gap-2 h-max">
                    {/* DATE FIELD */}
                    <div className="col-span-2 h-max">
                        <DateField
                            date={data}
                            label="Data"
                            setDate={setData}
                            required={true}
                            style={{
                                backgroundColor: "#EFEFEF", 
                                color: "#000000",
                                width: "100%"
                            }}
                        />
                    </div>
    
                    {/* SELECT CATEGORIA */}
                    <div className='col-span-2 h-max'>
                        <Select
                            className="my-0 bg-colors-white"
                            theme="light"
                            optionDefault="Selecione uma categoria"
                            label="Categoria"
                            value={categoria as CategoriaProps}
                            setValue={setCategoria}
                            optionsCategorias={categorias}
                            transparent={false}
                            required={true}
                        />
                    </div>
    
                    {/* PARCELAS */}
                    <div className="col-span-2 pb-6 h-max">
                        <Input 
                            required={false}
                            label="Parcelas"
                            setState={setParcelas}
                            value={parcelas.slice(0, 2)}
                            placeholder="0"
                            className="text-[16px] bg-colors-white"
                            type="number"
                        />
                    </div>
                    <div className="col-span-2 pb-6 h-max">
                        <Input 
                            required={true}
                            label="Valor"
                            setState={setValor}
                            value={valor}
                            placeholder="R$0,00"
                            className="text-[16px] bg-colors-white"
                            type="currency"
                        />
                    </div>
                </div>
                
                <div className="w-full h-max">
                    <TextArea 
                        label="Descrição"
                        setValue={setDescricao}
                        value={descricao}
                        required={true}
                        placeholder="Escreva uma breve descrição sobre o campo"
                        className="bg-colors-white"
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
                            handleButton={handleSaveCampo}
                            value="Salvar"
                            className="w-full my-0 font-semibold bg-brand-green text-[18px] text-brand-black outline-0 hover:bg-brand-green hover:scale-[1.04]"
                        />
                    </div>
                </div>
            </div>
        </div>
    )
}