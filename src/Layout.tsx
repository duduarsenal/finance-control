import { Header } from "@components";
import { IsErrorProps } from "@typings";
import { Outlet } from "react-router-dom";
import { cn } from "./utils/cn";

export default function Layout({error}: IsErrorProps) {

  const page = window.location.pathname;
  const isPageHeader = !(page == "/login");

  return (
    <>
      {isPageHeader && <Header />}
      <div className={cn("pt-16 h-screen px-28", { "pt-0": !isPageHeader})}>
        <img src="src/assets/bg-gradient.png" 
          alt="Background gradient" 
          className="fixed top-0 left-0 w-screen h-screen bg-black object-fit -z-10" 
        />
        {error ? error : <Outlet />}
      </div>
     
    </>
  )
}
