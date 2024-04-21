import { SxProps } from "@mui/material";
import { DateTimePicker as DateTimePickerMUI, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs, { Dayjs } from "dayjs";

export const DateTimePicker = ({label, sx, value, onChange }: { 
    label: string, 
    sx: SxProps
    value: Dayjs | null, 
    onChange: (date: Dayjs | null) => void
}) => (
    <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="ru">
        <DateTimePickerMUI
            slotProps={{ textField: { size: 'small' } }}
            sx={sx}
            format="DD.MM.YYYY hh:mm"
            ampm={false}
            label={label}
            value={dayjs(value)}
            onChange={onChange}
         />
    </LocalizationProvider>
)