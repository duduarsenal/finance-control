import { CamposProps, CategoriaProps, ModalAddCampoProps } from "@typings";
import { Button, ConfirmAction, DateField, Input, Select, TextArea } from "@components";
import { useEffect, useRef, useState } from "react";
import { useOutletContext } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";

export function ModalAddCampo({ type, setModalAddCampo, saveCampo, handleEditCampo, categorias, editCampo, setEditCampo }: ModalAddCampoProps) {

    const [data, setData] = useState<string>("")
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const [categoria, setCategoria] = useState<any>()
    const [parcelas, setParcelas] = useState<string>("")
    const [descricao, setDescricao] = useState<string>("")
    const [valor, setValor] = useState<string>("")

    const [openDate, setOpenDate] = useState<boolean>(false)

    const [modalConfirmAction, setModalConfirmAction] = useState<boolean>(false)
    const ref = useRef<HTMLDivElement>(null)

    const { addNotification } = useOutletContext<{addNotification: (type: string, message: string) => void}>()

    function handleSaveCampo() {
        if (!data || !descricao || !categoria || !valor) {
            return addNotification("warning", "Preencha todos os campos")
        }

        let novoCampo: CamposProps;
        if (editCampo) {
            novoCampo = {
                id: editCampo.id,
                type: editCampo.type,
                data,
                descricao,
                month: Number(data.split('-')[1]),
                categoria: categoria as CategoriaProps,
                parcelas: Number(parcelas) ?? 1,
                valor: Number(valor),
                dtadd: editCampo.dtadd
            }

            handleEditCampo(novoCampo)
        } else {
            novoCampo = {
                id: uuidv4(),
                type,
                data,
                descricao,
                month: Number(data.split('-')[1]),
                categoria: categoria as CategoriaProps,
                parcelas: Number(parcelas) ?? 1,
                valor: Number(valor),
                dtadd: new Date().toISOString()
            }
            saveCampo(novoCampo)
        }


        // RESET FIELDS
        setData("")
        setCategoria(null)
        setParcelas("")
        setDescricao("")
        setValor("")
        setEditCampo(null)
        setModalAddCampo(false)
    }

    function handleDescartarAction() {
        // RESET FIELDS
        setData("")
        setCategoria(null)
        setParcelas("")
        setDescricao("")
        setValor("")
        setEditCampo(null)
        setModalAddCampo(false)
    }

    useEffect(() => {

        function handleEscapeOut(e: KeyboardEvent) {
            if (e.key === "Escape") {
                if (data || descricao || categoria || valor || categoria) {
                    setModalConfirmAction(true)
                    return;
                } else if (!modalConfirmAction) {
                    setModalAddCampo(false)
                    return;
                }

            }
        }

        function handleclickOut(e: MouseEvent) {
            if (ref.current && !ref.current.contains(e?.target as Node) && !openDate) {
                if (data || descricao || categoria || valor || categoria) {
                    setModalConfirmAction(true)
                    return;
                } else if (!modalConfirmAction) {
                    setModalAddCampo(false)
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
    }, [categoria, data, descricao, modalConfirmAction, openDate, setModalAddCampo, valor])

    useEffect(() => {
        if (editCampo) {
            setData(editCampo.data)
            setCategoria(editCampo.categoria)
            setParcelas(editCampo.parcelas.toString() ?? "")
            setValor(editCampo.valor.toString())
            setDescricao(editCampo.descricao)
        }
    }, [editCampo])

    return (
        <div className="fixed top-0 left-0 bg-[#00000080] w-screen h-screen z-[20] flex items-center justify-center">
            <div className="w-[550px] min-h-[400px] h-max gap-2 bg-brand-black p-6 flex flex-col items-center justify-evenly outline outline-[1px] outline-brand-dark-gray rounded-md" ref={ref}>
                <div className="grid w-full grid-cols-4 gap-3 gap-y-4 h-max">
                    {/* DATE FIELD */}
                    <div className="col-span-2 h-max">
                        <DateField
                            date={data}
                            label="Data"
                            setDate={setData}
                            setOpenDate={setOpenDate}
                            required={true}
                            style={{
                                width: "100%"
                            }}
                        />
                    </div>

                    {/* SELECT CATEGORIA */}
                    <div className='col-span-2 h-max'>
                        <Select
                            className="my-0"
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
                            value={parcelas}
                            placeholder="0"
                            className="text-[16px] bg-brand-black text-brand-white-gray outline-brand-gray outline-[1px] outline"
                            type="number"
                            maxLength={2}
                        />
                    </div>
                    <div className="col-span-2 pb-6 h-max">
                        <Input
                            required={true}
                            label="Valor"
                            setState={setValor}
                            value={valor}
                            placeholder="R$ 0,00"
                            className="text-[16px] bg-brand-black text-brand-white-gray outline-brand-gray outline-[1px] outline"
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
                        className="bg-brand-black text-brand-white-gray outline-brand-gray outline-[1px] outline"
                    />
                </div>

                <div className="grid w-full grid-cols-2 gap-4 my-6">
                    <div className="col-span-1">
                        <Button
                            handleButton={() => {
                                if(data || categoria || parcelas || valor || descricao){
                                    setModalConfirmAction(true)
                                    return
                                }

                                setModalAddCampo(false)

                                if(editCampo){
                                    setEditCampo(null)
                                }
                            }}
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
            {modalConfirmAction &&
                <ConfirmAction
                    label="Desejar descartar as alterações não salvas?"
                    option1="Descartar"
                    action1={handleDescartarAction}
                    option2="Cancelar"
                    action2={() => setModalConfirmAction(false)}
                />
            }
        </div>
    )
}