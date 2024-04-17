import { Button, MenuItem, TextField } from "@mui/material";
import { DateTimePicker, Stepper } from "../../shared";
import { initialWaybill, Temperature, Waybill } from "../../types";
import { useState } from "react";
import { useCreateWaybillMutation } from "../../service/api";
import dayjs, { Dayjs } from "dayjs";

const WaybillCreationForm = () => {
    const [waybill, setWaybill] = useState<Waybill>(initialWaybill);

    const [createWaybill, {}] = useCreateWaybillMutation();

    const handleClick = () => {
        console.log("test");
        createWaybill(waybill);
    }

    const steps = [{
        label: "Товар", content: [
            <DateTimePicker
                key="waybill.arrivalDate"
                label="Дата прибытия на склад"
                value={dayjs(waybill.arrivalDate)}
                onChange={(e: Dayjs | null) => setWaybill({ ...waybill, arrivalDate: e !== null ? e.toDate() : dayjs().toDate() })}
            />,
            <TextField
                key="waybill.destination"
                size="small"
                label="Пункт назначения"
                value={waybill.destination.view}
                onChange={e => setWaybill({ ...waybill, destination: {...waybill.destination, view: e.target.value} })}
            />
        ]
    }, {
        label: "Температурный режим", content: [
            <TextField
                key="waybill.temperatures"
                size="small"
                select
                label="Температурный режим"
                onChange={e => setWaybill({ ...waybill, temperature: (e.target.value as Temperature) })}
                defaultValue={Temperature.None}
            >{
                    Object.keys(Temperature).map(item => <MenuItem value={item} key={item}>{item}</MenuItem>
                    )}</TextField>,
            <TextField
                key="waybill.temperatureRemark"
                size="small"
                label="Комментарий"
                value={waybill.temperatureRemark}
                onChange={e => setWaybill({ ...waybill, temperatureRemark: e.target.value })}
            />
        ]
    }, {
        label: "Заявленный товар", content: [
            <TextField size="small" label="Кол-во паллет"
                type="number"
                key="waybill.declaredCargo.palleteCount"
                value={waybill.declaredCargo.palleteCount}
                onChange={e => setWaybill({ ...waybill, actualCargo: { ...waybill.actualCargo, palleteCount: Number(e.target.value) } })} />,
            <TextField size="small" label="Кол-во коробок"
                type="number"
                key="waybill.declaredCargo.boxCount"
                value={waybill.declaredCargo.boxCount}
                onChange={e => setWaybill({ ...waybill, actualCargo: { ...waybill.actualCargo, boxCount: Number(e.target.value) } })} />,
            <TextField size="small" label="Вес"
                type="number"
                key="waybill.declaredCargo.weight"
                value={waybill.declaredCargo.weight}
                onChange={e => setWaybill({ ...waybill, actualCargo: { ...waybill.actualCargo, weight: Number(e.target.value) } })} />,
            <TextField size="small" label="Стоимость"
                type="number"
                key="waybill.declaredCargo.price"
                value={waybill.declaredCargo.price}
                onChange={e => setWaybill({ ...waybill, actualCargo: { ...waybill.actualCargo, price: Number(e.target.value) } })} />
        ]
    }, {
        label: "Фактический товар", content: [
            <TextField size="small" label="Кол-во паллет"
                type="number"
                key="waybill.declaredCargo.palleteCount"
                value={waybill.declaredCargo.palleteCount}
                onChange={e => setWaybill({ ...waybill, actualCargo: { ...waybill.actualCargo, palleteCount: Number(e.target.value) } })} />,
            <TextField size="small" label="Кол-во коробок"
                type="number"
                key="waybill.declaredCargo.boxCount"
                value={waybill.declaredCargo.boxCount}
                onChange={e => setWaybill({ ...waybill, actualCargo: { ...waybill.actualCargo, boxCount: Number(e.target.value) } })} />,
            <TextField size="small" label="Вес"
                type="number"
                key="waybill.declaredCargo.weight"
                value={waybill.declaredCargo.weight}
                onChange={e => setWaybill({ ...waybill, actualCargo: { ...waybill.actualCargo, weight: Number(e.target.value) } })} />,
            <TextField size="small" label="Стоимость"
                type="number"
                key="waybill.declaredCargo.price"
                value={waybill.declaredCargo.price}
                onChange={e => setWaybill({ ...waybill, actualCargo: { ...waybill.actualCargo, price: Number(e.target.value) } })} />
        ]
    }]

    return (
        <>
            <Button onClick={handleClick}>Создать</Button>
            <Stepper label="Товарно-транспортная накладная" steps={steps} />
        </>
    );
}

export default WaybillCreationForm;