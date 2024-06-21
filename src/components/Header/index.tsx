import { cn } from "@utils";
import { LogoMark } from '@components'
import { HeaderProps } from "@typings";

export function Header({className}: HeaderProps) {
    return (
        <section className={cn("absolute text-brand-white top-0 z-[10] flex items-center w-screen h-16 bg-brand-black px-28", className)}>
            <LogoMark />
        </section>
    )
}