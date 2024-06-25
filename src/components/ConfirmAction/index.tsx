import { ConfirmActionProps } from "@typings";
import { Button } from "@components";

export function ConfirmAction({label, option1, option2, action1, action2}: ConfirmActionProps){
    return (
        <div className="fixed top-0 left-0 w-screen h-screen bg-[#11111160] flex items-center justify-center z-[999]">
            <div className="bg-brand-gray w-[400px] h-[150px] rounded-lg outline -outline-offset-4 outline-solid outline-[3px] outline-brand-white-gray flex justify-between flex-col py-6">
                <span className="w-full text-center text-[20px] font-semibold text-brand-white-gray">{label}</span>
                <div className="flex items-center justify-around w-full">
                    <Button 
                        value={option1}
                        handleButton={action1} 
                        className="bg-brand-white-gray w-[125px] px-2 rounded-md py-1 text-[18px] border-2 border-brand-black hover:scale-[1.05] transition-all"
                    />
                    <Button 
                        value={option2}
                        handleButton={action2} 
                        className="bg-brand-black w-[125px] px-2 rounded-md py-1 text-[18px] border-2 border-bra nd-white-gray hover:scale-[1.05] transition-all"
                    />
                </div>
            </div>
        </div>
    )
}