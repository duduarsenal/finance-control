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
        <section className="flex flex-col items-end pb-8">
            <div className="flex flex-col justify-between w-full h-max bg-brand-black px-4 pr-6 py-2 rounded-md gap-4">
                {/* INICIO TABLE */}
                <div>
                    {/* Headers */}
                    <div className='grid h-full grid-cols-6 py-2 font-bold text-center text-[18px]'>
                        <p className='bg-brand-white-gray w-max m-auto text-brand-black px-6 rounded-md'>Data</p>
                        <p className='col-span-2 text-left bg-brand-white-gray w-max text-brand-black px-6 rounded-md'>Descricao</p>
                        <p className='bg-brand-white-gray w-max m-auto text-brand-black px-4 rounded-md'>Categoria</p>
                        <p className='bg-brand-white-gray w-max m-auto text-brand-black px-4 rounded-md'>Parcela</p>
                        <p className='bg-brand-white-gray w-max m-auto text-brand-black px-4 rounded-md'>{type === "gastos" ? "Gastos" : "Ganhos"}</p>
                    </div>

                    {/* Content */}
                    <div className={cn('h-full py-1 font-normal min-h-[150px] max-h-[350px] text-center text-brand-white-gray', { "overflow-y-scroll -mr-[12px]": content.length > 8 })}>
                        {content.map((row, index) => {
                            total += Number(row.valor);
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
                        className='justify-between col-span-1 my-0 text-brand-white-gray outline-brand-gray'
                        icon={<BiCalendar className='text-[20px]' />}
                        value={new Date().toISOString().split('T')[0]}
                        handleButton={() => console.log('change data')}
                    />
                    <div className='col-span-2 grid-cols-6 grid w-full'>
                        <div className='col-span-5'>
                            <Select
                                className='my-0 outline-brand-gray'
                                label='Selecione uma categoria'
                                value={categoriaSelected}
                                setValue={setCategoriaSelected}
                                options={[{label: "Categoria 1", value: "categ1"}]}
                                transparent={false}
                            />
                        </div>
                    </div>
                    <p className='col-span-1 col-start-7 text-[18px] flex items-center'>
                        Total 
                        <span 
                            className={`${baseColor} font-semibold px-2 tracking-tighter`}
                        >
                                {total.toLocaleString("pt-br", { style: 'currency', currency: 'BRL', maximumFractionDigits: 0})}
                        </span>
                    </p>
                    <Button
                        className="w-max text-[18px] px-4 my-0 col-span-1"
                        value={type === "gastos" ? "Gastos" : "Ganhos"}
                        icon={<FiPlusCircle className={cn("text-[20px]", 
                            { "text-brand-red": type === "gastos",
                                "text-brand-green": type != "gastos"
                            }
                        )}/>}
                        handleButton={() => console.log('add ganho')}
                    />
                </div>
                {/* FIM BOTOES TABLE */}
            </div>
        </section>
    )
}