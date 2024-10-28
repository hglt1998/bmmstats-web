import React from "react";
import { useNavigate } from "react-router-dom";

function ActuacionesList({actuaciones}) {

  const navigate = useNavigate();

  const getTagColor = (tag) => {
		switch (tag) {
			case "Semana Santa":
				return "bg-purple-700 text-white";
			case "Glorias":
				return "bg-yellow-300 text-slate-800";
			case "Procesión Extraordinaria":
				return "bg-sky-300 text-slate-800";
			default:
				return "bg-slate-700 text-white";
		}
	};

	return (
		<div className="overflow-x-auto">
			<table className="w-full text-xs lg:text-sm text-left text-gray-500">
				<thead className="text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-200">
					<tr>
						<th scope="col" className="px-1 py-3 lg:pl-2">
							Concepto
						</th>
						<th scope="col" className="pr-3 py-3 text-center">
							Ciudad
						</th>
						<th scope="col" className="hidden lg:table-cell pr-3 py-3">
							Ubicación
						</th>
						<th scope="col" className="pr-3 py-3 text-center">
							Tipo
						</th>
						<th scope="col" className="p-0 py-3">
							Fecha
						</th>
					</tr>
				</thead>
				<tbody>
					{actuaciones.map((item, index) => {
						const date = new Date(item.fecha.seconds * 1000).toLocaleString("es-ES", { month: "short", year: "2-digit", day: "2-digit" });
						return (
							<tr role="list" className="border-b dark:bg-slate-800 dark:border-gray-700 cursor-pointer" key={index} onClick={() => navigate(`/actuaciones/${item.idActuacion}`)}>
								<th scope="col" className="px-1 py-3 text-gray-900 lg:pl-2 dark:text-white">
									{item.concepto} <br /> <span className="font-normal text-gray-500 dark:text-gray-400">{item.organizador1}</span>
								</th>
								<td className="pr-1 w-auto py-3 dark:text-gray-300 text-center whitespace-break-spaces">{item.ciudad}</td>
								<td className="hidden md:table-cell pr-1 py-3 dark:text-gray-300">{item.ubicacion}</td>
								<td className="">
									<div className={"items-center mx-auto p-1 rounded-md text-center " + getTagColor(item.tagActuacion)}>{item.tipo}</div>
								</td>
								<td className="p-0 py-3 px-1 dark:text-gray-300 text-center">
									<div>{date}</div>
								</td>
							</tr>
						);
					})}
				</tbody>
			</table>
		</div>
	);
}

export default ActuacionesList;
