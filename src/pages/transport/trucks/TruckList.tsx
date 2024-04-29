import { Box, Button, CircularProgress, Table } from '@mui/material'
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import { useEffect, useState } from 'react'
import { useDeleteTruckListMutation, useGetTruckListQuery } from '../../../store/api/truckService';
import { TruckCreationForm } from './TruckCreationForm';

const columns: GridColDef[] = [
  { field: 'plateIndex', headerName: 'Госномер', width: 130 },
  { field: 'vin', headerName: 'VIN', width: 130 },
  { field: 'model', headerName: 'Модель', width: 130 },
  { field: 'editionYear', headerName: 'Год выпуска', width: 130 },
  { field: 'motorNumber', headerName: 'Номер двигателя', width: 130 },
  { field: 'bodyNumber', headerName: 'Номер кузова', width: 130 },
  { field: 'chassisNumber', headerName: 'Номер шасси', width: 130 },
  { field: 'color', headerName: 'Цвет', width: 130 },
  { field: 'registerOrgan', headerName: 'Регистрационный орган', width: 130 },
  { field: 'fuel', headerName: 'Топливо', type: 'number', width: 90, align: 'left', headerAlign: 'left' },
  { field: 'fuelRate', headerName: 'Расход топлива', type: 'number', width: 100, align: 'left', headerAlign: 'left' },
];

export const TruckList = () => {
  const { data: trucks, isLoading, isError, refetch } = useGetTruckListQuery();

  const [deleteRange, { isSuccess: isDeleted }] = useDeleteTruckListMutation();
  const [selected, setSelected] = useState<string[]>([]);

  useEffect(() => {
    refetch();
  }, [isDeleted])

  if (isLoading) {
    return (<CircularProgress />)
  }

  if (!isError && (!trucks || trucks.length === 0)) {
    return (<TruckCreationForm onCreated={refetch} />)
  }

  return (
    <Box>
      <Box sx={{ display: 'flex' }}>
        <Button color='error' onClick={() => deleteRange(selected)}>Удалить</Button>
        <Box sx={{ flexGrow: 1 }} />
        <TruckCreationForm onCreated={refetch} />
      </Box>
      <DataGrid
        key='truckList'
        rows={trucks}
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
