import { ButtonProps } from "@typings";
import { cn } from "../../utils/cn";

export function Button({ className, handleButton, icon, value }: ButtonProps){

    return(
        <button   
            className={cn("flex items-center justify-center min-w-max h-8 my-8 transition-all rounded-sm outline-brand-white-gray outline-1 outline hover:bg-brand-black px-2", 
                className, 
                { "gap-2": icon }
            )}
            onClick={handleButton}
        >
            {icon}
            {value}
        </button>
    )
}