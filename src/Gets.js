import { useState,useEffect } from "react";

export const getReservaciones=()=>fetch("http://localhost:3001/Reservaciones").then(res=>res.json());
//export const getReservaciones=()=>fetch("https://shielded-brushlands-89617.herokuapp.com/Reservaciones").then(res=>res.json());

export function GetReservaciones(){
    const [da,setDa]=useState([]);
    useEffect(()=>{
      
            getReservaciones().then(data=>setDa(data));
       
    },[]); return da;
}