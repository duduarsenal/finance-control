import { SwitchProps } from "@typings";
import { cn } from "@utils";
import { useState } from "react";

export function Switch({ type, className, option1, option2, action1, action2 }: SwitchProps){
    const [switchActive, setSwitchActive] = useState<boolean>(true)

    function handleAction1(){
        setSwitchActive(true)
        action1()
    }

    function handleAction2(){
        setSwitchActive(false)
        action2()
    }

    return (
        type === "text" 
        ? 
        // SWITCH DE TEXTO
        <div className={cn("flex", className)}>
            <p 
                className={cn("border-2 border-brand-dark-gray border-r-0 px-4 py-1 rounded-l-sm rounded-br-none hover:bg-green-900 hover:text-colors-green cursor-pointer transition-all", 
                    typeof option1 === "object" && option1.className,
                    {"text-colors-green bg-green-900": switchActive}
                )}
                onClick={handleAction1}
            >
                {typeof option1 === "string" ? option1 : option1.label}
            </p>
            <p 
                className={cn("border-2 border-brand-dark-gray px-4 py-1 rounded-r-sm hover:bg-red-900 hover:text-red-200 cursor-pointer transition-all", 
                    typeof option2 === "object" && option2.className,
                    {"text-red-200 bg-red-900": !switchActive}
                )}
                onClick={handleAction2}
            >
                {typeof option2 === "string" ? option2 : option2.label}
            </p>
        </div>
        : 
        // SWITCH DE BOTÃO
        <div className={cn("", className)}>

        </div>
    )
}