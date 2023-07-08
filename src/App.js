import logo from './logo.svg';
import './App.css';
import Menu from './componentes/Menu'
import React  from 'react';
import { Routes,Route } from 'react-router-dom';
import { Inicio } from './Paginas/Inicio';
import Calendario from './Paginas/Calendario';


function App() {
  return(
    <div>
      <Menu/>
      <Routes>
      <Route exact path='/' element={<Inicio/>} />
      <Route exact path='/Calendario' element={<Calendario/>} />

      </Routes>
    </div>
  );
}

export default App;
