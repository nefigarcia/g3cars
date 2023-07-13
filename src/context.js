import React,{useState,createContext} from "react";
import { GetReservaciones } from "./Gets";

export const InfoContext=createContext();
export const InfoProvider=props=>{
    const [dataCarros,setDacarros]=useState([])
    const [reservaciones,setReservaciones]=useState([])
    const [reporte,setReporte]=useState([])

    return(
        <InfoContext.Provider
        value={{
            dataCarros,setDacarros,
            reservaciones,setReservaciones,
            reporte,setReporte
        }}
        >
            {props.children}
        </InfoContext.Provider>
    );
}
export const InfoConsumer=InfoContext.Consumer;