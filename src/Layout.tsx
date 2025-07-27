import { Footer, Header, Loading, NotifyManager, ToggleTheme } from "@components";
import { useNotify } from "@hooks";
import { IsErrorProps } from "@typings";
import { cn } from "@utils";
import { useState } from "react";
import { Outlet } from "react-router-dom";
import { Analytics } from "@vercel/analytics/react";
import { BackgroundDark, BackgroundLight } from '@assets';

export default function Layout({error}: IsErrorProps) {

  const [isPageHeader, setIsPageHeader] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [tipoDados] = useState<string>("prod");
  const [theme, setTheme] = useState<"dark" | "light">("light");
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
    { "justify-center": isPageHeader === "/auth" })}>

      {/* HEADER DO SISTEMA (CASO ESTEJA HABILITADO) */}
      {isPageHeader != "/auth" && <Header theme={theme} setTheme={setTheme} /> }

      {/*  COMPONENTE QUE RENDERIZA O LOADING NO SISTEMA */}
      <Loading isTrue={isLoading} />

      {/* COMPONENTE QUE RENDERIZA AS NOTIFICACOES DO SISTEMA */}
      <NotifyManager notifications={notifications} removeNotification={removeNotification} />

      {/* MAIN PAGE DO SISTEMA */}
      <div className={cn("px-24 text-brand-text", { "pt-0": isPageHeader == "/auth"})}>
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
        {/* CASO O USUARIO ENTRE NUMA ROTA QUE NAO EXISTE ENTRA NA ROTA DE ERROR */}
        {error ? error : <Outlet context={{setIsPageHeader, setIsLoading, addNotification, tipoDados}} />}
      </div>

      {/* SWITCH PARA TROCA DE TEMAS (DARK OU LIGHT) */}
      <ToggleTheme
        theme={theme}
        toggleTheme={toggleTheme}
      />

      {/* FOOTER DO SISTEMA (CASO ESTEJA HABILITADO) */}
      {isPageHeader != "/auth" && <Footer /> }

      {/* ANALYTICS DA VERCEL PARA CONTROLE DE FLUXO */}
      <Analytics/>
    </div>
  )
}
