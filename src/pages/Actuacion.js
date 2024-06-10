/* eslint-disable */
import { getDatabase, onValue, ref } from "firebase/database";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Firebase from "../database/firebase";
import "./actuacion.css";
import { Box, CircularProgress } from "@mui/material";
import Table from "../components/Table";
import { useAppContext } from "../context/context";
import CoverImage from "../components/CoverImage";

export default function Actuacion() {
  // <------------------------------- USE STATE ------------------------------->
  const { id } = useParams();

  const [repertorios, setRepertorios] = useState([]);

  const [actuacion, setActuacion] = useState([]);

  const {diffHours} = useAppContext()

  // <------------------------------- USE EFFECT ------------------------------->

  useEffect(() => {
    const getActuacionById = async (id) => {
      const doc = Firebase.db.collection("actuaciones").doc(id);
      doc.onSnapshot((info) => {
        const actuacion = info.data();
        setActuacion(actuacion);
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
        // enable vibration support
        navigator.vibrate = navigator.vibrate || navigator.webkitVibrate || navigator.mozVibrate || navigator.msVibrate;

        if (navigator.vibrate) {
          // vibration API supported
            navigator.vibrate(1000);
        }
      });
    };

    getActuacionById(id);
    loadData(id);
  }, []);
  

  // <------------------------------- GETTERS ------------------------------->

  return (
    <div className="container">
      {repertorios.length < 1 || !actuacion.organizador1 ? (
        <Box sx={{ display: "flex", justifyContent: "center", py: "20%" }}>
          <CircularProgress size={200} />
        </Box>
      ) : (
        <>
        {<CoverImage actuacion={actuacion} />}
          
          {repertorios.filter(item => !item.url).length === 0 ? (
            <p>No hay datos</p>
          ) : (
            <div>
              <Table repertorios={repertorios} actuacion={actuacion} diffHours={diffHours(repertorios) || 0}/>
            </div>
          )}
        </>
      )}
    </div>
  );
}
