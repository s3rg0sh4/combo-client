import { DateTimePicker as DateTimePickerMUI, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs, { Dayjs } from "dayjs";

export const DateTimePicker = ({label, value, onChange }: { label: string, value: Dayjs | null, onChange: (date: Dayjs | null) => void;  }) => (
    <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="ru">
        <DateTimePickerMUI
            slotProps={{ textField: { size: 'small' } }}
            format="DD.MM.YYYY hh:mm"
            ampm={false}
            label={label}
            value={dayjs(value)}
            onChange={onChange}
         />
    </LocalizationProvider>
)