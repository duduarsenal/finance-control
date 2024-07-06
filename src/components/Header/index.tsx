import { cn, Icons } from "@utils";
import { LogoMark, Switch } from '@components'
import { HeaderProps } from "@typings";
import { logout } from "@api";
import { useSessionData } from "@hooks";
import { useNavigate } from "react-router-dom";

export function Header({ className, setTipoDados }: HeaderProps) {

    const { setUserData } = useSessionData()
    const navigate = useNavigate()

    async function handleLogout(){
        await logout()
        setUserData(null)
        navigate("/login")
    }

    return (
        <section className={cn("text-brand-white z-[10] flex items-center justify-between w-screen h-16 bg-brand-black px-28", className)}>
            <LogoMark />
            <div className="flex items-center justify-center gap-8">
                <Switch
                    type="button"
                    option1={"Produção"}
                    option2={"Teste"}
                    action1={() => setTipoDados("prod")}
                    action2={() => setTipoDados("mock")}
                />
                <Icons.MdOutlineLogout className="text-[30px] mx-2 cursor-pointer rounded-sm hover:brightness-75" onClick={handleLogout} />
            </div>
        </section>
    )
}