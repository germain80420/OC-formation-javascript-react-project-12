import "../../styles/HeaderDashboard.css"
import { Navigate, useParams } from "react-router-dom"
import { useApiSportSee } from "../../services/dataSportSeeApi.jsx"

function HeaderDashboard(){
    const { id } = useParams()
    const { data, isLoading, error } = useApiSportSee("firstName",id)
    if(error) {
        return <Navigate to="/error" replace={true} />
      }
    const firstName = data
    if(!isLoading){
        return(
            <div className="header-dashboard">
                <h1>Bonjour <span>{firstName}</span></h1>
                <p>Félicitation ! Vous avez explosé vos objectifs hier 👏</p>
            </div>
        )
    }
    
}
export default HeaderDashboard