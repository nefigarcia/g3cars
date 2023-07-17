import React, { useContext,useCallback } from "react";
import { Calendar, dateFnsLocalizer,Views,momentLocalizer } from "react-big-calendar";
import format from "date-fns/format";
import parse from "date-fns/parse";
import startOfWeek from "date-fns/startOfWeek";
import getDay from "date-fns/getDay";
import "react-big-calendar/lib/css/react-big-calendar.css";
import { InfoContext } from "../context";
import moment from "moment";

const localizer = momentLocalizer(moment);

const allViews=Object.keys(Views).map((k) => Views[k])

export default function Calendario() {
  const handleSelectEvent = useCallback(
    (event) => window.alert(event.start+" Devolucion "+event.end),
    []
  )
    const{reservaciones}=useContext(InfoContext)
  const re=  reservaciones.map(item=>{
     return   {start:item.FechaRenta,end:item.FechaDevolucion,title:item.Modelo,allDay:false}
    });

  return (
    <div className="App">
      <Calendar
        localizer={localizer}
        events={re}
        startAccessor="start"
        endAccessor="end"
        style={{ height: 600 }}
        views={allViews}
        showMultiDayTimes
        popup={true}
        onSelectEvent={handleSelectEvent}

      />
    </div>
  );
}