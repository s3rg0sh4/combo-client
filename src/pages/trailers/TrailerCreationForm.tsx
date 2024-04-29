import { Button, MenuItem, SxProps, TextField, Typography } from '@mui/material';
import React, { useState } from 'react';
import { useCreateTrailerMutation } from '../../service/api';
import { Modal } from '../../shared';
import { initialTrailer, RefrigeratorType, Trailer } from '../../types';


export const TrailerCreationForm = ({ sx, onCreated }: { sx?: SxProps; onCreated: () => void; }) => {
  const [create] = useCreateTrailerMutation();
  const [trailer, setTrailer] = useState<Trailer>(initialTrailer);

  const [modal, setModal] = React.useState(false);
  const handleOpen = () => {
    setModal(true);
  };
  const handleClose = () => {
    setModal(false);
  };

  return (
    <>
      <Button onClick={handleOpen}>Добавить прицеп</Button>
      <Modal open={modal} onClose={handleClose}>
        <>
          <Typography variant='h6'>Добавление прицепа</Typography>
          <TextField label="Госномер" fullWidth margin="normal" value={trailer.plateIndex} onChange={e => setTrailer({ ...trailer, plateIndex: e.target.value })} />
          <TextField label="Производитель" fullWidth margin="normal" value={trailer.brend} onChange={e => setTrailer({ ...trailer, brend: e.target.value })} />
          <TextField label="Макс. кол-во паллет" type="number" fullWidth margin="normal" value={trailer.maxPalletes} onChange={e => setTrailer({ ...trailer, maxPalletes: Number(e.target.value) })} />
          <TextField label="Тип рефрежератора" select sx={{ textAlign: 'start' }} defaultValue={RefrigeratorType.None} fullWidth margin="normal" value={trailer.refrigeratorType} onChange={e => setTrailer({ ...trailer, refrigeratorType: (e.target.value as RefrigeratorType) })}>
            {Object.keys(RefrigeratorType).map(item => <MenuItem value={item} key={item}>{item}</MenuItem>
            )}
          </TextField>

          <Button sx={sx} onClick={() => { create(trailer).then(() => { onCreated(); handleClose(); }); }}>Сохранить</Button>
        </>
      </Modal>
    </>
  );
};
