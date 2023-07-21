import logo from './logo.svg';
import './App.css';
import Menu from './componentes/Menu'
import React  from 'react';
import { Routes,Route } from 'react-router-dom';
import { Inicio } from './Paginas/Inicio';
import Calendario from './Paginas/Calendario';
import Graficas from './Paginas/Graficas';
import { Login } from './Paginas/Login';
import Footer from './componentes/Footer';


function App() {
  return(
    <div>
      <Menu/>
      <Routes>
      <Route exact path='/' element={<Inicio/>} />
      <Route exact path='/Calendario' element={<Calendario/>} />
      <Route exact path='/Graficas' element={<Graficas/>} />
      <Route exact path='/Login' element={<Login/>} />

      </Routes>
      <Footer/>
    </div>
  );
}

export default App;
