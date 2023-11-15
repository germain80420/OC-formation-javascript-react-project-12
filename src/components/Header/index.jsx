import { NavLink } from "react-router-dom"
import "../../styles/Header.css"
import logo from "../../assets/logo.png"

function Header() {

  return (
   
      <header>
      
      <img src={logo} alt="logo" className="imgLogo" />
      <nav className="navHeader">
        <NavLink to="/">
          Accueil
        </NavLink>
        <NavLink to="/user/12">
          Profil
        </NavLink>
        <NavLink to="/reglage">
          Réglage
        </NavLink>
        <NavLink to="/communaute">
          Communauté
        </NavLink>
      </nav>
      
    </header>

    
  )
}
export default Header
