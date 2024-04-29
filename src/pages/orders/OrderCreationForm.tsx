import { Box, Button, Menu, MenuItem, Stack, Step, StepButton, Stepper, Tab, Tabs, TextField, Typography } from '@mui/material'
import { useState } from 'react'
import { DateTimePicker } from '../../shared'
import dayjs from 'dayjs'
import WaybillCreationForm from '../waybills/WaybillCreationForm'
import { initialWaybill, Waybill } from '../../types'
import { initialOrder, Order } from '../../types/order'
import { useCreateOrderMutation } from '../../store/api/orderService'
import AddIcon from '@mui/icons-material/Add';
import ArticleIcon from '@mui/icons-material/Article';

export const OrderCreationForm = () => {
    const [tab, setTab] = useState(0);
    const [order, setOrder] = useState<Order>({ ...initialOrder, waybills: [initialWaybill] });
    const [createOrder, { }] = useCreateOrderMutation();

    const [contextMenu, setContextMenu] = useState<{ mouseX: number; mouseY: number; } | null>(null);
    const [contextMenuTab, setContextMenuTab] = useState(-1);
    const handleContextMenu = (event: React.MouseEvent, index: number) => {
        event.preventDefault();
        if (contextMenu === null) {
            setContextMenu({ mouseX: event.clientX, mouseY: event.clientY });
            setContextMenuTab(index);
        } else {
            setContextMenu(null);
            setContextMenuTab(-1);
        }
    };

    const handleAdd = () => {
        setOrder({ ...order, waybills: [...order.waybills, initialWaybill] });
        setTab((prevActiveStep) => prevActiveStep + 1);
    }

    const handleRemove = () => {
        if (order.waybills.length > 1) {
            setOrder({ ...order, waybills: order.waybills.filter((_, id) => id !== contextMenuTab) });
            if (tab === contextMenuTab && contextMenuTab === order.waybills.length - 1) {
                setTab(order.waybills.length - 2);
            }
        } else {
            setOrder({ ...order, waybills: [initialWaybill] });
        }
        setContextMenuTab(-1);
    }

    const updateWaybill = (index: number, updatedWaybill: Waybill) => {
        setOrder(() => {
            const newWaybills = [...order.waybills];
            newWaybills[index] = updatedWaybill;
            return { ...order, waybills: newWaybills };
        });
    };

    return (
        <>
            <Box sx={{ margin: 3 }}>
                <Typography variant='h5' marginBottom={1}>Новый заказ</Typography>
                <Stack spacing={3}>
                    <TextField
                        fullWidth
                        size='small'
                        label='Заказчик'
                        value={order.orderer}
                        onChange={(e) => setOrder({ ...order, orderer: e.target.value })}
                    />
                    <DateTimePicker
                        sx={{ width: '100%' }}
                        label='Дата прибытия на склад'
                        value={dayjs(order.arrivalDate)}
                        onChange={(e) => setOrder({ ...order, arrivalDate: e ? e.toDate() : dayjs().toDate() })}
                    />
                </Stack>
                <Tabs
                    variant="scrollable"
                    value={tab}
                    onChange={(_, index) => { index === order.waybills.length ? handleAdd() : setTab(index) }}
                >{order.waybills.map((waybill, index) => (
                    <Tab
                        id={'tab' + index.toString()}
                        key={index}
                        onContextMenu={e => handleContextMenu(e, index)}
                        icon={<ArticleIcon />}
                        iconPosition='start'
                        label={waybill.destination.view}
                    />
                ))}
                    <Tab icon={<AddIcon />} />
                </Tabs>
                <Box sx={{ paddingRight: 1 }}>
                    <WaybillCreationForm
                        key={tab}
                        value={order.waybills[tab]}
                        onUpdate={(updatedWaybill) => updateWaybill(tab, updatedWaybill)}
                    />
                </Box>
                <Button fullWidth sx={{mt: 2}} onClick={() => createOrder(order)}>Создать заказ</Button>
            </Box>
            <Menu
                open={contextMenu !== null}
                onClose={() => setContextMenu(null)}
                anchorReference="anchorPosition"
                anchorPosition={contextMenu !== null
                    ? { top: contextMenu.mouseY, left: contextMenu.mouseX }
                    : undefined
                }
            >
                <MenuItem onClick={handleRemove}>Удалить</MenuItem>
            </Menu>
        </>
    );
}

// const handleRemove = (event: React.MouseEvent) => {
//     if (order.waybills.length > 1) {
//         setOrder({ ...order, waybills: order.waybills.filter((_, id) => id !== activeStep) });
//         if (activeStep === order.waybills.length - 1) {
//             setActiveStep(order.waybills.length - 2);
//         }
//     } else {
//         setOrder({ ...order, waybills: [initialWaybill] });
//     }
// }
{/* <Stack direction="row" margin={2}>
    <Button disabled={activeStep === 0} onClick={() => setActiveStep((prevActiveStep) => prevActiveStep - 1)}>
        Назад
    </Button>
    <Box flexGrow={1} />
    <Button onClick={handleRemove} color='error'>
        Удалить ТТН
    </Button>
    {activeStep === order.waybills.length - 1
        ? <Button onClick={handleAdd}>Добавить ТТН</Button>
        : <Button onClick={() => setActiveStep((prevActiveStep) => prevActiveStep + 1)}>Далее</Button>
    }
</Stack> */}

{/* <Stepper nonLinear activeStep={activeStep} sx={{ justifyContent: 'center' }}>
    {order.waybills.map((waybill, index) => (
        <Step key={index}>
            <StepButton sx={{ marginY: 0 }} onClick={() => setActiveStep(index)}>
                {waybill.destination.view?.length > 0 ? waybill.destination.view : "Товарно-транспортная накладная"}
            </StepButton>
        </Step>
    ))}
</Stepper> */}