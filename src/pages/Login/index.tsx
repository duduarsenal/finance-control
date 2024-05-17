import { useEffect, useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { VerifyLogin, UseSession } from "@context";
import { useNavigate } from "react-router-dom";

export function Login(){

    const navigate = useNavigate();

    const [passwordType, setPasswordType] = useState<string>("password")

    const [username, setUsername] = useState<string>("");
    const [password, setPassword] = useState<string>("");

    const { userData } = UseSession();

    useEffect(() => {
        if(userData?.usertoken){
            navigate("/")
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [userData])

    function handleLogin(e: Event){
        e.preventDefault();

        console.log(VerifyLogin({username, password}));
    }

    return (
        <div className="flex items-center justify-center h-full select-none">
            <form className="h-80 w-[400px] px-4">
                <h2 className="w-full text-center text-[30px] font-[500]">Dudu Finance</h2>
                <div className="flex flex-col w-full gap-6 py-4">
                    <label htmlFor="username" className="flex flex-col text-[18px]">
                        Username
                        <input 
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            type="text" 
                            className="h-8 rounded-sm text-[20px] text-black outline-none px-1" 
                            autoComplete="off"
                        />
                    </label>
                    <label htmlFor="password" className="flex flex-col text-[18px] relative">
                        Senha
                        <input 
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            type={passwordType}
                            className="h-8 rounded-sm text-[20px] text-black outline-none px-1 pr-9"
                            autoComplete="off"
                        />
                        <span 
                            className="absolute brightness-0 top-2/4 -translate-y-[-5%] right-0 px-2 text-[22px] hover:brightness-50 cursor-pointer transition-all"
                            onClick={() => setPasswordType(prevState => prevState == "password" ? "text" : "password")}
                        >
                            {passwordType == "password" ? <FaEye /> : <FaEyeSlash />}
                        </span>
                    </label>
                </div>
                <button 
                    className="w-full h-10 my-8 transition-all rounded-sm outline-white outline-2 outline hover:bg-[#1f1f1f]"
                    // eslint-disable-next-line @typescript-eslint/no-explicit-any
                    onClick={(e: any) => handleLogin(e)}
                >
                    Entrar
                </button>
            </form>
        </div>
    )
}