import { Button } from "@components";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DateFieldProps } from "@typings";
import { cn } from "@utils";

// Date Lib
import dayjs from "dayjs";
import 'dayjs/locale/pt-br';

export function DateField({
    label,
    date, 
    setDate, 
    style, 
    required = false, 
    setOpenDate = () => { return }
}: DateFieldProps){
    return (
        <label>
            <span className={cn({ "after:absolute after:text-[24px] after:px-1 after:-mt-1 after:content-['*'] after:text-colors-red after:font-semibold": !date && required })}>{label}</span>
            <LocalizationProvider
                dateAdapter={AdapterDayjs}
                adapterLocale="pt-br"
            >
                <DatePicker
                    onOpen={() => setOpenDate(true)}
                    onClose={() => setOpenDate(false)}
                    sx={{
                        outline: "1px solid #808080",
                        borderRadius: "4px",
                        height: "32px",
                        ...style,
                        "& .MuiInputLabel-root.Mui-focused": {
                            color: "#FFFFFF"
                        },
                        "& .MuiOutlinedInput-root": {
                            color: `${style?.color ? style.color : "#E1E1E1"}`,
                            height: "32px",
                            fontSize: "14px"
                        },
                        "& .MuiSvgIcon-root": {
                            color: `${style?.color ? style.color : "#E1E1E1"}`,
                            height: "20px"
                        },
                        "& .Mui-error .MuiOutlinedInput-notchedOutline": {
                            border: "none"
                        }
                    }}
                    maxDate={dayjs(new Date().setMonth(new Date().getMonth() + 1))}
                    value={dayjs(date)}
                    onChange={(e) => setDate(e?.toISOString().split("T")[0] ?? "")}
                    slots={{
                        actionBar: ({ onClear, onSetToday }) => (
                            <div>
                                <Button 
                                    className="absolute bottom-0 mx-4 my-2 right-12 hover:bg-brand-white-gray outline-0"
                                    handleButton={onClear}
                                    value="Limpar"
                                />
                                <Button 
                                    className="absolute bottom-0 right-0 mx-4 my-2 hover:bg-brand-white-gray outline-0"
                                    handleButton={onSetToday}
                                    value="Hoje"
                                />
                            </div>
                        )
                    }}
                />
            </LocalizationProvider>
        </label>
    )
}