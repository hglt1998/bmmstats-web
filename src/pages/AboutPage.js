import React, { useState } from 'react';

const About = () => {
  const [openFAQ, setOpenFAQ] = useState(null);

  const toggleFAQ = (index) => {
    setOpenFAQ(openFAQ === index ? null : index);
  };

  const faqs = [
    {
      question: "¿Qué hace esta aplicación?",
      answer: "En esta aplicación podrás ver y consultar los repertorios que interpreta la Banda Municipal de Música de Mairena del Alcor con actualizaciones en tiempo real."
    },
    {
      question: "¿Cómo actualizais la información mientras tocáis?",
      answer: "Esta aplicación web que estás viendo es sólo una parte del proyecto. Hemos creado una app para móviles de administración que controla toda la aplicación. Está configurada para que tan sólo con un click podamos actualizar la composición que estamos interpretando y la ubicación. La aplicación se encarga del resto de información que ves."
    },
    {
      question: "¿Cómo está hecha la aplicación?",
      answer: "Todo el proyecto está hecho con herramientas gratuitas o de código libre. Para las aplicaciones clientes hemos usado ReactJS y React-Native + Expo. Está estilizada con Tailwindcss. Está alojada en nuestros servidores para tener más control sobre la aplicación"
    }
  ];

  return (
    <div className="container mx-auto p-6 mt-14">
      <h1 className="text-4xl font-bold mb-6">Sobre BMM STATS</h1>
      <p className="mb-6">
        BMM STATS es un proyecto del equipo IT de la <a className='text-blue-600' href='https://municipaldemairena.com'>Banda Municipal de Música de Mairena del Alcor</a>. 
      </p>

      <section className="mb-12">
        <h2 className="text-3xl font-bold mb-4">Preguntas Frecuentes (FAQ)</h2>
        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <div key={index} className="p-4 border rounded-lg shadow-md">
              <button
                onClick={() => toggleFAQ(index)}
                className="w-full text-left flex justify-between items-center"
              >
                <h3 className="text-xl font-semibold">{faq.question}</h3>
                <span>{openFAQ === index ? '-' : '+'}</span>
              </button>
              {openFAQ === index && (
                <p className="mt-2">{faq.answer}</p>
              )}
            </div>
          ))}
        </div>
      </section>

      <section>
        <h2 className="text-3xl font-bold mb-4">Asistente de Instalación</h2>
        <ul className="list-decimal list-inside space-y-2">
          <li className="p-4 border rounded-lg shadow-md">
            Abre el menú del navegador nativo de tu teléfono
          </li>
          <li className="p-4 border rounded-lg shadow-md">
            Busca la opción la siguiente opción: <pre className='bg-gray-100 pt-2 mt-2 rounded'>Añadir a pantalla de inicio</pre>
          </li>
          <li className="p-4 border rounded-lg shadow-md">
            Acepta la instalación de BMM STATS en tu pantalla de inicio
          </li>
          <li className="p-4 border rounded-lg shadow-md">
            <strong>Consideraciones:</strong> BMM STATS no es una aplicación como la que descargas de la App Store o de Play Store. BMM STATS es una PWA (Progressive Web App) por lo que no ocupa memoria en tu dispositivo. Así no tendrás problemas de espacio con nuestra aplicación y la tendrás siempre disponible para consultar.
          </li>
        </ul>
      </section>
    </div>
  );
};

export default About;
