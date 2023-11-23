import { Link } from "react-router-dom";
import React from "react";
import logo from '../static/SinfondoP.webp';
import "../index.css";

export default function HomePage() {
  return (
    <div className="main-content">
      <div className="main-content">
        <img className="image" src={logo} alt="alt" width="50" height="50" />
        <h1 className="title">BMM STATS</h1>
        <p className="subtext">
          Descubre qué está tocando nuestra banda en este momento.
          Composiciones, ubicación y todos los detalles de cada actuación
        </p>
        <p className="subtext">
          Actualizaciones en tiempo real de las interpretaciones de nuestra
          banda en tu dispositivo.
        </p>
        <p className="mainButton">
          <Link to="/actuaciones" id="mainButton" className="">
            Actuaciones
          <span className="material-icons chevron">chevron_right</span>
          </Link>
        </p>
      </div>
    </div>
  );
}
