import { Button, SxProps, TextField, Typography } from '@mui/material';
import React, { ChangeEvent, useState } from 'react';
import { useCreateTruckMutation } from '../../../store/api/truckService';
import { Modal } from '../../../shared';
import { initialTruck, Truck } from '../../../types/truck';


export const TruckCreationForm = ({ sx, onCreated }: { sx?: SxProps; onCreated: () => void; }) => {
  const [create] = useCreateTruckMutation();
  const [truck, setTruck] = useState<Truck>(initialTruck);

  const [modal, setModal] = React.useState(false);
  const handleOpen = () => {
    setModal(true);
  };
  const handleClose = () => {
    setModal(false);
  };

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setTruck({...truck, [name]: value});
  };

  return (
    <>
      <Button onClick={handleOpen}>Добавить грузовик</Button>
      <Modal open={modal} onClose={handleClose}>
        <>
          <Typography variant='h6'>Добавление грузовика</Typography>
          <TextField
            label="Госномер"
            name="plateIndex"
            value={truck.plateIndex}
            onChange={handleChange}
            fullWidth
            margin="normal"
          />
          <TextField
            label="VIN"
            name="vin"
            value={truck.vin}
            onChange={handleChange}
            fullWidth
            margin="normal"
          />
          <TextField
            label="Модель"
            name="model"
            value={truck.model}
            onChange={handleChange}
            fullWidth
            margin="normal"
          />
          <TextField
            label="Год выпуска"
            name="editionYear"
            value={truck.editionYear}
            onChange={handleChange}
            fullWidth
            margin="normal"
          />
          <TextField
            label="Номер двигателя"
            name="motorNumber"
            value={truck.motorNumber}
            onChange={handleChange}
            fullWidth
            margin="normal"
          />
          <TextField
            label="Номер кузова"
            name="bodyNumber"
            value={truck.bodyNumber}
            onChange={handleChange}
            fullWidth
            margin="normal"
          />
          <TextField
            label="Номер шасси"
            name="chassisNumber"
            value={truck.chassisNumber}
            onChange={handleChange}
            fullWidth
            margin="normal"
          />
          <TextField
            label="Цвет"
            name="color"
            value={truck.color}
            onChange={handleChange}
            fullWidth
            margin="normal"
          />
          <TextField
            label="Регистрационный орган"
            name="registerOrgan"
            value={truck.registerOrgan}
            onChange={handleChange}
            fullWidth
            margin="normal"
          />
          <TextField
            label="Топливо"
            name="fuel"
            type="number"
            value={truck.fuel}
            onChange={handleChange}
            fullWidth
            margin="normal"
          />
          <TextField
            label="Расход топлива"
            name="fuelRate"
            type="number"
            value={truck.fuelRate}
            onChange={handleChange}
            fullWidth
            margin="normal"
          />

          <Button sx={sx} onClick={() => { create(truck).then(() => { onCreated(); handleClose(); }); }}>Сохранить</Button>
        </>
      </Modal>
    </>
  );
};
