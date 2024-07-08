import React from "react";

export default function Stats({duracion, total, porHora}) {
	return (
		<section className="flex h-15 py-3 lg:h-64 z-[5]">
			<div className="max-w-screen-xl content-end px-4 mx-auto text-center lg:px-6 lg:py-6">
				<dl className="grid max-w-screen-md gap-8 mx-auto text-gray-900 grid-cols-3 dark:text-white">
					<div className="flex flex-col items-center justify-center">
						<dt className="mb-2 text-3xl md:text-4xl text-white font-extrabold" style={{textShadow: '0px 0px 10px black'}}>{duracion * -1}</dt>
						<dd className="font-light text-white text-xs" style={{textShadow: '0px 0px 4px black'}}>HORAS</dd>
					</div>
					<div className="flex flex-col items-center justify-center">
						<dt className="mb-2 text-3xl md:text-4xl text-white font-extrabold" style={{textShadow: '0px 0px 10px black'}}>{porHora.toFixed(2) * -1}</dt>
						<dd className="font-light text-white text-xs text-nowrap" style={{textShadow: '0px 0px 5px black'}}>MARCHAS POR HORA</dd>
					</div>
					<div className="flex flex-col items-center justify-center">
						<dt className="mb-2 text-3xl md:text-4xl text-white font-extrabold" style={{textShadow: '0px 0px 10px black'}}>{total}</dt>
						<dd className="font-light text-white text-xs" style={{textShadow: '0px 0px 5px black'}}>TOTAL</dd>
					</div>
				</dl>
			</div>
		</section>
	);
}
