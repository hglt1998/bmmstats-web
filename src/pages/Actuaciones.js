import { useEffect, useState } from "react";
import "../index.css";
import firebase from "../database/firebase";
import { Link } from "react-router-dom";

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
      });
  };

  useEffect(() => {
    loadData();
  }, []);

  return (
    <div className="container-fluid scrolleableTBody">
      <h1>Actuaciones</h1>
      <p className="infoText">
        Actualmente hay <b className="bold">{events.length}</b> eventos en nuestra base
        de datos
      </p>
      <div className="table-responsive-xs mt-5 m-2">
        <div className="table table-hover" id="table">
          <div className="thead-light border rounded ">
              <div className="d-flex eachTR trTable justify-content-between text-white">
                <div className="eachTD align-middle">
                  <p className="tableHeader eachTD">Concepto</p>
                </div>
                <div className="eachTD align-middle">
                  <p className="tableHeader eachTD">Organizador</p>
                </div>
                <div className="eachTD align-middle">
                  <p className="tableHeader eachTD">Ciudad</p>
                </div>
                <div className="eachTD align-middle">
                  <p className="tableHeader eachTD">Fecha</p>
                </div>
              </div>
          </div>
          <div className="center">
            {events.map((evento) => {
              const formatedDate = new Date(evento.fecha.seconds * 1000)
                .toLocaleString()
                .toString();
              return (
                <div
                  className="trTable eachTR d-flex justify-content-between border-bottom"
                  key={evento.id}
                >
                  <div className="d-sm-inline-block eachTD">
                    {evento.isLive === true ? (
                      <span className="material-icons blink toRed">
                        sensors
                      </span>
                    ) : (
                      <></>
                    )}
                    <p className="tdFromTable"><Link
                        className="btn text-white button tdFromTable"
                        to={`/actuaciones/${evento.id}`}
                      >{evento.concepto}</Link></p>
                  </div>
                  <div className="d-sm-inline-block eachTD">
                    <p className="align-self-center tdFromTable"><Link
                        className="btn text-white button tdFromTable"
                        to={`/actuaciones/${evento.id}`}
                      >{evento.organizador}</Link></p>
                  </div>
                  <div className="d-sm-inline-block eachTD">
                    <p className="align-self-center">
                      <Link
                        className="btn text-white button tdFromTable"
                        to={`/actuaciones/${evento.id}`}
                      >
                        {evento.ciudad}
                      </Link>
                    </p>
                  </div>
                  <div className="d-sm-inline-block eachTD">
                    <p className="tdFromTable">
                      <Link
                        className="btn text-white button tdFromTable"
                        to={`/actuaciones/${evento.id}`}
                      >
                        {formatedDate}
                      </Link>
                    </p>
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
