import { LoginProps, UserProps } from "@typings";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export function useSessionData() {
  const [userData, setUserData] = useState<UserProps>({
    username: "",
    usertoken: "",
  });
  const navigate = useNavigate();

  useEffect(() => {
    async function handleSession() {
      if (!userData?.usertoken) return navigate("/login");

      const data = await authToken(userData);
      if (!data) {
        //criar função de logout()
        navigate("/login");
        return;
      }

      setUserData(data);
      return;
    }

    handleSession();
  }, [navigate, userData?.usertoken])

  useEffect(() => {
    if (userData?.usertoken) {
      localStorage.setItem("token", userData.usertoken);
    }
  }, [userData]);

  return { userData, setUserData };
}

export async function verifyLogin({
  username,
  password,
}: LoginProps): Promise<UserProps | null> {
  //Criar requisição para verificar login
  if (username && password) {
    return { username: "dudu", usertoken: "tokenzinhogrande" };
  }
  return null;
}

export async function authToken(userData: UserProps): Promise<UserProps | null> {

  if(userData.username && userData.usertoken){
    return userData
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
