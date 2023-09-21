import { useEffect, useState } from "react";
import firebase from "../database/firebase";
import { useNavigate } from "react-router-dom";
import "./actuaciones.css";
import logo from "../static/LogoSuenaMairenaBlancoIsolated.png";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TablePagination,
  TableRow,
} from "@mui/material";

export default function Actuaciones() {
  const [events, setEvents] = useState([]);
  const [page, setPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(25);

  const navigate = useNavigate();

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
        deleteLoadingAnimation();
      });
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const deleteLoadingAnimation = () => {
    const loader = document.getElementsByClassName("loader")[0];
    if (loader) loader.remove();
  };

  useEffect(() => {
    loadData();
  }, [events]);

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
      <Table className="customTable" sx={{margin: '1vh'}}>
        <TableHead>
          <TableRow>
            <TableCell>#</TableCell>
            <TableCell>Concepto</TableCell>
            <TableCell>Organizador</TableCell>
            <TableCell>Ciudad</TableCell>
            <TableCell>Fecha</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {events
            .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
            .map((evento, index) => {
              var formatedDate = new Date(evento.fecha.seconds * 1000)
                .toLocaleString()
                .toString();
              formatedDate = formatedDate.substring(0, formatedDate.length - 3);
              return (
                <TableRow
                  key={evento.id}
                  onClick={() => navigate(`${evento.id}`)}
                >
                  <TableCell align="rigth">{index + 1}</TableCell>
                  <TableCell align="rigth">{evento.concepto}</TableCell>
                  <TableCell align="rigth">{evento.organizador}</TableCell>
                  <TableCell align="rigth">{evento.ciudad}</TableCell>
                  <TableCell align="rigth">{formatedDate}</TableCell>
                </TableRow>
              );
            })}
        </TableBody>
      </Table>
      <TablePagination
        rowsPerPageOptions={[25, 50, 100]}
        component="div"
        count={events.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </div>
  );
}
