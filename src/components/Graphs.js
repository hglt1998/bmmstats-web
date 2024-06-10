import React, { useState } from 'react'
import { AgChartsReact } from 'ag-charts-react'


export default function Graphs({repertorios}) {
  
  const compositores = [...new Set(repertorios.map(item => item.compositor))]
  const auxData = []
  compositores.forEach((item) => {
    const objAux = {
      compositor: item,
      interpretaciones: repertorios.filter(interpretacion => interpretacion.compositor === item).length
    }
    auxData.push(objAux)
  })
  const [chartOptions, setChartOptions] = useState({
    // Data: Data to be displayed in the chart
    data: auxData.sort((a, b) => b.interpretaciones - a.interpretaciones),
    // Series: Defines which chart type and data to use
    series: [{ type: 'pie', angleKey: 'interpretaciones', legendItemKey: 'compositor', calloutLabelKey: 'compositor'  }],
    height: 400,
    title: {text: "Compositores"},
    subtitle: {text: "por número de interpretaciones"},
    tooltip: {
      renderer: ({datum}) => ({
        content: `${datum.slice(0, -3)}`,
      })}
  });

  console.log(auxData);

  return (
    // AgChartsReact component with options passed as prop
    <>
      <AgChartsReact options={chartOptions} />
    </>
  );
  
}
