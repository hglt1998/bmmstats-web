import { getDatabase, onValue, ref } from "firebase/database";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Firebase from "../database/firebase";

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
        const actuacion = info.data()
        setActuacion(actuacion)
        setFecha(actuacion.fecha)
      })
    };
    const loadData = (id) => {
      const db = getDatabase();
      const repertorioRef = ref(db, "repertorios/" + id);
      onValue(repertorioRef, (snapshot) => {
        const data = snapshot.val();
        if (data) {
          setRepertorios(Object.values(data));
        }
      });
    };

    getActuacionById(id);
    loadData(id);
  }, []);
  // <------------------------------- GETTERS ------------------------------->

  return (
    <div className="container scrolleable">
      <div className="infoHeader text-white">
        {
          actuacion.isLive ? (
            <span className="badge bg-danger blink text-uppercase">En directo</span>
          ) : (
            <span className="sticky-top text-uppercase">Finalizado</span>
          )
        }
        <h1 className="text-uppercase border rounded mt-3 p-2">{actuacion.concepto}</h1>
        <div className="fs-6">
          <h6 className="">{actuacion.tipo}</h6>
          <p className="font-monospace d-flex text-wrap fs-6"><span className="material-icons">
            person
            </span>{actuacion.organizador1}</p>
          {actuacion.organizador2 ? (
            <p className="font-monospace d-flex"><span className="material-icons">
            person
            </span>{actuacion.organizador2}</p>
            
          ) : (
            <></>
          )
          }
          <p className="font-monospace d-flex"><span className="material-icons">location_on</span>{actuacion.ubicacion}</p>
          <p className="font-monospace d-flex">{actuacion.ciudad}</p>
          <p className="font-monospace d-flex">{new Date(fecha.seconds * 1000).toLocaleString()}</p>
        </div>

      </div>
      {repertorios.length === 0 ? (
        <p>No hay datos</p>
        ) : (
          <div className="border rounded container scrolleable">
          {repertorios.map((repertorio) => {
            const time = repertorio.time
            return (
              <div className="row align-items-center border" key={repertorio.idRepertorio}>
                <div className="col align-middle">
                  {repertorio.tituloMarcha}
                </div>
                <div className="col"><small className="">{repertorio.compositor}</small></div>
                {
                  (actuacion.tipo != 'Concierto' && actuacion.tipo != 'Pregón') ? (
                    <div className="col"><small className="">{repertorio.ubicacion}</small></div>
                  ) : (
                    <></>
                  )
                }
                {
                  (actuacion.tipo != 'Concierto' && actuacion.tipo != 'Pregón') ? (
                    <div className="col"><small className="">{time.substring(time.indexOf(",") + 2, time.length)}</small></div>
                  ) : (
                    <></>
                  )
                }
              </div>
            );
          })}
          <small className="font-monospace">Marchas interpretadas: {repertorios.length}</small>
        </div>
      )}
    </div>
  );
}
