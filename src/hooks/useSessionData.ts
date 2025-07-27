/* eslint-disable @typescript-eslint/no-explicit-any */
import { logout, refreshToken } from "@api";
import { UserProps } from "@typings";
import { decodeToken, getToken, setItem } from "@utils";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export function useSessionData() {
  const [userData, setUserData] = useState<UserProps | null>(null);
  const navigate = useNavigate();

  function redirectToLogin() {
    logout()
    setUserData(null)
    navigate("/login")
    return
  }

  async function handleSession(): Promise<{data: string}> {
    const token = getToken()
    if(!token) {
      redirectToLogin()
      throw new Error("Token nao encontrado")
    }

    const result: {data: string} | null = await verifyLogin(token);
    if (!result) {
      redirectToLogin()
      throw new Error("Token inválido")
    }

    return result;
  }
  
  function handleToken(result: {data: string}) {
    if(!result.data) throw new Error("Erro ao buscar token");
    else localStorage.setItem("token", result.data);

    return result
  }

  function handleUserData(result: {data: string}){
    const tokenData = decodeToken(result.data);
    if(!tokenData) throw new Error("Erro ao decodificar token")
    
    setUserData({...tokenData, usertoken: result.data})
  }

  async function verifyLogin(token: string): Promise<{data: string} | null> {
    const result = await refreshToken(token)
    if(!result.data) {
      throw new Error("Token nao encontrado");
    }

    return result;
  }

  useEffect(() => {
    handleSession()
      .then(handleToken)
      .then(handleUserData)
      .catch((err) => {
        console.error(err)
        redirectToLogin()
      })
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    if(userData?.usertoken) {
      setItem('token', userData.usertoken)
    }
  }, [userData])

  return { userData, setUserData, handleUserData };
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
