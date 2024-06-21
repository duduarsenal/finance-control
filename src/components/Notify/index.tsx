import { NotifyProps } from "@typings";
import { cn } from "@utils";
import { useEffect, useRef } from "react";
// ICONS
import { IoClose } from "react-icons/io5";
import { FaRegCheckCircle } from "react-icons/fa";
import { RiErrorWarningLine } from "react-icons/ri";
import { AiOutlineCloseCircle } from "react-icons/ai";
import { FaRegCircleQuestion } from "react-icons/fa6";

export function Notify({ open, setOpenNotify = () => { return }, type, message }: NotifyProps) {
    
    // Delay/Timeout para fechar o notify
    const delayRef = useRef<number>()
    useEffect(() => {
        if (open) {
            delayRef.current = setTimeout(() => {
                setOpenNotify(false)
            }, 2900)
        } else {
            clearTimeout(delayRef.current)
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [open])

    return (
        <div className={cn("fixed bottom-10 right-0 w-[300px] h-[55px] bg-brand-white mx-6 rounded-md flex items-center justify-between p-2 after:absolute after:bg-brand-white-gray transition-all overflow-hidden shadow-md",
            {
                "bg-notify-red after:bg-notify-dark-red": type === "danger",
                "bg-notify-green after:bg-notify-dark-green": type === "sucess",
                "bg-notify-yellow after:bg-notify-dark-yellow": type === "warning",
                "-mr-[300px] transition-all duration-[500ms]": !open,
                "after:-bottom-0 after:w-full after:h-[3px] after:left-0 after:rounded-bl-md after:rounded-br-md after:animate-notification transition-all duration-[500ms] mr-6": open
            })}>
            <div className="flex items-center justify-center h-full gap-1">
                {type == "sucess" && <FaRegCheckCircle className="h-full text-notify-dark-green -mt-[2px] text-[18px]" />}
                {type == "warning" && <RiErrorWarningLine className="text-notify-dark-yellow -mt-[2px] text-[18px]" />}
                {type == "danger" && <AiOutlineCloseCircle className="text-notify-dark-red -mt-[2px] text-[20px]" />}
                {!type && <FaRegCircleQuestion className="-mt-[2px] text-brand-black text-[18px]" />}
                <div className="text-[14px] leading-4 break-all">
                    {message || "Notificação padrão"}
                </div>
            </div>
            <div
                onClick={() => setOpenNotify(false)}
                className="flex items-center justify-center w-8 h-8 ml-1 cursor-pointer"
            >
                <IoClose
                    className={cn("text-[22px] text-brand-black hover:brightness-[.60] transition-all",
                        {
                            "text-notify-dark-red": type === "danger",
                            "text-notify-dark-green": type === "sucess",
                            "text-notify-dark-yellow": type === "warning",
                            "hover:opacity-[.60]": !type
                        }
                    )}
                />
            </div>
        </div>
    )
}