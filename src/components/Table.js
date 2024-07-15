import React, { useState } from "react";
import { Tweet } from "react-tweet";
import Graphs from "./Graphs";
import './Actuacion.css'

export default function Table({ repertorios, actuacion }) {
	const [showTwits, setShowTwits] = useState(true);
	const [showGraph, setShowGraph] = useState(false)
  console.log(!(actuacion.tipo !== "Pregón" || actuacion.tipo !== "Concierto"), actuacion.tipo);

	return (

		<div className="flex flex-col left-3 right-3 absolute mx-auto lg:mt-8">
			<button onClick={() => {setShowTwits(!showTwits)}} className="flex items-center rounded-lg bg-cyan-950 text-white px-2 py-1 mb-3 self-end text-xs dark:bg-white dark:text-slate-700 z-10 sticky top-32 drop-shadow-[0px_0px_5px_white]">Twits {showTwits ? <span className="material-icons text-sm ml-1">visibility</span> : <span className="material-icons text-sm ml-1">visibility_off</span>}</button>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white/70 dark:bg-slate-700 dark:text-white mb-20">
          <thead>
            <tr>
              <th className="pl-1 md:px-4 md:py-4 border-b-2 border-gray-300 dark:border-gray-700 text-left text-xs md:text-sm font-semibold text-gray-600 uppercase dark:text-gray-300 tracking-wider">
                #
              </th>
              <th className="pl-1 py-2 md:px-4 md:py-4 border-b-2 border-gray-300 dark:border-gray-700 text-xs md:text-sm font-semibold text-gray-600 uppercase dark:text-gray-300 tracking-wider text-center">
                Nombre
              </th>
              <th className="pl-1 pr-1 md:px-4 md:py-4 border-b-2 border-gray-300 dark:border-gray-700 text-xs md:text-sm font-semibold text-gray-600 uppercase dark:text-gray-300 tracking-wider text-center">
                Compositor
              </th>
              {!(actuacion.tipo === 'Pregón' || actuacion.tipo === 'Concierto') && (
                <th className="pl-1 py-2 md:px-4 md:py-4 border-b-2 border-gray-300 dark:border-gray-700 text-xs md:text-sm font-semibold text-gray-600 uppercase dark:text-gray-300 tracking-wider text-center">
                  Ubicación
                </th>
              )}
              {!(actuacion.tipo === 'Pregón' || actuacion.tipo === 'Concierto') && (
                <th className="pl-1 pr-2 md:px-4 md:py-4 border-b-2 border-gray-300 dark:border-gray-700 text-xs md:text-sm font-semibold text-gray-600 uppercase dark:text-gray-300 tracking-wider text-center">
                  Hora
                </th>
              )}
            </tr>
          </thead>
          <tbody>
            {repertorios.map((item, index) => (
              <>
                {!item.url ? (
                  <tr key={index} className="bg-white dark:bg-slate-800 text-center">
										<td className="pl-1 py-2 md:px-4 md:py-4 whitespace-nowrap text-xs md:text-sm font-bold text-gray-900 border-b dark:text-gray-200 text-left">
										{!item.url && repertorios.filter((item) => !item.url).length - repertorios.filter((filtered) => !filtered.url).map((mapped) => mapped.idInterpretacion).indexOf(item.idInterpretacion)}
										</td>
                    <td className="pl-1 py-2 md:px-4 md:py-4 whitespace-nowrap text-xs md:text-sm text-gray-900 dark:text-gray-200 border-b text-wrap">
                      {item.tituloMarcha}
                    </td>
                    <td className="pl-1 pr-1 py-2 md:px-4 md:py-4 whitespace-nowrap text-xs md:text-sm text-gray-900 dark:text-gray-200 border-b text-wrap">
                      {item.compositor}
                    </td>
                    {!(actuacion.tipo === 'Pregón' || actuacion.tipo === 'Concierto') && (
                      <td className="pl-1 py-2 md:px-4 md:py-4 whitespace-nowrap text-xs md:text-sm text-gray-900 dark:text-gray-200 border-b text-wrap">
                        {item.ubicacion}
                      </td>
                    )}
                    {!(actuacion.tipo === 'Pregón' || actuacion.tipo === 'Concierto') && (
                      <td className="pl-1 pr-1 py-2 md:px-4 md:py-4 whitespace-nowrap text-xs md:text-sm text-gray-900 border-b dark:text-gray-200">
                        {item.time.match(/(?!\b\d{1,2}\/\d{1,2}\/\d{4},\s)\d{1,2}:\d{2}/)}
                      </td>
                    )}
                  </tr>
                ) : (
									<>
									{showTwits ? 
									(<td colSpan="5" key={index} id="twit" draggable className="p-0 m-0 h-auto text-center w-full whitespace-nowrap text-xs text-gray-900 dark:text-gray-200">
										<div className="mx-auto w-fit">
                    	<Tweet id={item.url.match(/\/status\/(\d+)/)[1]} />
										</div>
                  </td>): <></>}
									</>
                  
                )}
              </>
            ))}
          </tbody>
        </table>
      </div>
    </div>

	);
}
