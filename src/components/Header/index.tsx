import { cn, Icons } from "@utils";
import { LogoMark } from '@components'
import { HeaderProps } from "@typings";
import { logout } from "@api";
import { useSessionData } from "@hooks";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

export function Header({ className, theme, setTheme }: HeaderProps) {

    const { setUserData } = useSessionData()
    const navigate = useNavigate()

    async function handleLogout(){
        await logout()
        setUserData(null)
        navigate("/login")
    }

    useEffect(() => {
        const userTheme = localStorage.getItem("theme");
        const systemTheme = window.matchMedia("(prefers-colors-scheme: dark)").matches;
        
        if(userTheme){
            document.body.classList.remove("light")
            document.body.classList.remove("dark")
            document.body.classList.add(userTheme)
            setTheme(userTheme)
        } else if(systemTheme){
            setTheme("dark")
        } else {
            setTheme("light")
        }
    }, [])

    return (
        <section className={cn("text-brand-text z-[10] flex items-center justify-between w-screen h-16  bg-brand-background px-28 select-none", className)}>
            <div className="flex items-center justify-center h-16 gap-8">
                <LogoMark theme={theme} />
            </div>
            <Icons.MdOutlineLogout className="text-[30px] mx-2 cursor-pointer rounded-sm hover:brightness-75 text-brand-text" onClick={handleLogout} />
        </section>
    )
}