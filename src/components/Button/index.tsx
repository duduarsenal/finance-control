import { ButtonProps } from "@typings";
import { cn } from "../../utils/cn";

export function Button({ className, handleButton, icon, value }: ButtonProps){

    return(
        <button   
            className={cn("w-full h-10 my-8 transition-all rounded-sm outline-white outline-2 outline hover:bg-[#1f1f1f]", className, {"flex w-full items-center justify-center gap-4": icon})}
            onClick={handleButton}
        >
            {icon}
            {value}
        </button>
    )
}