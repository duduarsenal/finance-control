import { ButtonProps } from "@typings";
import { cn } from "../../utils/cn";

export function Button({ className, handleButton, icon, value }: ButtonProps){

    return(
        <button   
            className={cn("flex items-center justify-center w-full h-8 my-8 transition-all rounded-sm outline-brand-white-gray outline-1 outline hover:bg-[#1f1f1f] px-2", 
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