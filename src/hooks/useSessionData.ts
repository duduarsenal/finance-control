import { LoginProps, UserProps } from "@typings";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export function useSessionData() {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [userData, setUserData] = useState<UserProps>({
    username: "",
    usertoken: "",
  });
  const navigate = useNavigate();

  useEffect(() => {
    async function handleSession() {
      const x = false
      if (!userData?.usertoken && x) return navigate("/login");
      // const data = await authToken();

      // if (!data && 1 * 1 == 2) {
      //   //criar função de logout()
      //   navigate("/login");
      //   return;
      // }

      setUserData({ username: "", usertoken: "" });
      return;
    }

    handleSession();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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

export async function authToken(): Promise<null> {
  return null;
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
