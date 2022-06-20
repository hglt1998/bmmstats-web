import './aboutPage.css'

export default function AboutPage() {
  return (
    <div className="container">
      <h1 className='about-title'>Nace BMM STATS</h1>
      <p>
        BMM STATS es un proyecto de la{" "}
        <a className="" href="https://municipaldemairena.com" target="_blank">
          Banda Municipal de Música de Mairena del Alcor 
        </a> y ha sido desarrollado por completo por su equipo de comunicación.
      </p>
      <p>Son muchas las personas que, cuando escuchan alguna de las composiciones que 
        nuestra banda interpreta y no conocen su nombre, se acercan a nuestros músicos a preguntar
        qué composición acababa de sonar.</p>
      <p>
          A través de esta aplicación web, se podrá consultar qué está interpretando nuestra banda
          con actualizaciones en tiempo real.
      </p>
      <p>
        Para gestionar toda la información que se ofrece en esta web, nuestro equipo ha desarrollado una aplicación
        móvil de administración con la que se actualizan los datos con tan sólo introducir 1 dato identificador de cada composición.
      </p>
      <p>
        Este proyecto se ha confeccionado al completo desde 0, y seguimos desarrollando nuevas funcionalidades y mejoras constantemente.
      </p>
      <p>
        En fechas futuras, se podrán hacer búsquedas por actuaciones, composiciones o compositores.
      </p>
      <p className='quote'>
        #suenaMairena
      </p>

    </div>
  );
}
