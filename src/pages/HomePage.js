import { NavLink } from "react-router-dom";
import logo from '../static/SinfondoP.webp';
import './HomePage.scss';

export default function HomePage() {
  return (
    <div className="h-screen relative isolate px-6 pt-28 sm:pt-8 lg:px-8 dark:bg-gradient-to-t from-slate-800 to-slate-900">
        <img src={logo} className="h-24 w-auto items-center mx-auto lg:mt-20 mb-8" alt="logo"/>
        <div className="mx-auto max-w-2xl py-22 sm:py-48 lg:py-10">
          <div className="hidden sm:mb-8 sm:flex sm:justify-center">
            <div className="relative rounded-full px-3 py-1 text-sm leading-6 text-gray-600 dark:text-gray-300 ring-1 ring-gray-900/10 hover:ring-gray-900/20 dark:ring-gray-600 dark:hover:ring-gray-500">
              Un proyecto de la{' '}
              <NavLink to="https://municipaldemairena.com" className="font-semibold text-sky-950 dark:text-sky-400">
                <span className="absolute inset-0" aria-hidden="true" />
                Banda Municipal de Mairena del Alcor <span aria-hidden="true">&rarr;</span>
              </NavLink>
            </div>
          </div>
          <div className="text-center">
            <h1 className="text-4xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-6xl">
              BMM STATS
            </h1>
            <p className="mt-6 text-lg leading-8 text-gray-600 dark:text-gray-300">
              Descubre qué está tocando nuestra banda en este momento. Composiciones, ubicación y todos los detalles de cada actuación.
              Actualizaciones en tiempo real de las interpretaciones en tu dispositivo
            </p>
            <div className="mt-10 flex items-center justify-center gap-x-6">
              <NavLink
                to="/actuaciones"
                className="rounded-md bg-slate-800 dark:bg-white px-3.5 py-2.5 text-sm font-semibold text-white dark:text-slate-800 shadow-sm hover:bg-slate-700 dark:hover:bg-sky-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                Actuaciones
              </NavLink>
              <NavLink to="/about" className="text-sm font-semibold leading-6 text-gray-900 dark:text-white">
                Qué es BMM STATS <span aria-hidden="true">→</span>
              </NavLink>
            </div>
          </div>
        </div>
      </div>
  );
}
