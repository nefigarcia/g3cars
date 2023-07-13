import 'bootstrap/dist/css/bootstrap.css';
import React, { useState, useContext } from 'react';
import {Link} from 'react-router-dom';
import { FaHome } from "react-icons/fa";
import {FaRegCalendarAlt} from "react-icons/fa";
import {FaPeopleArrows} from "react-icons/fa";
import {FaCreditCard} from "react-icons/fa";
import {BsBookFill} from "react-icons/bs";
import {BsMegaphone,BsFillPersonFill} from "react-icons/bs";
import {FaAddressBook} from "react-icons/fa";
import {FaArchive} from "react-icons/fa";
import {BsPlusLg} from "react-icons/bs";
import {AiOutlineUserAdd} from "react-icons/ai";
import {IoIosPersonAdd} from "react-icons/io";
//import { InfoConsumer, InfoContext } from '../context';
 
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  Dropdown,
  Button,
  List
} from 'reactstrap';

const NavApp = (props) => {
  const [isOpen, setIsOpen] = useState(false);
  const toggle = () => setIsOpen(!isOpen);

  const [collapsedd, setCollapsedd] = useState(false);
  const toggleNavbarr = () => setCollapsedd(!collapsedd);
//const {esta,setEsta,estaMenu,cuentEmail,daCuenta,dataChange}=useContext(InfoContext);
     
        return(
          <div>    
        <Navbar color="light" light >
          <NavbarBrand  href="/">G3cars</NavbarBrand>
          <Nav>
            <Link to="/Login">
            <Button  outline color="primary">Login</Button>{' '}
            </Link>
            
              
            <i className="fas fa-caret-up">  </i>
            <Dropdown   isOpen={collapsedd} toggle={toggleNavbarr}>
              <DropdownToggle><BsFillPersonFill/>
                </DropdownToggle>
              <DropdownMenu>
                <DropdownItem header>
                <i className="fas fa-caret-up">Perfil   </i>
                </DropdownItem>
                <DropdownItem>Mi perfil</DropdownItem>
                <DropdownItem disabled>Escuela configuracion </DropdownItem>
                <DropdownItem divider />
                
                <DropdownItem><AiOutlineUserAdd/>Permisos</DropdownItem>
            
                
                <DropdownItem>Soporte</DropdownItem>
                <DropdownItem>logout</DropdownItem>
              </DropdownMenu>
            </Dropdown>
          </Nav>

        
  
          <Nav className="container-fluid">
          <NavbarToggler  className="me-2" onClick={toggle} />
          </Nav>
          <Collapse isOpen={isOpen} navbar>
            <Nav  navbar >
            <NavItem>
                <Link to={'/Calendario'}><NavLink><i className='icon'><FaAddressBook/>Calendario</i></NavLink></Link>
              </NavItem>
              <NavItem>
                <Link><NavLink><i className='icon'><FaAddressBook/>Reportes</i></NavLink></Link>
              </NavItem>
              <NavItem>
                <Link to={'/Graficas'}><NavLink><i className='icon'><FaArchive/>Graficas</i></NavLink></Link>
              </NavItem>
            </Nav>
          </Collapse>
        
        </Navbar>
      
      </div>
        );
}


export default NavApp;
