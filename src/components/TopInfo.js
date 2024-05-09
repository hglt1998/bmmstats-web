import React from "react";

export default function TopInfo({ actuacion }) {
	return (
		<div className="top-info">
			{actuacion.isLive ? <span className="badge-alert">En directo</span> : <span className="badge">Finalizado</span>}
			<h1 className="subject">{actuacion.concepto}</h1>
			<p className="secondary-item">
				<strong>- {actuacion.tipo} -</strong>
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
					<span className="material-icons secondary-item">location_city</span>
					{actuacion.ubicacion}
				</p>
				<p className="secondary-item">
					<span className="material-icons secondary-item">location_on</span>
					{actuacion.ciudad}
				</p>
				<p className="secondary-item">
					<span className="material-icons secondary-item">schedule</span>
					{new Date(actuacion.fecha.seconds * 1000).toLocaleString().slice(0, -3)} h
				</p>
			</div>
		</div>
	);
}
