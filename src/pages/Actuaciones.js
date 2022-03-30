import { useEffect, useState } from "react";
import "../index.css";
import firebase from "../database/firebase";
import { Link } from "react-router-dom";

export default function Actuaciones() {
  const [events, setEvents] = useState([]);

  const [rows, setRows] = useState();

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
            isLive: info.isLive
          });
        });
        setEvents(events);
        setRows(document.getElementById("table").rows.length - 1);
      });
  };

  useEffect(() => {
    loadData();
  }, []);

  return (
    <div className="container scrolleableTBody">
      <h1>Actuaciones</h1>
      <p className="infoText">
        Actualmente hay <b className="bold">{rows}</b> eventos en nuestra base
        de datos
      </p>
      <div className="table-responsive-sm mt-5">
        <table className="table table-hover" id="table">
          <thead className="thead-light">
            <tr className="text-white">
              <th scope="col">
                <small>Concepto</small>
              </th>
              <th scope="col">
                <small>Organizador</small>
              </th>
              <th scope="col">
                <small>Ciudad</small>
              </th>
              <th scope="col">
                <small>Fecha</small>
              </th>
              <th scope="col">
                <small>Info</small>
              </th>
            </tr>
          </thead>
          <tbody className="scrolleableTBody">
            {events.map((evento) => {
              const formatedDate = new Date(evento.fecha.seconds * 1000)
                .toLocaleString()
                .toString();
              return (
                <tr className="trTable" key={evento.id}>
                  <td className="align-self-center align-middle">
                    <small>{evento.concepto}</small>
                    {
                      (evento.isLive === true) ? (
                        <span className="material-icons blink toRed">sensors</span>
                      ) : (
                        <></>
                      )
                    }
                  </td>
                  <td className="limit align-self-center">
                    <p className="align-self-center">{evento.organizador}</p>
                  </td>
                  <td className="">
                    <small className="align-self-center">{evento.ciudad}</small>
                  </td>
                  <td>
                    <small>{formatedDate}</small>
                  </td>
                  <td>
                    <Link
                      className="btn btn-outline-light button"
                      to={`/actuaciones/${evento.id}`}
                    >
                      Ir
                    </Link>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
