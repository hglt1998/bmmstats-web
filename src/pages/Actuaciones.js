import { useEffect, useState } from "react";
import firebase from "../database/firebase";
<<<<<<< HEAD
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
=======
import { useNavigate } from "react-router-dom";
import classes from "./actuaciones.scss";
import { Box, CircularProgress} from "@mui/material";

export default function Actuaciones() {
  const [events, setEvents] = useState([]);

  const navigate = useNavigate();

  const loadData = () => {

    try {
      firebase.db
        .collection("actuaciones")
        .orderBy("fecha", "desc")
        .onSnapshot((querySnapshot) => {
          const events = [];
>>>>>>> 0f862716f8d3a7824b8fe3286c053400dde1d26e

          querySnapshot.forEach((doc) => {
            const info = doc.data();

<<<<<<< HEAD
          events.push({
            id: info.idActuacion,
            concepto: info.concepto,
            organizador: info.organizador1,
            fecha: info.fecha,
            ciudad: info.ciudad,
            tipo: info.tipo,
            isLive: info.isLive,
=======
            events.push({
              id: info.idActuacion,
              concepto: info.concepto,
              organizador: info.organizador1,
              fecha: info.fecha,
              ciudad: info.ciudad,
              tipo: info.tipo,
              isLive: info.isLive,
              tagActuacion: info.tagActuacion
            });
>>>>>>> 0f862716f8d3a7824b8fe3286c053400dde1d26e
          });
        });
<<<<<<< HEAD
        setVisibleEvents(events);
        setLastVisible(querySnapshot.docs[querySnapshot.docs.length - 1])
      });

=======
    } catch (error) {
    }
>>>>>>> 0f862716f8d3a7824b8fe3286c053400dde1d26e
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
<<<<<<< HEAD
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
=======
    <div className={classes.container}>
      {events.length < 1 ? (
        <Box sx={{ display: "flex", justifyContent: "center", py: "20%" }}>
          <CircularProgress size={200} />
        </Box>
      ) : (
        <>
          <div className={classes["main-title"]}>
            <h2>Actuaciones</h2>
            <p className="font-sans">
>>>>>>> 0f862716f8d3a7824b8fe3286c053400dde1d26e
              Actualmente hay <b>{events.length}</b> eventos en nuestra base de
              datos
              {events.some((event) => event.isLive === true) ? (
                <span className="liveIndicator"> y 1 actuación en directo</span>
              ) : (
                ""
              )}
            </p>
          </div>
<<<<<<< HEAD
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
=======
          <div className="chips">
            <span className="ssanta"></span><p>Semana Santa</p>
            <span className="glorias"></span><p>Glorias</p>
            <span className="Extraordinarias"></span><p>Extraordinarias</p>
          </div>
          <div>
            <table>
              <thead>
                <th>#</th>
                <th>Concepto</th>
                <th>Organizador</th>
                <th>Ciudad</th>
                <th>Tipo</th>
                <th>Fecha</th>
              </thead>
              <tbody>
                {events.map((evento, index) => {
                  var formatedDate = new Date(evento.fecha.seconds * 1000)
>>>>>>> 0f862716f8d3a7824b8fe3286c053400dde1d26e
                    .toLocaleString()
                    .toString();
                  return (
<<<<<<< HEAD
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
=======
                    <tr
                      id="row"
                      className={evento.isLive ? "isLive liveIndicator" : ""}
                      onClick={() => handleClick(evento.id)}
                      key={index}>
                      <td>{index + 1}</td>
                      <td>{evento.concepto}</td>
                      <td>{evento.organizador}</td>
                      <td>{evento.ciudad}</td>
                      <td className='chip'>
                        <span className={evento.tagActuacion?.replace(/\s/g, "")}>{evento.tipo}</span>
                      </td>
                      <td>{formatedDate}</td>
                    </tr>
>>>>>>> 0f862716f8d3a7824b8fe3286c053400dde1d26e
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
<<<<<<< HEAD

=======
>>>>>>> 0f862716f8d3a7824b8fe3286c053400dde1d26e
    </div>
  );
}
