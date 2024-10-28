import React, { useEffect, useState } from "react";
import escudo from '../static/SinfondoP.webp'

function ExportImage({actuacion, repertorio}) {

  const [columns, setColumns] = useState([])
  const length = repertorio.filter((e) => !e.url).length
  
  const getInterpretaciones = (index) => {
    if (index === 0) {
      return repertorio.filter((e) => !e.url).slice(0, 44)
    } else if (index === 1){
      return repertorio.filter((e) => !e.url).slice(44)
    } else {
      return repertorio.slice(61)
    }
  }

  const getFontSize = () => {
    if (length <= 30) {
      return 'text-lg'
    } else if (length < 44){
      return 'text-sm'
    } else {
      return 'text-[0.8rem]'
    }
  }

  useEffect(() => {
    if (length <= 44) {
       setColumns([1])
    } else {
      setColumns([1, 2])
    }
  }, [])

	return (
		<div id="node-to-canvas" className="w-[1080px] h-[1080px] border border-black mt-96 relative">
			<h1 className="text-white absolute top-6 left-4 font-bold text-5xl z-10">{actuacion.concepto}</h1>
			<h1 className="text-white absolute top-20 left-4 font-thin text-md z-10">{actuacion.organizador1}</h1>
			<img className="absolute top-6 right-10" src={escudo} width={100} height={100} />
			<h1 className="text-white absolute top-28 left-4 font-thin text-md z-10">
				{actuacion.ciudad} | {new Date(actuacion.fecha?.seconds * 1000).toLocaleString("es-ES", { dateStyle: "long", timeStyle: "short" })}
			</h1>
			<img className="object-cover w-[1080px] h-[1080px] absolute brightness-50 -z-20" src={actuacion.coverImage} />
			<div className="w-[1080px] h-[1080px] p-0 -z-10 absolute bottom-0 left-0 bg-gradient-to-t from-transparent via-50% to-black"></div>
			<p className="absolute bottom-8 left-4 font-thin text-white" style={{ textShadow: "0px 0px 10px black" }}>
				Imagen generada automáticamente por <b>BMM STATS</b>
			</p>
			<p className="absolute bottom-2 left-4 font-thin text-white" style={{ textShadow: "0px 0px 10px black" }}>
				{window.location.host + window.location.pathname}
			</p>
			<div className="mt-40 w-full h-[75vh] flex flex-row justify-evenly">
				{columns.map((column, index) => (
					<div key={index} className={"w-full mx-20 flex flex-col " + index !== 1 ? "justify-evenly my-auto" : ""}>
						{getInterpretaciones(index).map((item, index2) => (
							<div key={index2} id="row" className={"text-white font-thin flex flex-row gap-6 justify-between " + getFontSize()}>
								<p className="text-right min-w-96 flex-1 whitespace-nowrap">{item.tituloMarcha}</p>
								<p className="text-left flex-1 min-w-60 whitespace-nowrap">{item.compositor}</p>
								<p className="text-right min-w-64 flex-1 whitespace-nowrap">{item.ubicacion}</p>
							</div>
						))}
					</div>
				))}
			</div>
		</div>
	);
}

export default ExportImage;
