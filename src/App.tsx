import { Provider } from 'react-redux';
import './App.css';
import { store } from './store';
import { Route, Routes } from 'react-router';
import { BrowserRouter } from 'react-router-dom';
import { AppBar, Toolbar, Typography, Button, Box, Icon } from '@mui/material';
import WaybillCreationForm from './components/waybills/WaybillCreationForm';
import { OrderList } from './components/orders/OrderList';
import { OrderCreationForm } from './components/orders/OrderCreationForm';
import LocalShippingIcon from '@mui/icons-material/LocalShipping';

const App = () => {
  return (
    <div className="App">
      <Provider store={store}>
        <AppBar position="static" sx={{ marginBottom: 1 }}>
          <Toolbar>
            <Typography
              variant="h6"
              component='a'
              href='/'
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
            <Button color="inherit">Login</Button>
          </Toolbar>
        </AppBar>
        <BrowserRouter>
          <Routes>
            <Route path="*" element={<OrderList />} />
            <Route path="orders" element={<OrderList />} />
            <Route path="orders/new" element={<OrderCreationForm />} />
          </Routes>
        </BrowserRouter>
      </Provider>
    </div>
  );
}

export default App;
