import { Link } from "react-router-dom";
import React from "react";
import "../index.css";

export default function HomePage() {
  return (
    <div className="px-3 align-items-stretch p-5">
      <h1>BMM STATS</h1>
      <p className="lead p-3">Descubre qué está tocando nuestra banda en este momento. Composiciones, ubicación y todos los detalles de cada actuación</p>
      <p className="font-weight-light p-3">Actualizaciones en tiempo real de las interpretaciones de nuestra banda en tu dispositivo.</p>
      <p className="lead p-3">
        <Link to='/actuaciones' id="mainButton" className="btn btn-lg btn-secondary fw-bold border-white bg-white">Actuaciones</Link>
      </p>
    </div>
  );
}
