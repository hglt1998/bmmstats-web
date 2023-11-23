import { getDatabase, onValue, ref } from "firebase/database";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Firebase from "../database/firebase";
import logo from "../static/LogoSuenaMairenaBlancoIsolated.png";
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
      doc.get().then((info) => {
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
  }, []);

  // <------------------------------- GETTERS ------------------------------->

  return (
    <div className="container">
      {repertorios.length === 0 || actuacion.concepto == null ? (
        <div className="spinner"></div>
      ) : (<>
        <div className="top-info">
          {actuacion.isLive ? (
            <span className="badge-alert">En directo</span>
          ) : (
            <span className="badge">Finalizado</span>
          )}
          <h1 className="subject">{actuacion.concepto}</h1>
          <p className="secondary-item">{actuacion.tipo}</p>
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
              <span className="material-icons secondary-item">location_on</span>
              {actuacion.ubicacion}
            </p>
            <p className="secondary-item">{actuacion.ciudad}</p>
            <p className="secondary-item">
              {new Date(fecha.seconds * 1000).toLocaleString()}
            </p>
          </div>
        </div>
        <div className="table">
          <p className="amount-info">
            Composiciones interpretadas: {repertorios.length}
          </p>
          {actuacion.tipo == "Procesion con gps" ? (
            <div className="buttons-wrapper">
              <button
                className={
                  isListSelected ? "btn btn-active" : "btn btn-unactive"
                }
                onClick={() => setIsListSelected(true)}
              >
                LISTA
              </button>
              <button
                className={
                  isListSelected ? "btn btn-unactive" : "btn btn-active"
                }
                onClick={() => setIsListSelected(false)}
              >
                MAPA
              </button>
            </div>
          ) : (
            <></>
          )}

          {isListSelected ? (
            repertorios.map((repertorio) => {
              const time = repertorio.time;
              return (
                <div className="table2-row" key={repertorio.idRepertorio}>
                  <div className="table2-cell column2-1">
                    <p className="item2-text">{repertorio.tituloMarcha}</p>
                  </div>
                  <div className="table2-cell column2-2">
                    <p className="item2-text">{repertorio.compositor}</p>
                  </div>
                  {actuacion.tipo != "Concierto" &&
                    actuacion.tipo != "Pregón" ? (
                    <div className="table2-cell column2-3">
                      <p className="item2-text">{repertorio.ubicacion}</p>
                    </div>
                  ) : (
                    <></>
                  )}
                  {actuacion.tipo != "Concierto" &&
                    actuacion.tipo != "Pregón" ? (
                    <div className="table2-cell column2-4">
                      <p className="item2-text">
                        {time.substring(time.indexOf(",") + 2, time.length)}
                      </p>
                    </div>
                  ) : (
                    <div className="map-wrapper"></div>
                  )}
                </div>
              );
            })
          ) : (
            <div></div>
          )}
        </div>
      </>
      )}
    </div>
  );
}
