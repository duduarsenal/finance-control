import { LoadingProps } from "@typings";
import { cn } from "src/utils/cn";
import { RiLoader4Fill } from "react-icons/ri";

export function Loading({isTrue = false, className, message}: LoadingProps){
    return (
        <div className={cn("fixed w-screen h-screen z-[9999] bg-[url('src/assets/bg-gradient.png')] flex flex-col items-center justify-center", 
            className, 
            {"invisible": !isTrue}
        )}
        >
            <RiLoader4Fill className={`text-[150px] animate-spin `} />
            <p className="font-semibold text-[24px]">{message ?? "Carregando informações"}</p>
        </div>
    )
}