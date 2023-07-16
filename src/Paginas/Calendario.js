import React, { useContext } from "react";
import { Calendar, dateFnsLocalizer } from "react-big-calendar";
import format from "date-fns/format";
import parse from "date-fns/parse";
import startOfWeek from "date-fns/startOfWeek";
import getDay from "date-fns/getDay";
import "react-big-calendar/lib/css/react-big-calendar.css";
import { InfoContext } from "../context";

const locales = {
  "en-US": require("date-fns/locale/en-US")
};

const localizer = dateFnsLocalizer({
  format,
  parse,
  startOfWeek,
  getDay,
  locales
});

export default function Calendario() {
    const{reservaciones}=useContext(InfoContext)
    console.log("calDate",new Date())
  const re=  reservaciones.map(item=>{
     return   {start:item.FechaRenta,end:item.FechaDevolucion,title:item.Modelo}
    });console.log("ma",re)
  return (
    <div className="App">
      <Calendar
        localizer={localizer}
        events={re}
        startAccessor="start"
        endAccessor="end"
        style={{ height: 500 }}
      />
    </div>
  );
}