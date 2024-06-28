import { InputProps } from "@typings";
import { useId, useState } from "react";
import { cn, currencyFormatPT, Icons } from "@utils";

export function Input({ className, type = "text", label, value, icon, setState, autoComplete = "off", ...props }: InputProps) {

    const id = useId();
    const [thisType, setThisType] = useState<React.HTMLInputTypeAttribute>(type)

    return (
        <label
            className="relative flex flex-col text-[18px]"
            htmlFor={id}
        >
            <span className="absolute top-2/4 translate-y-[10%] brightness-0 px-1 text-[22px]">{icon}</span>
            {label && 
                <span className={cn({"after:absolute after:px-1 after:-mt-1 after:text-[24px] after:content-['*'] after:text-colors-red after:font-semibold after:transition-all": label && !value && props.required })}>
                    {label}
                </span>
            }
            <input
                {...props}
                id={id}
                value={
                    type === "currency" 
                        ? currencyFormatPT(value?.toString())
                        : value
                }
                onChange={(e) => {
                    type === "currency" 
                        ? setState(e.target.value.replace(/[^\d]/g, "").trim().slice(0, 9)) 
                        : setState(e.target.value.trim() ? e.target.value.slice(0, (props.maxLength || e.target.value.length)) : e.target.value.trim())
                }}
                type={thisType}
                className={cn("h-8 rounded-sm text-[18px] text-black outline-none px-1", className,
                    {
                        "pr-9": type === "password",
                        "pl-9": icon
                    })}
                autoComplete={autoComplete}
            />
            {type == "password" &&
                <span
                    className="absolute brightness-0 top-2/4 translate-y-[5%] right-0 px-2 text-[22px] hover:brightness-50 cursor-pointer transition-all"
                    onClick={() => setThisType(prevState => prevState == "password" ? "text" : "password")}
                >
                    {thisType == "password" ? <Icons.FaEye /> : <Icons.FaEyeSlash />}
                </span>
            }
        </label>
    )
}