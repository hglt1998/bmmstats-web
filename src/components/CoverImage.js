import React, { useEffect } from "react";
import "../components/coverimage.scss";
import foto from "../static/actuacion-cover.webp";

export default function CoverImage({ actuacion }) {
	return (
		<div className="wrapper">
			<div className="top">
				<div>
					<h1>{actuacion.concepto}</h1>
					<span>{actuacion.tipo}</span>
					<h4>{actuacion.organizador1}</h4>
				</div>
				{actuacion.isLive ? (
					<p className="actuacionLive">
						<span className="dot"></span>En directo
					</p>
				) : (
					<div></div>
				)}
			</div>
			<div className="actuacionInfo">
				<p>{actuacion.ubicacion}</p>
				<p>{new Date(actuacion.fecha.seconds * 1000).toLocaleString().slice(0, -3)} h</p>
				<p>{actuacion.ciudad}</p>
			</div>
			<img src={actuacion.coverImage || foto}></img>
		</div>
	);
}
