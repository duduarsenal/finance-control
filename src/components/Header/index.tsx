import { cn } from "src/utils/cn";
import { LogoMark } from '@components'

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function Header({className}: any) {
    return (
        <section className={cn("absolute text-brand-white top-0 z-[9999] flex items-center w-screen h-16 bg-brand-black px-28", className)}>
            <LogoMark />
        </section>
    )
}