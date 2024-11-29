import { logout } from "@api";
import { UserProps } from "@typings";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export function useSessionData() {
  const [userData, setUserData] = useState<UserProps | null>({
    username: "",
    usertoken: "",
  });
  const navigate = useNavigate();

  useEffect(() => {
    async function handleSession() {
      
      // inserindo usuario padrao ao abrir o sistema
      const users = localStorage.getItem("usuarios")
      if(!users) {
        localStorage.setItem("usuarios", JSON.stringify([{usuario: "admin", password: import.meta.env.VITE_PASSWORD_BASE64}]))
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      } else if(!JSON.parse(users).some((u: any) => u.usuario === "admin")) {
        localStorage.setItem("usuarios", JSON.stringify([...(JSON.parse(users)), {usuario: "admin", password: import.meta.env.VITE_PASSWORD_BASE64}]))
      }

      const data = await authToken();
      if (!data) {
        logout()
        setUserData(null)
        navigate("/auth")
        return;
      }

      setUserData(data);
      return;
    }

    handleSession();
  }, [navigate, userData?.usertoken])

  return { userData, setUserData };
}

// export async function verifyLogin({
//   username,
//   password,
// }: LoginProps): Promise<UserProps | null> {
//   //Criar requisição para verificar login
//   if (username && password) {
//     return { username: "dudu", usertoken: "tokenzinhogrande" };
//   }
//   return null;
// }

export async function authToken(): Promise<UserProps | null> {

  const data = localStorage.getItem("user")
  
  if(data){
    return JSON.parse(data)
  }

  return null
}

export function usePathname() {
  const [isPageHeader, setIsPageHeader] = useState<boolean>(false);

  function handlePageHeader(v: boolean) {
    setIsPageHeader(v);
  }

  function handlePathname(): boolean {
    return window.location.pathname.split("/")[1] !== "login";
  }

  return { handlePathname, isPageHeader, handlePageHeader };
}
