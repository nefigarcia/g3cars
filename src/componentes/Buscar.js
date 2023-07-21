import React,{useContext, useState, useEffect} from 'react'
import {Container, Col, Row,Form,FormFeedback,FormGroup,FormText, Label,Input,Button,Alert, Jumbotron} from 'reactstrap';
//import 'react-date-range/dist/styles.css'; // main css file
//import 'react-date-range/dist/theme/default.css'; // theme css file
//import { DateRange,DateRangePicker } from 'react-date-range';
import { addDays } from 'date-fns';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { Carros } from './Carros';
import moment from "moment/moment";
import { GetReservaciones, getCarros } from '../Gets';
import { InfoContext } from '../context';
import 'react-datepicker/dist/react-datepicker-cssmodules.css';
import 'react-datepicker/dist/react-datepicker.css';
import styled from 'styled-components';






//import { LocalizationProvider } from '@mui/x-date-pickers';
//import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
//import { DatePicker } from '@mui/x-date-pickers/DatePicker';
//import { DemoContainer } from '@mui/x-date-pickers/internals/demo';




export const Buscar=()=>{
    const [state, setState] = useState([
        {
          startDate: new Date(),
          endDate: addDays(new Date(), 1),
          key: 'selection',
          hideCal:false
        }
      ]);
   const[ocultar,setOcultar]=useState(true)   
   const [dateRange, setDateRange] = useState([new Date(), addDays(new Date(),1)]);
  const [startDate, endDate] = dateRange;   

  const [dateTime, setDateTime] = useState(new Date());
  const [dateTime2, setDateTime2] = useState(new Date());

  const[formValue,setValue]=useState({frenta:"",fdevolucion:""})
  const{dataCarros,setDacarros,setLoading}=useContext(InfoContext)    
  const[diftime,setDiftime]=useState("");
  const[servicio,setServicio]=useState("Renta");
  const[taxi,setTaxi]=useState("")
 

  useEffect(()=>{
    registrar();
    
},[]); 
const handleChange = (event) => {
  const { name, value } = event.target;
  setServicio((prevState) => {
    return {
      ...prevState,
      [name]: value,
    };
  });
};   
  function handleSubmit(e){
    e.preventDefault();
    if(!(startDate && endDate && dateTime && dateTime2)){
        return;
    }
    registrar()
    .then(console.log("bien"))
    .catch(error=>{console.log("eeror",error)})
}
const registrar=async()=>{ 
 // var frenta=moment(startDate).format("YYYY-MM-DD")
 // var fdevolucion=moment(startDate).format("YYYY-MM-DD")
 var dtrenta=new Date(startDate.getFullYear(),startDate.getMonth(),startDate.getDate(),dateTime.getHours(),dateTime.getMinutes());     
 var dtdevolucion=new Date(endDate.getFullYear(),endDate.getMonth(),endDate.getDate(),dateTime2.getHours(),dateTime2.getMinutes());     
 var diftime=Math.abs(dtrenta - dtdevolucion) / 36e5;
 setDiftime(diftime);
 setLoading(true);
    try {
        let dat={frenta:dtrenta,fdevolucion:dtdevolucion,hrenta:dateTime,hdevolucion:dateTime2};
        dat.frenta.toJSON=function(){return moment(this).format();}
        dat.fdevolucion.toJSON=function(){return moment(this).format();}
        let res=await fetch('http://localhost:3001/Disponibles',{
      //let res= fetch('https://shielded-brushlands-89617.herokuapp.com/Disponibles',{
                    method:'POST',
                    mode:'cors',
                    body:JSON.stringify(dat),
                    headers:{'content-type':'application/json'},
                 })
        .then(res=>res.json())
        .then(res=>{
          if(res){setDacarros(res);
          setLoading(false);
        }
        })
        
    }catch (error) {
        console.log("err",error)
    }

}  
const ocultarCalendario=item=>{
    setState([item.selection])
    if(item.selection.startDate!==item.selection.endDate){
        setOcultar(true)
        console.log("end",item.selection.endDate)
        console.log("end2",state.endDate)

       // return state.hideCal
    }
}
    return(
     <div className='div-center'>{console.log("serv",servicio)}
           <Form className='login-form ' onSubmit={(e) =>handleSubmit(e)}>
             <Row >
              <Col className="bg-light">
                 <FormGroup div-center>
                 <Label for="tipo">
                 Elige tu servicio
                   </Label>
                 <Input className='w-50 div-center login-form' 
                 id="servicio"
                  name="servicio"
                type="select"
                value={servicio}
                onChange={e=>setServicio(e.target.value)}
                 >
                  <option>Renta</option>
                  <option>Taxi</option>
                  <option>Viaje con conductor</option>
               </Input>
                </FormGroup>
              </Col>
             </Row>
           {servicio==="Taxi" ?
            <>
            <Row md={1}>
              <Col className="bg-light">
                 <FormGroup>
                 <Label for="servicio">
                 Destinos taxi.
                   </Label>
                 <Input 
                 id="taxi"
                  name="taxi"
                type="select"
                value={taxi.aeropuerto}
                onChange={e=>setTaxi(e.target.value)}
                 >
                  <option>Aeropuerto Cancun/Playa del Carmen</option>
                  <option>Playa del Carmen/Aeropuerto Cancun</option>
               </Input>
                </FormGroup>
              </Col>
             </Row>   
            </> : null
           } 
               

             <Row md={1}>
              <Col className="bg-light">
              <Label>Fecha Renta    -    Entrega</Label>
              <FormGroup>
              <DatePicker 
      selectsRange={true}
      startDate={startDate}
      endDate={endDate}
      onChange={(update) => {
        setDateRange(update);
      }}
      isClearable={false}
      onKeyDown={(event) => {
        event.preventDefault();
      }}
    />
              </FormGroup> 
              </Col>
             </Row>        
      <Row md={2}>  
        <Col className="bg-light">
        <Label for="Nombre">
          Renta
        </Label>
        <FormGroup>   
       <DatePicker className='react-datepicker__input-container'
           selected={dateTime}
           onChange={(date) => {
               setDateTime(date )}}
           showTimeSelect
           showTimeSelectOnly
           timeIntervals={60}
           timeCaption="Hora"
           dateFormat="h:mm aa"
           onKeyDown={(event) => {
            event.preventDefault();
          }}
   />
     </FormGroup>
        </Col>    
        <Col className="bg-light">
        <Label for="Nombre">
          Devolucion
        </Label>
        <FormGroup>
     <DatePicker className='react-datepicker__input-container'
           selected={dateTime2}
           onChange={(date) =>{

               setDateTime2(date)}
           } 
           showTimeSelect
           showTimeSelectOnly
           timeIntervals={30}
           timeCaption="Hora"
           dateFormat="h:mm aa"
   />
     </FormGroup>
        </Col> 
    </Row> 
    <Row >
      <Col>    
      <div className='d-grid'><button className="btn-md btn btn-primary">Buscar</button></div>
      </Col>
    </Row>
          </Form>

        {/*  <DateRange 
            editableDateInputs={true}
           // onChange={item => setState([item.selection])}
            onChange={ocultarCalendario}
            moveRangeOnFirstSelection={false}
            ranges={state}
            hidden={ocultar}
/>
<LocalizationProvider dateAdapter={AdapterDayjs}>
      <DemoContainer components={['DateRangePicker']}>
        <DateRangePicker localeText={{ start: 'Check-in', end: 'Check-out' }} />
      </DemoContainer>
    </LocalizationProvider>*/}
    <Loading />
         <Carros fechas={{frenta:startDate,fdevolucion:endDate,hrenta:dateTime,hdevolucion:dateTime2,diftime:diftime,servicio:servicio}}/>

     </div>
    );
}

export const Loading=()=>{
  const{loading}=useContext(InfoContext)    

  return(
    <React.Fragment>
    <Header hidden={!loading} className="container-fluid align-items-center">
  <div className="loader-cont" >
      <div className="loader"></div>
  </div>
  </Header>
  </React.Fragment>
  );
}

const Header=styled.header`
.loader {
  position:absolute;
  top:50%;
  left:50%;
  margin-left:-50px;
  margin-top:-50px;
  border: 16px solid #f3f3f3;
  border-top: 16px solid #3498db;
  border-radius: 50%;
  width: 100px;
  height: 100px;
  animation: spin 2s linear infinite;
}

@keyframes spin {
  0%  { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}
`