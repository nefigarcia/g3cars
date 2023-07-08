import React,{useState,createContext} from "react";
import { GetReservaciones } from "./Gets";

export const InfoContext=createContext();
export const InfoProvider=props=>{
    const [dataCarros,setDacarros]=useState([])
    return(
        <InfoContext.Provider
        value={{
            Reservaciones:GetReservaciones(),
            dataCarros,setDacarros
        }}
        >
            {props.children}
        </InfoContext.Provider>
    );
}
export const InfoConsumer=InfoContext.Consumer;