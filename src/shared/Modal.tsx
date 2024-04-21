import { Box, Stack, Typography, TextField, Button, Modal as ModalMUI, ButtonBase } from '@mui/material';
import { DateTimePicker } from '@mui/x-date-pickers';
import dayjs from 'dayjs';
import React, { ReactNode } from 'react'

const modalBaseStyle = {
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    boxShadow: 24,
    pt: 2,
    px: 4,
    pb: 3,
};

interface ModalProps {
    buttonLabel: string;
    children: ReactNode;
}

export const Modal = ({children, buttonLabel} : ModalProps) => {
    const [modal, setModal] = React.useState(false);
    const handleOpen = () => {
        setModal(true);
    };
    const handleClose = () => {
        setModal(false);
    };

    return (
        <>
            <ModalMUI open={modal} onClose={handleClose}>
                <Box sx={modalBaseStyle}>
                    {children}
                </Box>
            </ModalMUI>
            <Button onClick={handleOpen}>{buttonLabel}</Button>
        </>
    )
}
