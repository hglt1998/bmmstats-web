import { Link } from "react-router-dom";
export default function AboutPage() {
  return (
    <div className="container">
      <h1>Nace BMM STATS</h1>
      <p>
        BMM STATS es un proyecto de la{" "}
        <a className="text-white" href="https://municipaldemairena.com" target="_blank">
          Banda Municipal de Música de Mairena del Alcor 
        </a> y ha sido desarrollado por completo por su equipo de comunicación.
      </p>
      <p>Son muchas las personas que, cuando escuchan alguna de las composiciones que 
        nuestra banda interpreta y no conocen su nombre, se acercan a nuestros músicos a preguntar
        qué composición acababa de sonar.</p>
      <p>
          A través de esta aplicación web, se podrá consultar qué se encuentra interpretando nuestra banda
          con actualizaciones en tiempo real.
      </p>
      <p>
        Para gestionar toda la información que se ofrece en esta web, nuestro equipo ha desarrolado una aplicación
        móvil de administración con la que se actualizan los datos con tan sólo introducir 1 dato identificador.
      </p>
      <p>
        En fechas futuras, se podrá hacer búsquedas por actuaciones, composiciones o compositores.
      </p>
      <p>
        #suenaMairena
      </p>

    </div>
  );
}
