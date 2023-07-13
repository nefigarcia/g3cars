import logo from './logo.svg';
import './App.css';
import Menu from './componentes/Menu'
import React  from 'react';
import { Routes,Route } from 'react-router-dom';
import { Inicio } from './Paginas/Inicio';
import Calendario from './Paginas/Calendario';
import Graficas from './Paginas/Graficas';


function App() {
  return(
    <div>
      <Menu/>
      <Routes>
      <Route exact path='/' element={<Inicio/>} />
      <Route exact path='/Calendario' element={<Calendario/>} />
      <Route exact path='/Graficas' element={<Graficas/>} />

      </Routes>
    </div>
  );
}

export default App;
