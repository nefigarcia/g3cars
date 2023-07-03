import React,{useState} from 'react'
import {Col, Row,Form,FormFeedback,FormGroup,FormText, Label,Input,Button,Alert, Jumbotron} from 'reactstrap';
import 'react-date-range/dist/styles.css'; // main css file
import 'react-date-range/dist/theme/default.css'; // theme css file
import { DateRange,DateRangePicker } from 'react-date-range';
import { addDays } from 'date-fns';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { Carros } from './Carros';

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
            
           <Form className='login-form border' onSubmit={(e) => this.handleSubmit(e)}>
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
        <Input 
          id="renta"
          name="renta"
          placeholder="Obligatorio"
          type="time"
        />
      </FormGroup>
    </Col>
    <Col md={5}>
      <FormGroup>
      <Label for="Nombre">
          Devolucion
        </Label>
        <Input 
          id="devolucion"
          name="devolucion"
          placeholder="Obligatorio"
          type="time"
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
         <Carros/>

     </div>
    );
}