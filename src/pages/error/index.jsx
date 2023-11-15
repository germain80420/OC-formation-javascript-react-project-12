import LeftHeader from "../../components/LeftHeader"

import { Link } from "react-router-dom"
import "../../styles/Error.css"

function Error() {
  return (
    <div>
        <LeftHeader/>
        <div className="container-error">
        
            <h1>404</h1>
            <p>Oups! La page que vous demandez n'existe pas.</p>
            <Link to="/">Retourner sur la page d’accueil</Link>
            </div>
    </div>
    
  )
}
export default Error
