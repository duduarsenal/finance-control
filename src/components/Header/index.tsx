import { cn, Icons } from "@utils";
import { LogoMark, Switch } from '@components'
import { HeaderProps } from "@typings";
import { logout } from "@api";
import { useSessionData } from "@hooks";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

export function Header({ className, setTipoDados, theme, setTheme }: HeaderProps) {

    const { setUserData } = useSessionData()
    const navigate = useNavigate()

    async function handleLogout(){
        await logout()
        setUserData(null)
        navigate("/login")
    }

    function toggleTheme(){        
        if(document.body.classList.contains("dark")){
            document.body.classList.replace("dark", "light")
            localStorage.setItem("theme", "light")
            setTheme("light")
        } else {
            document.body.classList.replace("light", "dark")
            localStorage.setItem("theme", "dark")
            setTheme("dark")
        }
    }

    useEffect(() => {
        const userTheme = localStorage.getItem("theme");
        const systemTheme = window.matchMedia("(prefers-colors-scheme: dark)").matches;
        
        if(userTheme){
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
                <Switch
                    type="button"
                    option1={"Real"}
                    option2={"Fictício"}
                    action1={() => setTipoDados("prod")}
                    action2={() => setTipoDados("mock")}
                />
            </div>
            <Icons.MdOutlineLogout className="text-[30px] mx-2 cursor-pointer rounded-sm hover:brightness-75 text-brand-text" onClick={handleLogout} />

            <div className="absolute bottom-0 left-0 flex flex-col items-center justify-center gap-4 px-1 py-2 m-4 rounded-full bg-brand-hover">
                <Icons.FaMoon className={cn("text-[24px] text-brand-gray transition-all", 
                    {"text-brand-white drop-shadow-[1px_1px_4px_rgba(255,255,255,0.3)]": theme === "dark"}
                )} onClick={toggleTheme}/>
                <Icons.FaSun className={cn("text-[26px] text-brand-gray transition-all", 
                    { "text-colors-yellow drop-shadow-[1px_1px_1px_rgba(0,0,0,0.5)]": theme === "light"}
                )} onClick={toggleTheme}/>
            </div>
        </section>
    )
}