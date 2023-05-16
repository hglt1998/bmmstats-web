import { useEffect, useState } from "react";
import firebase from "../database/firebase";
import { Link } from "react-router-dom";
import "./actuaciones.css";
import logo from "../static/LogoSuenaMairenaBlancoIsolated.png";

export default function Actuaciones() {
  const [events, setEvents] = useState([]);

  const loadData = () => {
    firebase.db
      .collection("actuaciones")
      .orderBy("fecha", "desc")
      .get()
      .then((querySnapshot) => {
        const events = [];

        querySnapshot.forEach((doc) => {
          const info = doc.data();

          events.push({
            id: info.idActuacion,
            concepto: info.concepto,
            organizador: info.organizador1,
            fecha: info.fecha,
            ciudad: info.ciudad,
            tipo: info.tipo,
            isLive: info.isLive,
          });
        });
        setEvents(events);
        deleteLoadingAnimation()
      });
  };

  const deleteLoadingAnimation = () => {
    const loader = document.getElementsByClassName("loader")[0];
    if (loader) loader.remove();
  };

  useEffect(() => {
    loadData();
  }, []);

  return (
    <div className="container">
      <div className="loader">
        <img
          src={logo}
          className="loader-image blinker"
          alt="logo"
          width="20%"
        />
        <div className="lds-ripple">
          <div></div>
          <div></div>
        </div>
      </div>
      <div className="top-info">
        <h1 className="main-title">Actuaciones</h1>
        <p className="info-text">
          Actualmente hay <b>{events.length}</b> eventos en nuestra base de
          datos
        </p>
      </div>
      <div className="table-wrapper">
        <div className="table">
          <div className="table-header">
            <div className="table-cell column-1">
              <p className="header-text">Concepto</p>
            </div>
            <div className="table-cell column-2">
              <p className="header-text">Organizador</p>
            </div>
            <div className="table-cell column-3">
              <p className="header-text">Ciudad</p>
            </div>
            <div className="table-cell column-4">
              <p className="header-text">Fecha</p>
            </div>
          </div>
          <div className="table-wrapper">
            {events.map((evento) => {
              var formatedDate = new Date(evento.fecha.seconds * 1000)
                .toLocaleString()
                .toString();
                formatedDate = formatedDate.substring(0, formatedDate.length - 3)
              return (
                <div className="table-row" key={evento.id}>
                  <div className="table-cell column-1">
                    {evento.isLive === true ? (
                      <span className="material-icons blinker">sensors</span>
                    ) : (
                      <></>
                    )}
                    <Link
                      className="item-text"
                      to={`/actuaciones/${evento.id}`}
                    >
                      {evento.concepto}
                    </Link>
                  </div>
                  <div className="table-cell column-2">
                    <Link
                      className="item-text"
                      to={`/actuaciones/${evento.id}`}
                    >
                      {evento.organizador}
                    </Link>
                  </div>
                  <div className="table-cell column-3">
                    <Link
                      className="item-text"
                      to={`/actuaciones/${evento.id}`}
                    >
                      {evento.ciudad}
                    </Link>
                  </div>
                  <div className="table-cell column-4">
                    <Link
                      className="item-text"
                      to={`/actuaciones/${evento.id}`}
                    >
                      {formatedDate} h
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
