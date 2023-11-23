import { useEffect, useState } from "react";
import firebase from "../database/firebase";
import { Link } from "react-router-dom";
import "./actuaciones.css";

export default function Actuaciones() {
  const [events, setEvents] = useState([]);
  const [visibleEvents, setVisibleEvents] = useState([]);
  const [lastVisible, setLastVisible] = useState();
  const paginationSize = 15;

  const loadData = () => {
    firebase.db
      .collection("actuaciones")
      .orderBy("fecha", "desc").limit(15)
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
        setVisibleEvents(events);
        setLastVisible(querySnapshot.docs[querySnapshot.docs.length - 1])
      });

  };

  const loadNextData = () => {
    firebase.db.collection("actuaciones").orderBy("fecha", "desc").startAfter(lastVisible).limit(15).get().then((querySnapshot) => {
      const events = [];

      if (querySnapshot.docs.length != 0) {
        
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
        setVisibleEvents(events);
        setLastVisible(querySnapshot.docs[querySnapshot.docs.length - 1])
      }
    })
  }

  const loadAllEvents = () => {
    firebase.db.collection("actuaciones").get().then((querySnapshot) => {
      setEvents(querySnapshot.docs)
    })
  }

  useEffect(() => {
    loadAllEvents();
    loadData();
    // console.log(Math.ceil(events.length / pagination));
  }, []);

  return (
    <div className="container">
      {visibleEvents.length === 0 ? (
      <div className="loader">
        <div className="spinner"></div>
      </div>
      ) : (
        <>
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
                {visibleEvents.map((evento) => {
                  const formatedDate = new Date(evento.fecha.seconds * 1000)
                    .toLocaleString()
                    .toString();
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
                          {formatedDate}
                        </Link>
                      </div>
                    </div>
                  );
                })}
              </div>
              <div className="navigation">
                <button className="navigation-button" onClick={
                  loadData
                }>
                 <span className="material-icons to-white">navigate_before</span>
                </button>
                <button className="navigation-button" onClick={loadNextData}>
                 <span className="material-icons to-white">navigate_next</span>
                </button>
              </div>
            </div>
          </div>
        </>
      )}

    </div>
  );
}
