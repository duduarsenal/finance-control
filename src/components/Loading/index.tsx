import { LoadingProps } from "@typings";
import { cn, Icons } from "@utils";

export function Loading({isTrue = false, className, message}: LoadingProps){
    return (
        <div className={cn("fixed w-screen h-screen z-[9999] bg-[url('src/assets/bg-gradient.png')] flex flex-col items-center justify-center text-brand-white", 
            className, 
            {"invisible": !isTrue}
        )}
        >
            <Icons.RiLoader4Fill className={`text-[150px] animate-spin `} />
            <p className="font-semibold text-[24px]">{message ?? "Carregando informações"}</p>
        </div>
    )
}