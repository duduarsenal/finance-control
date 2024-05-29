import { useState } from "react";
import { IoIosArrowUp } from "react-icons/io";
import { cn } from "src/utils/cn";
import { IoClose } from "react-icons/io5";
import { SelectProps } from "@typings";

export function Select({ label, options, icon, value, setValue }: SelectProps) {

    const [select, setSelect] = useState(false);

    return (
        <div className="relative px-2 rounded-sm select-none outline-white outline-1 outline w-max">
            <div
                className="flex items-center h-full justify-between gap-4 hover:brightness-200 min-w-[250px]"
                onClick={() => setSelect(!select)}
            >
                {icon && icon}
                <p className="text-gray-300">
                    {value?.value ? value.label : label ? label : "Selecione uma opção"}
                </p>
                <div className="flex items-center h-full gap-2">
                    {value && 
                        <IoClose 
                            onClick={() => setValue(null)} 
                            fill="#FF3232"
                            className="h-full w-6 text-[20px] cursor-pointer hover:scale-[1.1] z-50 transition-all" 
                        />
                    }
                    <IoIosArrowUp className={cn("text-[20px] transition-all duration-300", { "rotate-180": !select })} />
                </div>
            </div>
            <div className={cn("absolute top-[calc(100%+1px)] outline-white outline-1 outline w-full left-0 transition-all rounded-sm mt-0 flex flex-col z-50",
                {
                    "opacity-0 pointer-events-none select-none": !select,
                    "opacity-100": select
                }
            )}>
                {options && options.map(({ label, value }) => (
                    <span
                        onClick={() => {
                            setValue({label, value})
                            setSelect(false)
                        }}
                        className="py-1 px-2 border-b-[1px] border-b-[#1f1f1f] w-full hover:brightness-75 cursor-pointer"
                    >
                        {label}
                    </span>
                ))}
            </div>
        </div>
    )
}