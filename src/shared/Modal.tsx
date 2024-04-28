import { Box, Stack, Typography, TextField, Button, Modal as ModalMUI, ButtonBase, ModalOwnProps } from '@mui/material';
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

export const Modal = (props: ModalOwnProps) => {
    return (
        <ModalMUI {...props}>
            <Box sx={modalBaseStyle}>
                {props.children}
            </Box>
        </ModalMUI>
    )
}
