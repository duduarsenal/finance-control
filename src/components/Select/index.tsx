import { SelectProps } from "@typings";
import { useState } from "react";
import { cn, Icons } from "@utils";

export function Select({ label, optionDefault, options, optionsCategorias, icon, value, setValue, className, transparent = true, colors = false, theme, required = false}: SelectProps) {

    const [select, setSelect] = useState(false);

    return (
        <div className="relative w-full h-8 select-none">
            {label && 
            <span className={cn({ "after:absolute after:text-[24px] after:px-1 after:-mt-1 after:content-['*'] after:text-colors-red after:font-semibold": !value && required })}>
                {label}
            </span>}
            <div
                className={cn("flex items-center h-full justify-between gap-4 hover:brightness-125 w-full outline-1 outline outline-brand-gray px-2 rounded-sm transition-all cursor-pointer", { "bg-brand-white-gray hover:brightness-[.95]": theme === "light" }, className)}
                onClick={() => setSelect(!select)}
            >
                {icon && icon}
                <p className={cn("text-gray-300", { "text-brand-black": theme === "light" })}>

                    {colors
                        ? value?.value ?
                            <span className="flex gap-2">
                                <span className={cn("w-6 h-6 rounded-sm",
                                    { "bg-colors-red": value.value === 'red' },
                                    { "bg-colors-yellow": value.value === 'yellow' },
                                    { "bg-colors-green": value.value === 'green' },
                                    { "bg-colors-blue": value.value === 'blue' },
                                    { "bg-colors-purple": value.value === 'purple' },
                                    { "bg-colors-pink": value.value === 'pink' },
                                    { "bg-colors-white": value.value === 'white' },
                                    { "bg-colors-ciano": value.value === 'ciano' }
                                )} />
                                {value.label}
                            </span>
                            : optionDefault ? optionDefault : "Selecine uma opção"
                        : value?.value ? optionsCategorias 
                        ? <span className={cn("w-max px-2 flex gap-2 rounded-sm outline-1 outline-brand-black outline", 
                                { "bg-colors-red": value.cor?.value === 'red' },
                                { "bg-colors-yellow": value.cor?.value === 'yellow' },
                                { "bg-colors-green": value.cor?.value === 'green' },
                                { "bg-colors-blue": value.cor?.value === 'blue' },
                                { "bg-colors-purple": value.cor?.value === 'purple' },
                                { "bg-colors-pink": value.cor?.value === 'pink' },
                                { "bg-colors-white": value.cor?.value === 'white' },
                                { "bg-colors-ciano": value.cor?.value === 'ciano' }
                            )}>
                            <span>{value?.emoji?.label}</span>
                            <span className="text-brand-black">{value.label}</span>
                        </span>
                        : value.label : optionDefault ? optionDefault : "Selecione uma opção"}
                </p>
                <div className="flex items-center h-full gap-2">
                    {value &&
                        <Icons.IoClose
                            onClick={() => setValue(null)}
                            className="h-full text-[18px] cursor-pointer hover:scale-[1.1] z-20 transition-all text-brand-red"
                        />
                    }
                    <Icons.IoIosArrowUp className={cn("text-[20px] transition-all duration-300",
                        {
                            "rotate-180": !select,
                            "text-brand-black": theme === "light"
                        })} />
                </div>
            </div>
            <div className={cn("absolute top-[calc(100%+1px)] outline-brand-gray outline-1 outline min-w-full left-0 transition-all rounded-sm mt-0 flex flex-col flex-wrap z-[5] max-h-[250px] justify-start items-start",
                {
                    "opacity-0 pointer-events-none select-none": !select,
                    "opacity-100": select,
                    "bg-brand-black": !transparent,
                    "bg-brand-white-gray text-brand-black outline-brand-gray outline outline-1": theme === "light",
                    "top-15": label
                }
            )}>
                {/* CASO NÃO HAJA NENHUMA OPTION PARA EXIBIR, OPÇÃO DEFAULT ABAIXO */}
                {(!options?.length && !optionsCategorias?.length) && 
                    <span className={cn("w-full h-8 px-2 py-1 font-light text-brand-gray", 
                        {"bg-brand-white-gray outline-brand-gray outline outline-1": theme === "light",}
                    )}>
                        Nenhum item encontrado...
                    </span>
                }
                
                <div className="flex flex-wrap w-full">
                    {options?.length && options.map(({ label, value }, index) => (
                        <span
                            onClick={() => {
                                setValue({ label, value })
                                setSelect(false)
                            }}
                            className={cn("py-1 px-2 border-b-[1px] border-b-brand-black hover:brightness-75 cursor-pointer flex items-center gap-2 basis-1/2",
                                {
                                    "py-2": colors,
                                    "border-b-0": options[index + 1] === (null || undefined),
                                    "hover:text-brand-gray": theme === "light",
                                    "basis-full": options.length <= 4,
                                    "basis-1/3 hover:bg-[#80808050] hover:brightness-100 text-[20px] justify-center transition-all rounded-md": options.length > 12
                                })}
                            key={index}
                        >
                            {colors && <span className={cn("w-6 h-6 rounded-sm",
                                { "bg-colors-red": value === 'red' },
                                { "bg-colors-yellow": value === 'yellow' },
                                { "bg-colors-green": value === 'green' },
                                { "bg-colors-blue": value === 'blue' },
                                { "bg-colors-purple": value === 'purple' },
                                { "bg-colors-pink": value === 'pink' },
                                { "bg-colors-white": value === 'white' },
                                { "bg-colors-ciano": value === 'ciano' }
                            )} />}
                            {label}
                        </span>
                    ))}
                    {optionsCategorias && optionsCategorias.map(({ label, value, cor, emoji }, index) => (
                        <span
                            onClick={() => {
                                setValue({ label, value, cor, emoji })
                                setSelect(false)
                            }}
                            className={cn("py-1 px-1 border-b-[1px] border-b-brand-black hover:brightness-[.85] cursor-pointer flex items-center gap-2 basis-1/2 text-brand-black font-semibold truncate",
                                {
                                    "border-b-0": optionsCategorias[index + 1] === (null || undefined),
                                    "basis-full": optionsCategorias.length <= 4,
                                    "basis-1/3": optionsCategorias.length > 12,
                                    "bg-colors-red": cor?.value === 'red',
                                    "bg-colors-yellow": cor?.value === 'yellow',
                                    "bg-colors-green": cor?.value === 'green',
                                    "bg-colors-blue": cor?.value === 'blue',
                                    "bg-colors-purple": cor?.value === 'purple',
                                    "bg-colors-pink": cor?.value === 'pink',
                                    "bg-colors-white": cor?.value === 'white',
                                    "bg-colors-ciano": cor?.value === 'ciano'
                                })}
                            key={index}
                        >
                            <span>{emoji?.label}</span>
                            <span className="truncate">{label}</span>
                        </span>
                    ))}
                </div>
            </div>
        </div>
    )
}