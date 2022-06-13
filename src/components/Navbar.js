import "../components/navbar.css"
import {Link, NavLink} from 'react-router-dom'
import card1 from '../static/banner.png'

export default function NavBar() {
  return (
        <div className="links">
          <Link className="banner" to='/'>
            <img height="30" src={card1} alt="banner" className="banner"></img>
          </Link>
          <nav className="nav-masthead">
            <NavLink className="nav-link" to="/">Inicio</NavLink>
            <NavLink className="nav-link" to="/actuaciones">Actuaciones</NavLink>
            <NavLink className="nav-link" to="/about">About</NavLink>
          </nav>
        </div>
  );
}
