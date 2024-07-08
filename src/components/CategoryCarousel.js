import React, { useRef } from 'react';
import Card from './Card';

const CategoryCarousel = ({ title, events }) => {
  const carouselRef = useRef(null);

  const scrollLeft = () => {
    if (carouselRef.current) {
      carouselRef.current.scrollBy({ left: -200, behavior: 'smooth' });
    }
  };

  const scrollRight = () => {
    if (carouselRef.current) {
      carouselRef.current.scrollBy({ left: 200, behavior: 'smooth' });
    }
  };

  return (
    <div className="mb-8">
      <h2 className="relative text-lg lg:text-xl font-bold mb-1 left-4 dark:text-white">{title}</h2>
      <div className="relative">
        <button 
          className="absolute left-0 top-1/2 transform -translate-y-1/2 bg-gray-800 text-white rounded-full p-2 z-10 dark:bg-white dark:text-slate-800" 
          onClick={scrollLeft}
        >
          ◄
        </button>
        <div 
          className="flex overflow-x-scroll no-scrollbar" 
          ref={carouselRef}
        >
          {events.map((event, index) => (
            <Card key={index} doc={event} />
          ))}
        </div>
        <button 
          className="absolute right-0 top-1/2 transform -translate-y-1/2 bg-gray-800 text-white rounded-full p-2 z-10 dark:bg-white dark:text-slate-800" 
          onClick={scrollRight}
        >
          ►
        </button>
      </div>
    </div>
  );
};

export default CategoryCarousel;
