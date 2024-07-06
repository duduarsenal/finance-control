import { Button, ConfirmAction, Input, Select } from "@components";
import { CategoriaProps, GenericProps, ModalCategoriaProps } from "@typings";
import { cn, Icons, cores, emojis } from "@utils";
import { useEffect, useRef, useState } from "react";
import { useOutletContext } from "react-router-dom";

export function ModalCategoria({ setModalCategoria, categorias, saveCategorias }: ModalCategoriaProps) {

    const [categoria, setCategoria] = useState<string>("")

    const [emoji, setEmoji] = useState<GenericProps | null>(null)
    const [cor, setCor] = useState<GenericProps | null>(null)

    const [tempCategorias, setTempCategorias] = useState<CategoriaProps[]>(categorias)

    const [modalConfirmAction, setModalConfirmAction] = useState<boolean>(false)
    const [messageConfirmAction, setMessageConfirmAction] = useState<string>("")
    const [actionConfirmAction, setActionConfirmAction] = useState<{action: () => void} | null>(null)

    const ref = useRef<HTMLDivElement>(null)

    const {addNotification} = useOutletContext<{addNotification: (type: string, message: string) => void}>()

    function handleAddCategoria() {

        if (!categoria || !cor || !emoji) return

        // VALIDAÇÃO PARA VERIFICAR SE A CATEGORIA NÃO É REPETIDA (NOME DA CATEGORIA)
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
        // SALVA A NOVA CATEGORIA NA LISTA DE CATEGORIAS 'TEMPORARIAMENTE'
        setTempCategorias((prev) => [...prev, newCateg])

        // RESET FIELDS
        setCategoria("")
        setCor(null)
        setEmoji(null)
    }

    // FUNÇÃO PARA CAPTAR EXCLUSÃO DE CATEGORIA AO CLICAR NA "LIXEIRA" AO LADO DA CATEGORIA
    function handleRemoveCategoria(delCategoria: string) {
        const newList = tempCategorias?.filter((categoria) => categoria.value != delCategoria) || []
        setTempCategorias(newList)
    }

    // HANDLER AO CLICAR NO BOTÃO DE SALVAR NO MODAL DE CATEGORIAS
    function handleSaveCategorias(){
        if(categoria || cor || emoji){
            handleConfirmAction(true, "Categorias não salvas, deseja descartar alterações?")
            return
        }
        saveCategorias(tempCategorias)
    }

    // HANDLER PARA ABRIR COMPONENTE DE CONFIRMAÇÃO PERSONALIZADO
    function handleConfirmAction(state: boolean, message: string){
        setMessageConfirmAction(message)
        setActionConfirmAction({action: saveCategoriasConfirmAction})
        setModalConfirmAction(state)
    }

    // DESCARTAR INFORMAÇÕES AO CLICAR EM DESCARTAR NO COMPONENTE CONFIRM ACTION
    function handleDescartarAction() {
        // RESET FIELDS
        setCategoria("")
        setCor(null)
        setEmoji(null)
        setModalCategoria(false)
    }

    // SALVAR CATEGORIAS AO CLICAR EM SALVAR NO COMPONENTE CONFIRM ACTION
    function saveCategoriasConfirmAction(){
        saveCategorias(tempCategorias)
        handleDescartarAction()
    }

    // VALIDA QUALQUER MUDANÇA NAS CATEGORIAS (ADD, EDIT, REMOVE)
    function validarMudancas(){
        if(categoria || cor || emoji) return true
        if(tempCategorias.length !== categorias.length) return true

        function objetosIguais(obj1: any, obj2: any){
            const keys1 = Object.keys(obj1);
            const keys2 = Object.keys(obj2);
          
            if (keys1.length !== keys2.length) return false;
          
            for (const key of keys1) {
              if (obj1[key] !== obj2[key]) return false;
            }
          
            return true;
        }

        for(let i = 0; i < tempCategorias.length; i++) {
            if (!objetosIguais(tempCategorias[i], categorias[i])) return true;
        }
    }

    useEffect(() => {
        // VIGIA TECLA ESC PARA FECHAR O MODAL DE ADD CATEGORIA
        function handleEscapeOut(e: KeyboardEvent) {
            if (e.key === "Escape") {
                if (validarMudancas()) {
                    setModalConfirmAction(true)
                    return;
                } else if(!modalConfirmAction){
                    setModalCategoria(false)
                    return;
                }

            }
        }

        // VIGIA CLICK FORA DO MODAL (CLICK OUT) PARA FECHAR O MODAL DE ADD CATEGORIA
        function handleclickOut(e: MouseEvent){
            if(ref.current && !ref.current.contains(e?.target as Node)){
                if (validarMudancas()) {
                    setModalConfirmAction(true)
                    return;
                } else if(!modalConfirmAction){
                    setModalCategoria(false)
                    return;
                }
            }
        }

        document.addEventListener('keydown', handleEscapeOut, true)
        document.addEventListener('click', handleclickOut, true)

        return () => {
            document.removeEventListener('keydown', handleEscapeOut, true)
            document.removeEventListener('click', handleclickOut, true)
        }
    }, [categoria, cor, emoji, modalConfirmAction, setModalCategoria])
    
    return (
        <div className="fixed top-0 left-0 bg-[#00000080] w-screen h-screen z-[20] flex items-center justify-center">
            <div className="w-[550px] min-h-[400px] flex flex-col items-center justify-center gap-6 bg-brand-black p-6 mr outline-[1px] outline outline-brand-dark-gray rounded-md" ref={ref}>
                <div className="grid w-full grid-cols-7 grid-rows-2 gap-2">
                    <div className="col-span-5">
                        <Input
                            autoFocus={true}
                            placeholder="Nome da categoria"
                            setState={setCategoria}
                            value={categoria.slice(0, 20)}
                            className="transition-all bg-brand-black placeholder:text-brand-gray focus:placeholder:text-brand-gray outline-brand-gray outline-[1px] outline outline-offset-0 text-brand-white-gray text-[17px] focus:outline-brand-white-gray"
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
                            emoji={true}
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
                            className={cn("w-full my-0 bg-brand-black text-brand-white-gray outline-brand-gray", { "cursor-not-allowed hover:bg-brand-black select-none": !categoria || !cor || !emoji })}
                            value="Adicionar Categoria"
                            icon={<Icons.FiPlusCircle className="text-[24px] text-brand-green" />}
                        />
                    </div>
                </div>
                <div className="w-full h-[280px] overflow-y-auto bg-brand-black rounded-sm  outline outline-[1px] outline-brand-dark-gray">
                    {tempCategorias?.map((categoria, index) => (
                        <div 
                            key={index} 
                            className="flex justify-between px-4 py-2 text-[16px] items-center text-brand-black font-bold odd:bg-brand-dark-gray"
                        >
                            <p className={`bg-colors-${categoria.cor?.value} px-2 rounded-sm flex items-center gap-2`}>
                                <span>{categoria?.emoji?.label}</span>
                                {categoria.label}
                            </p>
                            <Icons.FaTrashAlt
                                onClick={() => handleRemoveCategoria(categoria.value)}
                                className={cn("h-full text-[20px] cursor-pointer hover:scale-[1.1] z-[4] text-brand-white-gray mr-2", 
                                { "-mr-[3.5px]": tempCategorias.length > 7 })}
                            />
                        </div>
                    ))}
                </div>
                <div className="grid w-full grid-cols-2 gap-4">
                    <div className="col-span-1">
                        <Button
                            handleButton={() => {
                                if (validarMudancas()) setModalConfirmAction(true)
                                else setModalCategoria(false)
                            }}
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
            {modalConfirmAction &&
                <ConfirmAction
                    label={messageConfirmAction || "Desejar descartar as alterações não salvas?"}
                    option1="Descartar"
                    action1={actionConfirmAction?.action ?? handleDescartarAction}
                    option2="Cancelar"
                    action2={() => setModalConfirmAction(false)}
                />
            }
        </div>
    )
}