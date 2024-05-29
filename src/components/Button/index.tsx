import { ButtonProps } from "@typings";
import { cn } from "../../utils/cn";

export function Button({ className, handleButton, icon, value }: ButtonProps){

    return(
        <button   
            className={cn("w-full h-8 my-8 transition-all rounded-sm outline-white outline-1 outline hover:bg-[#1f1f1f]", className, {"flex items-center justify-center gap-4": icon})}
            onClick={handleButton}
        >
            {icon}
            {value}
        </button>
    )
}