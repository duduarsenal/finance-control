import { Button } from "@components";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DateFieldProps } from "@typings";

// Date Lib
import dayjs from "dayjs";
import 'dayjs/locale/pt-br';

export function DateField({date, setDate, style}: DateFieldProps){
    return (
        <LocalizationProvider
            dateAdapter={AdapterDayjs}
            adapterLocale="pt-br"
        >
            <DatePicker
                sx={{
                    outline: "1px solid #808080",
                    borderRadius: "4px",
                    height: "32px",
                    ...style,
                    "& .MuiInputLabel-root.Mui-focused": {
                        color: "#FFFFFF"
                    },
                    "& .MuiOutlinedInput-root": {
                        color: `${style?.color ? style.color : "#FFFFFF"}`,
                        height: "32px",
                        fontSize: "14px"
                    },
                    "& .MuiSvgIcon-root": {
                        color: `${style?.color ? style.color : "#FFFFFF"}`,
                        height: "20px"
                    },
                    "& .Mui-error .MuiOutlinedInput-notchedOutline": {
                        border: "none"
                    }
                }}
                maxDate={dayjs()}
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
    )
}