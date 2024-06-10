import React, { useState } from "react";
import { Tweet } from "react-tweet";
import Graphs from "./Graphs";

export default function Table({ repertorios, actuacion, diffHours }) {
	const [showTwits, setShowTwits] = useState(true);
	const [showGraph, setShowGraph] = useState(false)

	const exportCSV = () => {
		let csvContent = [actuacion.concepto, actuacion.organizador1, actuacion.ubicacion, new Date(actuacion.fecha.seconds * 1000).toLocaleString().slice(0, -3)].join(";") + "\r\n";

		csvContent += ["Número en lista", "Título", "Compositor", "Ubicación", "Hora"].join(";") + "\r\n";

		repertorios
			.filter((item) => !item.url)
			.forEach((interpretacion) => {
				const row = [
					interpretacion.nMarcha,
					interpretacion.tituloMarcha,
					interpretacion.compositor,
					interpretacion.ubicacion,
					interpretacion.time.substring(interpretacion.time.indexOf(",") + 2, interpretacion.time.length - 3)
				];
				csvContent += row.join(";") + "\r\n";
			});

		const BOM = "\uFEFF";
		const blob = new Blob([BOM + csvContent]);
		const url = window.URL.createObjectURL(blob);
		const linkElement = document.createElement("a");
		linkElement.href = url;
		linkElement.setAttribute("download", actuacion.concepto + ".csv");
		linkElement.click();
	};

	return (
		<div className="table">
			<p className="amount-info">
				<small>Composiciones interpretadas:</small> <b>{repertorios.filter((item) => !item.url).length}</b>
			</p>
			{actuacion.tipo !== "Pregón" ? (
				<div key={1}>
					<p className="average-info" key={2}>
						<b>{diffHours * -1}</b>
						<small> horas | Marchas/hora: </small>
						<b>{((repertorios.filter((item) => !item.url).length / diffHours) * -1).toString().slice(0, 4)}</b>
					</p>
					<div className="content" key={3}>
						<span className="enlazadas-info"></span>
						<p className="enlazadas-label">Enlazadas</p>
						<button
							id="downloadButton"
							onClick={() => exportCSV()}
							className="exportCSV">
							CSV <span className="material-icons">download</span>
						</button>
						<button
							onClick={() => setShowTwits(!showTwits)}
							className="absolute">
							Twits {showTwits ? <span className="material-icons secondary-item">visibility</span> : <span className="material-icons secondary-item">visibility_off</span>}
							
						</button>
						
						{/* <button
							id="dowloadButton"
							onClick={() => setShowGraph(!showGraph)}
							className="graphs">
							Gráficos <span className="material-icons">bar_chart</span>
						</button> */}
					</div>
				</div>
			) : (
				<></>
			)}
			{!showGraph ? (
				<>{repertorios.map((repertorio, index) => {
				const time = repertorio.time;
				return (
					<>
						{!repertorio.url ? (
							<div
								className={repertorio.enlazada % 2 === 0 ? "table2-row-enlazada" : "table2-row"}
								key={index}>
								<div className="table2-cell column2-1">
									<p className="item2-text index">
										<b>
											{repertorios.filter((item) => !item.url).length -
												repertorios
													.filter((item) => !item.url)
													.map((item) => item.idInterpretacion)
													.indexOf(repertorio.idInterpretacion)}
										</b>
									</p>
									<div className="secondDiv">
										<p className="item2-text">
											<b>{repertorio.tituloMarcha}</b>
										</p>
									</div>
								</div>
								<div className="table2-cell column2-2">
									<p className="item2-text">{repertorio.compositor}</p>
								</div>
								{actuacion.tipo !== "Concierto" && actuacion.tipo !== "Pregón" ? (
									<div className="table2-cell column2-3">
										<p className="item2-text">{repertorio.ubicacion}</p>
									</div>
								) : (
									<></>
								)}
								{actuacion.tipo !== "Concierto" && actuacion.tipo !== "Pregón" ? (
									<div className="table2-cell column2-4">
										<p className="item2-text">{time.substring(time.indexOf(",") + 2, time.length - 3)}</p>
									</div>
								) : (
									<div className="map-wrapper"></div>
								)}
							</div>
						) : showTwits ? (
							<div className="twit">
								<Tweet
									key={index}
									id={repertorio.url.match(/\/status\/(\d+)/)[1]}
								/>
							</div>
						) : (
							<></>
						)}
					</>
				);
			})}</>) : (
				<>
					<Graphs repertorios={repertorios.filter(item => !item.url && item.tituloMarcha !== "Himno Nacional")} />
				</>
			)}
			
		</div>
	);
}
