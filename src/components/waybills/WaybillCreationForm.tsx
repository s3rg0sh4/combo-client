import { Grid, MenuItem, Stack, TextField, Typography } from "@mui/material";
import { Temperature, Waybill } from "../../types";
import { useEffect, useState } from "react";

const WaybillCreationForm = (({value, onUpdate} : {value: Waybill, onUpdate: (updatedWaybill: Waybill) => void}) => {
    const [waybill, setWaybill] = useState<Waybill>(value);

    useEffect(() => {        
        setWaybill(value)
    }, [value]);

    useEffect(() => {
        onUpdate(waybill);
    }, [waybill]);

    return (
        <>
            <Stack spacing={1}>
                <Grid container spacing={1}>
                    <Grid item xs={12}>
                        <Typography>Пункт назначения</Typography>
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            fullWidth
                            size="small"
                            label="Пункт назначения"
                            value={waybill.destination.view}
                            onChange={e => setWaybill({ ...waybill, destination: { ...waybill.destination, view: e.target.value } })}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <Typography>Температурный режим</Typography>
                    </Grid>
                    <Grid item sm={6} xs={12}>
                        <TextField
                            fullWidth
                            size="small"
                            select
                            sx={{ textAlign: 'start' }}
                            label="Температурный режим"
                            onChange={e => setWaybill({ ...waybill, temperature: (e.target.value as Temperature) })}
                            defaultValue={Temperature.None}
                        >{Object.keys(Temperature).map(item =>
                            <MenuItem value={item} key={item}>{item}</MenuItem>
                        )}</TextField>
                    </Grid>
                    <Grid item sm={6} xs={12}>
                        <TextField
                            fullWidth
                            size="small"
                            label="Комментарий"
                            value={waybill.temperatureRemark}
                            onChange={e => setWaybill({ ...waybill, temperatureRemark: e.target.value })}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <Typography>Заявленный товар</Typography>
                    </Grid>
                    <Grid item xs={6} sm={3}>
                        <TextField
                            fullWidth
                            size="small"
                            label="Кол-во паллет"
                            type="number"
                            value={waybill.declaredCargo.palleteCount}
                            onChange={e => setWaybill({ ...waybill, declaredCargo: { ...waybill.declaredCargo, palleteCount: Number(e.target.value) } })}
                        />
                    </Grid>
                    <Grid item xs={6} sm={3}>
                        <TextField
                            fullWidth
                            size="small"
                            label="Кол-во коробок"
                            type="number"
                            value={waybill.declaredCargo.boxCount}
                            onChange={e => setWaybill({ ...waybill, declaredCargo: { ...waybill.declaredCargo, boxCount: Number(e.target.value) } })}
                        />
                    </Grid>
                    <Grid item xs={6} sm={3}>
                        <TextField
                            fullWidth
                            size="small"
                            label="Вес"
                            type="number"
                            value={waybill.declaredCargo.weight}
                            onChange={e => setWaybill({ ...waybill, declaredCargo: { ...waybill.declaredCargo, weight: Number(e.target.value) } })}
                        />
                    </Grid>
                    <Grid item xs={6} sm={3}>
                        <TextField
                            fullWidth
                            size="small"
                            label="Стоимость"
                            type="number"
                            value={waybill.declaredCargo.price}
                            onChange={e => setWaybill({ ...waybill, declaredCargo: { ...waybill.declaredCargo, price: Number(e.target.value) } })}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <Typography>Фактический товар</Typography>
                    </Grid>
                    <Grid item xs={6} sm={3}>
                        <TextField
                            fullWidth
                            size="small"
                            label="Кол-во паллет"
                            type="number"
                            value={waybill.actualCargo.palleteCount}
                            onChange={e => setWaybill({ ...waybill, actualCargo: { ...waybill.actualCargo, palleteCount: Number(e.target.value) } })}
                        />
                    </Grid>
                    <Grid item xs={6} sm={3}>
                        <TextField
                            fullWidth
                            size="small"
                            label="Кол-во коробок"
                            type="number"
                            value={waybill.actualCargo.boxCount}
                            onChange={e => setWaybill({ ...waybill, actualCargo: { ...waybill.actualCargo, boxCount: Number(e.target.value) } })}
                        />
                    </Grid>
                    <Grid item xs={6} sm={3}>
                        <TextField
                            fullWidth
                            size="small"
                            label="Вес"
                            type="number"
                            value={waybill.actualCargo.weight}
                            onChange={e => setWaybill({ ...waybill, actualCargo: { ...waybill.actualCargo, weight: Number(e.target.value) } })}
                        />
                    </Grid>
                    <Grid item xs={6} sm={3}>
                        <TextField
                            fullWidth
                            size="small"
                            label="Стоимость"
                            type="number"
                            value={waybill.actualCargo.price}
                            onChange={e => setWaybill({ ...waybill, actualCargo: { ...waybill.actualCargo, price: Number(e.target.value) } })}
                        />
                    </Grid>
                </Grid>
            </Stack>
        </>
    )
})

export default WaybillCreationForm;