import { TableContainer, Paper, Table, TableHead, TableRow, TableCell, TableBody, Box, Collapse, IconButton, Typography, Button, TablePagination } from "@mui/material"
import { useGetOrderListQuery } from "../../service/api"
import React from "react";
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import { OrderDTO, WaybillDTO } from "../../types/order";
import dayjs from "dayjs";
import { useNavigate } from "react-router";

const SubTable = ({ waybills }: { waybills: WaybillDTO[] }) => {
    return (
        <Box sx={{ margin: 1 }}>
            <Typography variant="body1" sx={{ textAlign: 'center' }} gutterBottom component="div">
                Накладные
            </Typography>
            <Table size="small" aria-label="waybills">
                <TableHead>
                    <TableRow>
                        <TableCell />
                        <TableCell>Пункт назначения</TableCell>
                        <TableCell>Температурный режим</TableCell>
                        <TableCell>Статус</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {waybills.map((waybill) => (
                        <TableRow key={waybill.id} hover>
                            <TableCell />
                            <TableCell>{waybill.destination}</TableCell>
                            <TableCell>{waybill.temperature}</TableCell>
                            <TableCell>{waybill.status}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </Box>
    )
}

const Row = ({ row: order }: { row: OrderDTO }) => {
    const [open, setOpen] = React.useState(false);

    return (
        <React.Fragment>
            <TableRow hover sx={{ '& > *': { borderBottom: 'unset' } }}>
                <TableCell>
                    <IconButton aria-label="expand row" size="small" onClick={() => setOpen(!open)}>
                        {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
                    </IconButton>
                </TableCell>
                <TableCell>{order.waybills.map(w => w.destination).join(', ')}</TableCell>
                <TableCell>{order.orderer}</TableCell>
                <TableCell>{dayjs(order.waybills[0].arrivalDate).format("DD.MM.YYYY hh:mm")}</TableCell>
                <TableCell>{dayjs(order.creationDate).format("DD.MM.YYYY hh:mm")}</TableCell>
            </TableRow>
            <TableRow>
                <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
                    <Collapse in={open} timeout="auto" unmountOnExit>
                        <SubTable waybills={order.waybills} />
                    </Collapse>
                </TableCell>
            </TableRow>
        </React.Fragment>
    );
}

export const OrderList = () => {
    const navigate = useNavigate();

    const { data: orders } = useGetOrderListQuery();

    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(10);

    const handleChangePage = (_event: unknown, newPage: number) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };

    return (
        <>
            <Box marginRight={1} display='flex' justifyContent='end'>
                <Button onClick={() => { navigate('new') }}>Новый заказ</Button>
            </Box>
            <TableContainer sx={{ marginTop: 1 }} component={Paper}>
                <Typography sx={{ marginTop: 1 }} variant="h6" gutterBottom component="div">
                    Заказы
                </Typography>
                <Table stickyHeader>
                    <TableHead>
                        <TableRow>
                            <TableCell />
                            <TableCell>Пункт назначения</TableCell>
                            <TableCell>Заказчик</TableCell>
                            <TableCell>Дата создания</TableCell>
                            <TableCell>Дата прибытия на склад</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {orders && orders.map((order: OrderDTO) =>
                            <Row key={order.id} row={order} />
                        )}
                    </TableBody>
                </Table>
            </TableContainer>
            <TablePagination
                rowsPerPageOptions={[10, 25, 100]}
                component="div"
                count={orders ? orders.length : 0}
                rowsPerPage={rowsPerPage}
                labelRowsPerPage="Записей на странице:"
                page={page}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
            />
        </>
    )
}
