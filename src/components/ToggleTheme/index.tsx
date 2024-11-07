import { ToggleThemeProps } from "@typings";
import { cn, Icons } from "@utils";

export function ToggleTheme({theme, toggleTheme}: ToggleThemeProps){
    return (
        <>
            <div className="absolute bottom-0 left-0 flex flex-col items-center justify-center gap-2 m-4 rounded-full bg-brand-hover">
                <div className={cn("py-2 px-1 transition-all duration-500", {"w-[120%] h-[130%] bg-brand-gray rounded-full flex items-center justify-center": theme === "dark"})}>
                    <Icons.FaMoon 
                        className={cn("text-[26px] text-brand-gray transition-all", 
                        {"text-brand-white drop-shadow-[1px_1px_4px_rgba(255,255,255,0.3)]": theme === "dark"}
                        )} 
                        onClick={toggleTheme}
                    />
                    </div>
                    <div className={cn("py-2 px-1 transition-all duration-500", {"w-[120%] h-[130%] bg-brand-gray rounded-full flex items-center justify-center": theme === "light"})}>
                    <Icons.FaSun 
                        className={cn("text-[26px] text-brand-gray transition-all", 
                        {"text-colors-yellow drop-shadow-[1px_1px_1px_rgba(0,0,0,0.5)]": theme === "light"}
                        )} 
                        onClick={toggleTheme}
                    />
                </div>
            </div>
        </>
    )
}