import React from 'react'
import foto from '../static/actuacion-cover.webp'
import { NavLink } from 'react-router-dom'
import { PlayCircleIcon } from '@heroicons/react/16/solid'

export default function FeaturedEvent({doc}) {
  return (
		<div
			className="relative w-full rounded-lg h-80 sm:h-96 lg:h-[35rem] flex flex-col justify-end p-4 pt-10 bg-cover bg-center mb-4"
			style={{ backgroundImage: `url(${doc?.coverImage || foto})` }}>
			<div className="absolute rounded-lg inset-0 bg-gradient-to-t from-black to-transparent"></div>
			<div className="absolute top-4 right-4 ">
				{doc?.isLive === true && (
					<div className="bg-slate-800 flex items-center z-10 ml-auto mb-2 border border-red-600 rounded-lg px-2 py-1">
						<PlayCircleIcon className="mr-1.5 h-3 w-3 flex-shrink-0 text-red-600 animate-pulse align-middle" />
						<h2 className="text-red-600 text-xs lg:text-base align-middle text-white">En directo</h2>
					</div>
				)}
			</div>
			<div className="relative z-10 text-white">
				<h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-2 text-left">{doc?.concepto}</h1>
				<p className="text-sm sm:text-base lg:text-lg max-w-xl text-left pb-0">{doc?.organizador1}</p>
				<p className="text-sm sm:text-base lg:text-lg mb-4 max-w-xl pt-1 text-left">{doc?.ciudad}</p>
				<NavLink
					to={`/actuaciones/${doc?.idActuacion}`}
					className="bg-red-600 px-4 py-2 rounded-full text-sm">
					Ver
				</NavLink>
			</div>
		</div>
	);
}
