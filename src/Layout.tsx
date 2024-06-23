import { Footer, Header, Loading, NotifyManager } from "@components";
import { useNotify } from "@hooks";
import { IsErrorProps } from "@typings";
import { cn } from "@utils";
import { useState } from "react";
import { Outlet } from "react-router-dom";

export default function Layout({error}: IsErrorProps) {

  const [isPageHeader, setIsPageHeader] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const {notifications, addNotification, removeNotification} = useNotify();

  return (
    <div className={cn("flex flex-col items-center justify-between h-screen overflow-y-auto overflow-x-hidden", 
    { "justify-center": isPageHeader === "/login" })}>
      {isPageHeader != "/login" && <Header /> }
      <Loading isTrue={isLoading} />
      <NotifyManager notifications={notifications} removeNotification={removeNotification} />
      <div className={cn("px-28 text-brand-white", { "pt-0": isPageHeader == "/login"})}>
        <img src="src/assets/bg-gradient.png" 
          alt="Background gradient" 
          className="fixed top-0 left-0 w-screen h-screen bg-black object-fit -z-10" 
        />
        {error ? error : <Outlet context={{setIsPageHeader, setIsLoading, addNotification}} />}
      </div>
      {isPageHeader != "/login" && <Footer /> }
    </div>
  )
}
