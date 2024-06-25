import { Button, DateField, ModalAddCampo, Select } from '@components';
import { CategoriaProps, DashboardProps, GenericProps } from '@typings';
import { Icons, cn, currencyFormatPT, dateFormatPT } from '@utils';
import { useEffect, useState } from 'react';

export function DashboardTable({ type, campos, saveCampo, categorias}: DashboardProps) {

    const [categoriaSelected, setCategoriaSelected] = useState<GenericProps | CategoriaProps | null>(null)
    const [dtFiltro, setDtFiltro] = useState<string | null>(null)
    const [totalContent, setTotalContent] = useState<number>(0)
    const [modalAddCampo, setModalAddCampo] = useState<boolean>(false)

    useEffect(() => {
        let total = 0;
        campos.forEach((row) => total += row.valor)
        setTotalContent(total)
    }, [campos])

    useEffect(() => {
        console.log(categorias)
    }, [categorias])

    return (
        <section className="flex flex-col items-end pb-8">
            <div className="flex flex-col justify-between w-full gap-4 px-4 py-2 pr-6 rounded-md h-max bg-brand-black">
                {/* INICIO TABLE */}
                <div>
                    {/* Headers */}
                    <div className='grid h-full grid-cols-6 py-2 font-bold text-center text-[18px]'>
                        <p className='px-6 m-auto rounded-md bg-brand-white-gray w-max text-brand-black'>Data</p>
                        <p className='col-span-2 px-6 text-left rounded-md bg-brand-white-gray w-max text-brand-black'>Descricao</p>
                        <p className='px-4 m-auto rounded-md bg-brand-white-gray w-max text-brand-black'>Categoria</p>
                        <p className='px-4 m-auto rounded-md bg-brand-white-gray w-max text-brand-black'>Parcelas</p>
                        <p className='px-4 m-auto rounded-md bg-brand-white-gray w-max text-brand-black'>
                            {type === "gastos" ? "Gasto" : "Ganho"}
                        </p>
                    </div>

                    {/* Content */}
                    <div className={cn('h-full py-1 font-normal min-h-[150px] max-h-[245px] text-center text-brand-white-gray', 
                    { "overflow-y-scroll -mr-[12px]": campos.length > 7 })}>
                        {[...campos, ...Array(5 - campos.length < 5 ? campos.length : 5)
                        .fill({data: null, descricao: null, categoria: null, parcelas: null, valor: null})]
                        .slice(0, campos.length < 5 ? 5 : campos.length)
                        .map((row, index) => {
                            return (
                                <div
                                    className={cn('grid h-full grid-cols-6 py-2 border-b-[1px] border-b-brand-gray',
                                        { "border-b-0": campos[index + 1] == (null || undefined) }
                                    )}
                                    key={index}
                                >
                                    <p>{dateFormatPT(row?.data) || '-'}</p>
                                    <p className='col-span-2 text-left truncate'>{row?.descricao || '-'}</p>
                                    <p className={cn( "px-4 flex gap-2 rounded-md w-max max-w-full m-auto",
                                        { "bg-colors-red": row?.categoria?.cor?.value === 'red' },
                                        { "bg-colors-yellow": row?.categoria?.cor?.value === 'yellow' },
                                        { "bg-colors-green": row?.categoria?.cor?.value === 'green' },
                                        { "bg-colors-blue": row?.categoria?.cor?.value === 'blue' },
                                        { "bg-colors-purple": row?.categoria?.cor?.value === 'purple' },
                                        { "bg-colors-pink": row?.categoria?.cor?.value === 'pink' },
                                        { "bg-colors-white": row?.categoria?.cor?.value === 'white' },
                                        { "bg-colors-ciano": row?.categoria?.cor?.value === 'ciano' }
                                    )}>
                                        <span>{row?.categoria?.emoji?.label}</span>
                                        <span className='font-bold truncate text-brand-black'>{row?.categoria?.label || '-'}</span>
                                    </p>
                                    <p>{row?.parcelas ? row?.parcelas : row.data != null ? '1' : '-'}</p>
                                    <p className='tracking-tighter '>{currencyFormatPT(row?.valor) || '-'}</p>
                                </div>
                            )
                        })}
                    </div>
                </div>
                {/* FIM TABLE */}

                {/* INICIO BOTOES TABLE */}
                <div className='grid w-full grid-cols-12 gap-6 px-2 py-3'>
                    <div className='col-span-2'>
                        <DateField date={dtFiltro} setDate={setDtFiltro} />
                    </div>
                    <div className='col-span-3'>
                        <Select
                            className='my-0 outline-brand-gray'
                            optionDefault='Selecione uma categoria'
                            value={categoriaSelected as CategoriaProps}
                            setValue={setCategoriaSelected}
                            optionsCategorias={campos?.map((campo) => { 
                                if(campo.type === type) return campo.categoria})
                                .filter((categoria): categoria is CategoriaProps => categoria != undefined) || []}
                            transparent={false}
                        />
                    </div>
                    <p className='col-span-3 col-start-8 text-[18px] flex items-center m-auto'>
                        Total:
                        <span
                            className={cn("font-semibold px-2 tracking-tighter text-brand-red", {"text-brand-green": type != "gastos"})}
                        >
                            {currencyFormatPT(totalContent) || '-'}
                        </span>
                    </p>
                    <Button
                        className="w-max text-[18px] px-4 my-0 col-span-2 m-auto"
                        value={type === "gastos" ? "Gastos" : "Ganhos"}
                        icon={<Icons.FiPlusCircle className={cn("text-[20px]",
                            {
                                "text-brand-red": type === "gastos",
                                "text-brand-green": type != "gastos"
                            }
                        )} />}
                        handleButton={() => setModalAddCampo(true)}
                    />
                </div>
                {/* FIM BOTOES TABLE */}
            </div>

            {modalAddCampo &&
                <ModalAddCampo
                    saveCampo={saveCampo}
                    setModalAddCampo={setModalAddCampo}
                    type={type}
                    categorias={categorias}
                />}

        </section>
    )
}