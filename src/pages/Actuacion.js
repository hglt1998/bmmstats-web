import { getDatabase, onValue, ref } from "firebase/database";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Firebase from "../database/firebase";
import "./actuacion.css";
import { Box, CircularProgress } from "@mui/material";

export default function Actuacion() {
  // <------------------------------- USE STATE ------------------------------->
  const { id } = useParams();

  const [repertorios, setRepertorios] = useState([]);

  const [actuacion, setActuacion] = useState([]);

  const [fecha, setFecha] = useState([]);

  // <------------------------------- USE EFFECT ------------------------------->

  useEffect(() => {
    const getActuacionById = async (id) => {
      const doc = Firebase.db.collection("actuaciones").doc(id);
      doc.onSnapshot((info) => {
        const actuacion = info.data();
        setActuacion(actuacion);
        setFecha(actuacion.fecha);
      });
    };
    const loadData = (id) => {
      const db = getDatabase();
      const repertorioRef = ref(db, "repertorios/" + id);
      onValue(repertorioRef, (snapshot) => {
        const data = snapshot.val();
        if (data) {
          setRepertorios(Object.values(data).reverse());
        }
      });
    };

    getActuacionById(id);
    loadData(id);
    setTimeout(() => {
      diffHours();
    }, 3000);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const diffHours = () => {
    const toDateParts = repertorios[0].time?.split(", ")[0].split("/");
    const toTimeParts = repertorios[0].time?.split(", ")[1].split(":");

    var toDate = new Date(
      toDateParts[2],
      toDateParts[1] - 1,
      toDateParts[0],
      toTimeParts[0],
      toTimeParts[1],
      toTimeParts[2]
    ).getTime();

    const fromDateParts = repertorios[repertorios.length - 1].time
      ?.split(", ")[0]
      .split("/");
    const fromTimeParts = repertorios[repertorios.length - 1].time
      ?.split(", ")[1]
      .split(":");

    var fromDate = new Date(
      fromDateParts[2],
      fromDateParts[1] - 1,
      fromDateParts[0],
      fromTimeParts[0],
      fromTimeParts[1],
      fromTimeParts[2]
    ).getTime();

    const DATE_UNITS = {
      // in seconds
      year: 31536000,
      month: 2629800,
      day: 86400,
      hour: 3600,
      minute: 60,
      second: 1,
    };

    const languageCode = "es"; // English

    const rtf = new Intl.NumberFormat(languageCode, { numeric: "auto" });

    const elapsed = (fromDate - toDate) / 1000;

    for (const unit in DATE_UNITS) {
      if (Math.abs(elapsed) > DATE_UNITS[unit]) {
        return rtf.format(Math.floor(elapsed / DATE_UNITS[unit]), unit);
      }
    }
    return rtf.format(0, "second");
  };
  // <------------------------------- GETTERS ------------------------------->

  return (
    <div className="container">
      {repertorios.length < 1 || !actuacion.organizador1 ? (
        <Box sx={{ display: "flex", justifyContent: "center", py: "20%" }}>
          <CircularProgress size={200} />
        </Box>
      ) : (
        <>
          <div className="top-info">
            {actuacion.isLive ? (
              <span className="badge-alert">En directo</span>
            ) : (
              <span className="badge">Finalizado</span>
            )}
            <h1 className="subject">{actuacion.concepto}</h1>
            <p className="secondary-item">
              <strong>{actuacion.tipo}</strong>
            </p>
            <div className="secondary-info">
              <p className="secondary-item">
                <span className="material-icons secondary-item">person</span>
                {actuacion.organizador1}
              </p>
              {actuacion.organizador2 ? (
                <p className="secondary-item">
                  <span className="material-icons secondary-item">person</span>
                  {actuacion.organizador2}
                </p>
              ) : (
                <></>
              )}
              <p className="secondary-item">
                <span className="material-icons secondary-item">
                  location_city
                </span>
                {actuacion.ubicacion}
              </p>
              <p className="secondary-item">
                <span className="material-icons secondary-item">
                  location_on
                </span>
                {actuacion.ciudad}
              </p>
              <p className="secondary-item">
                <span className="material-icons secondary-item">schedule</span>
                {new Date(fecha.seconds * 1000).toLocaleString().slice(0, -3)} h
              </p>
            </div>
          </div>
          {repertorios.length === 0 ? (
            <p>No hay datos</p>
          ) : (
            <div className="table">
              <p className="amount-info">
                <small>Composiciones interpretadas:</small> {repertorios.length}
              </p>
              {actuacion.tipo !== "Pregón" ? (
                <>
                  <p className="average-info">
                    <small>Media marchas/hora:</small>{" "}
                    {((repertorios.length / diffHours()) * -1)
                      .toString()
                      .slice(0, 4)}
                  </p>
                  <div className="content">
                    <p className="enlazadas-info"></p>
                    <p className="enlazadas-label">Enlazadas</p>
                  </div>
                </>
              ) : (
                <></>
              )}

              {repertorios.map((repertorio) => {
                const time = repertorio.time;
                return (
                  <div
                    className={
                      repertorio.enlazada % 2 === 0
                        ? "table2-row-enlazada"
                        : "table2-row"
                    }
                    key={repertorio.idRepertorio}
                  >
                    <div className="table2-cell column2-1">
                      <p className="item2-text">
                        <b>{repertorio.tituloMarcha}</b>
                      </p>
                    </div>
                    <div className="table2-cell column2-2">
                      <p className="item2-text">{repertorio.compositor}</p>
                    </div>
                    {actuacion.tipo !== "Concierto" &&
                    actuacion.tipo !== "Pregón" ? (
                      <div className="table2-cell column2-3">
                        <p className="item2-text">{repertorio.ubicacion}</p>
                      </div>
                    ) : (
                      <></>
                    )}
                    {actuacion.tipo !== "Concierto" &&
                    actuacion.tipo !== "Pregón" ? (
                      <div className="table2-cell column2-4">
                        <p className="item2-text">
                          {time.substring(
                            time.indexOf(",") + 2,
                            time.length - 3
                          )}
                        </p>
                      </div>
                    ) : (
                      <div className="map-wrapper"></div>
                    )}
                  </div>
                );
              })}
            </div>
          )}
        </>
      )}
    </div>
  );
}
