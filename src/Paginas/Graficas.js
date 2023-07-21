import { BarChart, Bar, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer,LineChart, Line,CartesianGrid, Label } from 'recharts';
import DatePicker from "react-datepicker";
import { useContext, useEffect, useState } from 'react';
import { addDays,subDays } from 'date-fns';
import { InfoContext } from '../context';
import moment from "moment/moment";


{/*const data = [
    {
      name: 'Duster',
      dias: 30,
      pv: 2400,
      amt: 2400,
    },
    {
      name: 'Vento',
      dias: 15,
      pv: 1398,
      amt: 2210,
    },
    {
      name: 'Focus',
      dias: 29,
      pv: 9800,
      amt: 2290,
    }
  ];*/}
  const renderCustomAxisTick = ({ x, y, payload }) => {
  let path = '';

  switch (payload.value) {
    case 'Duster':
      path='M102,5174 L101.221,5174 C100.672,5173.39 99.885,5173 99,5173 C98.647,5173 98.314,5173.072 98,5173.184 L98,5172 L102,5172 L102,5174 Z M99,5177 C98.449,5177 98,5176.551 98,5176 C98,5175.449 98.449,5175 99,5175 C99.551,5175 100,5175.449 100,5176 C100,5176.551 99.551,5177 99,5177 L99,5177 Z M93.484,5174 C93.279,5173.21 92.834,5172.522 92.242,5172 L96,5172 L96,5174 L93.484,5174 Z M91.347,5176 C91,5176.595 90.362,5177 89.625,5177 C88.888,5177 88.25,5176.595 87.903,5176 C87.731,5175.705 87.625,5175.366 87.625,5175 C87.625,5174.634 87.731,5174.295 87.903,5174 C88.25,5173.405 88.888,5173 89.625,5173 C90.362,5173 91,5173.405 91.347,5174 C91.519,5174.295 91.625,5174.634 91.625,5175 C91.625,5175.366 91.519,5175.705 91.347,5176 L91.347,5176 Z M86,5173.331 L86,5172 L86.991,5172 C86.575,5172.368 86.236,5172.821 86,5173.331 L86,5173.331 Z M86,5170 L96,5170 L96,5161 L86,5161 L86,5170 Z M98,5170 L98,5159 L84,5159 L84,5176 L85.766,5176 C86.213,5177.722 87.763,5179 89.625,5179 C91.487,5179 93.037,5177.722 93.484,5176 L96,5176 C96,5177.657 97.343,5179 99,5179 C100.657,5179 102,5177.657 102,5176 L104,5176 L104,5170 L98,5170 Z';  
      break;
    case 'Vento':
      path ='M 36.4 71.1 L 25.7 71.1 L 0 3.6 L 9.3 0 L 31.3 60.7 L 53.4 0.3 L 62 3.6 L 36.4 71.1 Z' ; 
    break;
    case 'Focus' :
        path='M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.283.95l-3.523 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z' 
      break;
    default:
      path = '';
  }

  return (
    {/*<svg x={x - 12} y={y + 4} width={24} height={24} viewBox="0 0 1024 1024" fill="#666">
      <path d={path} />
  </svg>*/}
  );
};
const renderCustomBarLabel = ({ payload, x, y, width, height, value }) => {
  return <text x={x + width / 2} y={y} fill="#666" textAnchor="middle" dy={-6}>{`value: ${value}`}</text>;
};

const Graficas =()=> { 
    const [dateRange, setDateRange] = useState([subDays(new Date(),15), addDays(new Date(),15)]);
  const [startMes, endMes] = dateRange;  
  const{reporte,setReporte}=useContext(InfoContext)
  const data=reporte.map(item=>{
    return {name:item.Modelo,dias:item.DiasTot};
  })

  useEffect(()=>{
    totalReservas();
  },[]);

  const totalReservas=async()=>{
    var rinicio=moment(startMes).format("YYYY-MM-DD")
    var rfinal=moment(endMes).format("YYYY-MM-DD")
      try {
       let dat={rinicio:rinicio,rfinal:rfinal};
       //let res=await fetch('http://localhost:3001/Reporte',{
         let res= await fetch('https://shielded-brushlands-89617.herokuapp.com/Reporte',{
                      method:'POST',
                      mode:'cors',
                      body:JSON.stringify(dat),
                      headers:{'content-type':'application/json'},
                   })
          .then(res=>res.json())
          .then(res=>{
            if(res){setReporte(res);console.log("res",res)}
          })
          
      }catch (error) {
          console.log("err",error)
      }
  
  }  
    return(
        <div className='App'>
            <button className="btn-md btn btn-primary" onClick={totalReservas}>Reporte</button>
            <DatePicker
      selectsRange={true}
      startDate={startMes}
      endDate={endMes}
      onChange={(update) => {
        setDateRange(update);
        
      }}
      isClearable={true}
    />

        <BarChart width={400} height={300} data={data}>
      <XAxis dataKey="name" //tick={renderCustomAxisTick} 
      />
      <YAxis />
      <Bar dataKey="dias" barSize={30} fill="#8884d8"
       // label={renderCustomBarLabel}
        />
    </BarChart>
    
   {/* <ResponsiveContainer width="100%" height="100%">
        <LineChart
          width={500}
          height={300}
          data={data}
          margin={{
            top: 5,
            right: 30,
            left: 20,
            bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Line type="monotone" dataKey="pv" stroke="#8884d8" activeDot={{ r: 8 }} />
          <Line type="monotone" dataKey="uv" stroke="#82ca9d" />
        </LineChart>
        </ResponsiveContainer>*/}
    </div>
    );
   
    
}
export default Graficas;