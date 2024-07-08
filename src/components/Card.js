import React from 'react';
import foto from '../static/actuacion-cover.webp'
import { NavLink } from 'react-router-dom';

const MovieCard = ({doc}) => {

  return (
    <div className="group relative w-48 h-72 flex-shrink-0 m-2 first:ml-0 shadow-lg shadow-sm shadow-white border-white rounded-lg">
      <img 
        src={doc.coverImage || foto} 
        alt={""}
        className="w-full h-full object-cover rounded-md brightness-50"
      />
      <div className="absolute inset-0 flex flex-col items-center justify-center text-white text-center text-lg font-bold rounded-md">
        <p className='absolute top-0 left-4 text-sm'>{new Date(doc.fecha.seconds * 1000).toLocaleDateString()}</p>
        <p className="mb-2">{doc.concepto}</p>
        <p className='pb-0 text-sm font-light'>{doc.organizador1}</p>
        <p className='pt-1 mb-2 text-sm font-light'>{doc.ciudad}</p>
        <NavLink to={`${doc.idActuacion}`} className="bg-red-600 px-4 py-2 rounded-full text-sm opacity-0 z-50 group-hover:opacity-100 transition-opacity duration-300">
          Ver 
        </NavLink>
      </div>
    </div>
  );
};

export default MovieCard;
