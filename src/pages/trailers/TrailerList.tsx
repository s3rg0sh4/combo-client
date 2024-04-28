import { Button, MenuItem, Table, TextField } from '@mui/material'
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import React, { useState } from 'react'
import { useCreateTrailerMutation, useGetTrailerListQuery } from '../../service/api';
import { Modal } from '../../shared';
import { initialTrailer, RefrigeratorType, Trailer } from '../../types';

const columns: GridColDef[] = [
  { field: 'plateIndex', headerName: 'Госномер', width: 130 },
  { field: 'brend', headerName: 'Марка', width: 130 },
  { field: 'number', headerName: 'Номер', width: 130 },
  { field: 'maxPalletes', headerName: 'Вместимость паллет', type: 'number', width: 120 },
  { field: 'refrigeratorType', headerName: 'Тип рефрежератора', width: 160 },
];

export const TrailerCreationForm = () => {
  const [create] = useCreateTrailerMutation();
  const [trailer, setTrailer] = useState<Trailer>(initialTrailer)

  return (
    <Modal buttonLabel='Создать'>
      <TextField label="Plate Index" fullWidth margin="normal" value={trailer.plateIndex} onChange={e => setTrailer({ ...trailer, plateIndex: e.target.value })} />
      <TextField label="Brend" fullWidth margin="normal" value={trailer.brend} onChange={e => setTrailer({ ...trailer, brend: e.target.value })} />
      <TextField label="Number" fullWidth margin="normal" value={trailer.number} onChange={e => setTrailer({ ...trailer, number: e.target.value })} />
      <TextField label="Max Palletes" type="number" fullWidth margin="normal" value={trailer.maxPalletes} onChange={e => setTrailer({ ...trailer, maxPalletes: Number(e.target.value) })} />
      <TextField label="Refrigerator Type" select sx={{ textAlign: 'start' }} defaultValue={RefrigeratorType.None} fullWidth margin="normal" value={trailer.refrigeratorType} onChange={e => setTrailer({ ...trailer, refrigeratorType: (e.target.value as RefrigeratorType) })} >
        {Object.keys(RefrigeratorType).map(item =>
          <MenuItem value={item} key={item}>{item}</MenuItem>
        )}
      </TextField>

      <Button onClick={() => create(trailer)}>Сохранить</Button>
    </Modal>
  )
}

export const TrailerList = () => {
  const { data: trailers } = useGetTrailerListQuery();

  if (!trailers || trailers.length === 0) {
    return (<TrailerCreationForm />)
  }

  return (
    <DataGrid
      rows={trailers}
      columns={columns}
      initialState={{
        pagination: {
          paginationModel: { page: 0, pageSize: 5 },
        },
      }}
      pageSizeOptions={[5, 10]}
      checkboxSelection
    />
  )
}
