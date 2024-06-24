import { Button, Input, Select } from "@components";
import { CategoriaProps, GenericProps, ModalCategoriaProps } from "@typings";
import { cn, Icons, cores, emojis } from "@utils";
import { useState } from "react";
import { useOutletContext } from "react-router-dom";

export function ModalCategoria({ setModalCategoria, categorias, saveCategorias }: ModalCategoriaProps) {

    const [categoria, setCategoria] = useState<string>("")
    const [emoji, setEmoji] = useState<GenericProps | null>(null)
    const [cor, setCor] = useState<GenericProps | null>(null)

    const [tempCategorias, setTempCategorias] = useState<CategoriaProps[]>(categorias)

    const {addNotification} = useOutletContext<{addNotification: (type: string, message: string) => void}>()

    function handleAddCategoria() {

        if (!categoria || !cor || !emoji) return

        const canAdd = categorias?.filter((c) => c.value === categoria.toLocaleLowerCase())
        if (canAdd?.length){
            return addNotification("warning", "Categoria já existente")
        }

        const newCateg = { 
            label: categoria, 
            value: categoria.toLowerCase(), 
            cor: cor, 
            emoji: emoji 
        }
        // SALVA A CATEGORIA TEMPORARIAMENTE
        setTempCategorias((prev) => [...prev, newCateg])

        // RESET FIELDS
        setCategoria("")
        setCor(null)
        setEmoji(null)
    }

    function handleRemoveCategoria(delCategoria: string) {
        const newList = tempCategorias?.filter((categoria) => categoria.value != delCategoria) || []
        setTempCategorias(newList)
    }

    function handleSaveCategorias(){
        saveCategorias(tempCategorias)
    }

    return (
        <div className="fixed top-0 left-0 bg-[#00000080] w-screen h-screen z-[20] flex items-center justify-center">
            <div className="w-[550px] min-h-[400px] flex flex-col items-center justify-center gap-6 bg-brand-black p-6 mr">
                <div className="grid w-full grid-cols-7 grid-rows-2 gap-2">
                    <div className="col-span-5">
                        <Input
                            placeholder="Nome da categoria"
                            setState={setCategoria}
                            value={categoria}
                            className="transition-all bg-brand-white-gray placeholder:text-brand-black focus:placeholder:text-brand-gray"
                        />
                    </div>
                    <div className="w-full col-span-2">
                        <Select
                            options={emojis}
                            transparent={false}
                            className="min-w-max"
                            optionDefault="Emoji"
                            value={emoji as CategoriaProps}
                            setValue={setEmoji}
                        />
                    </div>
                    <div className="col-span-4">
                        <Select
                            options={cores}
                            transparent={false}
                            className="min-w-max"
                            optionDefault="Selecine uma Cor"
                            value={cor as CategoriaProps}
                            setValue={setCor}
                            colors={true}
                        />
                    </div>
                    <div className="col-span-3">
                        <Button
                            handleButton={handleAddCategoria}
                            className={cn("w-full my-0 bg-brand-black", { "cursor-not-allowed hover:bg-brand-black select-none": !categoria || !cor || !emoji })}
                            value="Adicionar"
                            icon={<Icons.FiPlusCircle className="text-[24px] text-brand-green" />}
                        />
                    </div>
                </div>
                <div className="w-full h-[300px] overflow-y-auto bg-brand-black rounded-sm  outline outline-2 outline-brand-gray">
                    {tempCategorias?.map((categoria, index) => (
                        <div key={index} className={cn("flex justify-between px-4 py-1 text-[18px] items-center border-b-2 border-b-brand-gray text-brand-black font-medium", {"border-b-0": categorias[index + 1] === (null || undefined)})}>
                            <p className={`bg-colors-${categoria.cor?.value} px-2 rounded-sm flex items-center gap-2`}>
                                <span>{categoria?.emoji?.label}</span>
                                {categoria.label}
                            </p>
                            <Icons.IoClose
                                onClick={() => handleRemoveCategoria(categoria.value)}
                                className={cn("h-full w-6 text-[20px] cursor-pointer hover:scale-[1.1] z-[4] text-brand-red", 
                                { "-mr-[12px]": categorias?.length && categorias.length > 8 })}
                            />
                        </div>
                    ))}
                </div>
                <div className="grid w-full grid-cols-2 gap-4">
                    <div className="col-span-1">
                        <Button
                            handleButton={() => setModalCategoria(false)}
                            value="Cancelar"
                            className="w-full my-0 font-semibold bg-brand-red text-[18px] text-brand-black outline-0 hover:bg-brand-red hover:scale-[1.04]"
                        />
                    </div>
                    <div className="col-span-1">
                        <Button
                            handleButton={handleSaveCategorias}
                            value="Salvar"
                            className="w-full my-0 font-semibold bg-brand-green text-[18px] text-brand-black outline-0 hover:bg-brand-green hover:scale-[1.04]"
                        />
                    </div>
                </div>
            </div>
        </div>
    )
}