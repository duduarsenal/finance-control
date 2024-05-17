import { useState } from "react";
import { cn } from "../../utils/cn";

export function Button({ className }: React.ButtonHTMLAttributes<HTMLButtonElement>){
    const [pending, setPending] = useState<boolean>(false);
    
    function handlePending(){
        setPending(prevState => !prevState);
    }

    return(
        <button   
            className={cn("bg-blue-400 p-2 font-semibold text-[18px]", className, {
            "bg-orange-400": pending,
            })}
            onClick={handlePending}
        >
            Enviar
        </button>
    )
}