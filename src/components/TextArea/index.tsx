import { TextAreaProps } from "@typings"
import { cn } from "@utils"

export function TextArea({label, className, value, setValue, ...props}: TextAreaProps){
    return (
        <div>
            {label &&
                <span className={cn({ "after:absolute after:text-[24px] after:px-1 after:-mt-1 after:content-['*'] after:text-colors-red after:font-semibold": !value && props.required })}>
                    {label}
                </span>
            }
            <textarea
                className={cn("w-full rounded-sm text-brand-text outline-none border-none p-1 min-h-32 h-full", className)}
                {...props}
                onChange={(e) => setValue(e.target.value.trim() ? e.target.value : e.target.value.trim())}
                value={value}
            >
            </textarea>
        </div>
       
    )
}