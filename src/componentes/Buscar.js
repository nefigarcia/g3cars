import React,{useContext, useState, useEffect} from 'react'
import {Col, Row,Form,FormFeedback,FormGroup,FormText, Label,Input,Button,Alert, Jumbotron} from 'reactstrap';
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
  const{dataCarros,setDacarros}=useContext(InfoContext)    
  const{reservaciones,setReservaciones}=useContext(InfoContext)

  useEffect(()=>{
    registrar();
    
},[]); 
  const handleChange = (event) => {
    const { name, value } = event.target;
    setValue((prevState) => {
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
    registrar(startDate,endDate,dateTime,dateTime2)
    .then(console.log("bien"));
}
const registrar=async()=>{
    try {
        let dat={frenta:startDate,fdevolucion:endDate,hrenta:dateTime,hdevolucion:dateTime2};
    let res=await fetch('http://localhost:3001/Disponibles',{
           // let res= fetch('https://shielded-brushlands-89617.herokuapp.com/Disponibles',{
                    method:'POST',
                    mode:'cors',
                    body:JSON.stringify(dat),
                    headers:{'content-type':'application/json'},
                 })
        .then(res=>res.json())
        .then(res=>{
          if(res){setDacarros(res);console.log("res",res)}
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
     <div className='div-center'>
           <Form className='login-form border' onSubmit={(e) =>handleSubmit(e)}>
             <Row>
             <FormGroup>
              <Label>Fecha Renta-Entrega</Label>
            </FormGroup>
            <DatePicker
      selectsRange={true}
      startDate={startDate}
      endDate={endDate}
      onChange={(update) => {
        setDateRange(update);
      }}
      isClearable={true}
    />

             </Row>          
             <Row>
    <Col md={5}>
      <FormGroup>
        <Label for="Nombre">
          Hora renta
        </Label>
        <DatePicker
            selected={dateTime}
            onChange={(date) => {
                setDateTime(date )}}
            showTimeSelect
            showTimeSelectOnly
            timeIntervals={30}
            timeCaption="Hora"
            dateFormat="h:mm aa"
    />
      </FormGroup>
    </Col>
    <Col md={5}>
      <FormGroup>
      <Label for="Nombre">
          Devolucion
        </Label>
        <DatePicker
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
  <div className='d-grid'><button className="btn-md btn btn-primary">Buscar</button></div>
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
         <Carros fechas={{frenta:startDate,fdevolucion:endDate,hrenta:dateTime,hdevolucion:dateTime2}}/>

     </div>
    );
}