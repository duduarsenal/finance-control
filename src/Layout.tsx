import { Footer, Header, Loading, NotifyManager } from "@components";
import { useNotify } from "@hooks";
import { IsErrorProps } from "@typings";
import { cn, Icons } from "@utils";
import { useState } from "react";
import { Outlet } from "react-router-dom";
// Analytics Vercel
import { Analytics } from "@vercel/analytics/react"
// Backgrounds (Light and Dark)
import { BackgroundDark, BackgroundLight } from '@assets'

export default function Layout({error}: IsErrorProps) {

  const [isPageHeader, setIsPageHeader] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [tipoDados] = useState<string>("prod");
  const [theme, setTheme] = useState<string>("");
  const {notifications, addNotification, removeNotification} = useNotify();

  function toggleTheme(){       
    if(document.body.classList.contains("dark")){
        setTheme("light")
        setTimeout(() => {
            document.body.classList.replace("dark", "light")
            localStorage.setItem("theme", "light")
        }, 300) 
    } else {
        setTheme("dark")
        setTimeout(() => {
            document.body.classList.replace("light", "dark")
            localStorage.setItem("theme", "dark")
        }, 300) 
    }
  }

  return (
    <div className={cn("flex flex-col items-center justify-between h-dvh overflow-y-auto overflow-x-hidden", 
    { "justify-center": isPageHeader === "/login" })}>
      {isPageHeader != "/login" && <Header theme={theme} setTheme={setTheme} /> }
      <Loading isTrue={isLoading} />
      <NotifyManager notifications={notifications} removeNotification={removeNotification} />
      <div className={cn("px-24 text-brand-text", { "pt-0": isPageHeader == "/login"})}>
        <img src={BackgroundLight}
          alt="Background gradient" 
          className={cn("fixed top-0 left-0 w-screen h-screen object-fit -z-10 rotate-180 bg-white", 
            { "hidden": theme !== "light" }
          )} 
        />
        <img src={BackgroundDark}
          alt="Background gradient" 
          className={cn("fixed top-0 left-0 rotate-0 w-screen h-screen object-fit -z-10 transition-all bg-black duration-500",
            { "w-0 h-0 top-2/4 left-2/4 translate-y-2/4 rounded-full": theme !== "dark" }
          )} 
        />
        {error ? error : <Outlet context={{setIsPageHeader, setIsLoading, addNotification, tipoDados}} />}
      </div>
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
      {isPageHeader != "/login" && <Footer /> }
      <Analytics/>
    </div>
  )
}
