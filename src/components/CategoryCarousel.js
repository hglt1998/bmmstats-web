import React, { useRef } from "react";
import Card from "./Card";

const CategoryCarousel = ({ title, actuaciones, filterValue }) => {
	const carouselRef = useRef(null);
	const scrollLeft = () => {
		if (carouselRef.current) {
			carouselRef.current.scrollBy({ left: -200, behavior: "smooth" });
		}
	};

	const scrollRight = () => {
		if (carouselRef.current) {
			carouselRef.current.scrollBy({ left: 200, behavior: "smooth" });
		}
	};


	return (
		<div className="mb-8">
			{actuaciones ? (
				<>
					<h2 className="relative text-lg lg:text-xl font-bold mb-1 left-4 dark:text-white">{title}</h2>
					<div className="relative">
						<button className="absolute left-0 top-1/2 transform -translate-y-1/2 bg-gray-800 text-white rounded-full p-2 z-10 dark:bg-white dark:text-slate-800" onClick={scrollLeft}>
							◄
						</button>
						<div className="flex overflow-x-scroll no-scrollbar" ref={carouselRef}>
							{actuaciones?.filter((actuacion) => actuacion.tipo === filterValue)
								.map((event, index) => {
									return <Card key={index} doc={event} index={index} />;
								})}
						</div>
						<button className="absolute right-0 top-1/2 transform -translate-y-1/2 bg-gray-800 text-white rounded-full p-2 z-10 dark:bg-white dark:text-slate-800" onClick={scrollRight}>
							►
						</button>
					</div>
				</>
			) : (
				<p>Loadings</p>
			)}
		</div>
	);
};

export default CategoryCarousel;
