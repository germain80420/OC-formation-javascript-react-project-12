import "../../styles/Home.css"
import "../../data/data.js"

import LeftHeader from "../../components/LeftHeader/index.jsx"

function Home(){
    return (
        <div className="container">
            <LeftHeader/>
            <div className="profil">
                <h2>SELECTIONNER UN PROFIL</h2>
                <nav className="listProfil">
                <a href="/user/12">Profil de Karl</a>
                <a href="/user/18">Profil de Cecilia</a>
                </nav>
                
            </div>
            
        </div>
    )
}
export default Home