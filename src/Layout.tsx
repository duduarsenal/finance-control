import { Footer, Header, Loading, NotifyManager } from "@components";
import { useNotify } from "@hooks";
import { IsErrorProps } from "@typings";
import { cn } from "@utils";
import { useState } from "react";
import { Outlet } from "react-router-dom";
// Analytics Vercel
import { Analytics } from "@vercel/analytics/react"
// Backgrounds (Light and Dark)
import bgGradient from 'src/assets/bg-gradient.png'
import bgGradientWhite from 'src/assets/bg-gradient-white.png'

export default function Layout({error}: IsErrorProps) {

  const [isPageHeader, setIsPageHeader] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [tipoDados] = useState<string>("prod");
  const [theme, setTheme] = useState<string>("");
  const {notifications, addNotification, removeNotification} = useNotify();

  return (
    <div className={cn("flex flex-col items-center justify-between h-dvh overflow-y-auto overflow-x-hidden", 
    { "justify-center": isPageHeader === "/login" })}>
      {isPageHeader != "/login" && <Header theme={theme} setTheme={setTheme} /> }
      <Loading isTrue={isLoading} />
      <NotifyManager notifications={notifications} removeNotification={removeNotification} />
      <div className={cn("px-24 text-brand-text", { "pt-0": isPageHeader == "/login"})}>
        <img src={bgGradientWhite}
          alt="Background gradient" 
          className={cn("fixed top-0 left-0 w-screen h-screen object-fit -z-10 rotate-180 bg-white", 
            { "hidden": theme !== "light" }
          )} 
        />
        <img src={bgGradient}
          alt="Background gradient" 
          className={cn("fixed top-0 left-0 rotate-0 w-screen h-screen object-fit -z-10 transition-all bg-black duration-500",
            { "w-0 h-0 top-2/4 left-2/4 translate-y-2/4 rounded-full": theme !== "dark" }
          )} 
        />
        {error ? error : <Outlet context={{setIsPageHeader, setIsLoading, addNotification, tipoDados}} />}
      </div>
      {isPageHeader != "/login" && <Footer /> }
      <Analytics/>
    </div>
  )
}
