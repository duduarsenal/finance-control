import { Header, Loading } from "@components";
import { IsErrorProps } from "@typings";
import { Outlet } from "react-router-dom";
import { cn } from "./utils/cn";
import { useState } from "react";

export default function Layout({error}: IsErrorProps) {

  const [isPageHeader, setIsPageHeader] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  
  return (
    <>
      {isPageHeader != "/login" && <Header /> }
      <Loading isTrue={isLoading} />
      <div className={cn("pt-16 h-screen px-28 overflow-x-hidden text-brand-white", { "pt-0": isPageHeader == "/login"})}>
        <img src="src/assets/bg-gradient.png" 
          alt="Background gradient" 
          className="fixed top-0 left-0 w-screen h-screen bg-black object-fit -z-10" 
        />
        {error ? error : <Outlet context={[setIsPageHeader, setIsLoading]} />}
      </div>
    </>
  )
}
