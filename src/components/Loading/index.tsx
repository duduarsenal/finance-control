import { LoadingProps } from "@typings";
import { cn, Icons } from "@utils";

export function Loading({isTrue = false, className, message, blurMode = false}: LoadingProps){
    return (
        <div className={cn("fixed w-screen h-screen z-[9999] flex flex-col items-center justify-center text-brand-text top-0 left-0 bg-gradient-background", 
            className, 
            { 
                "invisible": !isTrue,
                "backdrop-blur-sm bg-transparent": blurMode
            },
        )}
        >
            <Icons.RiLoader4Fill className={`text-[150px] animate-spin `} />
            <p className="font-semibold text-[24px]">{message ?? "Carregando..."}</p>
        </div>
    )
}