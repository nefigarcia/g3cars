import React, { useContext, useEffect, useState } from "react";
import { Row,Button, Modal, ModalHeader, ModalBody, ModalFooter,   Form, FormFeedback, FormGroup, FormText,Label, Input, Alert, Col} from "reactstrap";
import { InfoContext } from "../context";
import moment from "moment/moment";
import { getReservaciones } from "../Gets";

 export const Carros=(props)=>{
    const{dataCarros,setReservaciones}=useContext(InfoContext)
    const[formValue,setValue]=useState({frenta:"",fdevolucion:""})

    useEffect(()=>{
      getReservaciones()
      .then(res=>{
        setReservaciones(res)
      })
    },[])
    return(
        <div className="div-center">
         <div className="login-form">Vehiculos disponibles
         {dataCarros.map(item=>{
        return   <Carrosres fechas={props.fechas} key={item.Id} item={item} />
         })}
        </div>
        </div>     
    );
 }
export const Carrosres=(props)=>{
    return(   
    
         <div className="card shadow " >
            <img src={props.item.Foto} />
            <div className="card-body">
                <h3 className="card-title text-uppercase">
                   {props.item.Marca}
                </h3>
                <p className="card-text">{props.item.Modelo}</p>
                <p className="card-text">Transmision {props.item.Transmision}</p>
                <p className="card-text fa fa-usd">Puertas {props.item.Puertas}</p><br></br>
                <Reservar fechas={props.fechas}  item={props.item}/>
               {/* <Link to='/Details' onClick={()=>value.handleDetail(id)} className="btn btn-primary">
                    Mas Info...
                </Link>
                <Link to='/Details' >
                    <button className="btn btn-primary" disabled={!loading}>Modificar</button>
    </Link>*/}
            </div>
        </div>
    );
 }

 export const Reservar=(props)=>{
    const[loading,setLoading]=useState(false);
    const[error,setError]=useState({mensajeError:"",erro:false})
    const{mensajeError,erro}=error
    
    const[formValue,setValue]=useState({nombre:"",apellido:"",email:"",cel:"",frenta:"",fdevolucion:"",validate: {emailState: ''},submitted:false})
    const{nombre,apellido,email,cel,validate,submitted}=formValue;  
    const[validar,setValidar]=useState("")
    const{reservaciones,setReservaciones}=useContext(InfoContext)

    const [modal, setModal] = useState(false);
    const toggle = () => {
        setModal(!modal);
    }
    
    function handleSubmit(e){
        e.preventDefault();
        if(!(nombre && apellido && email && cel)){
            return;
        }
        registrar(nombre,apellido,email,cel)
        .then(setLoading(true));
    }
  

    function registrar(){
    var dtrenta=new Date(props.fechas.frenta.getFullYear(),props.fechas.frenta.getMonth(),props.fechas.frenta.getDate(),props.fechas.hrenta.getHours(),props.fechas.hrenta.getMinutes());     
    var dtdevolucion=new Date(props.fechas.fdevolucion.getFullYear(),props.fechas.fdevolucion.getMonth(),props.fechas.fdevolucion.getDate(),props.fechas.hdevolucion.getHours(),props.fechas.hdevolucion.getMinutes());     
 
    let dat={nombre:nombre,apellido:apellido,email:email,cel:cel,frenta:dtrenta,fdevolucion:dtdevolucion,hrenta:props.fechas.hrenta,hdevolucion:props.fechas.hdevolucion,idcarro:props.item.Id};
      dat.frenta.toJSON=function(){return moment(this).format();}
      dat.fdevolucion.toJSON=function(){return moment(this).format();}

        dat.hrenta.toJSON=function(){ return moment(this).format(); }
       dat.hdevolucion.toJSON=function(){ return moment(this).format(); }
       return fetch('http://localhost:3001/Reservacion',{
       // return fetch('https://shielded-brushlands-89617.herokuapp.com/Reservacion',{
               method:'POST',
               mode:'cors',
               body:JSON.stringify(dat),
               headers:{'content-type':'application/json'},
            })
            .then(res=>{           
              if(res.ok){
                getReservaciones().then(data=>setReservaciones(data))
                setValue({submitted:true});
                setLoading(false);
              }
            })
            .catch(err=>{setError({erro:true,mensajeError:err})});
    }  
    const handleChange = (event) => {
        const { name, value } = event.target;
        setValue((prevState) => {
          return {
            ...prevState,
            [name]: value,
          };
        });
      };      
    function validateEmail(e) {
        var valida=validar;
        const emailRex =
          /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        if (emailRex.test(e.target.value)) {
          valida = 'Exitoso';
        } else {
          valida = 'Peligroso';
        }
     
        setValidar({valida});
      }
  const cambiarSubmitted=()=>{
    setValue({submitted:false})
}


    return (
      <div><i>$</i>
        <Row md={1}>
          <Col>
          
          <Button color="danger" onClick={toggle}>
           Mostrador
        </Button>
          </Col>
        </Row><i>$</i>
        <Row md={1}>
          <Col>
          <Button >
          Prepagado 
        </Button>
          </Col>
        </Row>
       
        
        <Modal isOpen={modal} toggle={toggle} onClosed={()=>setValue({submitted:false})}>
          <ModalHeader toggle={toggle}>Detalles de reserva</ModalHeader>
          <ModalBody>

          <div className=" div-center">
    <h1><span className='text-center'>Registro</span></h1>
    <Form className=" signup-form" onSubmit={(e) => handleSubmit(e)}>
    <FormGroup>
        <Input
          type="name"
          name="nombre"
          id="nameId"
          placeholder="Nombre"
          value={nombre}
          onChange={(e) => handleChange(e)}
        />
      </FormGroup> 
      <FormGroup>
        <Input
          type="name"
          name="apellido"
          id="apellidosId"
          placeholder="Apellido paterno"
          value={apellido}
          onChange={(e) => handleChange(e)}
        />
      </FormGroup> 
      <FormGroup>
        <Input
          type="email"
          name="email"
          id="exampleEmail"
          placeholder="email@ejemplo.com"
          valid={validar === "Exitoso"}
          invalid={validar === "Peligro"}
          value={email}
          onChange={(e) => {
           validateEmail(e);
            handleChange(e);
          }}
        />
        <FormFeedback>
          Uh oh! Algo esta mal en el formato de tu email. Corrigelo.
        </FormFeedback>
        <FormFeedback valid>
          Correcto.
        </FormFeedback>
        <FormText>Tu usuario es tu email.</FormText>
      </FormGroup>
      <FormGroup>
        <Input
          type="text"
          name="cel"
          id="cel"
          placeholder="cel."
          value={cel}
          onChange={(e) => handleChange(e)}
        />
      </FormGroup> 
      <div className='d-grid'><button className="btn-md btn btn-primary">Aceptar</button></div>
      {submitted &&
<Alert color="success">Reserva exitosa!</Alert>}
{erro &&
<Alert color="danger">Error:{mensajeError}</Alert>}
    </Form>

    <div className="card shadow " >
            <img src={props.item.Foto}  className="card-img-top" />
            <div className="card-body">
                <h3 className="card-title text-uppercase">
                   {props.item.Marca}
                </h3>
                <p className="card-text">{props.item.Modelo}</p>
                <p className="card-text">Transmision {props.item.Transmision}</p>
                <p className="card-text fa fa-usd">Puertas {props.item.Puertas}</p>
                <Row sm={2}>
                    <Col><Label>Fecha renta:{moment(props.fechas.frenta).format('DD-MM-YYYY')}</Label></Col>
                    <Col ><Label>Fecha devolucion:{moment(props.fechas.fdevolucion).format('DD-MM-YYYY')}</Label></Col>

                </Row>
                <Row md={2}>
                    <Col ><Label>Hora renta:{moment(props.fechas.hrenta).format('hh:mm')}</Label></Col>
                    <Col ><Label>Hora devolucion:{moment(props.fechas.hdevolucion).format('hh:mm')}</Label></Col>

                </Row>

            </div>
        </div>

</div>    
          </ModalBody>
         {/* <ModalFooter>
            <Button color="primary" onClick={toggle}>
              Do Something
            </Button>{' '}
            <Button color="secondary" onClick={toggle}>
              Cancel
            </Button>
      </ModalFooter>*/}
        </Modal>
      </div>
    );
 }