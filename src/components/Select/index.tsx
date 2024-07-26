import { SelectProps } from "@typings";
import { useEffect, useRef, useState } from "react";
import { cn, Icons } from "@utils";

export function Select({ 
    label, 
    optionDefault, 
    options, 
    optionsCategorias, 
    icon, 
    value, 
    setValue, 
    className, 
    transparent = true, 
    colors = false, 
    theme, 
    required = false, 
    direction = "down",
    clearable = true,
    emoji = false
}: SelectProps) {

    const [select, setSelect] = useState(false);
    const ref = useRef<HTMLDivElement>(null)
    const [optionsHeight, setOptionsHeight] = useState<number>(33);

    useEffect(() => {
        function handleclickOut(e: MouseEvent){
            if(ref.current && !ref.current.contains(e?.target as Node)){
                setSelect(false)
            }
        }
        function handleEscape(e: KeyboardEvent){
            if(e.key === "Escape"){
                setSelect(false)
            }
        }

        document.addEventListener('click', handleclickOut, true)
        document.addEventListener('keydown', handleEscape, true)
        return () => {
            document.removeEventListener('click', handleclickOut, true)
            document.removeEventListener('keydown', handleEscape, true)
        }
    }, [])

    useEffect(() => {
        if (optionsCategorias?.length) {
            const uniqueOptions = optionsCategorias
            .filter((obj, index, self) => index === self
            .findIndex((t) => t.value === obj.value))
            
            setOptionsHeight(((uniqueOptions?.length > 6 ? 6 : uniqueOptions?.length) ?? 1) * 33)
        }
    }, [optionsCategorias, select]);

    return (
        <div className="relative w-full h-8 select-none" ref={ref}>
            {label && 
            <span className={cn({ "after:absolute after:text-[24px] after:px-1 after:-mt-1 after:content-['*'] after:text-colors-red after:font-semibold": !value && required })}>
                {label}
            </span>}
            <div
                className={cn("flex items-center h-full justify-between gap-2 hover:brightness-125 w-full outline-1 outline outline-brand-gray-opacity px-2 rounded-sm transition-all cursor-pointer", { "bg-brand-background hover:brightness-[.95]": theme === "light" }, className)}
                onClick={() => setSelect(!select)}
            >
                {icon && icon}
                <p className={cn("text-brand-gray-opacity", 
                    { 
                        "text-brand-text": theme === "light",
                        "max-w-[calc(100%-55px)]": value
                    })}>

                    {colors
                        ? value?.value ?
                            <span className="flex gap-2">
                                <span className={cn("w-6 h-6 rounded-sm",
                                    { "bg-colors-yellow": value.value === 'yellow' },
                                    { "bg-colors-orange": value.value === 'orange' },
                                    { "bg-colors-red": value.value === 'red' },
                                    { "bg-colors-pink": value.value === 'pink' },
                                    { "bg-colors-purple": value.value === 'purple' },
                                    { "bg-colors-blue": value.value === 'blue' },
                                    { "bg-colors-bluemarin": value.value === 'bluemarin' },
                                    { "bg-colors-green": value.value === 'green' }
                                )} />
                                {value.label}
                            </span>
                            : optionDefault ? optionDefault : "Selecine uma opção"
                        : value?.value ? optionsCategorias 
                        ? <span className={cn("px-2 flex gap-2 rounded-sm outline-1 outline-brand-black outline", 
                                { "bg-colors-yellow": value.cor?.value === 'yellow' },
                                { "bg-colors-orange": value.cor?.value === 'orange' },
                                { "bg-colors-red": value.cor?.value === 'red' },
                                { "bg-colors-pink": value.cor?.value === 'pink' },
                                { "bg-colors-purple": value.cor?.value === 'purple' },
                                { "bg-colors-blue": value.cor?.value === 'blue' },
                                { "bg-colors-bluemarin": value.cor?.value === 'bluemarin' },
                                { "bg-colors-green": value.cor?.value === 'green' }
                            )}>
                            <span>{value?.emoji?.label}</span>
                            <span className="truncate text-brand-text text-bold">{value.label}</span>
                        </span>
                        : value.label : optionDefault ? optionDefault : "Selecione uma opção"}
                </p>
                <div className="flex items-center h-full gap-2">
                    {value && clearable &&
                        <Icons.IoClose
                            onClick={() => setValue(null)}
                            className="h-full text-[18px] cursor-pointer hover:scale-[1.1] z-20 transition-all text-brand-red"
                        />
                    }
                    <Icons.IoIosArrowUp className={cn("text-[20px] transition-all duration-300",
                        {
                            "-rotate-180": !select,
                            "text-brand-text": theme === "light",
                        })} />
                </div>
            </div>
            <div className={cn("absolute top-[calc(100%+1px)] outline-brand-gray outline-1 outline w-full min-w-full left-0 transition-all rounded-sm mt-0 flex flex-col flex-wrap z-[9999] max-h-[230px] justify-start items-start",
                {
                    "opacity-0 pointer-events-none select-none": !select,
                    "opacity-100": select,
                    "bg-brand-background": !transparent,
                    "bg-brand-background text-brand-text outline-brand-gray outline outline-1": theme === "light",
                    "top-15": label,
                    "overflow-y-auto max-h-[198px]": optionsCategorias?.length
                }
                )}
                style={{
                    top: `${direction === "up" ? `-${optionsHeight}px` : 'auto'}`
                }}
            >
                {/* CASO NÃO HAJA NENHUMA OPTION PARA EXIBIR, OPÇÃO DEFAULT ABAIXO */}
                {(!options?.length && !optionsCategorias?.length) && 
                    <span className={cn("w-full h-8 px-2 py-1 font-light text-brand-text", 
                        {
                            "bg-brand-background outline-brand-gray outline outline-1": theme === "light"
                        }
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
                            className={cn("py-1 px-2 cursor-pointer flex items-center gap-2 basis-1/2 z-[99999] hover:bg-brand-dark-gray",
                                {
                                    "py-2": colors,
                                    "border-b-0": options[index + 1] === (null || undefined),
                                    "hover:text-brand-text": theme === "light",
                                    "basis-full": options.length <= 4,
                                    "basis-1/3 hover:bg-[#80808050] hover:brightness-100 text-[20px] justify-center transition-all rounded-md": emoji
                                })}
                            key={index}
                        >
                            {colors && <span className={cn("w-6 h-6 rounded-sm",
                                { "bg-colors-yellow": value === 'yellow' },
                                { "bg-colors-orange": value === 'orange' },
                                { "bg-colors-red": value === 'red' },
                                { "bg-colors-pink": value === 'pink' },
                                { "bg-colors-purple": value === 'purple' },
                                { "bg-colors-blue": value === 'blue' },
                                { "bg-colors-bluemarin": value === 'bluemarin' },
                                { "bg-colors-green": value === 'green' },
                            )} />}
                            {label}
                        </span>
                    ))}
                    {optionsCategorias && [...(direction === "up" ? optionsCategorias.reverse() : optionsCategorias)]
                    .filter((obj, index, self) => index === self
                    .findIndex((t) => t.value === obj.value))
                    .map(({ label, value, cor, emoji: thisEmoji }, index) => (
                        <span
                            onClick={() => {
                                setValue({ label, value, cor, emoji: thisEmoji })
                                setSelect(false)
                            }}
                            className={cn("py-1 px-1 odd:bg-brand-hover hover:brightness-[.85] cursor-pointer text-brand-text w-full basis-full z-[99999]", 
                                {
                                    "border-b-0": optionsCategorias[index + 1] === (null || undefined),
                                    "basis-full": optionsCategorias.length <= 4,
                                    "basis-1/3": emoji
                                }
                            )}
                            key={index}
                        >
                            <span className={cn("px-2 bg-white rounded-sm w-max font-semibold flex items-center gap-2 max-w-full", {
                                    "bg-colors-red": cor?.value === 'red',
                                    "bg-colors-yellow": cor?.value === 'yellow',
                                    "bg-colors-orange": cor?.value === 'orange',
                                    "bg-colors-pink": cor?.value === 'pink',
                                    "bg-colors-purple": cor?.value === 'purple',
                                    "bg-colors-blue": cor?.value === 'blue',
                                    "bg-colors-bluemarin": cor?.value === 'bluemarin',
                                    "bg-colors-green": cor?.value === 'green',
                                })}>
                                <span>{thisEmoji?.label}</span>
                                <span className="truncate ">{label}</span>
                            </span>
                        </span>
                    ))}
                </div>
            </div>
        </div>
    )
}