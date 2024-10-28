import React, { useState } from 'react';
import foto from '../static/actuacion-cover.webp'
import { NavLink } from 'react-router-dom';
import ImageSkeleton from '../components/ImageSkeleton'
import { Transition } from '@headlessui/react';

const Card = ({doc, index}) => {
  const [isImageLoaded, setIsImageLoaded] = useState(false);
  const handleImageLoad = () => {
    setIsImageLoaded(true);
  };
  
  return (
    <div className="group relative w-48 h-72 flex-shrink-0 m-2 first:ml-0 shadow-sm shadow-white border-white rounded-lg">
      <Transition
        show={!isImageLoaded}
        enter="transition-opacity duration-500"
        enterFrom="opacity-0"
        enterTo="opacity-100"
        leave="transition-opacity duration-500"
        leaveFrom="opacity-100"
        leaveTo="opacity-0"
        afterLeave={() => setIsImageLoaded(true)}
      >
        <div className="absolute inset-0">
          <ImageSkeleton />
        </div>
      </Transition>
      <img
        src={doc.coverImage || foto}
        alt=""
        className={`w-full h-full object-cover rounded-md brightness-50 transition-opacity duration-500 ${isImageLoaded ? 'opacity-100' : 'opacity-0'}`}
        onLoad={handleImageLoad}
        />
      <div className="absolute inset-0 flex flex-col items-center justify-center text-white text-center text-lg font-bold rounded-md">
        <p className='absolute top-2 left-4 text-sm'>{new Date(doc.fecha.seconds * 1000).toLocaleDateString()}</p>
        <p className="absolute top-12 mb-10">{doc.concepto}</p>
        <p className='absolute top-[12rem] font-bold align-text-top text-sm'>{doc.organizador1}</p>
        <p className='absolute bottom-5 text-sm font-light'>- {doc.ciudad} -</p>
        <NavLink to={`${doc.idActuacion}`} className="bg-red-600 px-4 py-2 mt-5 rounded-full text-sm opacity-0 z-50 group-hover:opacity-100 transition-opacity duration-300">
          Ver
        </NavLink>
      </div>
    </div>
  );
};

export default Card;
  