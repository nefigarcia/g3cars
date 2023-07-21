import React,{ useContext, useState} from 'react';
import { InfoContext } from '../context';
import { Form,FormFeedback,FormGroup,FormText,Label,Input,Alert} from 'reactstrap';

export const Login=()=>{
    const[valores,setVal]=useState({email:"",contra:"",validate: {
        emailState: '',
      }});
    const{authen,setAuthen}=useContext(InfoContext) 

    const login=async()=>{ 
      
           try {
               let dat={email:valores.email,contrasena:valores.contra};
               let res=await fetch('http://localhost:3001/Login',{
             //let res= fetch('https://shielded-brushlands-89617.herokuapp.com/Login',{
                           method:'POST',
                           mode:'cors',
                           body:JSON.stringify(dat),
                           headers:{'content-type':'application/json'},
                        })
               .then(res=>res.json())
               .then(res=>{
                 if(res){setAuthen(true);
               //  setLoading(false);
               }
               })
               
           }catch (error) {
               console.log("err",error)
           }     
       }  

    function handleSubmit(e){
        e.preventDefault();
        if(!(valores.email && valores.contra)){
            return;
        }
        login(valores.email,valores.contra)
        .then(console.log("bien",valores.email));
    }
    const handleChange = (event) => {
        const { name, value } = event.target;
        setVal((prevState) => {
          return {
            ...prevState,
            [name]: value,
          };
        });
      };      
    function validateEmail(e) {
        const emailRex =
          /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        if (emailRex.test(e.target.value)) {
          valores.validate = 'Exitoso';
        } else {
            valores.validate = 'Peligroso';
        }
     
        setVal(valores);
      }
    return(
        <div  className='div-center'>         
        <h1><span className='text-center'>Ingreso</span></h1>

            <Form className='login-form border' onSubmit={(e) =>handleSubmit(e)}>
           <FormGroup>
             <Label>Email</Label>
             <Input
               type="email"
               name="email"
               id="exampleEmail"
               placeholder="@email"
               valid={valores.validate.emailState === "Ha sido exitoso"}
               invalid={valores.validate.emailState === "En peligro"}
               value={valores.email}
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
             <Label for="examplePassword">Contrasena</Label>
             <Input
               type="password"
               name="contra"
               id="contra"
               placeholder="********"
               value={valores.contra}
               onChange={(e) => handleChange(e)}
             />
           </FormGroup>
           <div className='d-grid'><button className="btn-md btn btn-primary">Aceptar</button></div>
           
               <div className='text-center pt-3'>--O--</div>
           <p className="small fw-bold mt-2 pt-1 mb-2">No tienes cuenta? 
           </p>
           {authen &&
<Alert color="success">Autorizado para ver reportes!.</Alert>}
         </Form>                       
       </div>
    );
}