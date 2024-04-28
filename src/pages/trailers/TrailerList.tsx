import { Box, Button, CircularProgress, MenuItem, SxProps, Table, TextField, Typography } from '@mui/material'
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import React, { useEffect, useState } from 'react'
import { useCreateTrailerMutation, useDeleteTrailerListMutation, useGetTrailerListQuery } from '../../service/api';
import { Modal } from '../../shared';
import { initialTrailer, RefrigeratorType, Trailer } from '../../types';

export const TrailerCreationForm = ({ sx, onCreated }: { sx?: SxProps, onCreated: () => void }) => {
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
          <TextField label="Номер" fullWidth margin="normal" value={trailer.number} onChange={e => setTrailer({ ...trailer, number: e.target.value })} />
          <TextField label="Макс. кол-во паллет" type="number" fullWidth margin="normal" value={trailer.maxPalletes} onChange={e => setTrailer({ ...trailer, maxPalletes: Number(e.target.value) })} />
          <TextField label="Тип рефрежератора" select sx={{ textAlign: 'start' }} defaultValue={RefrigeratorType.None} fullWidth margin="normal" value={trailer.refrigeratorType} onChange={e => setTrailer({ ...trailer, refrigeratorType: (e.target.value as RefrigeratorType) })} >
            {Object.keys(RefrigeratorType).map(item =>
              <MenuItem value={item} key={item}>{item}</MenuItem>
            )}
          </TextField>

          <Button sx={sx} onClick={() => { create(trailer).then(() => { onCreated(); handleClose() }); }}>Сохранить</Button>
        </>
      </Modal>
    </>
  )
}

const columns: GridColDef[] = [
  { field: 'plateIndex', headerName: 'Госномер', width: 130 },
  { field: 'brend', headerName: 'Марка', width: 130 },
  { field: 'number', headerName: 'Номер', width: 130 },
  { field: 'maxPalletes', headerName: 'Вместимость паллет', type: 'number', width: 120 },
  { field: 'refrigeratorType', headerName: 'Тип рефрежератора', width: 160 },
];

export const TrailerList = () => {
  const { data: trailers, isLoading, isError, refetch: refetchTrailers } = useGetTrailerListQuery();

  const [deleteRange, { isSuccess: isDeleted }] = useDeleteTrailerListMutation();
  const [selected, setSelected] = useState<string[]>([]);

  useEffect(() => {
    refetchTrailers();
  }, [isDeleted])

  if (isLoading) {
    return (<CircularProgress />)
  }

  if (isError && (!trailers || trailers.length === 0)) {
    return (<TrailerCreationForm onCreated={refetchTrailers} />)
  }

  return (
    <Box>
      <Box sx={{ display: 'flex' }}>
        <Button color='error' onClick={() => deleteRange(selected)}>Удалить</Button>
        <Box sx={{ flexGrow: 1 }} />
        <TrailerCreationForm onCreated={refetchTrailers} />
      </Box>
      <DataGrid
        rows={trailers}
        columns={columns}
        initialState={{
          pagination: {
            paginationModel: { page: 0, pageSize: 5 },
          },
        }}
        pageSizeOptions={[5, 10, 15]}
        checkboxSelection
        onRowSelectionModelChange={(model) => setSelected(model.map(id => String(id.valueOf())))}
      />
    </Box>
  )
}
