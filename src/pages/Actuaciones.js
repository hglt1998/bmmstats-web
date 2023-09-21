import { useEffect, useState } from "react";
import firebase from "../database/firebase";
import { useNavigate } from "react-router-dom";
import classes from "./actuaciones.scss";
import { Box, CircularProgress } from "@mui/material";

export default function Actuaciones() {
  const [events, setEvents] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();

  const loadData = () => {
    setIsLoading(true);

    try {
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
    } catch (error) {
      setIsLoading(false);
    }
    setIsLoading(false);
  };

  const handleClick = (id) => {
    navigate(`${id}`);
  };

  useEffect(() => {
    loadData();
  }, [events]);

  return (
    <div className={classes.container}>
      {events.length < 1 ? (
      <Box sx={{ display: "flex", justifyContent: "center", py: '20%' }}>
          <CircularProgress size={200} />
        </Box>) : (<>
          <div className={classes['main-title']}>
            <h1>Actuaciones</h1>
            <p>
              Actualmente hay <b>{events.length}</b> eventos en nuestra base de
              datos
            </p>
          </div>
          <div>
            <table>
              <thead>
                <th>#</th>
                <th>Concepto</th>
                <th>Organizador</th>
                <th>Ciudad</th>
                <th>Fecha</th>
              </thead>
              <tbody>
                {events.map((evento, index) => {
                  var formatedDate = new Date(evento.fecha.seconds * 1000)
                    .toLocaleString()
                    .toString();
                  formatedDate = formatedDate.substring(
                    0,
                    formatedDate.length - 3
                  );
                  return (
                    <tr onClick={() => handleClick(evento.id)}>
                      <td>{index + 1}</td>
                      <td>{evento.concepto}</td>
                      <td>{evento.organizador}</td>
                      <td>{evento.ciudad}</td>
                      <td>{formatedDate}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </>)}
    </div>
  );
}
