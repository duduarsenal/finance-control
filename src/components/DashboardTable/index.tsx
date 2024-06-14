import { Button, Select } from '@components'
import { DashboardProps } from '@typings';
import { useEffect, useState } from 'react';
import { BiCalendar } from 'react-icons/bi';
import { FiPlusCircle } from 'react-icons/fi'
import { cn } from 'src/utils/cn';

export function DashboardTable({ type, content }: DashboardProps) {

    const [baseColor, setBaseColor] = useState<string>()
    const [categoriaSelected, setCategoriaSelected] = useState<{label: string, value: string | number} | null>(null)

    useEffect(() => {
        setBaseColor(type == 'gastos' ? 'text-brand-red' : 'text-brand-green')
    }, [type])

    let total: number = 0;

    return (
        <section className="flex flex-col items-end">
            <div className="flex flex-col justify-between w-full rounded-sm h-max outline outline-1 outline-brand-white-gray">
                {/* INICIO TABLE */}
                <div>
                    {/* Headers */}
                    <div className='grid h-full grid-cols-6 py-2 font-medium text-center text-[18px] border-b-2 border-b-brand-white-gray'>
                        <p>Data</p>
                        <p className='col-span-2 text-left'>Descricao</p>
                        <p>Categoria</p>
                        <p>Parcela</p>
                        <p>{type === "gastos" ? "Gastos" : "Ganhos"}</p>
                    </div>

                    {/* Content */}
                    <div className={cn('h-full py-1 font-light min-h-[150px] max-h-[350px] text-center text-brand-white-gray', { "overflow-y-scroll": content.length > 8 })}>
                        {content.map((row, index) => {
                            total += Number(row.valor);
                            return (
                                <div 
                                    className='grid h-full grid-cols-6 py-2 border-b-2 border-b-brand-white-gray'
                                    key={index}
                                >
                                    <p>{row.data}</p>
                                    <p className='col-span-2 tracking-tighter text-left truncate'>{row.descricao}</p>
                                    <p>{row.categoria}</p>
                                    <p>{row.parcelas}</p>
                                    <p className='tracking-tighter '>{Number(row.valor).toLocaleString("pt-br", { style: 'currency', currency: 'BRL', maximumFractionDigits: 0 })}</p>
                                </div>
                            )
                        })}
                    </div>
                </div>
                {/* FIM TABLE */}

                {/* INICIO BOTOES TABLE */}
                <div className='grid w-full grid-cols-8 gap-6 px-2 py-3'>
                    <Button
                        className='justify-between col-span-1 my-0 text-brand-white-gray'
                        icon={<BiCalendar className='text-[20px]' />}
                        value={new Date().toISOString().split('T')[0]}
                        handleButton={() => console.log('change data')}
                    />
                    <Select
                        className='col-span-2 my-0 outline-brand-white-gray'
                        label='Selecione uma categoria'
                        value={categoriaSelected}
                        setValue={setCategoriaSelected}
                        options={[{label: "Categoria 1", value: "categ1"}]}
                        transparent={false}
                    />
                    <p className='col-span-2 col-start-8 text-[18px]'>Total <span className={`${baseColor} font-medium px-2`}>{total.toLocaleString("pt-br", { style: 'currency', currency: 'BRL', maximumFractionDigits: 0})}</span></p>
                </div>
                {/* FIM BOTOES TABLE */}
            </div>
            <Button
                className="w-max text-[18px] px-4"
                value={type === "gastos" ? "Gastos" : "Ganhos"}
                icon={<FiPlusCircle className={cn("text-[20px]", 
                    { "text-brand-red": type === "gastos",
                        "text-brand-green": type != "gastos"
                    }
                )}/>}
                handleButton={() => console.log('add ganho')}
            />
        </section>
    )
}