import { CheckboxProps } from "@typings";
import { cn, Icons } from "@utils";

export function Checkbox({label, setCheck, check, className}: CheckboxProps){
    return (
        <>
            <label 
                className={cn("flex items-center justify-center gap-2 h-full", className)}
            >
                <div 
                    className={cn("flex w-6 h-6 rounded-sm outline outline-2 outline-brand-border bg-transparent transition-all cursor-pointer", 
                        { "bg-brand-text": check }
                    )}
                    onClick={setCheck}
                >
                    <Icons.FaCheck className="m-auto select-none text-brand-background" />
                </div>
                {label}
            </label>
        </>
    )
}