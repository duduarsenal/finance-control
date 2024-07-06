import { SwitchProps } from "@typings";
import { cn } from "@utils";
import { useState } from "react";

export function Switch({ type, className, option1, option2, action1, action2 }: SwitchProps) {
    const [switchActive, setSwitchActive] = useState<boolean>(true)

    function handleAction1() {
        setSwitchActive(true)
        action1()
    }

    function handleAction2() {
        setSwitchActive(false)
        action2()
    }

    return (
        type === "text"
            ?
            // SWITCH DE TEXTO
            <div className={cn("flex", className)}>
                <p
                    className={cn("border-2 border-brand-dark-gray border-r-0 px-4 py-1 rounded-l-md rounded-r-none cursor-pointer transition-all",
                        typeof option1 === "object" && option1.className,
                        { "switch-text border-brand-black": switchActive }
                    )}
                    onClick={handleAction1}
                >
                    {typeof option1 === "string" ? option1 : option1.label}
                </p>
                <p
                    className={cn("border-2 border-brand-dark-gray px-4 py-1 rounded-r-md rounded-l-none cursor-pointer transition-all",
                        typeof option2 === "object" && option2.className,
                        { "switch-text border-brand-black": !switchActive }
                    )}
                    onClick={handleAction2}
                >
                    {typeof option2 === "string" ? option2 : option2.label}
                </p>
            </div>
            :
            // SWITCH DE BOTÃO
            <div className={cn("flex gap-1", className)}>
                <p
                    className={cn("transition-all font-semibold bg-brand-dark-gray px-3 py-[2px] rounded-md",
                        typeof option1 === "object" && option1.className,
                        { "text-colors-green": switchActive }
                    )}
                >
                    {typeof option1 === "string" ? option1 : option1.label}
                </p>
                <div 
                    className={cn("switch-button relative w-10 h-6 m-auto rounded-full bg-brand-gray after:w-5 after:h-5 after:bg-brand-gray after:absolute after:rounded-full after:top-2/4 after:-translate-y-2/4 after:transition-all cursor-pointer", 
                        {
                            "after:bg-colors-green": switchActive,
                            "after:ml-[14px] after:bg-yellow-400": !switchActive
                        }
                    )}
                    onClick={() => {switchActive ? handleAction2() : handleAction1()}}
                />
                <p
                    className={cn("transition-all font-semibold bg-brand-dark-gray px-3 py-[2px] rounded-md",
                        typeof option2 === "object" && option2.className,
                        { "text-yellow-400": !switchActive }
                    )}
                >
                    {typeof option2 === "string" ? option2 : option2.label}
                </p>
            </div>
    )
}