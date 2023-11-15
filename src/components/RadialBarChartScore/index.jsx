import { RadialBarChart, RadialBar, PolarAngleAxis } from "recharts";
import "../../styles/RadialBarChart.css"
import { Navigate, useParams } from "react-router-dom"
import { useApiSportSee } from "../../services/dataSportSeeApi"
import Loader from "../Loader/index.jsx";
function RadialBarChartScore(){
  const { id } = useParams()
  const { data, isLoading, error } = useApiSportSee("todayScore",id)
  if(error) {
    return <Navigate to="/error" replace={true} />
  }
  let todayScore = data
  todayScore = [{ score:todayScore}]
  const circleSize = window.innerWidth*15/100;

  if(!isLoading){
    return (
      <div className="radialContainer">
       <h2>Score</h2> 
      <div className="center-circle">
      </div>
      <div className="center-text">
      <span>{todayScore[0].score}%</span> <br />de votre <br /> objectif
      </div>
      <RadialBarChart
      className="radial"
        width={circleSize}
        height={circleSize}
        cx={circleSize / 2}
        cy={circleSize / 2}
        innerRadius={circleSize/2-12}
        outerRadius={circleSize/2}
        barSize={20}
        data={todayScore}
        startAngle={-270}
        endAngle={95}
      
        >
        <PolarAngleAxis
        type="number"
        domain={[0, 100]}
        angleAxisId={0}
        tick={false}
        />
        <RadialBar
        background={{ fill: "none" }}
        clockWise
        dataKey="score"
        cornerRadius={circleSize / 2}
        fill="red"
      
        />
        
        <text
        x={circleSize / 2}
        y={circleSize / 2}
        textAnchor="middle"
        dominantBaseline="middle"
        className="progress-label"
        background="white"
        
        >
      
        </text>
        
      </RadialBarChart>
      
      </div>
      )
  }  
  if(isLoading){
    return(
    
    <Loader/>
    
    )
  }

}
export default RadialBarChartScore