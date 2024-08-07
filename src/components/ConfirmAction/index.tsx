import { ConfirmActionProps } from "@typings";
import { Button } from "@components";

export function ConfirmAction({label, option1, option2, action1, action2}: ConfirmActionProps){
    return (
        <div className="fixed top-0 left-0 w-screen h-screen bg-[#11111190] flex items-center justify-center z-[999]">
            <div className="bg-brand-background px-1 w-[400px] h-[150px] rounded-lg outline outline-solid outline-[1px] outline-brand-border py-2 flex flex-col items-center justify-center gap-5">
                <span className="w-full text-center text-[18px] font-semibold text-brand-text">
                    {label}
                </span>
                <div className="flex items-center justify-around w-full">
                    <Button 
                        value={option1}
                        handleButton={action1} 
                        className="my-0 bg-brand-background w-[125px] py-1 rounded-sm text-[18px] text-brand-text outline outline-[1px] outline-border hover:scale-[1.03] transition-all hover:bg-brand-background"
                    />
                    <Button 
                        value={option2}
                        handleButton={action2} 
                        className="my-0 bg-brand-background w-[125px] px-2 rounded-sm py-1 text-[18px] outline outline-[1px] outline-brand-gray hover:scale-[1.03] transition-all"
                    />
                </div>
            </div>
        </div>
    )
}