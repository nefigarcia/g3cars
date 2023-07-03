import logo from './logo.svg';
import './App.css';
import Menu from './componentes/Menu'
import React  from 'react';
import { Routes,Route } from 'react-router-dom';
import { Inicio } from './Paginas/Inicio';


function App() {
  return(
    <div>
      <Menu/>
      <Routes>
      <Route exact path='/' element={<Inicio/>} />

      </Routes>
    </div>
  );
}

export default App;
