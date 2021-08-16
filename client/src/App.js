import React, {useState} from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import FormRegistroLogin from './components/FormRegistroLogin';
import PantallaInicio from './components/PantallaInicio'
import FormCrear from './components/FormCrear'
import FormEstado from './components/FormEstado'
import DeliveryDetails from './components/DeliveryDetails';
import { Router } from '@reach/router';
import DeliveryEdit from './components/DeliveryEdit';
import UserContext from './context/userContext';

function App() {

  const [users, setUsers] = useState({});
  const[listState, setListState] = useState([])

  return (
    <UserContext.Provider value={{users, setUsers}}>
    <div className="App">
      
      <Router>
      <FormRegistroLogin path="/"/>
      <PantallaInicio path="/inicio/"/>
      <FormCrear listState={listState} setListState={setListState} path="/requerimiento/"/>
      <FormEstado deliveryArray={listState} setDeliveryArray={setListState} path="/consulta/"/>
      <DeliveryDetails path="delivery/:id"/>
      <DeliveryEdit path="/edit/:id"/>
      </Router>

    </div>
    </UserContext.Provider>
  );
}

export default App;
