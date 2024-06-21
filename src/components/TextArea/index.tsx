import { TextAreaProps } from "@typings"
import { cn } from "@utils"

export function TextArea({className, value, setValue, ...props}: TextAreaProps){
    return (
        <textarea 
            className={cn("w-full rounded-sm text-brand-black outline-none border-none p-1 min-h-32 h-full", className)}
            {...props}
            onChange={(e) => setValue(e.target.value)}
            value={value}
        >
        </textarea>
    )
}