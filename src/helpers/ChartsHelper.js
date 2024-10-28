// Función para convertir una fecha en formato "DD/MM/YYYY, HH:MM:SS" a un objeto Date
function parseDate(dateString) {
  const [datePart, timePart] = dateString?.split(', ');
  const [day, month, year] = datePart.split('/');
  return new Date(`${year}-${month}-${day}T${timePart}`);
}

// Función principal para crear el nuevo array con los intervalos de tiempo
export default function createTimeIntervals(data) {
  // Convertir las fechas a objetos Date
  data.filter((e) => !e.url).forEach(item => {
      item.time = parseDate(item.time);
  });

  // Ordenar los datos por tiempo
  data.sort((a, b) => a.time - b.time);

  // Obtener el tiempo mínimo y máximo
  const minTime = data[0].time.getTime();
  const maxTime = data[data.length - 1].time.getTime();
  const totalTime = maxTime - minTime;

  // Crear los intervalos de tiempo (10% del tiempo total cada uno)
  const intervals = [];
  for (let i = 0; i < 10; i++) {
      const start = minTime + (i * totalTime) / 10;
      const end = minTime + ((i + 1) * totalTime) / 10;
      intervals.push({
          label: `${new Date(start).toLocaleTimeString()} - ${new Date(end).toLocaleTimeString()}`,
          count: 0
      });
  }

  // Contar el número de entradas en cada intervalo
  data.forEach(item => {
      const itemTime = item.time.getTime();
      intervals.forEach(interval => {
          const [start, end] = interval.label.split(' - ').map(dateStr => new Date(dateStr).getTime());
          if (itemTime >= start && itemTime < end) {
              interval.count++;
          }
      });
  });

  return intervals;
}