import {
    Radar,
    RadarChart,
    PolarGrid,
    PolarAngleAxis,
  } from "recharts";

import "../../styles/RadarChart.css"
import { useApiSportSee } from "../../services/dataSportSeeApi";
import { Navigate, useParams } from "react-router-dom";
import Loader from "../Loader/index.jsx";
  function RadarChartPerformance(){
    const { id } = useParams()
    const getKindLabel = (index)=>{
      let label =""
      switch(index){
          case 1:  
              label="Intensité"   
          break
          case 2:
              label="Vitesse" 
          break
          case 3:
              label="Force"    
          break
          case 4:
              label="Endurance"   
          break
          case 5:
              label="Energie" 
          break
          case 6:
              label="Cardio"     
          break
          default:
              label=index
          break
      }
      return label
    }

    const { data, isLoading, error } = useApiSportSee("performance",id)
    if(error&&process.env.REACT_APP_DATA_FROM_API!=='false') {
      return <Navigate to="/error" replace={true} />
    }
    let performance = data
   
    if(!isLoading){
      let performanceTemp = performance.map((item) => ({
        value: item.value,
        kind: getKindLabel(item.kind),
      }))
      performance = performanceTemp
      return (
        <div className="radar-container">
          <RadarChart
          className="radar"
            width={window.innerWidth*19/100}
            height={window.innerWidth*15/100}
            data={performance}
          >
            <PolarGrid />
            <PolarAngleAxis dataKey="kind"  />
            
            <Radar
            className="radar-perf"
              name="Performance"
              dataKey="value"
              stroke="#FF0101B2"
              fill="#FF0101B2"
              fillOpacity={0.7}
            />
          </RadarChart>
          </div>
  
        );
    }
    if(isLoading){
      return(
      
      <Loader/>
      
      )
    }
   
    
  }
  export default RadarChartPerformance