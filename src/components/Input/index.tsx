import { InputProps } from "@typings";
import { useId, useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { cn } from "src/utils/cn";

export function Input({ className, type, label, value, icon, setState }: InputProps) {

    const id = useId();
    const [thisType, setThisType] = useState<string | undefined>(type)

    return (
        <label
            className="relative flex flex-col text-[18px]"
            htmlFor={id}
        >
            <span className="absolute top-2/4 translate-y-[10%] brightness-0 px-1 text-[22px]">{icon}</span>
            {label}
            <input
                id={id}
                value={value}
                onChange={(e) => setState(e.target.value)}
                type={thisType}
                className={cn("h-8 rounded-sm text-[20px] text-black outline-none px-1", className,
                    { "pr-9": type === "password", "pl-9": icon })}
                autoComplete="off"
            />
            {type == "password" &&
                <span
                    className="absolute brightness-0 top-2/4 translate-y-[5%] right-0 px-2 text-[22px] hover:brightness-50 cursor-pointer transition-all"
                    onClick={() => setThisType(prevState => prevState == "password" ? "text" : "password")}
                >
                    {thisType == "password" ? <FaEye /> : <FaEyeSlash />}
                </span>
            }
        </label>
    )
}