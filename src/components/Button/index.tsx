import { ButtonProps } from "@typings";
import { cn } from "@utils";

export function Button({ className, handleButton, icon, value }: ButtonProps){

    return(
        <button   
            className={cn("flex items-center justify-center min-w-max h-8 my-8 transition-all rounded-sm outline-brand-border outline-1 outline hover:bg-brand-background px-2", 
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