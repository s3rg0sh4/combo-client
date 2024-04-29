import { Provider } from 'react-redux';
import './App.css';
import { store } from './store';
import { Route, Routes, useNavigate } from 'react-router';
import { BrowserRouter } from 'react-router-dom';
import { AppBar, Toolbar, Typography, Button, Box, Container } from '@mui/material';
import { OrderList } from './pages/orders/OrderList';
import { OrderCreationForm } from './pages/orders/OrderCreationForm';
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import { TrailerList } from './pages/transport/trailers/TrailerList';
import { TruckList } from './pages/transport/trucks/TruckList';

const root = '/orders';

const Header = () => {
  const navigate = useNavigate();
  return (
    <AppBar position="static" sx={{ marginBottom: 1 }}>
      <Toolbar>
        <Typography
          variant="h6"
          component='a'
          href={root}
          sx={{
            mr: 2,
            color: 'inherit',
            textDecoration: 'none',
            alignItems: 'center',
            display: 'flex'
          }}
        >
          <LocalShippingIcon sx={{ marginRight: 1 }} />
          Combo
        </Typography>
        <Box flexGrow={1} />
        <Button color='inherit' onClick={() => navigate('orders')}>Заказы</Button>
        <Button color='inherit' onClick={() => navigate('trailers')}>Прицепы</Button>
        <Button color='inherit' onClick={() => navigate('trucks')}>Грузовики</Button>
        <Box flexGrow={1} />
        <Button color="inherit">Login</Button>
      </Toolbar>
    </AppBar>
  )
}

const App = () => {
  return (
    <div className="App">
      <Provider store={store}>
        <BrowserRouter>
          <Header />
          <Routes>
            <Route path='/trailers' element={<TrailerList />} />
            <Route path='/trucks' element={<TruckList />} />
            <Route path="/orders" element={<OrderList />} />
            <Route path="/orders/new" element={<OrderCreationForm />} />
          </Routes>
        </BrowserRouter>
      </Provider>
    </div>
  );
}

export default App;
