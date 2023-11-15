import "../../styles/Home.css"
import "../../data/data.js"
import Dashboard from "../../components/Dashboard"
import LeftHeader from "../../components/LeftHeader/index.jsx"

function Profil(){
    return (
        <div className="container">
            <LeftHeader/>
            <Dashboard/>
        </div>
    )
}
export default Profil