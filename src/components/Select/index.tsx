import { useState } from "react";
import { IoIosArrowUp } from "react-icons/io";
import { cn } from "src/utils/cn";
import { IoClose } from "react-icons/io5";
import { SelectProps } from "@typings";

export function Select({ label, options, icon, value, setValue, className, transparent = true, colors = false }: SelectProps) {

    const [select, setSelect] = useState(false);

    return (
        <div className="relative h-8 select-none w-full">
            <div
                className={cn("flex items-center h-full justify-between gap-4 hover:brightness-200 w-full outline-brand-white-gray outline-1 outline px-2 rounded-sm transition-all", className)}
                onClick={() => setSelect(!select)}
            >
                {icon && icon}
                <p className="text-gray-300">

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
                            : label ? label : "Selecine uma opção"
                        : value?.value ? value.label : label ? label : "Selecione uma opção"}
                </p>
                <div className="flex items-center h-full gap-2">
                    {value &&
                        <IoClose
                            onClick={() => setValue(null)}
                            className="h-full text-[18px] cursor-pointer hover:scale-[1.1] z-50 transition-all text-brand-red"
                        />
                    }
                    <IoIosArrowUp className={cn("text-[20px] transition-all duration-300", { "rotate-180": !select })} />
                </div>
            </div>
            <div className={cn("absolute top-[calc(100%+1px)] outline-white outline-1 outline w-full left-0 transition-all rounded-sm mt-0 flex flex-col z-[5000] max-h-[200px] flex-wrap justify-start items-start",
                {
                    "opacity-0 pointer-events-none select-none": !select,
                    "opacity-100": select,
                    "bg-brand-black": !transparent
                }
            )}>
                {options && options.map(({ label, value }) => (
                    <span
                        onClick={() => {
                            setValue({ label, value })
                            setSelect(false)
                        }}
                        className={cn("py-1 px-2 border-b-[1px] border-b-[#1f1f1f] w-max hover:brightness-75 cursor-pointer flex items-center gap-2", { "py-2": colors })}
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
            </div>
        </div>
    )
}