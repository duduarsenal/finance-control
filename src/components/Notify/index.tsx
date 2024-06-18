import { NotifyProps } from "@typings";
import { cn } from "@utils";
import { useEffect } from "react";
import { IoClose } from "react-icons/io5";

export function Notify({ open, setOpenNotify = () => { return }, type, message }: NotifyProps) {

    useEffect(() => {
        if (open) {
            setTimeout(() => {
                setOpenNotify(false)
            }, 2850)
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [open])

    return (
        <div className={cn("fixed bottom-10 right-0 w-[300px] h-[60px] bg-brand-white mx-6 rounded-md flex items-center justify-between p-2 after:absolute after:bg-brand-white-gray transition-all overflow-hidden",
            {
                "bg-notify-red after:bg-notify-dark-red": type === "danger",
                "bg-notify-green after:bg-notify-dark-green": type === "sucess",
                "bg-notify-yellow after:bg-notify-dark-yellow": type === "warning",
                "-mr-[300px] transition-all duration-[350ms]": !open,
                "after:-bottom-0 after:w-full after:h-[3px] after:left-0 after:rounded-bl-md after:rounded-br-md after:animate-notification transition-all duration-[350ms] mr-6": open
            })}>
            <div className="text-[14px] leading-4 break-all">
                {message || "Notificação padrão"}
            </div>
            <div
                onClick={() => {
                    setOpenNotify(true)
                }}
                className="flex items-center justify-center w-8 h-8 ml-1 cursor-pointer"
            >
                <IoClose className="text-[26px] text-brand-black hover:opacity-[.60] transition-all" onClick={() => {
                    setOpenNotify(false)
                }}
                />
            </div>
        </div>
    )
}