import { Button, DateField, ModalAddCampo, Select } from '@components';
import { DashboardProps } from '@typings';
import { Icons, cn, currencyFormatPT } from '@utils';
import { useEffect, useState } from 'react';

export function DashboardTable({ type, content, handleSaveCampo }: DashboardProps) {

    const [categoriaSelected, setCategoriaSelected] = useState<{ label: string, value: string | number } | null>(null)
    const [dtFiltro, setDtFiltro] = useState<string | null>(null)
    const [totalContent, setTotalContent] = useState<number>(0)
    const [modalAddCampo, setModalAddCampo] = useState<boolean>(false)

    useEffect(() => {
        let total = 0;
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        content.forEach((row: any) => total += row.valor)
        setTotalContent(total)
    }, [content])

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
                        <p className='px-4 m-auto rounded-md bg-brand-white-gray w-max text-brand-black'>Parcela</p>
                        <p className='px-4 m-auto rounded-md bg-brand-white-gray w-max text-brand-black'>{type === "gastos" ? "Gastos" : "Ganhos"}</p>
                    </div>

                    {/* Content */}
                    <div className={cn('h-full py-1 font-normal min-h-[150px] max-h-[350px] text-center text-brand-white-gray', { "overflow-y-scroll -mr-[12px]": content.length > 8 })}>
                        {content.map((row, index) => {
                            return (
                                <div
                                    className={cn('grid h-full grid-cols-6 py-2 border-b-[1px] border-b-brand-gray',
                                        { "border-b-0": content[index + 1] == (null || undefined) })}
                                    key={index}
                                >
                                    <p>{row.data}</p>
                                    <p className='col-span-2 text-left truncate'>{row.descricao}</p>
                                    <p>{row.categoria}</p>
                                    <p>{row.parcelas}</p>
                                    <p className='tracking-tighter '>{currencyFormatPT(row.valor)}</p>
                                </div>
                            )
                        })}
                    </div>
                </div>
                {/* FIM TABLE */}

                {/* INICIO BOTOES TABLE */}
                <div className='grid w-full grid-cols-10 gap-6 px-2 py-3'>
                    <div className='col-span-2'>
                        <DateField date={dtFiltro} setDate={setDtFiltro} />
                    </div>
                    <div className='col-span-3'>
                        <Select
                            className='my-0 outline-brand-gray'
                            label='Selecione uma categoria'
                            value={categoriaSelected}
                            setValue={setCategoriaSelected}
                            options={[{ label: "Categoria 1", value: "categ1" }]}
                            transparent={false}
                        />
                    </div>
                    <p className='col-span-2 col-start-7 text-[18px] flex items-center m-auto'>
                        Total
                        <span
                            className={cn("font-semibold px-2 tracking-tighter text-brand-red", {"text-brand-green": type != "gastos"})}
                        >
                            {currencyFormatPT(totalContent)}
                        </span>
                    </p>
                    <Button
                        className="w-max text-[18px] px-4 my-0 col-span-1"
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
                    handleSaveCampo={handleSaveCampo}
                    setModalAddCampo={setModalAddCampo}
                    type={type}
                />}

        </section>
    )
}