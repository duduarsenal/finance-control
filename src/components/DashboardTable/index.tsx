import { getCampos } from '@api';
import { Button, DateField, ModalAddCampo, Select, RemoveField } from '@components';
import { CamposProps, CategoriaProps, DashboardProps, GenericProps } from '@typings';
import { Icons, arredondar, cn, currencyFormatPT, dateFormatPT, preencherParcelas } from '@utils';
import { useEffect, useState } from 'react';

export function DashboardTable({ 
    type, 
    campos, 
    saveCampo, 
    salvarCampos, 
    handleEditCampo, 
    removeCampo, 
    categorias, 
    setTotal 
}: DashboardProps) {

    const [categoriaSelected, setCategoriaSelected] = useState<GenericProps | CategoriaProps | null>(null)

    const [dtFiltro, setDtFiltro] = useState<string | null>(null)
    const [totalContent, setTotalContent] = useState<number>(0)
    
    const [modalAddCampo, setModalAddCampo] = useState<boolean>(false)
    const [tempCampos, setTempCampos] = useState<CamposProps[]>(campos)
    
    const [editCampo, setEditCampo] = useState<CamposProps | null>(null)

    const [modalRemoveField, setModalRemoveField] = useState<boolean>(false)
    const [fieldRemove, setFieldRemove] = useState<CamposProps>()

    function handleEditarCampo(campo: CamposProps){
        setEditCampo(campo)
        setModalAddCampo(true)
    }

    async function handleRemoveCampo(campo: CamposProps, idTipo: number){
        if(campo?.parcelas?.total > 1 && idTipo == 2){
            const camposToEdit = (await getCampos())
            .filter((item) => campo.originalId === item.originalId && campo.id !== item.id)
            .sort((a, b) => new Date(a.data).getTime() - new Date(b.data).getTime())
            
            await removeCampo(campo, 2)
            
            await salvarCampos(await preencherParcelas([], {
                ...camposToEdit[0],
                valor: {
                    total: campo.valor.total,
                    parcela: arredondar((Number(campo.valor.total) / Number(campo.parcelas.total - 1)), 0)
                },
                parcelas: {
                    total: campo.parcelas.total - 1,
                    atual: 0
                }   
            }))
        } else {
            await removeCampo(campo, idTipo)
        }
    }

    function handleRemoveField(row: CamposProps){
        setFieldRemove(row)
        setModalRemoveField(true)
    }

    useEffect(() => {
        const arrTotal: CamposProps[] = [];
        
        const total = tempCampos.reduce((acc, item) => {
            if(!(arrTotal.some((element) => element.id === item.id)))
            {
                arrTotal.push(item)
                return acc += item.valor.parcela
            }
            return acc += 0
        }, 0)
        
        setTotalContent(total)
        setTotal(total)
    }, [tempCampos, campos, setTotal])

    useEffect(() => {
        const filtragemCategoria = categoriaSelected 
        ? campos.filter((campo) => campo.categoria.value === categoriaSelected?.value)
                .sort((a, b) => new Date(a.data).getTime() - new Date(b.data).getTime())
        : campos.sort((a, b) => new Date(a.data).getTime() - new Date(b.data).getTime())

        const filtragemData = dtFiltro 
        ? filtragemCategoria.filter((campo) => campo.data === dtFiltro)
                            .sort((a, b) => new Date(a.data).getTime() - new Date(b.data).getTime())
        : filtragemCategoria.sort((a, b) => new Date(a.data).getTime() - new Date(b.data).getTime())

        setTempCampos(filtragemData)
    }, [campos, categoriaSelected, dtFiltro])
    

    return (
        <section className="flex flex-col pb-8">
            <h4 className="my-2 px-4 rounded-md text-[20px] text-brand-text font-medium bg-brand-dark-gray w-max"
            >
                {"Registros de "} 
                <span className={cn("text-brand-red font-bold", { "text-brand-green": type === "ganhos" })}>
                    {type.split("")[0].toUpperCase() + type.slice(1,)}
                </span>
            </h4>
            <div className="flex flex-col justify-between w-full rounded-md h-max bg-brand-background">
                {/* INICIO TABLE */}
                <div>
                    {/* Headers */}
                    <div className='grid h-full grid-cols-12 py-2 px-2 font-bold text-center text-[18px] bg-brand-dark-gray rounded-tr-md rounded-tl-md'>
                        <p className='col-span-2 px-6 m-auto rounded-md w-max'>Data</p>
                        <p className='col-span-4 px-6 text-left rounded-md w-max'>Descricao</p>
                        <p className='col-span-2 px-4 m-auto rounded-md w-max'>Categoria</p>
                        <p className='col-span-1 px-4 m-auto rounded-md w-max'>Parcelas</p>
                        <p className='col-span-2 px-4 m-auto rounded-md w-max'>
                            {type === "gastos" ? "Gasto" : "Ganho"}
                        </p>
                        <p className='col-span-1 px-4 m-auto rounded-md w-max'>Ações</p>
                    </div>

                    {/* Content */}
                    <div className={cn('h-full font-normal min-h-[150px] max-h-[240px] text-center text-brand-text overflow-y-auto overflow-x-hidden')}>
                        {[...tempCampos, ...Array(tempCampos?.length > 6 ? 0 : (6 - tempCampos?.length) < 6 ? (6 - tempCampos?.length) : 6)
                        .fill({data: null, descricao: null, categoria: null, parcelas: null, valor: null})]
                        .slice(0, tempCampos.length < 6 ? 6 : tempCampos.length)
                        .map((row: CamposProps, index) => {
                            return (
                                <div
                                    className={cn("grid items-center h-10 grid-cols-12 even:bg-brand-dark-gray px-2", { "-mr-[12px]": tempCampos.length > 6 })}
                                    key={index}
                                >
                                    <p className='col-span-2 truncate'>{dateFormatPT(row?.data) || '-'}</p>
                                    <p className='col-span-4 pl-6 pr-2 text-left truncate' title={row?.descricao}>{row?.descricao || '-'}</p>
                                    <p className={cn( "col-span-2 px-4 flex gap-2 rounded-md w-max max-w-full m-auto",
                                        { "bg-colors-red": row?.categoria?.cor?.value === 'red' },
                                        { "bg-colors-yellow": row?.categoria?.cor?.value === 'yellow' },
                                        { "bg-colors-orange": row?.categoria?.cor?.value === 'orange' },
                                        { "bg-colors-red": row?.categoria?.cor?.value === 'red' },
                                        { "bg-colors-pink": row?.categoria?.cor?.value === 'pink' },
                                        { "bg-colors-purple": row?.categoria?.cor?.value === 'purple' },
                                        { "bg-colors-blue": row?.categoria?.cor?.value === 'blue' },
                                        { "bg-colors-bluemarin": row?.categoria?.cor?.value === 'bluemarin' },
                                        { "bg-colors-green": row?.categoria?.cor?.value === 'green' },
                                    )}>
                                        <span>{row?.categoria?.emoji?.label}</span>
                                        <span className='font-bold truncate text-brand-text'>{row?.categoria?.label || '-'}</span>
                                    </p>
                                    <p className='col-span-1'>
                                            {row?.parcelas?.total > 1
                                        ? (row?.parcelas?.atual + "/" + row?.parcelas?.total)
                                        : row.data != null ? '1' : '-'}
                                    </p>
                                    <p className='col-span-2 tracking-tighter'>{currencyFormatPT(row?.valor?.parcela) || '-'}</p>
                                    {row.data != null ? <p className='flex items-center justify-center col-span-1 gap-2'>
                                        <Button
                                            className='my-0 border-none outline-0 text-[20px] px-0 hover:text-brand-text'
                                            handleButton={() => handleEditarCampo(row)}
                                            icon={<Icons.FaEdit />}
                                        />
                                        <Button
                                            className='my-0 border-none outline-0 text-[18px] px-0 hover:text-brand-text'
                                            handleButton={() => handleRemoveField(row)}
                                            icon={<Icons.FaTrashAlt />}
                                        />
                                    </p> : '-'}
                                </div>
                            )
                        })}
                    </div>
                </div>
                {/* FIM TABLE */}

                {/* INICIO BOTOES TABLE */}
                <div className='grid w-full grid-cols-12 gap-6 px-4 py-5 outline outline-[2px] outline-brand-hover rounded-br-md rounded-bl-md'>
                    <div className='col-span-2'>
                        <DateField date={dtFiltro} setDate={setDtFiltro} />
                    </div>
                    <div className='col-span-3'>
                        <Select
                            className='my-0 truncate outline-brand-gray-opacity'
                            optionDefault='Selecione uma categoria'
                            value={categoriaSelected as CategoriaProps}
                            setValue={setCategoriaSelected}
                            optionsCategorias={campos?.map((campo) => { if(campo.type === type) return campo.categoria })
                                .filter((categoria): categoria is CategoriaProps => categoria != undefined) || []}
                            transparent={false}
                            direction={type != "gastos" ? "up" : "down"}
                        />
                    </div>
                    <Button
                        className="w-max text-[18px] px-4 my-0 col-span-2 col-start-7 lg:col-start-8 m-auto text-brand-text outline-brand-gray-opacity"
                        value={type === "gastos" ? "Adicionar Gasto" : "Adicionar Ganho"}
                        icon={<Icons.FiPlusCircle className={cn("text-[20px]",
                            {
                                "text-brand-red": type === "gastos",
                                "text-brand-green": type != "gastos"
                            }
                        )} />}
                        handleButton={() => setModalAddCampo(true)}
                    />
                    <p className='col-span-3 col-start-10 lg:col-start-11 text-[18px] flex items-center m-auto truncate xl:-ml-8 w-full'>
                        Total:
                        <span
                            className={cn("font-semibold px-2 tracking-tighter text-brand-red", {"text-brand-green": type != "gastos"})}
                        >
                            {currencyFormatPT(totalContent) || '-'}
                        </span>
                    </p>
                </div>
                {/* FIM BOTOES TABLE */}
            </div>

            {modalAddCampo &&
                <ModalAddCampo
                    campos={campos}
                    saveCampo={saveCampo}
                    salvarCampos={salvarCampos}
                    setModalAddCampo={setModalAddCampo}
                    type={type}
                    categorias={categorias}
                    editCampo={editCampo as CamposProps}
                    setEditCampo={setEditCampo}
                    handleEditCampo={handleEditCampo}
                    handleRemoveCampo={removeCampo}
            />}

            {modalRemoveField &&
                <RemoveField
                    field={fieldRemove as CamposProps}
                    actionDelete={handleRemoveCampo}
                    actionCancel={() => { setFieldRemove(undefined), setModalRemoveField(false) }}
            />}

        </section>
    )
}