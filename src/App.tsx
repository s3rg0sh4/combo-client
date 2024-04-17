import { Provider } from 'react-redux';
import './App.css';
import WaybillCreationForm from './components/waybills/WaybillCreationForm'
import { AppBar, Button, Container, Stack, Toolbar, Typography } from '@mui/material';
import { store } from './store';

function App() {
  return (
    <div className="App">
      <Provider store={store}>
        <Stack spacing={1}>
          <AppBar position="static">
            <Toolbar>
              <Typography variant="h6" sx={{ flexGrow: 1 }}>
                Combo
              </Typography>
              <Button color="inherit">Login</Button>
            </Toolbar>
          </AppBar>
          <Container>
            <WaybillCreationForm />
          </Container>
        </Stack>
      </Provider>
    </div>
  );
}

export default App;
