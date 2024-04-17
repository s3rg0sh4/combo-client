import { MenuItem, SelectChangeEvent, TextField } from '@mui/material'
import { SelectInputProps } from '@mui/material/Select/SelectInput'
import { start } from 'repl'

// export const Select = ({ id, label, items, onChange }: { onChange: (event: SelectChangeEvent) => void, items: string[], label: string, id: string }) => (
//     <FormControl size="small">
//         <InputLabel  id={id + "-label"}>Температурный режим</InputLabel>
//         <SelectMUI
//             labelId={id + "-label"}
//             label={label}
//             onChange={onChange}
//             defaultValue={items[0]}
//         >{
//             items.map(item => <MenuItem value={item} key={item}>{item}</MenuItem>
//         )}
//         </SelectMUI>
//     </FormControl>
// )

export const Select = ({ id, label, items, onChange }: { onChange: (event: SelectChangeEvent) => void, items: string[], label: string, id: string }) => (

    <TextField
        id="outlined-select-currency"
        select
        label={label}
        // onChange={onChange}
        defaultValue={items[0]}
    >
        {
            items.map(item => <MenuItem value={item} key={item}>{item}</MenuItem>
        )}
    </TextField>
)
