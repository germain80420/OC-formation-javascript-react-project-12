import HeaderDashboard from "../HeaderDashboard"
import { Navigate, useParams } from "react-router-dom"
import KeyDataInfos from "../KeyDataInfos"
import iconCalorie from "../../assets/calories-icon.png"
import iconProtein from "../../assets/protein-icon.png"
import iconGlucides from "../../assets/carbs-icon.png"
import iconLipides from "../../assets/fat-icon.png"
import BarChartActivity from "../BarChartActivity"
import LineChartObjectifs from "../LineChartObjectifs"
import "../../styles/Dashboard.css"
import RadarChartPerformance from "../RadarChartPerformance"
import RadialBarChartScore from "../RadialBarChartScore"
import { useApiSportSee } from "../../services/dataSportSeeApi.jsx"

function Dashboard(){
    const { id } = useParams()
    const { data, isLoading, error } = useApiSportSee("keyData",id)
    if(error) {
        return <Navigate to="/error" replace={true} />
      }
    const calorieCount = data.calorieCount
    const proteinCount = data.proteinCount
    const carbohydrateCount = data.carbohydrateCount
    const lipidCount = data.lipidCount
    if(!isLoading){
        return (
            <div className="container-dashboard">
                <HeaderDashboard/>
                <div className="leftContainer">
                <BarChartActivity/>
                <div className="chartsContainer">
                    <LineChartObjectifs/>
                    <RadarChartPerformance />
                    <RadialBarChartScore/>
                </div>
                </div>
                <aside className="container-keydataInfos">
                    <KeyDataInfos img={iconCalorie} amount={(calorieCount/1000).toFixed(3)} unit="kCal" type="Calories"/>
                    <KeyDataInfos img={iconProtein} amount={proteinCount} unit="g" type="Proteines"/>
                    <KeyDataInfos img={iconGlucides} amount={carbohydrateCount} unit="g" type="Glucides"/>
                    <KeyDataInfos img={iconLipides} amount={lipidCount} unit="g" type="Lipides"/>
                </aside>
            </div>
        )
    }
    
}
export default Dashboard
