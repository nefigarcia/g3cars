import React,{useState,createContext} from "react";

export const InfoContext=createContext();
export const InfoProvider=props=>{
    const [dataCarros,setDacarros]=useState([])
    return(
        <InfoContext.Provider
        value={{
            dataCarros,setDacarros
        }}
        >
            {props.children}
        </InfoContext.Provider>
    );
}
export const InfoConsumer=InfoContext.Consumer;