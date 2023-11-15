import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip
  
}  from "recharts";
import { Navigate, useParams } from "react-router-dom"

import "../../styles/BarChartActivity.css"
import { useApiSportSee } from "../../services/dataSportSeeApi.jsx";
import Loader from "../Loader/index.jsx";
function getDay(strDay){
  return new Date(strDay).getDate()
 }

function BarChartActivity(){
  const { id } = useParams()
  const { data, isLoading, error } = useApiSportSee("activity",id)
  
  let session = data
  if(error) {
    return <Navigate to="/error" replace={true} />
  } 
  
      
    
    
    if(!isLoading){
      session = session.map((item) => ({
        kilogram: item.kilogram,
        calories: item.calories,
        day:getDay(item.day)
    }))
      return (
        <div className="barChart">
          <div className="barChartHeader">
            <p>Activité quotidienne</p>
            <ul>
              <li className="blackDot">
                Poids (kg)
              </li>
              <li className="redDot">
              Calories (Kcal)
              </li>
            </ul>
          </div>
        <BarChart
        width={window.innerWidth*70/100}
        height={window.innerHeight*20/100}
        data={session}
        margin={{
          top: 5,
          right: 30,
          left: 30,
          bottom: 5
        }}
      >
        <CartesianGrid vertical={false} horizontal={true} strokeDasharray="3 3" />
        <XAxis dataKey="day" tickLine={null}/>
        <YAxis yAxisId="right"  orientation="right" tickLine={null} domain={['dataMin-2', 'dataMax+1']} tickCount={3}/>
        <YAxis hide yAxisId="left" dataKey="calories" visibility="none"/>
        <Tooltip content={<BarsCustomTooltip payload={session}/>} 
             />
        <Bar yAxisId="right" radius={[20, 20, 0, 0]} maxBarSize={10} dataKey="kilogram" fill="#282D30" />
        <Bar yAxisId="left" radius={[20, 20, 0, 0]} maxBarSize={10} dataKey="calories" fill="#E60000" />
      </BarChart>
      </div>
      
        );
    }
    if(isLoading){
      return(
        <Loader/>
      )
    }
    
    
}
export default BarChartActivity
function BarsCustomTooltip(active) {
  let kilogramData = null;
  let caloriesData = null;
  for (let payloadValue of active.payload) {
    kilogramData = payloadValue.payload.kilogram;
    caloriesData = payloadValue.payload.calories;
  }
  const payloadIsEmpty = !active.payload.length;
  if (payloadIsEmpty) {
    return null;
  }
  return (
    <div className="tooltip">
      <p> {`${kilogramData}kg`}</p>
      <p> {`${caloriesData}Kcal`}</p>
    </div>
  );
}