import { Box, Button, CircularProgress, Table } from '@mui/material'
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import { useEffect, useState } from 'react'
import { useDeleteTrailerListMutation, useGetTrailerListQuery } from '../../../service/api';
import { TrailerCreationForm } from './TrailerCreationForm';

const columns: GridColDef[] = [
  { field: 'plateIndex', headerName: 'Госномер', width: 130 },
  { field: 'brend', headerName: 'Марка', width: 130 },
  { field: 'maxPalletes', headerName: 'Вместимость паллет', type: 'number', width: 120, align: 'left', headerAlign: 'left' },
  { field: 'refrigeratorType', headerName: 'Тип рефрежератора', width: 160 },
];

export const TrailerList = () => {
  const { data: trailers, isLoading, isError, refetch } = useGetTrailerListQuery();

  const [deleteRange, { isSuccess: isDeleted }] = useDeleteTrailerListMutation();
  const [selected, setSelected] = useState<string[]>([]);

  useEffect(() => {
    refetch();
  }, [isDeleted])

  if (isLoading) {
    return (<CircularProgress />)
  }

  if (!isError && (!trailers || trailers.length === 0)) {
    return (<TrailerCreationForm onCreated={refetch} />)
  }

  return (
    <Box>
      <Box sx={{ display: 'flex' }}>
        <Button color='error' onClick={() => deleteRange(selected)}>Удалить</Button>
        <Box sx={{ flexGrow: 1 }} />
        <TrailerCreationForm onCreated={refetch} />
      </Box>
      <DataGrid
        key='trailerList'
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
