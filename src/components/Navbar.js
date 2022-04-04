import "../index.css"
import {Link, NavLink} from 'react-router-dom'
import card1 from '../static/banner.png'

export default function NavBar() {
  return (
    <div className="cover-container d-flex w-100 h-100 p-3 mx-auto flex-column">
      <header className="mb-auto">
        <div>
          <Link className="float-md-start mb-0" to='/'>
            <img height="30" src={card1} alt="banner" className="navbarImage"></img>
          </Link>
          <nav className="nav nav-masthead justify-content-center float-md-end">
            <NavLink className="nav-link" to="/">
              Inicio
            </NavLink>
            <NavLink className="nav-link" to="/actuaciones">Actuaciones</NavLink>
            <NavLink className="nav-link" to="/about">About</NavLink>
          </nav>
        </div>
      </header>
    </div>
  );
}
