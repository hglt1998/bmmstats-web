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

  const formatter = (datum) => {
    return `${datum.datum.interpretaciones} ${+datum.datum.interpretaciones <= 1 ? 'vez': 'veces'}`
  }
  
  const [chartOptions] = useState({
		// Data: Data to be displayed in the chart
		data: auxData.sort((a, b) => b.interpretaciones - a.interpretaciones),
		// Series: Defines which chart type and data to use
		series: [
			{
				type: "pie",
				angleKey: "interpretaciones",
				legendItemKey: "compositor",
				calloutLabelKey: "compositor",
				tooltip: {
					renderer: function ( datum, xkey ) {
            return {
              content: formatter(datum, xkey)
            }
					}
				}
			}
		],
		height: 500,
		title: { text: "Compositores" },
		subtitle: { text: "por número de interpretaciones" },
	});


  return (
			// AgChartsReact component with options passed as prop
		<>
			<div className="py-20 w-[50%]">
				<AgChartsReact
					key={1}
					options={chartOptions}
				/>
			</div>
			<div className="py-20 w-[50%]">
				<AgChartsReact
					key={1}
					options={chartOptions}
				/>
			</div>
		</>
	);
  
}
