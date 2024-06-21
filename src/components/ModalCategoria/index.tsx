import { GenericProps, ModalCategoriaProps, NotifyDataProps } from "@typings";
import { Button, Input, Select } from "@components";
import { useState } from "react";
import { FiPlusCircle } from "react-icons/fi";
import { IoClose } from "react-icons/io5";
import { cn } from "src/utils/cn";
import { useOutletContext } from "react-router-dom";

export default function ModalCategoria({ setModalCategoria, categorias, setCategorias, saveCategorias }: ModalCategoriaProps) {

    const [tempCategoria, setTempCategoria] = useState<string>("")
    const [emoji, setEmoji] = useState<GenericProps | null>(null)
    const emojis = [
        { label: "🥪", value: "lanche" },
        { label: "🎮", value: "videogame" },
        { label: "🎯", value: "entretenimento" },
        { label: "💳", value: "cartao" },
        { label: "💻", value: "computador" },
        { label: "🧁", value: "doces" },
        { label: "🌎", value: "globo" },
        { label: "🍎", value: "maca"},
        { label: "⚽", value: "bola"},
        { label: "⚽", value: "bola"},
        { label: "⚽", value: "bola"},
        { label: "⚽", value: "bola"},
        { label: "⚽", value: "bola"},
        { label: "⚽", value: "bola"},
        { label: "⚽", value: "bola"},
        { label: "⚽", value: "bola"},
        { label: "⚽", value: "bola"},
        { label: "⚽", value: "bola"},
    ]

    const [cor, setCor] = useState<GenericProps | null>(null)
    const cores = [
        { label: "Vermelho", value: "red" },
        { label: "Amarelo", value: "yellow" },
        { label: "Verde", value: "green" },
        { label: "Azul", value: "blue" },
        { label: "Roxo", value: "purple" },
        { label: "Rosa", value: "pink" },
        { label: "Branco", value: "white" },
        { label: "Ciano", value: "ciano" },
        
    ]

    function handleAddCategoria() {

        if (!tempCategoria || !cor || !emoji) return;

        const canAdd = categorias?.filter((c) => c.value === tempCategoria.toLocaleLowerCase())
        if (canAdd?.length) return console.log("repetido")

        const newCateg = { label: tempCategoria, value: tempCategoria.toLowerCase(), cor: cor, emoji: emoji }
        const newList = categorias?.length ? [...categorias, newCateg] : [newCateg]


        setCategorias(newList)
        // console.log(newList)
        setTempCategoria("")
        setCor(null)
        setEmoji(null)
    }

    function handleRemoveCategoria(delCateg: string) {
        const newList = categorias?.filter((categ) => categ.value != delCateg) || []
        setCategorias(newList)
    }

    const {setOpenNotify, setNotify} = useOutletContext<{ setOpenNotify: (b: boolean) => void, setNotify: (values: NotifyDataProps) => void }>()

    function cancelCategorias(){
        setOpenNotify(true)
        setNotify({
                type: 'danger', 
                message: "Categoria removida com sucesso."
        })
    }

    return (
        <div className="fixed top-0 left-0 bg-[#00000080] w-screen h-screen z-[20] flex items-center justify-center">
            <div className="w-[550px] min-h-[400px] flex flex-col items-center justify-center gap-6 bg-brand-black p-6 mr">
                <div className="grid w-full grid-cols-7 grid-rows-2 gap-2">
                    <div className="col-span-5">
                        <Input
                            placeholder="Nome da categoria"
                            setState={setTempCategoria}
                            value={tempCategoria}
                            className="transition-all bg-brand-white-gray placeholder:text-brand-black focus:placeholder:text-brand-gray"
                        />
                    </div>
                    <div className="w-full col-span-2">
                        <Select
                            options={emojis}
                            transparent={false}
                            className="min-w-max"
                            label="Emoji"
                            value={emoji}
                            setValue={setEmoji}
                        />
                    </div>
                    <div className="col-span-4">
                        <Select
                            options={cores}
                            transparent={false}
                            className="min-w-max"
                            label="Selecine uma Cor"
                            value={cor}
                            setValue={setCor}
                            colors={true}
                        />
                    </div>
                    <div className="col-span-3">
                        <Button
                            handleButton={handleAddCategoria}
                            className={cn("w-full my-0 bg-brand-black", { "cursor-not-allowed hover:bg-brand-black select-none": !tempCategoria || !cor || !emoji })}
                            value="Adicionar"
                            icon={<FiPlusCircle className="text-[24px] text-brand-green" />}
                        />
                    </div>
                </div>
                <div className="w-full h-[300px] overflow-y-auto bg-brand-black rounded-sm  outline outline-2 outline-brand-gray">
                    {categorias?.map((categoria, index) => (
                        <div key={index} className={cn("flex justify-between px-4 py-1 text-[18px] items-center border-b-2 border-b-brand-gray text-brand-black font-medium", {"border-b-0": categorias[index + 1] === (null || undefined)})}>
                            <p className={`bg-colors-${categoria.cor?.value} px-2 rounded-sm flex items-center gap-2`}>
                                <span>{categoria?.emoji?.label}</span>
                                {categoria.label}
                            </p>
                            <IoClose
                                onClick={() => handleRemoveCategoria(categoria.value)}
                                className={cn("h-full w-6 text-[20px] cursor-pointer hover:scale-[1.1] z-20 text-brand-red", 
                                { "-mr-[12px]": categorias?.length && categorias.length > 8 })}
                            />
                        </div>
                    ))}
                </div>
                <div className="grid w-full grid-cols-2 gap-4">
                    <div className="col-span-1">
                        <Button
                            handleButton={() => {setModalCategoria(false); cancelCategorias()}}
                            value="Cancelar"
                            className="w-full my-0 font-semibold bg-brand-red text-[18px] text-brand-black outline-0 hover:bg-brand-red hover:scale-[1.04]"
                        />
                    </div>
                    <div className="col-span-1">
                        <Button
                            handleButton={saveCategorias}
                            value="Salvar"
                            className="w-full my-0 font-semibold bg-brand-green text-[18px] text-brand-black outline-0 hover:bg-brand-green hover:scale-[1.04]"
                        />
                    </div>
                </div>
            </div>
        </div>
    )
}