import { NotifyManagerProps, NotifyProps } from "@typings";
import { cn, Icons } from "@utils";
import { useEffect } from "react";

function Notify({ open = false, id, className, type, message, removeNotify }: NotifyProps) {

    // Delay/Timeout para fechar o notify
    useEffect(() => {
        setTimeout(() => {
            removeNotify(id);
        }, 2850);
    }, [open, id, removeNotify])

    return (
        <div className={cn("fixed bottom-10 right-0 w-[300px] h-[55px] bg-brand-white mx-6 rounded-md flex items-center justify-between p-2 after:absolute after:bg-brand-white-gray transition-all overflow-hidden shadow-md", className,
            {
                "bg-notify-red after:bg-notify-dark-red": type === "danger",
                "bg-notify-green after:bg-notify-dark-green": type === "sucess",
                "bg-notify-yellow after:bg-notify-dark-yellow": type === "warning",
                "-mr-[300px] transition-all duration-[500ms]": !open,
                "after:-bottom-0 after:w-full after:h-[3px] after:left-0 after:rounded-bl-md after:rounded-br-md after:animate-notification mr-6 transition-all duration-[500ms]": open
            })}>
            <div className="flex items-center justify-center h-full gap-1">
                {type == "sucess" && <Icons.FaRegCheckCircle className="h-full text-notify-dark-green -mt-[2px] text-[18px]" />}
                {type == "warning" && <Icons.RiErrorWarningLine className="text-notify-dark-yellow -mt-[2px] text-[18px]" />}
                {type == "danger" && <Icons.AiOutlineCloseCircle className="text-notify-dark-red -mt-[2px] text-[20px]" />}
                {!type && <Icons.FaRegCircleQuestion className="-mt-[2px] text-brand-black text-[18px]" />}
                <div className="text-[14px] leading-4 break-all">
                    {message || "Notificação padrão"}
                </div>
            </div>
            <div
                onClick={() => removeNotify(id)}
                className="flex items-center justify-center w-8 h-8 ml-1 cursor-pointer"
            >
                <Icons.IoClose
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

export function NotifyManager({ notifications, removeNotification }: NotifyManagerProps) {

    function handleMargin(index: number): string{
        switch(index){
            case 1:
                return 'mb-[65px]'
            case 2:
                return 'mb-[130px]'
            case 3:
                return 'mb-[195px]'
            case 4:
                return 'mb-[260px]'
            case 5:
                return 'mb-[325px]'
            default:
                return 'mb-0'
        }
    }

    return (
        <div>
            {notifications.map(({ id, type, message, open }, index) => {
                return (
                    <Notify
                        key={id}
                        id={id}
                        open={open}
                        type={type}
                        message={message}
                        removeNotify={removeNotification}
                        className={cn(handleMargin(index))}
                    />
                )
            })}
        </div>
    );
}