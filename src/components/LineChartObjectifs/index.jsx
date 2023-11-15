import {
    XAxis,
    YAxis,
    Tooltip,
    Line,
    LineChart,
    
  } from "recharts"
  import "../../styles/LineChartObjectifs.css"
  import { Navigate, useParams } from "react-router-dom"
import { useApiSportSee } from "../../services/dataSportSeeApi.jsx"
import Loader from "../Loader/index.jsx"

  function LineChartObjectifs(){
    const { id } = useParams()
    const { data, isLoading, error } = useApiSportSee("averageSessions",id)
    if(error) {
      return <Navigate to="/error" replace={true} />
    }
    let sessions = data   
    
    if(!isLoading){
      const weekDays = "LMMJVSD"
      let sessionsTemp = []
      for(let i=0;i<sessions.length;i++){
        sessions[i].weekDay = weekDays[i]
        sessionsTemp.push(sessions[i])
      }
      sessions = sessionsTemp
      return(
        // <div id="lineChart">width={258} height={263} >
        <div id="lineChart">
        <div  className="lineChart">
          <div className="lineChartHeader">
            <p>Durée moyenne des sessions</p>
          </div>
          <LineChart className="chart"
            //width={268}
            width={window.innerWidth*18/100}
            height={window.innerWidth*10/100}
            //height={125}
            data={sessions}
            margin={{ top: 10, right: 10, left: 10, bottom: 0 }}
        onMouseMove={function(e){
          let div = document.getElementById("lineChart");
          if(e.isTooltipActive){
            
            let divWidth = div.offsetWidth
            let mouseXpercentage = Math.round(
              (e.activeCoordinate.x / divWidth) * 100
  
            )
            div.style.background = mouseXpercentage<=5?`rgba(175,0,0,1.5)`: `linear-gradient(90deg, rgba(255,0,0,1) ${mouseXpercentage}%, rgba(175,0,0,1.5) ${mouseXpercentage}%, rgba(175,0,0,1.5) 100%)`
          
          }
          
        }}
        onMouseLeave={function(e){
          let div = document.getElementById("lineChart");
          div.style.background = "#FF0000"
        }}
      >
        <XAxis dataKey="weekDay" axisLine={false} tickLine={false} tick={{ fill: '#FFFFFF', opacity: '0.5',top:'10' }}  color="#FFFFFF"/>
        <YAxis dataKey="sessionLength" domain={['dataMin','dataMax']} hide />
        
            <defs>
              <linearGradient id="colorMin" x1="0%" y1="0" x2="100%" y2="0">
                <stop
                  offset="0%"
                  stopColor="#FFFFFF"
                  stopOpacity={0.2}
                />
                <stop
                  offset="20%"
                  stopColor="#FFFFFF"
                  stopOpacity={0.3}
                />
                <stop
                  offset="40%"
                  stopColor="#FFFFFF"
                  stopOpacity={0.5}
                />
                <stop
                  offset="60%"
                  stopColor="#FFFFFF"
                  stopOpacity={0.6}
                />
                <stop
                  offset="80%"
                  stopColor="#FFFFFF"
                  stopOpacity={0.8}
                />
                <stop
                  offset="100%"
                  stopColor="#FFFFFF"
                  stopOpacity={1}
                />
              </linearGradient>
            </defs> 
        <Tooltip content={<LineCustomTooltip payload={sessions}/>} cursor = {false}  
             />
        <Line
          type="monotone"
          dataKey="sessionLength"
          stroke="url(#colorMin)"
          dot={{r:0}}
          activeDot={{ r: 2 }}
        />
        
      </LineChart>
      </div>
      </div>
      )
  
    
  function LineCustomTooltip(active){
    let length=null
    for (let payloadValue of active.payload) {
      length = payloadValue.payload.sessionLength;
    }  
    const payloadIsEmpty = !active.payload.length;
  
    if (payloadIsEmpty) {
      return null;
    }
  
    return (
      <div className="lineTooltip">
        <p>{`${length}min`}</p>
      </div>
    );
  }
}
if(isLoading){
  return(
    <Loader/>
  )
}

    
}
  export default LineChartObjectifs