import { useEffect, useState } from "react";
import firebase from "../database/firebase";
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
              tagActuacion: info.tagActuacion
            });
          });
          setEvents(events);
        });
    } catch (error) {
    }
  };

  const handleClick = (id) => {
    navigate(`${id}`);
  };

  useEffect(() => {
    loadData();
  }, []);

  return (
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
              Actualmente hay <b>{events.length}</b> eventos en nuestra base de
              datos
              {events.some((event) => event.isLive === true) ? (
                <span className="liveIndicator"> y 1 actuación en directo</span>
              ) : (
                ""
              )}
            </p>
          </div>
          <div className="chips">
            <span className="ssanta"></span><p>Semana Santa</p>
            <span className="glorias"></span><p>Glorias</p>
            <span className="Extraordinarias"></span><p>Extraordinarias</p>
          </div>
          <div>
            <table>
              <thead>
                  <tr>
                    <th>#</th>
                    <th>Concepto</th>
                    <th>Organizador</th>
                    <th>Ciudad</th>
                    <th>Tipo</th>
                    <th>Fecha</th>
                  </tr>
              </thead>
              <tbody>
                {events.map((evento, index) => {
                  var formatedDate = new Date(evento.fecha.seconds * 1000)
                    .toLocaleDateString()
                  return (
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
                  );
                })}
              </tbody>
            </table>
          </div>
        </>
      )}
    </div>
  );
}
