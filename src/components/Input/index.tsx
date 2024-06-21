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
            {label}
            <input
                {...props}
                id={id}
                value={
                    type === "currency" ?
                    "R$ " + currencyFormatPT(value?.toString(), 0).replace(/[R$ ]/g, "").trim() :
                    value
                }
                onChange={(e) => {
                    type === "currency" ? 
                    setState(e.target.value.replace(/[^0-9]+/g, "").slice(0, 7)) :
                    setState(e.target.value)
                }}
                type={thisType}
                className={cn("h-8 rounded-sm text-[20px] text-black outline-none px-1", className,
                    { "pr-9": type === "password", 
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